import type { Camera, Device, Event, User } from './types';

export const user: User = {
  uid: 'user1',
  email: 'admin@iccc.gov',
  name: 'Admin User',
  role: 'admin',
  department: 'System Administration',
  created_at: new Date(),
  avatar: 'https://picsum.photos/seed/avatar1/100/100'
};

export const initialCameras: Camera[] = [
  { id: 'CAM-001', location: 'Main St & 1st Ave', zone: 'Downtown', type: 'central-network', status: 'online', assigned_device_id: 'DEV-C01', created_at: new Date('2023-10-01T10:00:00Z') },
  { id: 'CAM-002', location: 'Oak St & 2nd Ave', zone: 'Uptown', type: 'street-device', status: 'online', assigned_device_id: 'DEV-M01', created_at: new Date('2023-10-01T10:05:00Z') },
  { id: 'CAM-003', location: 'Pine St & 3rd Ave', zone: 'Midtown', type: 'street-device', status: 'offline', assigned_device_id: 'DEV-M02', created_at: new Date('2023-10-01T10:10:00Z') },
  { id: 'CAM-004', location: 'Maple St & 4th Ave', zone: 'Downtown', type: 'central-network', status: 'online', assigned_device_id: 'DEV-C01', created_at: new Date('2023-10-02T11:00:00Z') },
  { id: 'CAM-005', location: 'Elm St & 5th Ave', zone: 'Suburb', type: 'street-device', status: 'online', assigned_device_id: 'DEV-M03', created_at: new Date('2023-10-02T11:05:00Z') },
];

export const initialDevices: Device[] = [
  { id: 'DEV-C01', device_type: 'central', capacity: 100, status: 'active', cameras_connected: ['CAM-001', 'CAM-004'], last_sync: new Date() },
  { id: 'DEV-M01', device_type: 'micro', capacity: 10, status: 'active', cameras_connected: ['CAM-002'], last_sync: new Date(Date.now() - 2 * 60 * 1000) },
  { id: 'DEV-M02', device_type: 'micro', capacity: 10, status: 'inactive', cameras_connected: ['CAM-003'], last_sync: new Date('2023-10-01T12:00:00Z') },
  { id: 'DEV-M03', device_type: 'micro', capacity: 10, status: 'active', cameras_connected: ['CAM-005'], last_sync: new Date(Date.now() - 5 * 60 * 1000) },
];

export const initialEvents: Event[] = [
  { id: 'EVT-001', camera_id: 'CAM-001', zone: 'Downtown', raw_input: { "detection": "fire", "confidence": 0.95 }, event_type: 'fire', severity: 9, risk_score: 13.5, routed_to: 'fire, police, medical', agent_status: 'completed', timestamp: new Date(Date.now() - 2 * 60 * 1000), high_priority: true },
  { id: 'EVT-002', camera_id: 'CAM-002', zone: 'Uptown', raw_input: { "detection": "crash", "vehicles": 2 }, event_type: 'accident', severity: 8, risk_score: 11.2, routed_to: 'police, medical', agent_status: 'completed', timestamp: new Date(Date.now() - 5 * 60 * 1000), high_priority: false },
  { id: 'EVT-003', camera_id: 'CAM-005', zone: 'Suburb', raw_input: { "people_count": 150 }, event_type: 'crowd', severity: 6, risk_score: 7.2, routed_to: 'police', agent_status: 'completed', timestamp: new Date(Date.now() - 10 * 60 * 1000), high_priority: false },
  { id: 'EVT-004', camera_id: 'CAM-004', zone: 'Downtown', raw_input: { "vehicle_id": "V123", "action": "red_light_cross" }, event_type: 'traffic_violation', severity: 4, risk_score: 4, routed_to: 'traffic', agent_status: 'completed', timestamp: new Date(Date.now() - 15 * 60 * 1000), high_priority: false },
  { id: 'EVT-005', camera_id: 'CAM-001', zone: 'Downtown', raw_input: { "status": "normal_flow" }, event_type: 'normal', severity: 1, risk_score: 0.5, routed_to: 'none', agent_status: 'completed', timestamp: new Date(Date.now() - 25 * 60 * 1000), high_priority: false },
  { id: 'EVT-006', camera_id: 'CAM-003', zone: 'Midtown', raw_input: { "detection": "unauthorized_entry" }, event_type: 'normal', severity: 3, risk_score: null, routed_to: 'none', agent_status: 'pending', timestamp: new Date(Date.now() - 30 * 60 * 1000), high_priority: false },
];
