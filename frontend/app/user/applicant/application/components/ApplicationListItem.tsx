'use client';

import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Application } from '@/types/application';
import { getStatusBadgeVariant } from '../utils/statusUtils';

interface ApplicationListItemProps {
  application: Application;
}

export function ApplicationListItem({ application }: ApplicationListItemProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Application #{application.applicationId}</h3>
            <Badge variant={getStatusBadgeVariant(application.applicationStatusId)}>
              {application.application_status.code}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Submitted on {format(new Date(application.createdAt), 'MMM dd, yyyy')}
          </p>
        </div>
        <Badge variant="outline">{application.priority}</Badge>
      </div>
    </Card>
  );
}