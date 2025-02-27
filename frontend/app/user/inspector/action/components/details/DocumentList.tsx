
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Check, X } from "lucide-react";

interface Document {
  documentId: string;
  documentType: string;
  documentPath: string;
  isApproved: boolean;
}

interface DocumentListProps {
  documents: Document[];
}

const documentTypeLabels: Record<string, string> = {
  land_deed: "Land Deed",
  aadhar_card: "Aadhar Card",
  pan_card: "PAN Card",
  reference_letter: "Reference Letter",
  govt_buildings: "Government Building Approval",
  key_layout: "Key Layout Plan",
  architectural_plans: "Architectural Plans",
  section_elevation: "Section & Elevation",
};

export function DocumentList({ documents }: DocumentListProps) {
  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <Card key={doc.documentId}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-medium">
                  {documentTypeLabels[doc.documentType] || doc.documentType}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {doc.isApproved ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      Approved
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      <X className="h-3 w-3 mr-1" />
                      Pending Approval
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button variant="outline" asChild>
              <a href={doc.documentPath} target="_blank" rel="noopener noreferrer">
                View Document
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}