'use client';

import { format } from 'date-fns';
import { Inspection } from '@/types/inspection';
import { getStatusColor } from '@/lib/utils/inspection';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TimelineInspectionProps {
  inspection: Inspection;
}

export function TimelineInspection({ inspection }: TimelineInspectionProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">Application #{inspection.applicationId}</h4>
            <Badge className={getStatusColor(inspection.result)}>
              {inspection.result}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {format(new Date(inspection.inspectionDate), 'EEEE, MMMM d, yyyy')}
          </p>
          {inspection.comments && (
            <p className="text-sm text-muted-foreground mt-2">
              {inspection.comments}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}