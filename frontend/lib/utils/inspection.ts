export function getStatusColor(result: string): string {
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
}