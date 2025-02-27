import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { getInspectionStatusBadgeVariant } from '@/app/user/applicant/application/utils/statusUtils';

interface InspectionItemProps {
  inspection: {
    applicationId: number;
    inspectionDate: string;
    result: string;
    comments?: string | null;
    priority: string;
  };
}

export function InspectionItem({ inspection }: InspectionItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div>
        <p className="font-medium">Application #{inspection.applicationId}</p>
        <p className="text-sm text-muted-foreground">
          {format(new Date(inspection.inspectionDate), 'MMM dd, yyyy')}
        </p>
        {inspection.comments && (
          <p className="text-sm text-muted-foreground mt-1">{inspection.comments}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Badge variant={getInspectionStatusBadgeVariant(inspection.result)}>
          {inspection.result}
        </Badge>
        <Badge variant="outline">{inspection.priority}</Badge>
      </div>
    </div>
  );
}