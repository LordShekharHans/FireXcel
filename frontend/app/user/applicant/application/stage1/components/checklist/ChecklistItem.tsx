'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface ChecklistItemProps {
  id: string;
  text: string;
  isChecked: boolean;
  showReason: boolean;
  reason: string;
  onToggle: () => void;
  onReasonChange: (reason: string) => void;
}

export function ChecklistItem({
  id,
  text,
  isChecked,
  showReason,
  reason,
  onToggle,
  onReasonChange,
}: ChecklistItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-2">
        <Checkbox
          id={id}
          checked={isChecked}
          onCheckedChange={onToggle}
        />
        <label
          htmlFor={id}
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {text}
        </label>
      </div>
      
      {!isChecked && showReason && (
        <div className="ml-6">
          <Textarea
            placeholder="Please provide a reason"
            value={reason}
            onChange={(e) => onReasonChange(e.target.value)}
            className="h-20"
          />
        </div>
      )}
    </div>
  );
}