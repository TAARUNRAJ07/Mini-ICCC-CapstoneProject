'use server';
/**
 * @fileOverview Routes events to appropriate departments based on event type and risk score.
 *
 * - routeEventsToDepartments - A function that routes events to departments.
 * - RouteEventsToDepartmentsInput - The input type for the routeEventsToDepartments function.
 * - RouteEventsToDepartmentsOutput - The return type for the routeEventsToDepartments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RouteEventsToDepartmentsInputSchema = z.object({
  event_type: z.string().describe('The type of event (accident, fire, crowd, traffic_violation, normal).'),
  risk_score: z.number().describe('The risk score associated with the event.'),
});
export type RouteEventsToDepartmentsInput = z.infer<typeof RouteEventsToDepartmentsInputSchema>;

const RouteEventsToDepartmentsOutputSchema = z.object({
  routed_to: z.string().describe('The department to which the event is routed (police, fire, traffic, medical, none).'),
  high_priority: z.boolean().describe('Whether the event is high priority (risk_score > 70).'),
});
export type RouteEventsToDepartmentsOutput = z.infer<typeof RouteEventsToDepartmentsOutputSchema>;

export async function routeEventsToDepartments(input: RouteEventsToDepartmentsInput): Promise<RouteEventsToDepartmentsOutput> {
  return routeEventsToDepartmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'routeEventsToDepartmentsPrompt',
  input: {schema: RouteEventsToDepartmentsInputSchema},
  output: {schema: RouteEventsToDepartmentsOutputSchema},
  prompt: `Based on the event type and risk score, determine the appropriate department to route the event to.\n\nEvent Type: {{{event_type}}}\nRisk Score: {{{risk_score}}}\n\nRules:\n- fire -> fire\n- accident -> police, medical\n- crowd -> police\n- traffic_violation -> traffic\n- normal -> none\n\nIf the risk_score is greater than 70, mark as high_priority.\n\nOutput in JSON format: { \