'use client';

import { columns } from "@/components/app/events/columns";
import { DataTable } from "@/components/app/data-table";
import { useAppContext } from "@/context/AppContext";

export default function EventsPage() {
  const { events } = useAppContext();
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-headline text-2xl font-semibold">Events Log</h2>
        <p className="text-muted-foreground">Browse and filter all system-detected events.</p>
      </div>
      <DataTable 
        columns={columns} 
        data={events}
        filterColumn="zone"
        filterPlaceholder="Filter by zone..."
      />
    </div>
  )
}
