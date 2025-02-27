
'use client';

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Inspection } from "@/types/inspection";
import { format } from "date-fns";
import { Eye, Calendar } from "lucide-react";
import { useState } from "react";
import { ApplicationDetailsModal } from "./details/ApplicationDetailsModal";
import axios from "axios";

interface InspectionTableProps {
  inspections: Inspection[];
}

export function InspectionTable({ inspections }: InspectionTableProps) {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'FSC APPLIED':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'INSPECTION COMPLETED':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const fetchApplicationDetails = async (applicationId: number) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/application/${applicationId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      setSelectedApplication(data.application);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch application details:", error);
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application ID</TableHead>
              <TableHead>Scheduled Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Region</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inspections.map((inspection) => (
              <TableRow key={inspection.applicationId}>
                <TableCell className="font-medium">
                  #{inspection.applicationId}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {format(new Date(inspection.inspectionDate), 'MMM dd, yyyy')}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(inspection.result)}</TableCell>
                <TableCell>{inspection.region || 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fetchApplicationDetails(inspection.applicationId)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ApplicationDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        application={selectedApplication}
      />
    </>
  );
}
