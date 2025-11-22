'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventBadge } from "@/components/app/event-badge";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useAppContext } from "@/context/AppContext";

const getSeverityColor = (severity: number) => {
  if (severity > 7) return "text-red-500 font-bold";
  if (severity > 4) return "text-yellow-600 font-bold";
  return "text-green-600";
};

export function RecentEvents() {
  const { events } = useAppContext();
  const recentEvents = events.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Live Event Feed</CardTitle>
        <CardDescription>
          Real-time incidents detected by the ICCC system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead className="text-center">Severity</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <EventBadge type={event.event_type} />
                </TableCell>
                <TableCell className={`text-center ${getSeverityColor(event.severity)}`}>
                  {event.severity}
                </TableCell>
                <TableCell>{event.zone}</TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <Badge variant={event.agent_status === 'completed' ? 'default' : 'secondary'} className="capitalize bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {event.agent_status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
