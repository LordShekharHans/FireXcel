'use client';

import { useAuthStore } from '@/store/authStore';
import { redirect } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { useBoardStore } from '@/store/boardStore';
import { Badge } from '@/components/ui/badge';

export default function CalendarView() {
  const { user } = useAuthStore();
  const { tasks } = useBoardStore();
  const [date, setDate] = useState<Date | undefined>(new Date());

  if (!user || user.role !== 'INSPECTOR') {
    redirect('/auth/sign-in');
  }

  const selectedDateTasks = tasks.filter(task => 
    task.dueDate && 
    new Date(task.dueDate).toDateString() === date?.toDateString()
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Calendar View</h1>
      
      <div className="flex flex-col gap-8 lg:flex-row">
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>

        <Card className="flex-1 p-4">
          <h2 className="font-semibold mb-4">
            Tasks for {date?.toLocaleDateString()}
          </h2>
          <div className="space-y-4">
            {selectedDateTasks.length === 0 ? (
              <p className="text-muted-foreground">No tasks scheduled for this date</p>
            ) : (
              selectedDateTasks.map(task => (
                <Card key={task.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                    <Badge variant="secondary">{task.priority}</Badge>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}