"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import type { Camera, Device } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ColumnsProps = {
  onEdit: (camera: Camera) => void;
  onDelete: (cameraId: string) => void;
  devices: Device[];
}

const EditCameraDialog = ({ camera, onSave, onOpenChange, open, devices }: { camera: Camera, onSave: (camera: Camera) => void, open: boolean, onOpenChange: (open: boolean) => void, devices: Device[] }) => {
  const [editedCamera, setEditedCamera] = React.useState<Camera>(camera);

  React.useEffect(() => {
    setEditedCamera(camera);
  }, [camera]);

  const handleSave = () => {
    onSave(editedCamera);
    onOpenChange(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCamera(prev => ({ ...prev, [name]: value }));
  }

  const handleSelectChange = (name: keyof Camera) => (value: string) => {
    setEditedCamera(prev => ({ ...prev, [name]: value }));
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Camera</DialogTitle>
          <DialogDescription>
            Update the details for camera {camera.id}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input id="location" name="location" value={editedCamera.location} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="zone" className="text-right">
              Zone
            </Label>
            <Input id="zone" name="zone" value={editedCamera.zone} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={editedCamera.status} onValueChange={handleSelectChange('status')}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="assigned_device_id" className="text-right">
              Device
            </Label>
            <Select value={editedCamera.assigned_device_id} onValueChange={handleSelectChange('assigned_device_id')}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a device" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="N/A">N/A</SelectItem>
                {devices.map(device => (
                  <SelectItem key={device.id} value={device.id}>{device.id} ({device.device_type})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export const columns = ({ onEdit, onDelete, devices }: ColumnsProps): ColumnDef<Camera>[] => [
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
    accessorKey: "id",
    header: "Camera ID",
    cell: ({ row }) => <div className="font-mono">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "zone",
    header: "Zone",
    cell: ({ row }) => <Badge variant="secondary">{row.getValue("zone")}</Badge>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")?.toString().replace('-', ' ')}</div>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant="outline" className={cn(
            "capitalize",
            status === 'online' ? 'text-green-600 border-green-300' : 'text-red-600 border-red-300'
        )}>
           <span className={cn("mr-2 h-2 w-2 rounded-full", status === 'online' ? 'bg-green-500' : 'bg-red-500' )}></span>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "assigned_device_id",
    header: "Assigned Device",
    cell: ({ row }) => <div className="font-mono">{row.getValue("assigned_device_id")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const camera = row.original
      const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(camera.id)}
              >
                Copy camera ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4"/>
                  Edit Camera
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-500 focus:text-red-500"
                onClick={() => onDelete(camera.id)}
              >
                  <Trash2 className="mr-2 h-4 w-4"/>
                  Delete Camera
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditCameraDialog 
            camera={camera} 
            onSave={onEdit}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            devices={devices}
          />
        </>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]
