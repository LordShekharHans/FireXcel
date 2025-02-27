'use client';

import { format } from 'date-fns';

interface GanttTimelineProps {
  dateRange: Date[];
}

export function GanttTimeline({ dateRange }: GanttTimelineProps) {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');

  return (
    <div className="grid grid-cols-[200px_1fr] border-b relative">
      <div className="p-4"></div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-0">
        {dateRange.map((date) => {
          const isToday = format(date, 'yyyy-MM-dd') === todayStr;
          const isWeekend = [0, 6].includes(date.getDay());
          
          return (
            <div 
              key={date.toISOString()} 
              className={`border-l relative ${isWeekend ? 'bg-muted/30' : ''}`}
            >
              {isToday && (
                <div className="absolute inset-0 bg-primary/5 border-x-2 border-primary">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-primary">
                    Today
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}