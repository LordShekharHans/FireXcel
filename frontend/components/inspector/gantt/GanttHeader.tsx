'use client';

import { format } from 'date-fns';
import { MonthData } from '@/lib/utils/gantt';

interface GanttHeaderProps {
  monthData: MonthData[];
}

export function GanttHeader({ monthData }: GanttHeaderProps) {
  const totalDays = monthData.reduce((acc, m) => acc + m.days, 0);

  return (
    <div className="grid grid-cols-[200px_1fr] border-b sticky top-0 bg-background z-10">
      <div className="p-4 font-medium">Application</div>
      <div className="relative">
        {/* Months */}
        <div className="grid border-b" style={{ 
          gridTemplateColumns: monthData.map(m => `${(m.days / totalDays) * 100}%`).join(' ') 
        }}>
          {monthData.map((data, i) => (
            <div 
              key={i}
              className="px-2 py-2 text-sm font-medium text-center border-l"
            >
              {format(data.month, 'MMMM yyyy')}
            </div>
          ))}
        </div>
        
        {/* Weeks */}
        <div className="grid border-b" style={{ 
          gridTemplateColumns: monthData.map(m => `${(m.days / totalDays) * 100}%`).join(' ') 
        }}>
          {monthData.map((month) => (
            <div 
              key={month.month.getTime()} 
              className="grid"
              style={{ 
                gridTemplateColumns: month.weeks.map(() => '1fr').join(' ') 
              }}
            >
              {month.weeks.map((week, i) => (
                <div 
                  key={i}
                  className="px-2 py-1 text-xs font-medium text-center border-l"
                >
                  Week {week.weekNumber}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid" style={{ gridTemplateColumns: `repeat(${totalDays}, 1fr)` }}>
          {monthData.map((month) => (
            Array.from({ length: month.days }).map((_, dayIndex) => (
              <div 
                key={`${month.month.getTime()}-${dayIndex}`}
                className="px-1 py-1 text-[10px] text-center border-l truncate"
              >
                {dayIndex + 1}
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
}