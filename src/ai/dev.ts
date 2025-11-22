import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-event-risk.ts';
import '@/ai/flows/classify-cctv-event.ts';
import '@/ai/flows/route-events-to-departments.ts';