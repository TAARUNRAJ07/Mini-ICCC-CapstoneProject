'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeviceCard } from "@/components/app/devices/device-card";
import { useAppContext } from "@/context/AppContext";

export default function DevicesPage() {
  const { devices } = useAppContext();
  const centralDevices = devices.filter(d => d.device_type === 'central');
  const microDevices = devices.filter(d => d.device_type === 'micro');

  return (
    <div className="space-y-4">
      <div>
          <h2 className="font-headline text-2xl font-semibold">Devices Management</h2>
          <p className="text-muted-foreground">Monitor and manage all processing devices.</p>
      </div>
      <Tabs defaultValue="central">
        <TabsList className="grid w-full grid-cols-2 sm:w-[400px]">
          <TabsTrigger value="central">Central Devices</TabsTrigger>
          <TabsTrigger value="micro">Micro Devices</TabsTrigger>
        </TabsList>
        <TabsContent value="central">
          <div className="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {centralDevices.map(device => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="micro">
          <div className="grid gap-4 pt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {microDevices.map(device => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
