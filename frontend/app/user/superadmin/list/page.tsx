'use client';

import { useAuthStore } from '@/store/authStore';
import { redirect } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import { useBoardStore } from '@/store/boardStore';
import { TaskDialog } from '@/components/TaskDialog';
import { useState } from 'react';
import { DraggableTaskList } from '@/components/DraggableTaskList';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useToast } from '@/hooks/use-toast';

export default function SuperAdminListView() {
  const { user } = useAuthStore();
  const { tasks, moveTask } = useBoardStore();
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  if (!user || user.role !== 'SUPERADMIN') {
    redirect('/auth/sign-in');
  }

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    const overTask = tasks.find((task) => task.id === over.id);

    if (!activeTask || !overTask) return;

    try {
      moveTask(activeTask.id, overTask.columnId);
      toast({
        title: 'Task Moved',
        description: 'Task has been successfully moved.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to move task. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Task List</h1>
        <Button onClick={() => setIsNewTaskDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid gap-4">
          <SortableContext items={filteredTasks.map((task) => task.id)}>
            {filteredTasks.map((task) => (
              <DraggableTaskList key={task.id} task={task} />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      <TaskDialog
        open={isNewTaskDialogOpen}
        onOpenChange={setIsNewTaskDialogOpen}
      />
    </div>
  );
}