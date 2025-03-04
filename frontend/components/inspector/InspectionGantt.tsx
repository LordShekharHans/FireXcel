import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Inspection } from "@/types/inspection";
import { Gantt } from "@/components/Gantt";

interface InspectionGanttProps {
  inspections: Inspection[];
}

export default  function InspectionGantt({ inspections }: InspectionGanttProps) {
  const stats = {
    total: inspections.length,
    completed: inspections.filter(i => i.result === 'INSPECTION COMPLETED').length,
    applied: inspections.filter(i => i.result === 'FSC APPLIED').length,
    rejected: inspections.filter(i => i.result === 'FSC REJECTED').length,
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Inspection Schedule</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Inspection timeline and status overview
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
        <Gantt inspections={inspections} />
      </CardContent>
    </Card>
  );
}