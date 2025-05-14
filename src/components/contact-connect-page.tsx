
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Linkedin, Github, Send, Loader2 } from 'lucide-react'; // Removed MessageSquare
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { sendContactEmail as serverSendContactEmail, type ContactFormData } from '@/app/actions/contact-form-actions';
import { resumeData } from '@/data/resume';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 char."}).max(100, {message: "Subject too long."}),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, {message: "Message too long."}),
});
type ContactFormValues = z.infer<typeof contactFormSchema>;

const socialLinksData = [ 
  { name: "Email", Icon: Mail, href: `mailto:${resumeData.contact.email}`, color: "hover:text-accent" }, // Hover uses accent color (Coral)
  { name: "LinkedIn", Icon: Linkedin, href: resumeData.contact.linkedin, color: "hover:text-accent" }, 
  { name: "GitHub", Icon: Github, href: resumeData.contact.github, color: "hover:text-accent" },
];

export function ContactConnectPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsLoading(true);
    try {
      const result = await serverSendContactEmail(data as ContactFormData); 
      if (result.success) {
        setShowSuccessModal(true);
        form.reset();
      } else {
        toast({
          title: "Error Sending Message",
          description: result.error || "An unexpected error occurred.",
          variant: "destructive",
        });
        // Log detailed errors if present
        if (result.errors) {
          console.error("Server-side validation errors:", result.errors);
        }
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast({
        title: "Submission Error",
        description: "Could not send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="py-12 md:py-16">
        <div className="flex items-center justify-center mb-10 md:mb-14 animate-fadeIn">
           <Mail className="section-icon" /> {/* Icon color uses --primary from globals.css */}
           <h2 className="section-title">Contact Me</h2> {/* Title color uses --primary from globals.css */}
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-start bg-card border-border backdrop-blur-md p-8 md:p-12 rounded-xl shadow-2xl">
          {/* Left Half: Contact Form */}
          <div className="space-y-6 animate-fadeIn" style={{animationDelay: '0.1s'}}>
            <h3 className="text-xl md:text-2xl text-foreground font-semibold">Send a Message</h3> {/* Adjusted heading size */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-1.5">Name</label> {/* Adjusted label size */}
                <Input id="name" {...form.register("name")} placeholder="Your Name" className="bg-input border-input-border focus:border-accent focus:ring-accent text-sm py-2.5" /> {/* Focus ring uses accent color */}
                {form.formState.errors.name && <p className="text-xs text-destructive mt-1.5">{form.formState.errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
                <Input id="email" type="email" {...form.register("email")} placeholder="your.email@example.com" className="bg-input border-input-border focus:border-accent focus:ring-accent text-sm py-2.5" />
                {form.formState.errors.email && <p className="text-xs text-destructive mt-1.5">{form.formState.errors.email.message}</p>}
              </div>
               <div>
                <label htmlFor="subject" className="block text-xs font-medium text-muted-foreground mb-1.5">Subject</label>
                <Input id="subject" {...form.register("subject")} placeholder="Regarding..." className="bg-input border-input-border focus:border-accent focus:ring-accent text-sm py-2.5" />
                {form.formState.errors.subject && <p className="text-xs text-destructive mt-1.5">{form.formState.errors.subject.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-muted-foreground mb-1.5">Message</label>
                <Textarea id="message" {...form.register("message")} placeholder="Your message here..." rows={5} className="bg-input border-input-border focus:border-accent focus:ring-accent text-sm min-h-[100px]" /> {/* Adjusted min-height */}
                {form.formState.errors.message && <p className="text-xs text-destructive mt-1.5">{form.formState.errors.message.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/80 py-3 text-sm shadow-lg hover:shadow-accent/50 transform hover:scale-105 transition-transform duration-300 group" disabled={isLoading}> {/* Submit button uses accent color */}
                {isLoading ? (
                  <Loader2 className="animate-spin h-4 w-4 mr-2.5" /> 
                ) : (
                  <Send className="h-4 w-4 mr-2.5 group-hover:translate-x-0.5 transition-transform" />
                )}
                Send Message
              </Button>
            </form>
          </div>

          {/* Right Half: Social Icons & Tagline */}
          <div className="flex flex-col items-center justify-center text-center space-y-8 md:pt-10 animate-fadeIn" style={{animationDelay: '0.2s'}}>
             <h3 className="text-xl md:text-2xl text-primary font-semibold"> {/* Adjusted heading size, uses primary color */}
              Let&apos;s Connect.
            </h3>
            <p className="text-sm md:text-base text-muted-foreground max-w-md"> {/* Adjusted text size */}
              I&apos;m open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="flex space-x-6 pt-4">
              {socialLinksData.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Connect on ${link.name}`}
                  className={`text-muted-foreground p-2.5 rounded-full hover:bg-accent/15 transform transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:ring-2 ring-ring ring-offset-background ${link.color}`}
                >
                  <link.Icon className="w-6 h-6 md:w-7 md:h-7" /> {/* Adjusted icon size */}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md p-6 bg-card rounded-xl shadow-xl border-border">
          <DialogHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4"> {/* Icon bg uses primary color */}
               <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"> {/* Icon uses primary color */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <DialogTitle className="text-lg font-semibold text-foreground">Message Sent!</DialogTitle> {/* Adjusted text size */}
            <DialogDescription className="text-sm text-muted-foreground mt-2"> {/* Adjusted text size */}
              Thank you for your message. I&apos;ll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-center">
            <Button onClick={() => setShowSuccessModal(false)} className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-6 py-2.5 shadow-md hover:shadow-lg"> {/* Button uses primary color */}
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
