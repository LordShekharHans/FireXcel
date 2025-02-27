'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminInspectorManager } from "./AdminInspectorManager";
import { UnassignedInspectorList } from "./UnassignedInspectorList";
import { adminApi } from '@/lib/api/admin';
import { Inspector } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

export function AdminManagement() {
  const [unassignedInspectors, setUnassignedInspectors] = useState<Inspector[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchUnassignedInspectors();
  }, []);

  const fetchUnassignedInspectors = async () => {
    try {
      const data = await adminApi.getUnassignedInspectors();
      setUnassignedInspectors(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch unassigned inspectors",
        variant: "destructive",
      });
    }
  };

  const handleAssignInspector = async (inspectorId: number, adminId: number) => {
    try {
      await adminApi.assignInspector(inspectorId, adminId);
      await fetchUnassignedInspectors();
      toast({
        title: "Success",
        description: "Inspector assigned successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign inspector",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin & Inspector Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="admins" className="space-y-4">
          <TabsList>
            <TabsTrigger value="admins">Admins & Assigned Inspectors</TabsTrigger>
            <TabsTrigger value="unassigned">Unassigned Inspectors</TabsTrigger>
          </TabsList>

          <TabsContent value="admins">
            <AdminInspectorManager onInspectorAssigned={fetchUnassignedInspectors} />
          </TabsContent>

          <TabsContent value="unassigned">
            <UnassignedInspectorList 
              inspectors={unassignedInspectors}
              onAssign={handleAssignInspector}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}