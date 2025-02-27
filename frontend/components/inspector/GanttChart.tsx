'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, addDays, startOfDay, endOfDay } from 'date-fns';
import { Inspection } from "@/types/inspection";
import { ScrollArea } from "../ui/scroll-area";

interface GanttChartProps {
  inspections: Inspection[];
}

export function GanttChart({ inspections }: GanttChartProps) {
  // Get date range for all inspections
  const dates = inspections.map(i => new Date(i.inspectionDate));
  const minDate = startOfDay(new Date(Math.min(...dates.map(d => d.getTime()))));
  const maxDate = endOfDay(new Date(Math.max(...dates.map(d => d.getTime()))));

  // Create array of dates for header
  const dateRange: Date[] = [];
  let currentDate = minDate;
  while (currentDate <= maxDate) {
    dateRange.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  const getStatusColor = (result: string) => {
    switch (result) {
      case 'FSC APPLIED':
        return 'bg-blue-500';
      case 'FSC REJECTED':
        return 'bg-red-500';
      case 'INSPECTION COMPLETED':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspection Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-[200px_1fr] border-b">
              <div className="p-4 font-medium">Application</div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-0">
                {dateRange.map((date) => (
                  <div 
                    key={date.toISOString()} 
                    className="p-4 text-sm font-medium text-center border-l"
                  >
                    {format(date, 'MMM dd')}
                  </div>
                ))}
              </div>
            </div>

            {/* Rows */}
            {inspections.map((inspection) => (
              <div 
                key={inspection.inspectionId} 
                className="grid grid-cols-[200px_1fr] border-b hover:bg-muted/50"
              >
                <div className="p-4 flex flex-col">
                  <span className="font-medium">#{inspection.applicationId}</span>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(inspection.inspectionDate), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-0 relative">
                  {dateRange.map((date) => (
                    <div 
                      key={date.toISOString()} 
                      className="p-4 border-l min-h-[80px]"
                    >
                      {format(new Date(inspection.inspectionDate), 'yyyy-MM-dd') === 
                       format(date, 'yyyy-MM-dd') && (
                        <div 
                          className={`absolute h-8 left-0 right-0 mx-2 rounded ${getStatusColor(inspection.result)} 
                            text-white text-sm flex items-center justify-center`}
                        >
                          {inspection.result}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}