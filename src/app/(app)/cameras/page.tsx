'use client';

import * as React from 'react';
import { columns } from "@/components/app/cameras/columns";
import { DataTable } from "@/components/app/data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Camera } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/context/AppContext';

export default function CamerasPage() {
  const { cameras, devices, addCamera, updateCamera, deleteCamera } = useAppContext();
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const { toast } = useToast();

  const handleAddCamera = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const id = formData.get('id') as string;
    const location = formData.get('location') as string;
    const zone = formData.get('zone') as string;

    if (!id || !location || !zone) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please fill out all camera details.',
      });
      return;
    }

    const newCamera: Camera = {
      id,
      location,
      zone,
      type: 'street-device', // default value
      status: 'offline', // default value
      assigned_device_id: 'N/A', // default value
      created_at: new Date(),
    };

    addCamera(newCamera);
    setIsAddDialogOpen(false);
    toast({
      title: "Camera Added",
      description: `Camera ${id} has been successfully added.`,
    });
  };
  
  const handleEditCamera = (updatedCamera: Camera) => {
    updateCamera(updatedCamera);
    toast({
      title: "Camera Updated",
      description: `Camera ${updatedCamera.id} has been successfully updated.`,
    });
  };

  const handleDeleteCamera = (cameraId: string) => {
    deleteCamera(cameraId);
    toast({
      variant: 'destructive',
      title: "Camera Deleted",
      description: `Camera ${cameraId} has been deleted.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="font-headline text-2xl font-semibold">Cameras Management</h2>
            <p className="text-muted-foreground">Add, edit, and manage all CCTV cameras.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Camera
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddCamera}>
              <DialogHeader>
                <DialogTitle>Add New Camera</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new camera to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="id" className="text-right">
                    Camera ID
                  </Label>
                  <Input id="id" name="id" placeholder="e.g. CAM-006" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" name="location" placeholder="e.g. Birch St & 6th Ave" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="zone" className="text-right">
                    Zone
                  </Label>
                  <Input id="zone" name="zone" placeholder="e.g. Industrial" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save camera</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable 
        columns={columns({ onEdit: handleEditCamera, onDelete: handleDeleteCamera, devices })} 
        data={cameras}
        filterColumn="location"
        filterPlaceholder="Filter by location..."
      />
    </div>
  )
}
