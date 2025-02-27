'use client';

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { LogoutConfirmModal } from './LogoutConfirmModal';

export function LogoutButton() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <>
      <Button 
        variant="destructive" 
        size="icon" 
        onClick={() => setShowConfirmModal(true)}
        aria-label="Logout"
      >
        <LogOut className="h-4 w-4" />
      </Button>

      <LogoutConfirmModal  
        open={showConfirmModal} 
        onOpenChange={setShowConfirmModal} 
      />
    </>
  );
}