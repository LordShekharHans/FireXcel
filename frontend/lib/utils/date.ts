import { addDays, startOfDay, endOfDay } from 'date-fns';
import { Inspection } from '@/types/inspection';

export function getDateRange(inspections: Inspection[]): Date[] {
  if (!inspections.length) return [];
  
  const dates = inspections.map(i => new Date(i.inspectionDate));
  const minDate = startOfDay(new Date(Math.min(...dates.map(d => d.getTime()))));
  const maxDate = endOfDay(new Date(Math.max(...dates.map(d => d.getTime()))));

  const dateRange: Date[] = [];
  let currentDate = minDate;
  
  while (currentDate <= maxDate) {
    dateRange.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return dateRange;
}