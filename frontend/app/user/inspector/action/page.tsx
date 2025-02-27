'use client';

import { fetchInspectorInspections } from "@/lib/api/inspector";
import { Inspection } from "@/types/inspection";
import { useEffect, useState } from "react";

import { LoadingState } from "./components/LoadingState";
import { Card } from "@/components/ui/card";
import { ActionHeader } from "./components/ActionHeaders";
import { InspectionTable } from "./components/InspectionTable";

const Page = () => {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInspections = async () => {
      try {
        const data = await fetchInspectorInspections();
        setInspections(data);
      } catch (error) {
        console.error("Failed to fetch inspections:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInspections();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      <ActionHeader inspections={inspections} />
      
      <Card className="p-6">
        <InspectionTable inspections={inspections} />
      </Card>
    </div>
  );
};

export default Page;