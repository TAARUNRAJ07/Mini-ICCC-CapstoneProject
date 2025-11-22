'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera, Video, VideoOff } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

type ZoneStats = {
  total: number;
  active: number;
  inactive: number;
};

export function ZoneOverview() {
  const { cameras } = useAppContext();
  const zoneStats = cameras.reduce<Record<string, ZoneStats>>((acc, camera) => {
    if (!acc[camera.zone]) {
      acc[camera.zone] = { total: 0, active: 0, inactive: 0 };
    }
    acc[camera.zone].total++;
    if (camera.status === 'online') {
      acc[camera.zone].active++;
    } else {
      acc[camera.zone].inactive++;
    }
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Zone Overview</CardTitle>
        <CardDescription>
          Summary of camera status across all city zones.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(zoneStats).map(([zone, stats]) => (
          <Card key={zone} className="bg-muted/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary"/>
                {zone}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="font-bold text-foreground text-lg">{stats.total}</span>
                    <span>Total Cameras</span>
                </div>
                <div className="flex flex-col items-end text-xs gap-1">
                    <div className="flex items-center gap-1.5 text-green-600">
                        <Video className="h-3 w-3"/>
                        <span className="font-semibold">{stats.active} Active</span>
                    </div>
                     <div className="flex items-center gap-1.5 text-red-600">
                        <VideoOff className="h-3 w-3"/>
                        <span className="font-semibold">{stats.inactive} Inactive</span>
                    </div>
                </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
