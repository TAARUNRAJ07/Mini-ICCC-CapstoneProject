"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { Event } from "@/lib/types"
import { EventBadge } from "@/components/app/event-badge"
import { format, formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowUpDown, Eye, AlertTriangle, Route, Activity, Thermometer, Users, TrafficCone, Shield, Clock, Camera } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const getSeverityColor = (severity: number) => {
  if (severity > 7) return "text-red-500 font-bold";
  if (severity > 4) return "text-orange-500 font-bold";
  return "text-green-600";
};

const getRiskColor = (score: number | null) => {
  if (score === null) return "text-muted-foreground";
  if (score > 70) return "text-red-500";
  if (score > 40) return "text-orange-500";
  return "text-green-600";
};

const agentStatusColors: Record<Event['agent_status'], string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

export const columns: ColumnDef<Event>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "event_type",
    header: "Event Type",
    cell: ({ row }) => <EventBadge type={row.getValue("event_type")} />,
  },
  {
    accessorKey: "severity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Severity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className={`pl-4 text-center font-semibold ${getSeverityColor(row.getValue("severity"))}`}>{row.getValue("severity")}</div>,
  },
  {
    accessorKey: "risk_score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Risk Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="pl-4 text-center font-medium">{row.getValue("risk_score")?.toFixed(1) ?? 'N/A'}</div>
  },
  {
    accessorKey: "zone",
    header: "Zone",
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("zone")}</Badge>,
  },
  {
    accessorKey: "camera_id",
    header: "Camera ID",
    cell: ({ row }) => <div className="font-mono">{row.getValue("camera_id")}</div>,
  },
  {
    accessorKey: "routed_to",
    header: "Routed To",
    cell: ({ row }) => <div className="capitalize">{row.getValue("routed_to")}</div>,
  },
  {
    accessorKey: "timestamp",
    header: "Time",
    cell: ({ row }) => formatDistanceToNow(row.getValue("timestamp"), { addSuffix: true }),
  },
  {
    id: "details",
    cell: ({ row }) => {
      const event = row.original
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-headline text-xl">Event Details: {event.id}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                          <p className="font-medium">Timestamp</p>
                          <p className="text-muted-foreground">{format(event.timestamp, "PPP p")}</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-muted-foreground" />
                      <div>
                          <p className="font-medium">Source</p>
                          <p className="text-muted-foreground font-mono">{event.camera_id} ({event.zone} Zone)</p>
                      </div>
                  </div>
                   <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                          <p className="font-medium">Agent Status</p>
                          <Badge variant="outline" className={agentStatusColors[event.agent_status]}>
                            {event.agent_status}
                          </Badge>
                      </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                      <Route className="h-4 w-4 text-muted-foreground" />
                      <div>
                          <p className="font-medium">Department Routing</p>
                          <p className="text-muted-foreground capitalize">{event.routed_to}</p>
                      </div>
                  </div>
                   <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <div>
                          <p className="font-medium">Priority</p>
                          <p className={`font-semibold ${event.high_priority ? 'text-red-500' : 'text-green-600'}`}>
                            {event.high_priority ? 'High' : 'Normal'}
                          </p>
                      </div>
                  </div>
                </div>
            </div>
            
            <Separator className="my-2"/>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="font-medium">Event Type</p>
                        <EventBadge type={event.event_type} />
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="font-medium">Severity</p>
                        <p className={`font-bold text-lg ${getSeverityColor(event.severity)}`}>
                            {event.severity}/10
                        </p>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <TrafficCone className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="font-medium">Risk Score</p>
                        <p className={`font-bold text-lg ${getRiskColor(event.risk_score)}`}>
                            {event.risk_score?.toFixed(1) ?? 'N/A'}
                        </p>
                    </div>
                </div>
            </div>

            <Card className="mt-4">
              <CardHeader className="p-4">
                  <CardTitle className="text-base">Raw Camera Input</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                  <pre className="w-full overflow-y-auto rounded-md bg-muted p-3 text-xs">
                      <code>{JSON.stringify(event.raw_input, null, 2)}</code>
                  </pre>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      )
    }
  },
]
