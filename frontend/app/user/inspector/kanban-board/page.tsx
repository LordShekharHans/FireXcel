'use client';

import dynamic from 'next/dynamic';
import ClientOnly from '@/components/ClientOnly';
import KanbanBoard from '@/components/KanbanBoard';


export default function KanbanBoardPage() {
  return (
    <div className="h-full">
      <ClientOnly>
        <KanbanBoard />
      </ClientOnly>
    </div>
  );
}