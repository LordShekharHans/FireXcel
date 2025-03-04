"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";
import { StatsCard } from "@/components/dashboard/StatsCard";

import { Inspection } from "@/types/inspection";
import { fetchInspectorInspections } from "@/lib/api/inspector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ClipboardCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import dynamic from "next/dynamic";


const InspectionGantt = dynamic(() => import("@/components/inspector/InspectionGantt") as unknown as Promise<{ default: React.ComponentType<any> }>, { ssr: false });

const InspectionTimeline = dynamic(() => import("@/components/inspector/timeline/InspectionTimeline")as unknown as Promise<{ default: React.ComponentType<any> }>, { ssr: false });

const InspectionStats = dynamic(() => import("@/components/inspector/stats/InspectionStats")as unknown as Promise<{ default: React.ComponentType<any> }>, { ssr: false });


export default function InspectorDashboard() {
  const { user } = useAuthStore();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);


  useEffect(() => {
    setIsClient(true);
    if (!user || user.role !== "INSPECTOR") {
      redirect("/auth/sign-in");
    }

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
  }, [user]);

  if (!isClient) {
    return null; // Prevents SSR-related errors
  }

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }


  const stats = {
    total: inspections.length,
    completed: inspections.filter((i) => i.result === "INSPECTION COMPLETED")
      .length,
    applied: inspections.filter((i) => i.result === "FSC APPLIED").length,
    rejected: inspections.filter((i) => i.result === "FSC REJECTED").length,
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Inspector Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Inspections"
          value={stats.total}
          description="All assigned inspections"
          icon={<ClipboardCheck className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          description="Inspections completed"
          icon={<CheckCircle className="h-4 w-4 text-green-500" />}
        />
        <StatsCard
          title="FSC Applied"
          value={stats.applied}
          description="Fire safety certificates issued"
          icon={<AlertTriangle className="h-4 w-4 text-yellow-500" />}
        />
        <StatsCard
          title="Rejected"
          value={stats.rejected}
          description="Applications rejected"
          icon={<XCircle className="h-4 w-4 text-red-500" />}
        />
      </div>

      <InspectionStats inspections={inspections} />

      <Tabs defaultValue="gantt" className="space-y-4">
        <TabsList>
          <TabsTrigger value="gantt">Schedule View</TabsTrigger>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
        </TabsList>

        <TabsContent value="gantt">
          <InspectionGantt inspections={inspections} />
        </TabsContent>

        <TabsContent value="timeline">
          <InspectionTimeline inspections={inspections} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
