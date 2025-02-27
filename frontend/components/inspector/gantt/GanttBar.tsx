'use client';

import { GanttBar } from '@/lib/utils/gantt';
import { getStatusColor } from '@/lib/utils/inspection';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { format } from 'date-fns';

interface GanttBarProps {
  bar: GanttBar;
  position: { left: number; width: number };
}

export function GanttBarComponent({ bar, position }: GanttBarProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`absolute top-1/2 -translate-y-1/2 h-8 ${getStatusColor(bar.status)} rounded-md transition-all shadow-sm hover:brightness-110`}
            style={{ 
              left: `${position.left}%`,
              width: `${Math.max(position.width * 0.8, 2)}%`, // 80% of day width for spacing
              marginLeft: `${position.width * 0.1}%` // Center in day slot
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-white font-medium px-1 truncate">
                #{bar.applicationId}
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-medium">Application #{bar.applicationId}</p>
            <p className="text-xs text-muted-foreground">
              Date: {format(bar.date, 'MMM dd, yyyy')}
            </p>
            <p className="text-xs text-muted-foreground">
              Week: {format(bar.date, 'w')}
            </p>
            <p className="text-xs text-muted-foreground">
              Status: {bar.status}
            </p>
            {bar.comments && (
              <p className="text-xs text-muted-foreground max-w-[200px]">
                Comments: {bar.comments}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}