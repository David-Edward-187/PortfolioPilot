"use client";

import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAiSuggestionsAction, type AISuggestionsResult } from "@/lib/actions";
import { Wand2, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const initialState: AISuggestionsResult = {
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Getting Suggestions...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-5 w-5" /> Get AI Suggestions
        </>
      )}
    </Button>
  );
}

export function ResumeAIAssistant() {
  const [state, formAction] = useFormState(getAiSuggestionsAction, initialState);
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state?.success && state.suggestions) {
      toast({
        title: "Suggestions Ready!",
        description: "AI has generated improvement suggestions for your resume.",
        variant: "default",
      });
    } else if (state && !state.success && state.error && !state.fieldErrors) {
       toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast]);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formAction(formData);
  };


  return (
    <Card className="shadow-lg" id="ai-assistant">
      <CardHeader className="text-center">
         <div className="flex items-center justify-center mb-2">
          <Wand2 className="h-8 w-8 text-primary mr-3" />
          <CardTitle className="text-3xl text-primary">Resume AI Assistant</CardTitle>
        </div>
        <CardDescription className="text-md text-muted-foreground">
          Paste your resume content and target roles to get AI-powered improvement suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="resumeContent" className="mb-2 block text-sm font-medium">Resume Content</Label>
            <Textarea
              id="resumeContent"
              name="resumeContent"
              placeholder="Paste your current resume content here..."
              rows={10}
              className="text-base md:text-sm"
              aria-describedby="resumeContentError"
            />
            {state?.fieldErrors?.resumeContent && (
              <p id="resumeContentError" className="text-sm text-destructive mt-1">
                {state.fieldErrors.resumeContent.join(", ")}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="targetRoles" className="mb-2 block text-sm font-medium">Target Roles / Industries</Label>
            <Input
              id="targetRoles"
              name="targetRoles"
              placeholder="e.g., Senior Software Engineer, Product Manager, Data Science"
              className="text-base md:text-sm"
              aria-describedby="targetRolesError"
            />
             {state?.fieldErrors?.targetRoles && (
              <p id="targetRolesError" className="text-sm text-destructive mt-1">
                {state.fieldErrors.targetRoles.join(", ")}
              </p>
            )}
          </div>
          <SubmitButton />
        </form>

        {state?.success && state.suggestions && state.suggestions.length > 0 && (
          <Alert className="mt-8 bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-700">
            <CheckCircle2 className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <AlertTitle className="text-teal-700 dark:text-teal-300">AI Suggestions</AlertTitle>
            <AlertDescription>
              <ul className="list-disc space-y-2 pl-5 mt-2 text-sm text-teal-800 dark:text-teal-200">
                {state.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        {state && !state.success && state.error && !state.fieldErrors && (
          <Alert variant="destructive" className="mt-8">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
