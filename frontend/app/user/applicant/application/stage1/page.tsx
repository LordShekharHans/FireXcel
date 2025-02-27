'use client';

import { useState } from 'react';
import { Stage1Applications } from './components/Stage1Applications';
import { ChecklistDialog } from './components/ChecklistDialog';
import { Application } from '@/types/application';

export default function Stage1ApprovedPage() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Stage 1 Approved Applications</h1>
        <p className="text-muted-foreground">View and complete checklists for approved applications</p>
      </div>
      
      <Stage1Applications onApplicationSelect={setSelectedApplication} />
      
      <ChecklistDialog 
        open={!!selectedApplication} 
        onOpenChange={() => setSelectedApplication(null)}
        applicationId={selectedApplication?.applicationId}
      />
    </div>
  );
}