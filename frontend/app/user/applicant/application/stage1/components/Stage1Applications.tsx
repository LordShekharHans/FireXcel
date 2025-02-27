'use client';

import { useStage1Applications } from '../hooks/useStage1Applications';
import { Stage1ApplicationItem } from './Stage1ApplicationItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Application } from '@/types/application';
import { ApplicationListSkeleton } from '../../components/ApplicationListSkeleton';

interface Stage1ApplicationsProps {
  onApplicationSelect: (application: Application) => void;
}

export function Stage1Applications({ onApplicationSelect }: Stage1ApplicationsProps) {
  const { applications, isLoading, error } = useStage1Applications();

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
        {applications.map((application) => (
          <Stage1ApplicationItem 
            key={application.applicationId} 
            application={application}
            onSelect={() => onApplicationSelect(application)}
          />
        ))}
        {applications.length === 0 && (
          <div className="text-center text-muted-foreground p-4">
            No Stage 1 approved applications found
          </div>
        )}
      </div>
    </ScrollArea>
  );
}