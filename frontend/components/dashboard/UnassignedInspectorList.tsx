'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inspector } from "@/types/admin";
import { UserPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { format } from "date-fns";

interface UnassignedInspectorListProps {
  inspectors: Inspector[];
  onAssign: (inspectorId: number, adminId: number) => void;
}

export function UnassignedInspectorList({ inspectors, onAssign }: UnassignedInspectorListProps) {
  const [selectedAdminId, setSelectedAdminId] = useState<string>("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Unassigned Inspectors</h3>
        <Badge variant="secondary">{inspectors.length} Total</Badge>
      </div>

      <div className="w-full max-w-xs">
        <Select value={selectedAdminId} onValueChange={setSelectedAdminId}>
          <SelectTrigger>
            <SelectValue placeholder="Select admin to assign" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Admin 1</SelectItem>
            <SelectItem value="2">Admin 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[400px] rounded-md border">
        <div className="p-4 space-y-4">
          {inspectors.map((inspector) => (
            <div
              key={inspector.inspectorId}
              className="flex items-center justify-between p-4 rounded-lg border bg-card"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Inspector #{inspector.inspectorId}</span>
                  <Badge>{inspector.region}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Created {format(new Date(inspector.createdAt), 'MMM dd, yyyy')}
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => selectedAdminId && onAssign(inspector.inspectorId, parseInt(selectedAdminId))}
                disabled={!selectedAdminId}
              >
                <UserPlus className="h-4 w-4 text-green-500" />
              </Button>
            </div>
          ))}

          {inspectors.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No unassigned inspectors available
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}