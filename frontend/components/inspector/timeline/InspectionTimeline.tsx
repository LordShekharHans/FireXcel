'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Inspection } from "@/types/inspection";
import { groupInspectionsByMonth, getInspectionStats } from "@/lib/utils/timeline";
import { TimelineMonth } from "./TimelineMonth";

interface InspectionTimelineProps {
  inspections: Inspection[];
}

export function InspectionTimeline({ inspections }: InspectionTimelineProps) {
  const groups = groupInspectionsByMonth(inspections);
  const stats = getInspectionStats(inspections);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Inspection Timeline</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Chronological view of inspections
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
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-8">
            {groups.map((group) => (
              <TimelineMonth 
                key={group.month.toISOString()} 
                group={group} 
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}