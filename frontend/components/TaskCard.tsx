"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types/types";
import { format } from "date-fns";
import { AlertCircle, Calendar } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  task: Task;
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800",
};

const statusColors = {
  PENDING: "bg-gray-100 text-gray-800",
  SUBMITTED: "bg-blue-100 text-blue-800",
  "UNDER REVIEW": "bg-yellow-100 text-yellow-800",
  "STAGE 1 APPROVED": "bg-green-100 text-green-800",
  "FSC APPLIED": "bg-purple-100 text-purple-800",
  "INSPECTION SCHEDULED": "bg-orange-100 text-orange-800",
  "INSPECTION COMPLETED": "bg-cyan-100 text-cyan-800",
  "NOC APPROVED": "bg-emerald-100 text-emerald-800",
  "NOC REJECTED": "bg-red-100 text-red-800",
  "RENEWAL APPLIED": "bg-red-100 text-red-800",
  "RENEWAL APPROVED": "bg-emerald-100 text-emerald-800",
};

export const TaskCard = ({ task }: Props) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "Task", task },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getStatusFromDescription = (description: string): string => {
    const match = description.match(/Status: ([A-Z\s]+)/);
    return match ? match[1] : "";
  };

  const status = getStatusFromDescription(task.description);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "bg-card p-4 shadow-sm hover:shadow-md transition-shadow",
        "cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium leading-none">{task.title}</h3>
      </div>

      {task.description && (
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline" className={priorityColors[task.priority]}>
          <AlertCircle className="mr-1 h-3 w-3" />
          {task.priority}
        </Badge>

        {status && (
          <Badge
            variant="outline"
            className={
              statusColors[status as keyof typeof statusColors] ||
              "bg-gray-100 text-gray-800"
            }
          >
            {status}
          </Badge>
        )}
      </div>

      <div className="mt-4 flex items-center justify-end text-sm">
        {task.createdAt && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(task.createdAt), "MMM d")}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
