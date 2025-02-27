'use client';

import { useAuthStore } from '@/store/authStore';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { useBoardStore } from '@/store/boardStore';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function TimelinePage() {
  const { user } = useAuthStore();
  const { tasks } = useBoardStore();

  if (!user || user.role !== 'ADMIN') {
    redirect('/auth/sign-in');
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Timeline</h1>

      <div className="relative">
        <div className="absolute left-9 top-0 bottom-0 border-l-2 border-muted" />
        
        <div className="space-y-8">
          {sortedTasks.map((task) => (
            <div key={task.id} className="relative flex gap-4">
              <div className="absolute left-9 top-5 w-3 h-3 -ml-[5px] rounded-full bg-primary" />
              
              <div className="w-16 pt-2 text-sm text-muted-foreground">
                {/* {task.dueDate ? format(new Date(task.dueDate), 'MMM d') : 'No date'} */}
              </div>

              <Card className="flex-1 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>{task.status}</Badge>
                    <Badge variant="outline">{task.priority}</Badge>
                  </div>
                </div>
                {task.assignee && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    Assigned to: {task.assignee.name}
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}