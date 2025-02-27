import { Checklist, ChecklistSection } from '../types/checklist';

export function transformChecklist(checklist: Checklist): ChecklistSection[] {
  return checklist.check_list.map(section => ({
    id: section._id,
    heading: section.heading,
    items: section.text
  }));
}

export function isChecklistComplete(selectedItems: string[], totalItems: number): boolean {
  return selectedItems.length === totalItems;
}