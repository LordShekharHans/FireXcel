import { initialPractices } from '@/data/safety-practices';
import { Practice } from '@/types/safety';
import { useState } from 'react';


export function useChecklist() {
  const [practices, setPractices] = useState<Practice[]>(initialPractices);

  const toggleMainCheckbox = (practiceId: string) => {
    setPractices(prevPractices => {
      return prevPractices.map(practice => {
        if (practice.id === practiceId) {
          const newChecked = !practice.checked;
          return {
            ...practice,
            checked: newChecked,
            details: practice.details.map(detail => ({
              ...detail,
              checked: newChecked
            }))
          };
        }
        return practice;
      });
    });
  };

  const toggleDetailCheckbox = (practiceId: string, detailIndex: number) => {
    setPractices(prevPractices => {
      return prevPractices.map(practice => {
        if (practice.id === practiceId) {
          const newDetails = practice.details.map((detail, idx) =>
            idx === detailIndex ? { ...detail, checked: !detail.checked } : detail
          );
          const allChecked = newDetails.every(detail => detail.checked);
          return {
            ...practice,
            checked: allChecked,
            details: newDetails
          };
        }
        return practice;
      });
    });
  };

  return {
    practices,
    toggleMainCheckbox,
    toggleDetailCheckbox
  };
}