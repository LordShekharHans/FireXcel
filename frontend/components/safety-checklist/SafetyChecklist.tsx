'use client';


import { useChecklist } from '@/hooks/useChecklist';
import ChecklistItem from './ChecklistItem';

export default function SafetyChecklist() {
  const { practices, toggleMainCheckbox, toggleDetailCheckbox } = useChecklist();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Fire Safety Compliance Checklist</h2>
      <div className="space-y-6">
        {practices.map(practice => (
          <ChecklistItem
            key={practice.id}
            practice={practice}
            onToggleMain={toggleMainCheckbox}
            onToggleDetail={toggleDetailCheckbox}
          />
        ))}
      </div>
    </div>
  );
}