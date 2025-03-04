const badgeVariants = {
  default: "bg-gray-100 text-gray-800",
  destructive: "bg-red-100 text-red-800",
  outline: "border border-gray-300 text-gray-800",
  secondary: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800", // ✅ Add this if missing
};

export type BadgeVariant = "default" | "secondary" | "destructive"| "outline";

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
      return "default";
    case 8: // NOC Rejected
      return "destructive";
    default:
      return "secondary";
  }
}

export function getRenewalStatusBadgeVariant(status: string): BadgeVariant {
  switch (status.toUpperCase()) {
    case 'APPROVED':
      return 'default'; // Change from 'success' to 'default'
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
      return 'default';
    case 'FSC APPLIED':
      return 'secondary';
    case 'FSC REJECTED':
      return 'destructive';
    default:
      return 'default';
  }
}