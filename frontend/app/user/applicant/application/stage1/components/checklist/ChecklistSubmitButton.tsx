'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ChecklistSubmitButtonProps {
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function ChecklistSubmitButton({ onSubmit, isSubmitting }: ChecklistSubmitButtonProps) {
  return (
    <Button 
      onClick={onSubmit} 
      disabled={isSubmitting}
      className="w-full sm:w-auto"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        'Submit Checklist'
      )}
    </Button>
  );
}