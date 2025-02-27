'use client';

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Inspection } from "@/types/inspection";

interface ActionHeaderProps {
    inspections: Inspection[];
}

export function ActionHeader({ inspections }: ActionHeaderProps) {
    const stats = {
        total: inspections.length,
        pending: inspections.filter(i => i.result === 'FSC APPLIED').length,
        completed: inspections.filter(i => i.result === 'INSPECTION COMPLETED').length,
    };

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold">Inspector Action Center</h1>
                <p className="text-muted-foreground">
                    Manage and track your assigned inspections
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Total Inspections</p>
                        <Badge variant="secondary">{stats.total}</Badge>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Pending</p>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            {stats.pending}
                        </Badge>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Completed</p>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {stats.completed}
                        </Badge>
                    </div>
                </Card>
            </div>
        </div>
    );
}