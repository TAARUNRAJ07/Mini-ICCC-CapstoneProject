import type { Device } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { HardDrive, CheckCircle2, XCircle, Camera, Clock } from "lucide-react";

export function DeviceCard({ device }: { device: Device }) {
  const isOnline = device.status === 'active';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-primary" />
            <span className="font-mono">{device.id}</span>
          </div>
          <Badge variant={isOnline ? "default" : "destructive"} className={cn(isOnline ? "bg-green-500/80 border-green-500" : "bg-red-500/80 border-red-500", "capitalize text-white")}>
            {isOnline ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
            {device.status}
          </Badge>
        </CardTitle>
        <CardDescription>
          {device.device_type === 'central' ? 'Central Mainframe' : 'Micro Plug Device'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
         <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Capacity</span>
            <span className="font-semibold">{device.capacity} units</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-1"><Camera className="h-4 w-4"/> Cameras</span>
            <span className="font-semibold">{device.cameras_connected.length}</span>
        </div>
         <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-4 w-4"/> Last Sync</span>
            <span className="font-semibold">{formatDistanceToNow(device.last_sync, { addSuffix: true })}</span>
        </div>
      </CardContent>
    </Card>
  );
}
