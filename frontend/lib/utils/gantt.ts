import { Inspection } from '@/types/inspection';
import { 
  addMonths, 
  startOfMonth, 
  endOfMonth, 
  format, 
  eachMonthOfInterval, 
  getWeek,
  startOfWeek,
  endOfWeek,
  eachWeekOfInterval
} from 'date-fns';

export interface GanttBar {
  id: number;
  applicationId: number;
  inspectorId: number;
  date: Date;
  status: string;
  comments?: string | null;
}

export interface WeekData {
  start: Date;
  end: Date;
  weekNumber: number;
  days: number;
}

export interface MonthData {
  month: Date;
  weeks: WeekData[];
  days: number;
}

export function calculateGanttData(inspections: Inspection[]) {
  // Sort inspections by date
  const sortedInspections = [...inspections].sort(
    (a, b) => new Date(a.inspectionDate).getTime() - new Date(b.inspectionDate).getTime()
  );

  // Convert to GanttBars
  const bars = sortedInspections.map((inspection) => ({
    id: inspection.inspectionId,
    applicationId: inspection.applicationId,
    inspectorId: inspection.inspectorId,
    date: new Date(inspection.inspectionDate),
    status: inspection.result,
    comments: inspection.comments
  }));

  if (bars.length === 0) return { bars: [], monthData: [] };

  // Calculate month range
  const firstDate = bars[0].date;
  const lastDate = bars[bars.length - 1].date;
  
  const months = eachMonthOfInterval({
    start: startOfMonth(firstDate),
    end: endOfMonth(lastDate)
  });

  // Calculate weeks and days per month
  const monthData = months.map(month => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);

    const weeks = eachWeekOfInterval(
      { start: monthStart, end: monthEnd },
      { weekStartsOn: 1 } // Monday as week start
    ).map(weekStart => {
      const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
      return {
        start: weekStart,
        end: weekEnd,
        weekNumber: getWeek(weekStart),
        days: 7
      };
    });

    return {
      month,
      weeks,
      days: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    };
  });

  return {
    bars,
    monthData
  };
}

export function calculateBarPosition(
  date: Date,
  monthData: MonthData[],
  totalDays: number
): { left: number; width: number } {
  // Find which month the date belongs to
  const monthIndex = monthData.findIndex(m => 
    format(date, 'yyyy-MM') === format(m.month, 'yyyy-MM')
  );
  
  if (monthIndex === -1) return { left: 0, width: 0 };

  // Calculate days passed before this month
  const daysBefore = monthData
    .slice(0, monthIndex)
    .reduce((acc, m) => acc + m.days, 0);
  
  // Calculate day within month
  const dayOfMonth = date.getDate() - 1; // -1 because days start at 1
  
  const dayPosition = daysBefore + dayOfMonth;
  const left = (dayPosition / totalDays) * 100;
  const width = (1 / totalDays) * 100; // Single day width

  return { left, width };
}