'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Inspection } from "@/types/inspection";
import { calculateGanttData } from "@/lib/utils/gantt";
import { GanttHeader } from "./GanttHeader";
import { GanttRow } from "./GanttRow";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface GanttChartProps {
  inspections: Inspection[];
}

export function GanttChart({ inspections }: GanttChartProps) {
  const { bars, monthData } = calculateGanttData(inspections);

  const stats = {
    total: bars.length,
    completed: bars.filter(b => b.status === 'INSPECTION COMPLETED').length,
    applied: bars.filter(b => b.status === 'FSC APPLIED').length,
    rejected: bars.filter(b => b.status === 'FSC REJECTED').length,
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Inspection Schedule</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {monthData.length > 0 && (
              `${format(monthData[0].month, 'MMMM yyyy')} - ${format(monthData[monthData.length - 1].month, 'MMMM yyyy')}`
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-100/50">
            Completed: {stats.completed}
          </Badge>
          <Badge variant="outline" className="bg-blue-100/50">
            Applied: {stats.applied}
          </Badge>
          <Badge variant="outline" className="bg-red-100/50">
            Rejected: {stats.rejected}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full rounded-md border">
          <div className="min-w-[800px]">
            <GanttHeader monthData={monthData} />
            {bars.map((bar) => (
              <GanttRow 
                key={bar.id}
                bar={bar}
                monthData={monthData}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}