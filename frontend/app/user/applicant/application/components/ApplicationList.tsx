'use client';

import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

import { useApplications } from '../hooks/useApplications';
import { ApplicationListSkeleton } from './ApplicationListSkeleton';
import { ApplicationListItem } from './ApplicationListItem';
import { Application } from '@/types/application';


export function ApplicationList() {
  const { applications, isLoading, error } = useApplications();

  if (isLoading) {
    return <ApplicationListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="space-y-4 p-4">
        {applications.map((application: Application) => (
          <ApplicationListItem 
            key={application.applicationId} 
            application={application} 
          />
        ))}
        {applications.length === 0 && (
          <div className="text-center text-muted-foreground p-4">
            No applications found
          </div>
        )}
      </div>
    </ScrollArea>
  );
}