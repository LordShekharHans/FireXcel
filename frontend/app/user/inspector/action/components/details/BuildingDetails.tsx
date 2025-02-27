
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApplicationForm } from "@/types/application";

interface BuildingDetailsProps {
  form: ApplicationForm;
}


export function BuildingDetails({ form }: BuildingDetailsProps) {
  const details = [
    { label: "Division", value: form.division },
    { label: "Type of Occupancy", value: form.typeOfOccupancy },
    { label: "Height of Building", value: `${form.heightOfBuilding} meters` },
    { label: "Number of Floors", value: form.numberOfFloors },
    { label: "Ground Floor Area", value: `${form.coveredAreaGroundFloor} sq.m` },
    { label: "Typical Floor Area", value: `${form.typicalFloorArea} sq.m` },
    { label: "Number of Basements", value: form.numberOfBasements },
    { label: "Basement Floor Area", value: `${form.basementFloorArea} sq.m` },
    { label: "Total Covered Area", value: `${form.totalCoveredArea} sq.m` },
    { label: "Road Width", value: `${form.roadWidth} meters` },
    { label: "Gate Width", value: `${form.gateWidth} meters` },
    { label: "Internal Road Width", value: `${form.internalRoadWidth} meters` },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Building Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {details.map((detail, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm font-medium">{detail.label}</p>
              <p className="text-sm text-muted-foreground">{detail.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
