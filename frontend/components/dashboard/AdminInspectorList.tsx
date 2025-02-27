'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserMinus } from 'lucide-react';

interface Inspector {
  inspectorId: number;
  userId: number;
  region: string;
  assignedAdminId: number | null;
  createdAt: string;
  updatedAt: string;
}

interface AdminInspectorListProps {
  inspectors: Inspector[];
  onUnassign: (inspectorId: number) => void;
}

export function AdminInspectorList({ inspectors, onUnassign }: AdminInspectorListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Assigned Inspectors</h3>
        <Badge variant="secondary">{inspectors.length} Inspectors</Badge>
      </div>
      
      <ScrollArea className="h-[400px] rounded-md border p-4">
        <div className="space-y-4">
          {inspectors.map((inspector) => (
            <div
              key={inspector.inspectorId}
              className="flex items-center justify-between p-2 rounded-lg border bg-card"
            >
              <div>
                <h4 className="font-medium">Inspector #{inspector.inspectorId}</h4>
                <p className="text-sm text-muted-foreground">Region: {inspector.region}</p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onUnassign(inspector.inspectorId)}
              >
                <UserMinus className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
          
          {inspectors.length === 0 && (
            <p className="text-center text-muted-foreground">No inspectors assigned</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}