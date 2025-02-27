'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useChecklist } from '../../hooks/useChecklist';
import { ChecklistContent } from './ChecklistContent';
import Button from "@/components/ui/button"


interface ChecklistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicationId?: number;
}

export function ChecklistDialog({ open, onOpenChange, applicationId }: ChecklistDialogProps) {
  const { checklist, isLoading, error } = useChecklist(applicationId);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemToggle = (text: string) => {
    setSelectedItems(prev => 
      prev.includes(text) 
        ? prev.filter(item => item !== text)
        : [...prev, text]
    );
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedItems([]); // Reset selections when closing
  };

  if (!applicationId) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Safety Checklist - Application #{applicationId}</DialogTitle>
        </DialogHeader>
        
        <ChecklistContent
          checklist={checklist}
          isLoading={isLoading}
          error={error}
          selectedItems={selectedItems}
          onItemToggle={handleItemToggle}
          applicationId={applicationId}
          onClose={handleClose}
        />
        <Button>Submit</Button>
      </DialogContent>
    </Dialog>
  );
}