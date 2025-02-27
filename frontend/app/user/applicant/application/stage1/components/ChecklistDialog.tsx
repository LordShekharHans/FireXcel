'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { useChecklist } from '../hooks/useChecklist';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

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

  if (!applicationId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Safety Checklist - Application #{applicationId}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : (
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              {checklist?.check_list.map((section) => (
                <div key={section._id} className="space-y-3">
                  <h3 className="font-semibold text-lg">{section.heading}</h3>
                  <div className="space-y-2 ml-4">
                    {section.text.map((text, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Checkbox
                          id={`${section._id}-${index}`}
                          checked={selectedItems.includes(text)}
                          onCheckedChange={() => handleItemToggle(text)}
                        />
                        <label
                          htmlFor={`${section._id}-${index}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {text}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}