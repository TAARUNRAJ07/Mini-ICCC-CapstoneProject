# **App Name**: ICCC Mini

## Core Features:

- Firebase Authentication: Secure user access using Firebase Authentication with email and password.
- Real-time Event Processing: Process real-time CCTV events using Firebase Cloud Functions.
- Multi-Agent Pipeline: Run a sequential multi-agent pipeline to classify events, assess risk, and route to appropriate departments.
- Agent 1 - VisionClassifierAgent: Use incoming event metadata to determine 'event_type' (accident, fire, crowd, traffic_violation, normal) and severity based on fire, crash or number of people or vehicle line crossing, or 'normal' if no event
- Agent 2 - RiskAnalyzerAgent: Compute risk score based on event type and severity using pre-defined weighting rules; weights accidents highest.
- Agent 3 - RoutingAgent: Based on risk scores, this agent routes a particular event to a corresponding department for review.
- Agent 4 - NotificationAgent: The final agent triggers when routed_to is set to send out event FCM notifications.
- Real-time Alerts: Utilize Firestore listeners and FCM to deliver real-time notifications to relevant departments.
- Admin Dashboard: Provide a user interface to monitor live events, top stats (active cameras, devices, events, alerts), and manage cameras/devices.

## Style Guidelines:

- Primary color: Strong blue (#2962FF) evoking trust and authority, complementing the system's critical nature.
- Background color: Light gray (#F0F4F7), providing a clean and professional backdrop.
- Accent color: A vivid orange (#FF9100), adding an energetic counterpoint and visual cue for important interactive elements.
- Headline font: 'Space Grotesk', a sans-serif, for a computerized, techy, scientific feel. Body text font: 'Inter' for body
- Use clear, standard icons for events, cameras, and devices, ensuring quick recognition.
- Maintain a consistent grid-based layout for the dashboard to present data in an organized and easily digestible format.
- Incorporate subtle animations to provide feedback on actions and guide the user through the interface.