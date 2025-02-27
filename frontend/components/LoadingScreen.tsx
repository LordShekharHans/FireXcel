'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function LoadingScreen() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-8 w-[250px]" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[150px]" />
        ))}
      </div>
      <div className="mt-8 space-y-4">
        <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-[200px]" />
      </div>
    </div>
  );
}