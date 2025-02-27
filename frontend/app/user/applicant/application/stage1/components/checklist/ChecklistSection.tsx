'use client';

import { ChecklistItem } from './ChecklistItem';
import { ChecklistSection as ChecklistSectionType } from '../../types/checklist';

interface ChecklistSectionProps {
  section: ChecklistSectionType;
  selectedItems: string[];
  reasons: Record<string, string>;
  onItemToggle: (text: string) => void;
  onReasonChange: (id: string, reason: string) => void;
}

export function ChecklistSection({ 
  section, 
  selectedItems, 
  reasons,
  onItemToggle,
  onReasonChange,
}: ChecklistSectionProps) {
  const isAllChecked = section.items.every(text => selectedItems.includes(text));

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">{section.heading}</h3>
      <div className="space-y-4 ml-4">
        {section.items.map((text, index) => (
          <ChecklistItem
            key={`${section.id}-${index}`}
            id={`${section.id}-${index}`}
            text={text}
            isChecked={selectedItems.includes(text)}
            showReason={!isAllChecked}
            reason={reasons[section.id] || ''}
            onToggle={() => onItemToggle(text)}
            onReasonChange={(reason) => onReasonChange(section.id, reason)}
          />
        ))}
        {/* <Button> ok</Button> */}

      </div>
    </div>
  );
}