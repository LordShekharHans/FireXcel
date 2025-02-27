'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Admin } from "@/types/admin";
import { format } from "date-fns";

interface AdminListProps {
  admins: Admin[];
  selectedAdminId: number | null;
  onSelectAdmin: (adminId: number) => void;
}

export function AdminList({ admins, selectedAdminId, onSelectAdmin }: AdminListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Admins</CardTitle>
        <Badge variant="secondary">{admins.length} Total</Badge>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {admins.map((admin) => (
              <Button
                key={admin.adminId}
                variant={selectedAdminId === admin.adminId ? "secondary" : "outline"}
                className="w-full justify-start"
                onClick={() => onSelectAdmin(admin.adminId)}
              >
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">Admin #{admin.adminId}</span>
                    <Badge>{admin.region}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Since {format(new Date(admin.createdAt), 'MMM dd, yyyy')}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}