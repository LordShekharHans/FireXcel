export type BadgeVariant = "default" | "secondary" | "destructive" | "success" | "outline";

export function getStatusBadgeVariant(statusId: number): BadgeVariant {
  switch (statusId) {
    case 1: // Pending
      return "secondary";
    case 2: // Under Review
    case 3: // Stage 1 Approved
    case 4: // FSC Applied
      return "default";
    case 5: // Inspection Scheduled
    case 6: // Inspection Completed
      return "outline";
    case 7: // NOC Approved
      return "success";
    case 8: // NOC Rejected
      return "destructive";
    default:
      return "secondary";
  }
}

export function getRenewalStatusBadgeVariant(status: string): BadgeVariant {
  switch (status.toUpperCase()) {
    case 'APPROVED':
      return 'success';
    case 'REJECTED':
      return 'destructive';
    case 'PENDING':
      return 'secondary';
    default:
      return 'default';
  }
}

export function getInspectionStatusBadgeVariant(status: string): BadgeVariant {
  switch (status.toUpperCase()) {
    case 'INSPECTION COMPLETED':
      return 'success';
    case 'FSC APPLIED':
      return 'secondary';
    case 'FSC REJECTED':
      return 'destructive';
    default:
      return 'default';
  }
}