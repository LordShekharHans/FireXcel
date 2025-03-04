'use client';

import { useState, useEffect, useCallback } from 'react';
import { AdminList } from './AdminList';
import { AssignedInspectors } from './AssignedInspectors';
import { adminApi } from '@/lib/api/admin';

import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export function AdminInspectorManager({ onInspectorAssigned }: { onInspectorAssigned?: () => void }) {
  const [admins, setAdmins] = useState<any>([]);
  const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null);
  const [inspectors, setInspectors] = useState<any>([]);
  const { toast } = useToast();



  const fetchAdmins = useCallback(async () => {
    try {
      const data = await adminApi.getAllAdmins();
      setAdmins(data);
      if (data.length > 0) {
        setSelectedAdminId(data[0].adminId);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch admins",
        variant: "destructive",
      });
    }
  }, [toast]);
  
  const fetchInspectors = useCallback(async (adminId: number) => {
    try {
      const data = await adminApi.getInspectorsForAdmin(adminId);
      setInspectors(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch inspectors",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  useEffect(() => {
    if (selectedAdminId) {
      fetchInspectors(selectedAdminId);
    }
  }, [selectedAdminId, fetchInspectors]);


  const handleUnassignInspector = async (inspectorId: number) => {
    try {
      await adminApi.unassignInspector(inspectorId);
      if (selectedAdminId) {
        await fetchInspectors(selectedAdminId);
      }
      if (onInspectorAssigned) {
        onInspectorAssigned();
      }
      toast({
        title: "Success",
        description: "Inspector unassigned successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unassign inspector",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <AdminList
        admins={admins}
        selectedAdminId={selectedAdminId}
        onSelectAdmin={setSelectedAdminId}
      />
      <AssignedInspectors
        inspectors={inspectors}
        onUnassign={handleUnassignInspector}
      />
    </div>
  );
}