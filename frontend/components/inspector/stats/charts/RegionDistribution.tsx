'use client';

import { Doughnut } from 'react-chartjs-2';
import { Inspection } from '@/types/inspection';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface RegionDistributionProps {
  inspections: Inspection[];
}

export function RegionDistribution({ inspections }: RegionDistributionProps) {
  // Get unique regions from inspections
  const uniqueRegions = [...new Set(inspections.map(i => i.region))].filter(Boolean);
  
  // Count inspections by region
  const regionCounts = uniqueRegions.reduce((acc, region) => {
    acc[region as string] = inspections.filter(i => i.region === region).length;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(regionCounts),
    datasets: [
      {
        data: Object.values(regionCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  if (Object.keys(regionCounts).length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No region data available
      </div>
    );
  }

  return (
    <div className="h-[300px] flex items-center justify-center">
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
              },
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw as number;
                  const total = Object.values(regionCounts).reduce((a, b) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${value} (${percentage}%)`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
}