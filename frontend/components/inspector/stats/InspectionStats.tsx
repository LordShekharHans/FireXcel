'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Inspection } from "@/types/inspection";
import { StatusDistribution } from "./charts/StatusDistribution";
import { MonthlyTrend } from "./charts/MonthlyTrend";
import { WeekdayDistribution } from "./charts/WeekdayDistribution";
import { RegionDistribution } from "./charts/RegionDistribution";

interface InspectionStatsProps {
  inspections: Inspection[];
}

export function InspectionStats({ inspections }: InspectionStatsProps) {
  if (!inspections?.length) {
    return (
      <Card>
        <CardContent className="h-[200px] flex items-center justify-center text-muted-foreground">
          No inspection data available
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <StatusDistribution inspections={inspections} />
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Monthly Trend</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <MonthlyTrend inspections={inspections} />
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>Weekday Distribution</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <WeekdayDistribution inspections={inspections} />
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Region Distribution</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <RegionDistribution inspections={inspections} />
        </CardContent>
      </Card> */}
    </div>
  );
}