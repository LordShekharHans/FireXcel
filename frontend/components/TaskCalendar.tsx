'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBoardStore } from '@/store/boardStore';
import { format } from 'date-fns';

export function TaskCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { tasks } = useBoardStore();

  const tasksForDate = tasks.filter(task => 
    task.dueDate && 
    format(new Date(task.dueDate), 'yyyy-MM-dd') === format(date || new Date(), 'yyyy-MM-dd')
  );

  return (
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
          Tasks for {date ? format(date, 'MMMM d, yyyy') : 'Today'}
        </h2>
        <div className="space-y-4">
          {tasksForDate.length === 0 ? (
            <p className="text-muted-foreground">No tasks scheduled for this date</p>
          ) : (
            tasksForDate.map(task => (
              <Card key={task.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge>{task.status}</Badge>
                    <Badge variant="outline">{task.priority}</Badge>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}