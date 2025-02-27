import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { getRenewalStatusBadgeVariant } from '@/app/user/applicant/application/utils/statusUtils';

interface RenewalItemProps {
  renewal: {
    applicationRenewalId: number;
    applicationId: number;
    nocId: number;
    kForm: string;
    jForm: string;
    createdAt: string;
    status: string;
  };
}

export function RenewalItem({ renewal }: RenewalItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div>
        <p className="font-medium">Application #{renewal.applicationId}</p>
        <p className="text-sm text-muted-foreground">
          NOC ID: {renewal.nocId}
        </p>
        <div className="flex gap-4 mt-1">
          <p className="text-sm">K-Form: {renewal.kForm}</p>
          <p className="text-sm">J-Form: {renewal.jForm}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Badge variant={getRenewalStatusBadgeVariant(renewal.status)}>
          {renewal.status}
        </Badge>
        <p className="text-sm text-muted-foreground">
          {format(new Date(renewal.createdAt), 'MMM dd, yyyy')}
        </p>
      </div>
    </div>
  );
}