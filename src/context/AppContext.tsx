
'use client';

import * as React from 'react';
import type { Camera, Device, Event } from '@/lib/types';
import { initialCameras, initialDevices, initialEvents } from '@/lib/data';

interface AppContextType {
  cameras: Camera[];
  devices: Device[];
  events: Event[];
  addCamera: (camera: Camera) => void;
  updateCamera: (camera: Camera) => void;
  deleteCamera: (cameraId: string) => void;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cameras, setCameras] = React.useState<Camera[]>(initialCameras);
  const [devices, setDevices] = React.useState<Device[]>(initialDevices);
  const [events, setEvents] = React.useState<Event[]>(initialEvents);

  const addCamera = (camera: Camera) => {
    setCameras(prev => [...prev, camera]);
  };

  const updateCamera = (updatedCamera: Camera) => {
    setCameras(prev => prev.map(camera => camera.id === updatedCamera.id ? updatedCamera : camera));
  };

  const deleteCamera = (cameraId: string) => {
    setCameras(prev => prev.filter(camera => camera.id !== cameraId));
  };

  const value = {
    cameras,
    devices,
    events,
    addCamera,
    updateCamera,
    deleteCamera,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
