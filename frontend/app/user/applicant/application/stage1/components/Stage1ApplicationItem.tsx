'use client';

import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Application } from '@/types/application';
import { ClipboardList } from 'lucide-react';

interface Stage1ApplicationItemProps {
  application: Application;
  onSelect: () => void;
}

export function Stage1ApplicationItem({ application, onSelect }: Stage1ApplicationItemProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Application #{application.applicationId}</h3>
            <Badge variant="success">Stage 1 Approved</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Approved on {format(new Date(application.updatedAt), 'MMM dd, yyyy')}
          </p>
        </div>
        <Button onClick={onSelect} variant="outline" size="sm">
          <ClipboardList className="h-4 w-4 mr-2" />
          View Checklist
        </Button>
      </div>
    </Card>
  );
}