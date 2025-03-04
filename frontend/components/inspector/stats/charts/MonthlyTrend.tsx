'use client';

import { Line } from 'react-chartjs-2';
import { Inspection } from '@/types/inspection';
import { format, parseISO, eachMonthOfInterval, startOfMonth, endOfMonth } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MonthlyTrendProps {
  inspections: Inspection[];
}

export function MonthlyTrend({ inspections }: MonthlyTrendProps) {
  // Sort inspections by date
  const sortedInspections = [...inspections].sort(
    (a, b) => new Date(a.inspectionDate).getTime() - new Date(b.inspectionDate).getTime()
  );

  if (sortedInspections.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No inspection data available
      </div>
    );
  }

  // Get date range
  const firstDate = new Date(sortedInspections[0].inspectionDate);
  const lastDate = new Date(sortedInspections[sortedInspections.length - 1].inspectionDate);

  // Get all months in range
  const months = eachMonthOfInterval({
    start: startOfMonth(firstDate),
    end: endOfMonth(lastDate),
  });

  // Initialize data for all months
  const monthlyData = months.reduce((acc, month) => {
    acc[format(month, 'MMM yyyy')] = 0;
    return acc;
  }, {} as Record<string, number>);

  // Count inspections per month
  sortedInspections.forEach(inspection => {
    const month = format(parseISO(inspection.inspectionDate), 'MMM yyyy');
    monthlyData[month] = (monthlyData[month] || 0) + 1;
  });

  const data = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Inspections',
        data: Object.values(monthlyData),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        tension: 0.4,
        fill: true,
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div className="h-[300px]">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw as number;
                  return `${value} inspection${value !== 1 ? 's' : ''}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                precision: 0,
              },
              border: {  // ✅ Move drawBorder here
                display: false,
              },
              grid: {
                drawOnChartArea: false, // Optional: Hides grid lines on chart area
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          }
          
        }}
      />
    </div>
  );
}