
export type Camera = {
  id: string;
  location: string;
  zone: string;
  type: 'central-network' | 'street-device';
  status: 'online' | 'offline';
  assigned_device_id: string;
  created_at: Date;
};

export type Device = {
  id: string;
  device_type: 'central' | 'micro';
  capacity: number;
  status: 'active' | 'inactive';
  cameras_connected: string[];
  last_sync: Date;
};

export type Event = {
  id: string;
  camera_id: string;
  zone: string;
  raw_input: Record<string, any>;
  event_type: 'accident' | 'fire' | 'crowd' | 'traffic_violation' | 'normal';
  severity: number;
  risk_score: number | null;
  routed_to: 'police' | 'fire' | 'traffic' | 'medical' | 'none' | string;
  agent_status: 'pending' | 'processing' | 'completed';
  timestamp: Date;
  high_priority: boolean;
};

export type User = {
  uid: string;
  email: string;
  role: 'admin' | 'police' | 'fire' | 'traffic' | 'medical';
  department: string;
  created_at: Date;
  avatar: string;
  name: string;
};
