'use server';

/**
 * @fileOverview Analyzes the risk associated with an event based on its type and severity.
 *
 * - analyzeEventRisk - A function that analyzes the risk of an event.
 * - AnalyzeEventRiskInput - The input type for the analyzeEventRisk function.
 * - AnalyzeEventRiskOutput - The return type for the analyzeEventRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeEventRiskInputSchema = z.object({
  event_type: z.string().describe('The type of the event (e.g., accident, fire, crowd, traffic_violation, normal).'),
  severity: z.number().describe('The severity of the event, on a scale of 1 to 10.'),
});
export type AnalyzeEventRiskInput = z.infer<typeof AnalyzeEventRiskInputSchema>;

const AnalyzeEventRiskOutputSchema = z.object({
  risk_score: z.number().describe('The calculated risk score of the event.'),
});
export type AnalyzeEventRiskOutput = z.infer<typeof AnalyzeEventRiskOutputSchema>;

export async function analyzeEventRisk(input: AnalyzeEventRiskInput): Promise<AnalyzeEventRiskOutput> {
  return analyzeEventRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeEventRiskPrompt',
  input: {schema: AnalyzeEventRiskInputSchema},
  output: {schema: AnalyzeEventRiskOutputSchema},
  prompt: `You are an expert risk assessment agent for an Integrated Command & Control Center (ICCC).

You will receive the event type and severity, and you must calculate the risk score based on the following rules:

- fire: severity * 1.5
- accident: severity * 1.4
- crowd: severity * 1.2
- traffic_violation: severity * 1
- normal: severity * 0.5

Return only the risk score as a number.

Event Type: {{{event_type}}}
Severity: {{{severity}}}`,
});

const analyzeEventRiskFlow = ai.defineFlow(
  {
    name: 'analyzeEventRiskFlow',
    inputSchema: AnalyzeEventRiskInputSchema,
    outputSchema: AnalyzeEventRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
