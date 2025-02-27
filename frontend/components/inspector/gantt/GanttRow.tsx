'use client';

import { format } from 'date-fns';
import { GanttBar, MonthData, calculateBarPosition } from '@/lib/utils/gantt';
import { GanttBarComponent } from './GanttBar';

interface GanttRowProps {
  bar: GanttBar;
  monthData: MonthData[];
}

export function GanttRow({ bar, monthData }: GanttRowProps) {
  const totalDays = monthData.reduce((acc, m) => acc + m.days, 0);
  const position = calculateBarPosition(bar.date, monthData, totalDays);

  return (
    <div className="grid grid-cols-[200px_1fr] border-b hover:bg-muted/50">
      <div className="p-4">
        <div className="flex flex-col">
          <span className="font-medium">Application #{bar.applicationId}</span>
          <span className="text-xs text-muted-foreground">
            {format(bar.date, 'MMM dd, yyyy')}
          </span>
        </div>
      </div>
      <div className="relative h-12">
        <GanttBarComponent bar={bar} position={position} />
      </div>
    </div>
  );
}