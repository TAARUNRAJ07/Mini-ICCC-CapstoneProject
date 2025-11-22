'use server';

/**
 * @fileOverview Classifies CCTV-detected events into categories such as 'accident', 'fire', 'crowd', or 'traffic_violation'.
 *
 * - classifyCCTVEvent - A function that handles the event classification process.
 * - ClassifyCCTVEventInput - The input type for the classifyCCTVEvent function.
 * - ClassifyCCTVEventOutput - The return type for the classifyCCTVEvent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyCCTVEventInputSchema = z.object({
  raw_input: z.record(z.any()).describe('Original metadata from the device.'),
  zone: z.string().describe('The zone where the event occurred.'),
});
export type ClassifyCCTVEventInput = z.infer<typeof ClassifyCCTVEventInputSchema>;

const ClassifyCCTVEventOutputSchema = z.object({
  event_type: z.string().describe('The type of event detected (accident, fire, crowd, traffic_violation, normal).'),
  severity: z.number().int().min(1).max(10).describe('The severity of the event on a scale of 1 to 10.'),
});
export type ClassifyCCTVEventOutput = z.infer<typeof ClassifyCCTVEventOutputSchema>;

export async function classifyCCTVEvent(input: ClassifyCCTVEventInput): Promise<ClassifyCCTVEventOutput> {
  return classifyCCTVEventFlow(input);
}

const classifyCCTVEventPrompt = ai.definePrompt({
  name: 'classifyCCTVEventPrompt',
  input: {schema: ClassifyCCTVEventInputSchema},
  output: {schema: ClassifyCCTVEventOutputSchema},
  prompt: `You are an AI agent analyzing CCTV event data to classify incidents and determine their severity.\n\nAnalyze the following CCTV event data from zone "{{zone}}":\n\nRaw Input: {{{raw_input}}}\n\nBased on the raw input, determine the event_type (accident, fire, crowd, traffic_violation, normal) and the severity (1-10).\n\nConsider these guidelines:\n- If the raw input indicates a fire, set event_type to "fire" and severity to 9.\n- If the raw input indicates an impact or crash, set event_type to "accident" and severity to 8.\n- If the raw input indicates a large gathering of people, set event_type to "crowd" and severity to 6.\n- If the raw input indicates a vehicle crossing a line, set event_type to "traffic_violation" and severity to 4.\n- If none of the above are detected, set event_type to "normal". The severity can be based on your judgement of the situation, between 1 to 3.\n\nReturn the event_type and severity in JSON format.
`,
});

const classifyCCTVEventFlow = ai.defineFlow(
  {
    name: 'classifyCCTVEventFlow',
    inputSchema: ClassifyCCTVEventInputSchema,
    outputSchema: ClassifyCCTVEventOutputSchema,
  },
  async input => {
    const {output} = await classifyCCTVEventPrompt(input);
    return output!;
  }
);
