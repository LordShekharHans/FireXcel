'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserMinus } from "lucide-react";
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Inspector {
  inspectorId: number;
  region: string;
  createdAt: string;
}

interface AssignedInspectorsProps {
  inspectors: Inspector[];
  onUnassign: (inspectorId: number) => void;
}

export function AssignedInspectors({ inspectors, onUnassign }: AssignedInspectorsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Assigned Inspectors</CardTitle>
        <Badge variant="secondary">{inspectors.length} Total</Badge>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
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
                    Assigned on {format(new Date(inspector.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <UserMinus className="h-4 w-4 text-red-500" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Unassign Inspector</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to unassign Inspector #{inspector.inspectorId}? 
                        This action can be reversed later.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onUnassign(inspector.inspectorId)}
                      >
                        Unassign
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}

            {inspectors.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No inspectors assigned to this admin
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}