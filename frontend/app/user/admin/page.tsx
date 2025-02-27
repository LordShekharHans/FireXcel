'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { redirect } from 'next/navigation';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';
import axios from 'axios';
import { 
  ClipboardList, 
  CheckCircle2, 
  XCircle,
  Clock,
  Activity,
  Building2,
  Users,
  AlertTriangle,
  Timer,
  CheckCheck,
  Loader2
} from 'lucide-react';

interface Inspection {
  inspectionId: number;
  inspectorId: number;
  applicationId: number;
  inspectionDate: string;
  result: string;
  comments: string | null;
  applicationStatusId: number;
  priority: string;
}

interface Renewal {
  applicationRenewalId: number;
  applicationId: number;
  nocId: number;
  kForm: string;
  jForm: string;
  createdAt: string;
  updatedAt: string;
}

interface FreeInspector {
  inspectorId: number;
  userId: number;
  region: string;
}

interface FreeInspectorData {
  [key: string]: FreeInspector[];
}

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [renewals, setRenewals] = useState<Renewal[]>([]);
  const [freeInspectors, setFreeInspectors] = useState<FreeInspectorData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      redirect('/auth/sign-in');
    }

    const fetchData = async () => {
      try {
        const [inspectionsRes, renewalsRes, freeInspectorsRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/inspections`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/application-renewals`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/inspectors/free`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
          })
        ]);

        setInspections(inspectionsRes.data);
        setRenewals(renewalsRes.data);
        setFreeInspectors(freeInspectorsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  const stats = {
    totalInspections: inspections.length,
    completed: inspections.filter(i => i.result === 'INSPECTION COMPLETED').length,
    pending: inspections.filter(i => i.result === 'FSC APPLIED').length,
    renewals: renewals.length,
    freeInspectors: Object.values(freeInspectors).reduce((acc, curr) => acc + curr.length, 0)
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last updated:</span>
          <span className="text-sm font-medium">{format(new Date(), 'MMM dd, yyyy HH:mm')}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Inspections"
          value={stats.totalInspections}
          description="All assigned inspections"
          icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Completed Inspections"
          value={stats.completed}
          description="Successfully completed"
          icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
        />
        <StatsCard
          title="Pending Inspections"
          value={stats.pending}
          description="Awaiting inspection"
          icon={<Clock className="h-4 w-4 text-yellow-500" />}
        />
        <StatsCard
          title="Active Renewals"
          value={stats.renewals}
          description="Current renewal applications"
          icon={<Activity className="h-4 w-4 text-blue-500" />}
        />
      </div>

      <Tabs defaultValue="inspections" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="renewals">Renewals</TabsTrigger>
          <TabsTrigger value="free-inspectors">Available Inspectors</TabsTrigger>
        </TabsList>

        <TabsContent value="inspections">
          <Card>
            <CardHeader>
              <CardTitle>Recent Inspections</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {inspections.map((inspection) => (
                    <div key={inspection.inspectionId} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Application #{inspection.applicationId}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(inspection.inspectionDate), 'MMM dd, yyyy')}
                        </p>
                        {inspection.comments && (
                          <p className="text-sm text-muted-foreground mt-1">{inspection.comments}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={inspection.result === 'INSPECTION COMPLETED' ? 'default' : 'secondary'}>
                          {inspection.result}
                        </Badge>
                        <Badge variant="outline">{inspection.priority}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="renewals">
          <Card>
            <CardHeader>
              <CardTitle>Active Renewals</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {renewals.map((renewal) => (
                    <div key={renewal.applicationRenewalId} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Application #{renewal.applicationId}</p>
                        <p className="text-sm text-muted-foreground">
                          NOC ID: {renewal.nocId}
                        </p>
                        <div className="flex gap-4 mt-1">
                          <p className="text-sm">K-Form: {renewal.kForm}</p>
                          <p className="text-sm">J-Form: {renewal.jForm}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Created: {format(new Date(renewal.createdAt), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="free-inspectors">
          <Card>
            <CardHeader>
              <CardTitle>Available Inspectors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(freeInspectors).map(([day, inspectors]) => (
                  <Card key={day}>
                    <CardHeader>
                      <CardTitle className="text-lg">Day {day.replace('day', '')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-4">
                          {inspectors.map((inspector) => (
                            <div key={inspector.inspectorId} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">Inspector #{inspector.inspectorId}</p>
                                <p className="text-sm text-muted-foreground">User ID: {inspector.userId}</p>
                              </div>
                              <Badge>{inspector.region}</Badge>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}