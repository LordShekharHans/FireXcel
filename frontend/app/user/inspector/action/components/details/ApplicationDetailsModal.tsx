
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Application } from "@/types/application";
import { ApplicationInfo } from "./ApplicationInfo";
import { BuildingDetails } from "./BuildingDetails";
import { SafetyFeatures } from "./SafetyFeatures";
import { DocumentList } from "./DocumentList";

interface ApplicationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: Application | null;
}

export function ApplicationDetailsModal({
  open,
  onOpenChange,
  application
}: ApplicationDetailsModalProps) {
  if (!application) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Application #{application.applicationId} Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Basic Info</TabsTrigger>
            <TabsTrigger value="building">Building Details</TabsTrigger>
            <TabsTrigger value="safety">Safety Features</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-4">
            <ApplicationInfo application={application} />
          </TabsContent>

          <TabsContent value="building" className="mt-4">
            <BuildingDetails form={application.application_form} />
          </TabsContent>

          <TabsContent value="safety" className="mt-4">
            <SafetyFeatures form={application.application_form} />
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            <DocumentList documents={application.documents} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
