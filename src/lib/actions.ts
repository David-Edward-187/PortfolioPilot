'use server';

import { getResumeImprovementSuggestions, type ResumeImprovementSuggestionsInput } from '@/ai/flows/resume-improvement-suggestions';
import { z } from 'zod';

const aiSuggestionsSchema = z.object({
  resumeContent: z.string().min(50, "Resume content must be at least 50 characters."),
  targetRoles: z.string().min(3, "Target roles must be at least 3 characters."),
});

export interface AISuggestionsResult {
  success: boolean;
  suggestions?: string[];
  error?: string;
  fieldErrors?: {
    resumeContent?: string[];
    targetRoles?: string[];
  }
}

export async function getAiSuggestionsAction(
  prevState: AISuggestionsResult | null,
  formData: FormData
): Promise<AISuggestionsResult> {
  
  const rawFormData = {
    resumeContent: formData.get('resumeContent'),
    targetRoles: formData.get('targetRoles'),
  };

  const validatedFields = aiSuggestionsSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      error: "Validation failed. Please check the fields."
    };
  }

  const input: ResumeImprovementSuggestionsInput = {
    resumeContent: validatedFields.data.resumeContent,
    targetRoles: validatedFields.data.targetRoles,
  };

  try {
    const result = await getResumeImprovementSuggestions(input);
    if (result && result.suggestions) {
      return { success: true, suggestions: result.suggestions };
    } else {
      return { success: false, error: "Failed to get suggestions from AI. The response was empty or invalid." };
    }
  } catch (error) {
    console.error("Error getting AI suggestions:", error);
    // Check if error is an instance of Error to safely access message property
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred while fetching AI suggestions.";
    return { success: false, error: errorMessage };
  }
}
