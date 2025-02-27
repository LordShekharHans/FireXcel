'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';
import { ChecklistSection } from './ChecklistSection';
import { ChecklistSubmitButton } from './ChecklistSubmitButton';
import { Checklist } from '../../types/checklist';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import axios from 'axios';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ChecklistContentProps {
  checklist: Checklist | null;
  isLoading: boolean;
  error: string | null;
  selectedItems: string[];
  onItemToggle: (text: string) => void;
  applicationId?: number;
  onClose?: () => void;
}

interface ReplyItem {
  answer: string;
  reason: string;
}

export function ChecklistContent({ 
  checklist, 
  isLoading, 
  error, 
  selectedItems, 
  onItemToggle,
  applicationId,
  onClose
}: ChecklistContentProps) {
  const { toast } = useToast();
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    if (!checklist) return false;

    const incompleteItems = checklist.check_list.filter(section => {
      const isCompleted = section.text.every(text => selectedItems.includes(text));
      if (!isCompleted && !reasons[section._id]) {
        return true;
      }
      return false;
    });

    if (incompleteItems.length > 0) {
      toast({
        title: "Validation Error",
        description: "Please provide reasons for all unchecked items",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!checklist || !applicationId) return;
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const reply: ReplyItem[] = checklist.check_list.map(section => {
        const isCompleted = section.text.every(text => selectedItems.includes(text));
        return {
          answer: isCompleted ? "1" : "0",
          reason: isCompleted ? "fwe" : reasons[section._id] || "Not Done"
        };
      });

      await axios.post('https://backend-list-c5i6.onrender.com/reply/add/', {
        application_id: applicationId.toString(),
        reply
      });

      toast({
        title: "Success",
        description: "Checklist submitted successfully",
      });

      // Close the dialog after successful submission
      if (onClose) {
        setTimeout(onClose, 1500);
      }
    } catch (err) {
      console.error('Error submitting checklist:', err);
      toast({
        title: "Error",
        description: "Failed to submit checklist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (!checklist) {
    return <div className="text-center text-muted-foreground p-4">No checklist available</div>;
  }

  return (
    <div className="space-y-6">
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-6">
          {checklist.check_list.map((section) => (
            <ChecklistSection
              key={section._id}
              section={{
                id: section._id,
                heading: section.heading,
                items: section.text
              }}
              selectedItems={selectedItems}
              reasons={reasons}
              onItemToggle={onItemToggle}
              onReasonChange={(id, reason) => 
                setReasons(prev => ({ ...prev, [id]: reason }))
              }
            />
          ))}
        </div>

      </ScrollArea>

      {/* <div className="flex flex-col justify-end pt-4 border-t"> */}
        {/* <Button> ok</Button> */}
      {/* </div> */}
    </div>
  );
}