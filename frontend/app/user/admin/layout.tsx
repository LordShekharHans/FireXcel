import { AdminMenu } from "@/components/shared/AdminMenu";
import React, { useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminMenu />

      <main className="flex-1">
        <div className="flex-1 space-y-4 p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
