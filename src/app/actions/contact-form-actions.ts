
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

  console.log('Received contact form submission on server:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Subject:', subject);
  console.log('Message:', message);

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
    console.log(`Attempting to send email to: ${recipientEmail}`);
    const { data: emailData, error: emailError } = await resend.emails.send({
      // IMPORTANT: For production, replace 'onboarding@resend.dev' with an email from your verified domain in Resend.
      // See https://resend.com/docs/authentication/domains for domain verification.
      from: 'PortfolioPilot Contact Form <onboarding@resend.dev>', 
      to: [recipientEmail],
      subject: `New Contact Form Submission: ${subject}`,
      reply_to: email, // User's email as reply-to
      html: `
        <h1>New Contact Form Submission</h1>
        <p>You have received a new message from your portfolio contact form.</p>
        <hr />
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    if (emailError) {
      console.error('Error sending email via Resend:', emailError);
      return { 
        success: false, 
        error: `Failed to send email. Resend error: ${emailError.message || 'Unknown error'}` 
      };
    }

    console.log('Email sent successfully via Resend:', emailData);
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
