'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Application } from "@/types/application";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface RecentApplicationsProps {
  applications: Application[];
}

const getStatusColor = (statusId: number) => {
  switch (statusId) {
    case 1: return "bg-gray-500"; // Pending
    case 2: return "bg-blue-500"; // Under Review
    case 3: return "bg-yellow-500"; // Stage 1 Approved
    case 4: return "bg-purple-500"; // FSC Applied
    case 5: return "bg-orange-500"; // Inspection Scheduled
    case 6: return "bg-cyan-500"; // Inspection Completed
    case 7: return "bg-green-500"; // Approved
    case 8: return "bg-red-500"; // Rejected
    default: return "bg-gray-500";
  }
};

export function RecentApplications({ applications }: RecentApplicationsProps) {
  const recentApplications = applications
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentApplications.map((app) => (
            <div
              key={app.applicationId}
              className="flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">Application #{app.applicationId}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(app.createdAt), { addSuffix: true })}
                </p>
              </div>
              <Badge className={getStatusColor(app.applicationStatusId)}>
                Status: {app.applicationStatusId}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}