'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { user } from '@/lib/data';

export default function ProfilePage() {
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

  return (
    <div className="space-y-4">
        <div>
            <h2 className="font-headline text-2xl font-semibold">User Profile</h2>
            <p className="text-muted-foreground">View and manage your profile details.</p>
        </div>
      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.department}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email} readOnly />
            </div>
            <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value={user.role} readOnly className="capitalize"/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="memberSince">Member Since</Label>
                <Input id="memberSince" value={user.created_at.toLocaleDateString()} readOnly />
            </div>
            <div className="pt-4">
                 <Button disabled>Update Profile</Button>
                 <p className="text-xs text-muted-foreground mt-2">Profile editing is not yet available.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
