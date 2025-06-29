
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
import { motion } from 'framer-motion';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(1000, {message: "Message too long."}),
});
type ContactFormValues = z.infer<typeof contactFormSchema> & { subject?: string };

const sectionVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" }}
};


export function ContactSection() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsLoading(true);
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
    <motion.section 
      id="contact" 
      className="container mx-auto"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="text-center">
        <motion.h2 className="text-4xl md:text-5xl font-bold mb-4" variants={itemVariants}>Get In Touch</motion.h2>
        <motion.p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto" variants={itemVariants}>
          Have a project in mind or just want to say hi? Feel free to reach out. I&apos;m always open to discussing new ideas and opportunities.
        </motion.p>
      </div>

      <motion.div className="max-w-xl mx-auto glassmorphic p-8 md:p-10 rounded-2xl" variants={itemVariants}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <Input 
              id="name" 
              {...form.register("name")} 
              placeholder="Your Name" 
              className="bg-input/50 border-border/50 focus:border-primary focus:ring-primary/50 text-base" 
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
              className="bg-input/50 border-border/50 focus:border-primary focus:ring-primary/50 text-base" 
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
              className="bg-input/50 border-border/50 focus:border-primary focus:ring-primary/50 text-base min-h-[140px]" 
            />
            {form.formState.errors.message && <p className="text-xs text-destructive mt-1.5">{form.formState.errors.message.message}</p>}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
             <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
             >
                <Button 
                    type="submit" 
                    className="w-full sm:w-auto bg-primary text-primary-foreground text-base font-semibold py-3 px-6 h-auto transition-all duration-300 ease-in-out hover:shadow-glow-primary group"
                    disabled={isLoading}>
                    <PaperPlaneTilt className="h-5 w-5 mr-2.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    {isLoading ? "Sending..." : "Submit"}
                </Button>
             </motion.div>
              <div className="flex gap-4">
                <motion.a 
                    href={resumeData.contact.github} 
                    target="_blank" rel="noopener noreferrer" 
                    aria-label="GitHub" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                >
                  <GithubLogo size={28} />
                </motion.a>
                 <motion.a 
                    href={resumeData.contact.linkedin} 
                    target="_blank" rel="noopener noreferrer" 
                    aria-label="LinkedIn" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                 >
                  <LinkedinLogo size={28} />
                </motion.a>
              </div>
          </div>
        </form>
      </motion.div>
    </motion.section>
  );
}
