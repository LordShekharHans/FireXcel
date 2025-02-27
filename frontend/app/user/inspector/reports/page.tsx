'use client';

import { useAuthStore } from '@/store/authStore';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { useBoardStore } from '@/store/boardStore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ReportsPage() {
  const { user } = useAuthStore();
  const { tasks } = useBoardStore();

  if (!user || user.role !== 'INSPECTOR') {
    redirect('/auth/sign-in');
  }

  const tasksByStatus = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tasksByPriority = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusData = {
    labels: Object.keys(tasksByStatus),
    datasets: [
      {
        label: 'Tasks by Status',
        data: Object.values(tasksByStatus),
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const priorityData = {
    labels: Object.keys(tasksByPriority),
    datasets: [
      {
        label: 'Tasks by Priority',
        data: Object.values(tasksByPriority),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Reports</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Tasks by Status</h2>
          <Bar
            data={statusData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }}
          />
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Tasks by Priority</h2>
          <Pie
            data={priorityData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }}
          />
        </Card>

        <Card className="p-4 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Tasks</p>
              <p className="text-2xl font-bold">{tasks.length}</p>
            </div>
            {Object.entries(tasksByStatus).map(([status, count]) => (
              <div key={status} className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </p>
                <p className="text-2xl font-bold">{count}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}