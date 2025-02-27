'use client';

import { useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import { ScrollArea } from './ui/scroll-area';
import { ColumnContainer } from './ColumnContainer';
import { TaskCard } from './TaskCard';
import { useBoardStore } from '@/store/boardStore';
import { useState } from 'react';
import { applicationApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const getStatusIdFromColumnId = (columnId: string): number => {
  switch (columnId) {
    case '1': return 1; // Pending/Submitted
    case '2': return 2; // Under Review
    case '3': return 3; // Stage 1 Approved
    case '4': return 4; // FSC Applied
    case '5': return 5; // Inspection Scheduled
    case '6': return 6; // Inspection Completed
    case '7': return 7; // Approved
    case '8': return 8; // Rejected
    case '9' : return 9
    default: return 1;
  }
};

export default function KanbanBoard() {
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();
  
  const {
    columns,
    tasks,
    activeTask,
    setActiveTask,
    moveTask,
    fetchApplications,
  } = useBoardStore();

  useEffect(() => {
    setMounted(true);
    fetchApplications();
  }, [fetchApplications]);

  const sensors = [
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    }),
  ];

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeType = active.data.current?.type;

    if (activeType === 'Task') {
      setActiveTask(active.data.current?.task);
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeType = active.data.current?.type;

    if (activeType === 'Task') {
      try {
        const newStatusId = getStatusIdFromColumnId(overId as string);
        await applicationApi.updateStatus(activeId as string, newStatusId);
        moveTask(activeId as string, overId as string);
        
        await fetchApplications();
        
        toast({
          title: 'Status Updated',
          description: 'Application status has been updated successfully.',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to update application status.',
          variant: 'destructive',
        });
      }
    }

    setActiveTask(null);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Applications Board</h2>
      </div>

      <ScrollArea className="h-full">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 p-4">
            {columns.map((column) => (
              <ColumnContainer
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.columnId === column.id)}
              />
            ))}
          </div>

          {mounted && createPortal(
            <DragOverlay>
              {activeTask && <TaskCard task={activeTask} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </ScrollArea>
    </>
  );
}