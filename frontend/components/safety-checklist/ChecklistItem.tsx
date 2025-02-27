'use client';

import { useState } from 'react';
import DetailsList from './DetailsList';
import { Practice } from '@/types/safety';

interface ChecklistItemProps {
  practice: Practice;
  onToggleMain: (id: string) => void;
  onToggleDetail: (id: string, index: number) => void;
}

export default function ChecklistItem({ practice, onToggleMain, onToggleDetail }: ChecklistItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start">
        <div className="flex-1">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div>
              <div className="font-medium text-gray-900">{practice.title}</div>
              <div className="text-sm text-gray-500">{practice.description}</div>
            </div>
            <button className="ml-2 text-gray-400 hover:text-gray-600">
              {isExpanded ? '−' : '+'}
            </button>
          </div>
          {isExpanded && (
            <DetailsList
              practiceId={practice.id}
              details={practice.details}
              onToggleDetail={onToggleDetail}
            />
          )}
        </div>
      </div>
    </div>
  );
}