'use client';

import { StatCard } from "@/components/app/dashboard/stat-card";
import { RecentEvents } from "@/components/app/dashboard/recent-events";
import { ZoneOverview } from "@/components/app/dashboard/zone-overview";
import { AlertTriangle, Camera, HardDrive, ListChecks } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function DashboardPage() {
  const { cameras, devices, events } = useAppContext();
  
  const activeCameras = cameras.filter((c) => c.status === 'online').length;
  const activeDevices = devices.filter((d) => d.status === 'active').length;
  const todayEvents = events.filter((e) => new Date(e.timestamp).toDateString() === new Date().toDateString()).length;
  const highRiskAlerts = events.filter((e) => e.high_priority).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Cameras" value={String(activeCameras)} icon={<Camera className="h-5 w-5" />} />
        <StatCard title="Active Devices" value={String(activeDevices)} icon={<HardDrive className="h-5 w-5" />} />
        <StatCard title="Today's Events" value={String(todayEvents)} icon={<ListChecks className="h-5 w-5" />} />
        <StatCard title="High-Risk Alerts" value={String(highRiskAlerts)} icon={<AlertTriangle className="h-5 w-5" />} />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentEvents />
        <ZoneOverview />
      </div>
    </div>
  );
}
