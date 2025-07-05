
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { GithubLogo, LinkedinLogo, PaperPlaneTilt } from '@phosphor-icons/react/dist/ssr';
import * as React from 'react';
import { sendContactEmail, type ContactFormData } from '@/app/actions/contact-form-actions';
import { resumeData } from '@/data/resume';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, {message: "Message too long."}),
});
type ContactFormValues = z.infer<typeof contactFormSchema> & { subject?: string };

export function ContactSection() {
  const component = React.useRef(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".contact-anim", {
        autoAlpha: 0,
        y: 40,
        filter: 'blur(10px)',
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: component.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, component);
    return () => ctx.revert();
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsLoading(true);
    gsap.to(".submit-button", { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.inOut' });
    const dataWithSubject = {...data, subject: `Message from ${data.name}`};
    try {
      const result = await sendContactEmail(dataWithSubject as ContactFormData); 
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
          variant: "default",
        });
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
    <section 
      id="contact" 
      ref={component}
      className="container mx-auto"
    >
      <div className="text-center">
        <h2 className="contact-anim text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
        <p className="contact-anim text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or just want to say hi? Feel free to reach out. I&apos;m always open to discussing new ideas and opportunities.
        </p>
      </div>

      <div className="contact-anim max-w-xl mx-auto glassmorphic p-8 md:p-10 rounded-2xl">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <Input 
              id="name" 
              {...form.register("name")} 
              placeholder="Your Name" 
              className="bg-input/50 border-border/50 text-base" 
            />
            {form.formState.errors.name && <p className="text-xs text-destructive mt-1.5">{form.formState.errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <Input 
              id="email" 
              type="email" 
              {...form.register("email")} 
              placeholder="Your Email" 
              className="bg-input/50 border-border/50 text-base" 
            />
            {form.formState.errors.email && <p className="text-xs text-destructive mt-1.5">{form.formState.errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <Textarea 
              id="message" 
              {...form.register("message")} 
              placeholder="Your message..." 
              rows={5} 
              className="bg-input/50 border-border/50 text-base min-h-[140px]" 
            />
            {form.formState.errors.message && <p className="text-xs text-destructive mt-1.5">{form.formState.errors.message.message}</p>}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
             <Button 
                type="submit" 
                className="submit-button w-full sm:w-auto bg-primary text-primary-foreground text-base font-semibold py-3 px-6 h-auto transition-all duration-300 ease-in-out hover:shadow-glow-primary hover:scale-105 active:scale-100 group"
                disabled={isLoading}>
                <PaperPlaneTilt className="h-5 w-5 mr-2.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                {isLoading ? "Sending..." : "Submit"}
              </Button>
              <div className="flex gap-4">
                <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors hover:shadow-glow-primary rounded-full">
                  <GithubLogo size={28} />
                </a>
                 <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors hover:shadow-glow-primary rounded-full">
                  <LinkedinLogo size={28} />
                </a>
              </div>
          </div>
        </form>
      </div>
    </section>
  );
}
