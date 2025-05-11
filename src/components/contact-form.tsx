
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from 'lucide-react'; 
import * as React from 'react';
import { sendContactEmail } from '@/app/actions/contact-form-actions';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100, { message: "Name must be 100 characters or less."}),
  email: z.string().email({ message: "Please enter a valid email address." }).max(100, { message: "Email must be 100 characters or less."}),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }).max(150, { message: "Subject must be 150 characters or less."}),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(2000, { message: "Message must be 2000 characters or less."}),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsLoading(true);
    try {
      const result = await sendContactEmail(data);
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
          variant: "default",
        });
        form.reset();
      } else {
        if (result.errors) {
          Object.entries(result.errors).forEach(([fieldName, errors]) => {
            if (errors) {
              form.setError(fieldName as keyof ContactFormValues, {
                type: 'server',
                message: errors.join(', '),
              });
            }
          });
        }
        toast({
          title: "Error Sending Message",
          description: result.error || "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="scroll-mt-16 hover:shadow-xl transition-shadow duration-300 ease-in-out" id="contact"> 
      <CardHeader className="text-center pt-8"> 
        <div className="flex items-center justify-center mb-3"> 
          <Send className="h-10 w-10 text-primary mr-4" /> 
          <CardTitle asChild>
            <h2 className="text-h2 text-primary">Get In Touch</h2>
          </CardTitle>
        </div>
        <CardDescription className="text-md text-muted-foreground">
          Have a question or want to work together? Send me a message!
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-8"> 
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> 
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Your Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="e.g. jane.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Project Inquiry" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Your Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Hi Alex, I'd like to discuss..." {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base" disabled={isLoading}> 
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" /> 
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" /> Send Message
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
