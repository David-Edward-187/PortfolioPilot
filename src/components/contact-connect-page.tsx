
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Linkedin, Github, Send, Loader2, MessageCircle } from 'lucide-react'; 
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
      }
    } catch (error) {
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
           <MessageCircle className="section-icon" />
           <h2 className="section-title text-left ml-0 pl-0">Get in Touch</h2>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-start bg-card/90 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-2xl border-border">
          {/* Left Half: Contact Form */}
          <div className="space-y-6 animate-fadeIn" style={{animationDelay: '0.1s'}}>
            <h3 className="text-h3 text-foreground font-semibold">Send me a message</h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1.5">Name</label>
                <Input id="name" {...form.register("name")} placeholder="Your Name" className="bg-input border-input-border focus:border-primary focus:ring-primary text-base py-2.5" />
                {form.formState.errors.name && <p className="text-xs text-destructive mt-1.5">{form.formState.errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1.5">Email</label>
                <Input id="email" type="email" {...form.register("email")} placeholder="your.email@example.com" className="bg-input border-input-border focus:border-primary focus:ring-primary text-base py-2.5" />
                {form.formState.errors.email && <p className="text-xs text-destructive mt-1.5">{form.formState.errors.email.message}</p>}
              </div>
               <div>
                <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1.5">Subject</label>
                <Input id="subject" {...form.register("subject")} placeholder="Inquiry about..." className="bg-input border-input-border focus:border-primary focus:ring-primary text-base py-2.5" />
                {form.formState.errors.subject && <p className="text-xs text-destructive mt-1.5">{form.formState.errors.subject.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1.5">Message</label>
                <Textarea id="message" {...form.register("message")} placeholder="How can I help you?" rows={5} className="bg-input border-input-border focus:border-primary focus:ring-primary text-base min-h-[120px]" />
                {form.formState.errors.message && <p className="text-xs text-destructive mt-1.5">{form.formState.errors.message.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5 mr-2.5" />
                ) : (
                  <Send className="h-5 w-5 mr-2.5" />
                )}
                Send Message
              </Button>
            </form>
          </div>

          {/* Right Half: Social Icons & Tagline */}
          <div className="flex flex-col items-center justify-center text-center space-y-8 md:pt-10 animate-fadeIn" style={{animationDelay: '0.2s'}}>
             <h3 className="text-h3 text-primary font-semibold">
              Let&apos;s build the next <span className="text-accent font-bold">great thing</span>.
            </h3>
            <p className="text-base md:text-lg text-muted-foreground max-w-md">
              Connect with me on social media or drop a line. I&apos;m always open to new ideas and collaborations.
            </p>
            <div className="flex space-x-6 pt-4">
              {socialLinksData.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Connect on ${link.name}`}
                  className={`text-muted-foreground ${link.color} p-2.5 rounded-full hover:bg-primary/10 transform transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:ring-2 ring-ring ring-offset-background`}
                >
                  <link.Icon className="w-7 h-7 md:w-8 md:h-8" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md p-6 bg-card rounded-xl shadow-xl border-border">
          <DialogHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
               <svg className="h-10 w-10 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <DialogTitle className="text-xl font-semibold text-foreground">Message Sent!</DialogTitle>
            <DialogDescription className="text-base text-muted-foreground mt-2">
              Thank you for your message. I&apos;ll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-center">
            <Button onClick={() => setShowSuccessModal(false)} className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-6 py-2.5 shadow-md hover:shadow-lg">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
