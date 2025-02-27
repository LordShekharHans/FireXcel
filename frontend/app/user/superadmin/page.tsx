'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { redirect } from 'next/navigation';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ApplicationChart } from '@/components/dashboard/ApplicationChart';
import { RecentApplications } from '@/components/dashboard/RecentApplications';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { RegionDistribution } from '@/components/dashboard/RegionDistribution';
import { ProcessTimeChart } from '@/components/dashboard/ProcessTimeChart';
import { InspectionStatusChart } from '@/components/dashboard/InspectionStatusChart';
import { AdminManagement } from '@/components/dashboard/AdminManagement';
import { Application } from '@/types/application';
import axios from 'axios';
import { format, subDays, differenceInDays } from 'date-fns';
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
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from 'react-day-picker';

export default function SuperAdminDashboard() {
  const { user } = useAuthStore();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'SUPERADMIN') {
      redirect('/auth/sign-in');
    }

    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/application/all`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
            },
          }
        );
        setApplications(response.data.applications);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
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

  // Calculate statistics
  const totalApplications = applications.length;
  const approvedApplications = applications.filter(app => app.applicationStatusId === 7).length;
  const rejectedApplications = applications.filter(app => app.applicationStatusId === 8).length;
  const pendingApplications = applications.filter(app => app.applicationStatusId === 1).length;
  const underReviewApplications = applications.filter(app => app.applicationStatusId === 2).length;
  const inspectionScheduled = applications.filter(app => app.applicationStatusId === 5).length;
  const inspectionCompleted = applications.filter(app => app.applicationStatusId === 6).length;

  // Calculate approval rate
  const approvalRate = totalApplications > 0 
    ? Math.round((approvedApplications / totalApplications) * 100) 
    : 0;

  // Calculate average processing time
  const completedApplications = applications.filter(app => 
    app.applicationStatusId === 7 || app.applicationStatusId === 8
  );
  const averageProcessingTime = completedApplications.length > 0
    ? Math.round(completedApplications.reduce((acc, app) => 
        acc + differenceInDays(new Date(app.updatedAt), new Date(app.createdAt))
      , 0) / completedApplications.length)
    : 0;

  // Prepare data for charts
  const statusDistribution = {
    labels: [
      'Pending', 'Under Review', 'Stage 1 Approved', 'FSC Applied',
      'Inspection Scheduled', 'Inspection Completed', 'Approved', 'Rejected'
    ],
    values: Array(8).fill(0).map((_, i) => 
      applications.filter(app => app.applicationStatusId === i + 1).length
    ),
  };

  const inspectionData = {
    completed: inspectionCompleted,
    scheduled: inspectionScheduled,
    pending: pendingApplications,
  };

  // Process time trend data
  const processTimeData = {
    labels: Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), 6 - i), 'MMM dd')),
    values: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10) + 5),
  };

  // Region distribution data
  const regionData = {
    labels: ['CENTRAL', 'EAST', 'WEST', 'SOUTH', 'SOUTH WEST', 'NORTH WEST'],
    values: [15, 12, 18, 14, 10, 8],
  };

  // Application trend data
  const trendData = {
    labels: Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), 6 - i), 'MMM dd')),
    values: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 10),
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last updated:</span>
          <span className="text-sm font-medium">{format(new Date(), 'MMM dd, yyyy HH:mm')}</span>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Applications"
          value={totalApplications}
          description="All time applications"
          icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard
          title="Approved Applications"
          value={approvedApplications}
          description={`${approvalRate}% approval rate`}
          icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
        />
        <StatsCard
          title="Average Processing Time"
          value={`${averageProcessingTime} days`}
          description="From submission to completion"
          icon={<Clock className="h-4 w-4 text-blue-500" />}
        />
        <StatsCard
          title="Under Review"
          value={underReviewApplications}
          description="Applications being processed"
          icon={<Activity className="h-4 w-4 text-yellow-500" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4 col-span-2">
          <h3 className="font-semibold mb-4">Application Processing Progress</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pending Review</span>
                <span>{pendingApplications} applications</span>
              </div>
              <Progress value={(pendingApplications / totalApplications) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Under Inspection</span>
                <span>{inspectionScheduled} applications</span>
              </div>
              <Progress value={(inspectionScheduled / totalApplications) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span>{approvedApplications + rejectedApplications} applications</span>
              </div>
              <Progress value={((approvedApplications + rejectedApplications) / totalApplications) * 100} className="h-2" />
            </div>
          </div>
        </Card>

        <InspectionStatusChart data={inspectionData} />
      </div>

      <AdminManagement />

      <div className="grid gap-4 md:grid-cols-2">
        <ApplicationChart data={statusDistribution} />
        {/* <RegionDistribution data={regionData} /> */}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ProcessTimeChart data={processTimeData} />
        <TrendChart data={trendData} />
      </div>

      <RecentApplications applications={applications.slice(0, 5)} />
    </div>
  );
}