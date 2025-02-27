
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApplicationForm } from "@/types/application";
import { Check, X } from "lucide-react";


interface SafetyFeaturesProps {
  form: ApplicationForm;
}

export function SafetyFeatures({ form }: SafetyFeaturesProps) {
  const booleanFeatures = [
    { label: "Provision of Staircase", value: form.provisionOfStaircase },
    { label: "Fire Tower", value: form.fireTower },
    { label: "Fire Check Door", value: form.fireCheckDoor },
    { label: "Pressurization", value: form.pressurization },
    { label: "Exit Signage", value: form.exitSignage },
    { label: "Fireman's Grounding Switch", value: form.firemansGroundingSwitch },
    { label: "Standby Power Supply", value: form.standbyPowerSupply },
  ];

  const numericFeatures = [
    { label: "Fire Extinguishers per Floor", value: form.fireExtinguishersTotalNumbersEachFloor },
    { label: "Fire Lifts", value: form.numberOfFireLifts },
    { label: "Hydrants per Floor", value: form.numberOfHydrantsPerFloor },
    { label: "Main Pumps", value: form.numberOfMainPumps },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Safety Systems</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {booleanFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                {feature.value ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm">{feature.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Safety Equipment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {numericFeatures.map((feature, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm font-medium">{feature.label}</p>
                <p className="text-sm text-muted-foreground">{feature.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
