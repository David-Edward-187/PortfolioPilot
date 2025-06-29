
'use server';

import { z } from 'zod';
import { Resend } from 'resend';

// Define the schema for contact form data validation on the server
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

interface ActionResult {
  success: boolean;
  message?: string;
  error?: string;
  errors?: Partial<Record<keyof ContactFormData, string[]>>;
}

export async function sendContactEmail(data: ContactFormData): Promise<ActionResult> {
  // Validate data again on the server side
  const validationResult = contactFormSchema.safeParse(data);
  if (!validationResult.success) {
    console.error('Server-side validation failed:', validationResult.error.flatten().fieldErrors);
    return { 
      success: false, 
      error: 'Invalid form data. Please check your inputs.',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, email, subject, message } = validationResult.data;

  const resendApiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.CONTACT_FORM_RECIPIENT_EMAIL;

  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not set in .env.local. Email sending cannot proceed.');
    return { 
      success: false, 
      error: 'Email service is not configured on the server. Administrator: Please set RESEND_API_KEY.' 
    };
  }

  if (!recipientEmail) {
    console.error('CONTACT_FORM_RECIPIENT_EMAIL is not set in .env.local. Email sending cannot proceed.');
    return { 
      success: false, 
      error: 'Recipient email is not configured on the server. Administrator: Please set CONTACT_FORM_RECIPIENT_EMAIL.' 
    };
  }

  const resend = new Resend(resendApiKey);

  try {
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'PortfolioPilot Contact Form <onboarding@resend.dev>', 
      to: [recipientEmail],
      subject: `New Contact Form Submission: ${subject}`,
      reply_to: email, // User's email as reply-to
      html: `
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #dce1e9; background-color: #010816; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #0f172a; border: 1px solid #2e3a59; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
            <div style="text-align: center; border-bottom: 1px solid #2e3a59; padding-bottom: 10px; margin-bottom: 20px;">
              <h1 style="font-size: 24px; color: #8c66ff; margin: 0;">New Contact Form Submission</h1>
            </div>
            <p style="margin-bottom: 15px;">You have received a new message from your portfolio contact form.</p>
            
            <div style="background-color: #1c2539; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #19e3ff; text-decoration: none;">${email}</a></p>
              <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h2 style="font-size: 18px; color: #8c66ff; border-bottom: 1px solid #2e3a59; padding-bottom: 5px; margin-bottom: 10px;">Message:</h2>
              <p style="white-space: pre-wrap; background-color: #1c2539; padding: 15px; border-radius: 4px; margin: 0;">${message}</p>
            </div>
            
            <div style="text-align: center; font-size: 12px; color: #7c8596; margin-top: 20px; padding-top: 10px; border-top: 1px solid #2e3a59;">
              <p>This email was sent from your PortfolioPilot website.</p>
            </div>
          </div>
        </body>
      `,
    });

    if (emailError) {
      console.error('Error sending email via Resend:', emailError);
      return { 
        success: false, 
        error: `Failed to send email. Resend error: ${emailError.message || 'Unknown error'}` 
      };
    }

    return { success: true, message: 'Your message has been sent successfully!' };

  } catch (error) {
    console.error('Unexpected error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { 
      success: false, 
      error: `An unexpected error occurred while sending the email: ${errorMessage}` 
    };
  }
}
