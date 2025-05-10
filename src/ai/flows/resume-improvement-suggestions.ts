'use server';

/**
 * @fileOverview Provides resume improvement suggestions based on resume content and target roles.
 *
 * - getResumeImprovementSuggestions - A function that generates resume improvement suggestions.
 * - ResumeImprovementSuggestionsInput - The input type for the getResumeImprovementSuggestions function.
 * - ResumeImprovementSuggestionsOutput - The return type for the getResumeImprovementSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeImprovementSuggestionsInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The text content of the resume to be improved.'),
  targetRoles: z
    .string()
    .describe('The target job roles or industries for the resume.'),
});
export type ResumeImprovementSuggestionsInput = z.infer<
  typeof ResumeImprovementSuggestionsInputSchema
>;

const ResumeImprovementSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of suggestions for improving the resume.'),
});
export type ResumeImprovementSuggestionsOutput = z.infer<
  typeof ResumeImprovementSuggestionsOutputSchema
>;

export async function getResumeImprovementSuggestions(
  input: ResumeImprovementSuggestionsInput
): Promise<ResumeImprovementSuggestionsOutput> {
  return resumeImprovementSuggestionsFlow(input);
}

const resumeImprovementSuggestionsPrompt = ai.definePrompt({
  name: 'resumeImprovementSuggestionsPrompt',
  input: {schema: ResumeImprovementSuggestionsInputSchema},
  output: {schema: ResumeImprovementSuggestionsOutputSchema},
  prompt: `You are an expert resume writer. Analyze the provided resume content and provide specific suggestions for improvement, focusing on phrasing and impact, tailored to the specified target roles.\n\nResume Content: {{{resumeContent}}}\nTarget Roles: {{{targetRoles}}}\n\nProvide a numbered list of suggestions:`, // Changed to numbered list
});

const resumeImprovementSuggestionsFlow = ai.defineFlow(
  {
    name: 'resumeImprovementSuggestionsFlow',
    inputSchema: ResumeImprovementSuggestionsInputSchema,
    outputSchema: ResumeImprovementSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await resumeImprovementSuggestionsPrompt(input);
    return output!;
  }
);
