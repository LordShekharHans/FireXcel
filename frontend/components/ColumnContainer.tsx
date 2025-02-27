'use client';

import { useDroppable } from '@dnd-kit/core';
import { Column, Task } from '@/types/types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';

interface Props {
  column: Column;
  tasks: Task[];
}

export const ColumnContainer = ({ column, tasks }: Props) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  return (
    <Card 
      ref={setNodeRef}
      className={cn(
        "flex flex-col bg-muted/50 min-w-[280px] h-[calc(100vh-12rem)]",
        isOver && "ring-2 ring-primary ring-inset"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{column.title}</h3>
          <Badge variant="secondary">{tasks.length}</Badge>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex flex-col gap-2 min-h-[100px]">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </Card>
  );
};