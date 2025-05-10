
'use server';

import { z } from 'zod';

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
    return { 
      success: false, 
      error: 'Invalid form data. Please check your inputs.',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, email, subject, message } = validationResult.data;

  console.log('Received contact form submission:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Subject:', subject);
  console.log('Message:', message);

  // **IMPORTANT**: The following is a simulation.
  // To actually send emails, you need to integrate an email sending service.
  // Below is an example using Resend (https://resend.com).
  // 1. Install Resend: `npm install resend` or `yarn add resend`
  // 2. Get an API key from Resend and add it to your .env file (e.g., RESEND_API_KEY=your_api_key).
  // 3. Uncomment and adapt the code below.

  /*
  import { Resend } from 'resend';

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set. Email sending will be simulated.');
    // Fallback to simulation if API key is missing, or return an error
     return { 
       success: false, 
       error: 'Email service is not configured on the server.' 
     };
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const recipientEmail = process.env.CONTACT_FORM_RECIPIENT_EMAIL; // Add your email to .env

  if (!recipientEmail) {
    console.error('CONTACT_FORM_RECIPIENT_EMAIL is not set. Email sending will be simulated.');
    return { 
      success: false, 
      error: 'Recipient email is not configured on the server.' 
    };
  }

  try {
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Portfolio Contact Form <noreply@yourdomain.com>', // Replace with a verified sender domain in Resend
      to: [recipientEmail],
      subject: `New Contact Form Submission: ${subject}`,
      reply_to: email,
      html: `
        <h1>New Contact Form Submission</h1>
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
      return { success: false, error: 'Failed to send email. Please try again later.' };
    }

    console.log('Email sent successfully via Resend:', emailData);
    return { success: true, message: 'Email sent successfully!' };

  } catch (error) {
    console.error('Unexpected error sending email:', error);
    return { success: false, error: 'An unexpected error occurred while sending the email.' };
  }
  */

  // Simulate email sending for now
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Email sending simulated.');
      resolve({ success: true, message: 'Your message has been received (simulated)!' });
    }, 1000);
  });
}
