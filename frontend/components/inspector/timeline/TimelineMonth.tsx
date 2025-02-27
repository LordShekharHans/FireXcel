'use client';

import { format } from 'date-fns';
import { TimelineGroup } from '@/lib/utils/timeline';
import { TimelineInspection } from './TimelineInspection';

interface TimelineMonthProps {
  group: TimelineGroup;
}

export function TimelineMonth({ group }: TimelineMonthProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {format(group.month, 'MMMM yyyy')}
      </h3>
      <div className="space-y-2">
        {group.inspections.map((inspection) => (
          <TimelineInspection 
            key={inspection.inspectionId}
            inspection={inspection}
          />
        ))}
      </div>
    </div>
  );
}