
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Linkedin, Github, Send, Loader2 } from 'lucide-react';
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
  { name: "Email", Icon: Mail, href: `mailto:${resumeData.contact.email}`, color: "hover:text-primary" },
  { name: "LinkedIn", Icon: Linkedin, href: resumeData.contact.linkedin, color: "hover:text-primary" }, 
  { name: "GitHub", Icon: Github, href: resumeData.contact.github, color: "hover:text-primary" },
];

export function ContactSection() {
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
      <section id="contact" className="py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Get In Touch</h2>
            <p className="text-lg text-muted-foreground mt-2">I'm available for freelance work and new opportunities.</p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-start bg-card border-border p-8 md:p-12 rounded-lg shadow-xl">
            <div className="space-y-6 animate-fadeIn" style={{animationDelay: '0.1s'}}>
              <h3 className="text-xl md:text-2xl text-foreground font-semibold">Send a Message</h3>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-muted-foreground mb-1.5">Name</label>
                  <Input id="name" {...form.register("name")} placeholder="Your Name" className="bg-input border-border focus:border-primary focus:ring-primary text-sm py-3 px-3.5" />
                  {form.formState.errors.name && <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
                  <Input id="email" type="email" {...form.register("email")} placeholder="your.email@example.com" className="bg-input border-border focus:border-primary focus:ring-primary text-sm py-3 px-3.5" />
                  {form.formState.errors.email && <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>}
                </div>
                 <div>
                  <label htmlFor="subject" className="block text-xs font-medium text-muted-foreground mb-1.5">Subject</label>
                  <Input id="subject" {...form.register("subject")} placeholder="Regarding..." className="bg-input border-border focus:border-primary focus:ring-primary text-sm py-3 px-3.5" />
                  {form.formState.errors.subject && <p className="text-xs text-destructive mt-1">{form.formState.errors.subject.message}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-muted-foreground mb-1.5">Message</label>
                  <Textarea id="message" {...form.register("message")} placeholder="Your message here..." rows={5} className="bg-input border-border focus:border-primary focus:ring-primary text-sm min-h-[140px] px-3.5 py-3" />
                  {form.formState.errors.message && <p className="text-xs text-destructive mt-1">{form.formState.errors.message.message}</p>}
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3.5 text-base font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 group active:scale-98" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5 mr-2.5" /> 
                  ) : (
                    <Send className="h-4 w-4 mr-2.5 group-hover:translate-x-0.5 transition-transform" />
                  )}
                  Send Message
                </Button>
              </form>
            </div>

            <div className="flex flex-col items-center justify-center text-center space-y-10 md:pt-8 animate-fadeIn" style={{animationDelay: '0.2s'}}>
               <h3 className="text-2xl md:text-3xl text-primary font-bold"> 
                Let&apos;s Connect.
              </h3>
              <p className="text-md md:text-lg text-muted-foreground max-w-sm leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <div className="flex space-x-5 md:space-x-6 pt-4">
                {socialLinksData.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Connect on ${link.name}`}
                    className={`text-muted-foreground p-3 rounded-full border-2 border-transparent hover:border-primary/50 transform transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:ring-2 ring-ring ring-offset-background ${link.color} hover:bg-primary/10`}
                  >
                    <link.Icon className="w-6 h-6 md:w-7 md:h-7" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md p-7 bg-card rounded-xl shadow-xl border-border">
          <DialogHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/15 mb-5 border-2 border-primary shadow-lg">
               <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <DialogTitle className="text-xl font-semibold text-foreground">Message Sent!</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-3">
              Thank you for your message. I&apos;ll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-8 flex justify-center">
            <Button onClick={() => setShowSuccessModal(false)} className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-3 shadow-md hover:shadow-lg font-medium">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
