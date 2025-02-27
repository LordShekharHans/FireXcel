'use client';

import { useState, useEffect } from 'react';
import { HARDCODED_CHECKLIST } from '../data/checklist';
import { Checklist } from '../types/checklist';

export function useChecklist(applicationId?: number) {
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!applicationId) return;

    // Simulate API loading
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      try {
        setChecklist(HARDCODED_CHECKLIST);
        setError(null);
      } catch (err) {
        setError('Failed to load checklist');
        console.error('Error loading checklist:', err);
      } finally {
        setIsLoading(false);
      }
    }, 1000); // Simulate 1s loading time

    return () => clearTimeout(timer);
  }, [applicationId]);

  return { checklist, isLoading, error };
}