'use client';

import { Pie } from 'react-chartjs-2';
import { Inspection } from '@/types/inspection';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatusDistributionProps {
  inspections: Inspection[];
}

export function StatusDistribution({ inspections }: StatusDistributionProps) {
  const statusCounts = inspections.reduce((acc, inspection) => {
    acc[inspection.result] = (acc[inspection.result] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-[300px] flex items-center justify-center">
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        }}
      />
    </div>
  );
}