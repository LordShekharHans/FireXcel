'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface InspectionStatusChartProps {
  data: {
    completed: number;
    scheduled: number;
    pending: number;
  };
}

export function InspectionStatusChart({ data }: InspectionStatusChartProps) {
  const chartData = {
    labels: ['Completed', 'Scheduled', 'Pending'],
    datasets: [
      {
        data: [data.completed, data.scheduled, data.pending],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',
          'rgba(234, 179, 8, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(234, 179, 8)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspection Status</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="w-[300px]">
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
              cutout: '60%',
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}