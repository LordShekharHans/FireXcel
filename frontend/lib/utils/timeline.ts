import { Inspection } from '@/types/inspection';
import { format, isSameMonth, startOfMonth, endOfMonth } from 'date-fns';

export interface TimelineGroup {
  month: Date;
  inspections: Inspection[];
}

export function groupInspectionsByMonth(inspections: Inspection[]): TimelineGroup[] {
  // Sort inspections by date
  const sorted = [...inspections].sort(
    (a, b) => new Date(a.inspectionDate).getTime() - new Date(b.inspectionDate).getTime()
  );

  // Group by month
  const groups: TimelineGroup[] = [];
  
  sorted.forEach(inspection => {
    const date = new Date(inspection.inspectionDate);
    const existingGroup = groups.find(g => isSameMonth(g.month, date));
    
    if (existingGroup) {
      existingGroup.inspections.push(inspection);
    } else {
      groups.push({
        month: startOfMonth(date),
        inspections: [inspection]
      });
    }
  });

  return groups;
}

export function getInspectionStats(inspections: Inspection[]) {
  return {
    total: inspections.length,
    completed: inspections.filter(i => i.result === 'INSPECTION COMPLETED').length,
    applied: inspections.filter(i => i.result === 'FSC APPLIED').length,
    rejected: inspections.filter(i => i.result === 'FSC REJECTED').length,
  };
}