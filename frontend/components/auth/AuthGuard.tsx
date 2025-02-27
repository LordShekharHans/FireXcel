"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { roleBasedPaths } from "@/lib/utils/role";

const publicPaths = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/",
  "/verify-land",
];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();

  useEffect(() => {
    // Allow access to public paths
    if (publicPaths.includes(pathname)) {
      // If user is logged in and trying to access auth pages, redirect to their dashboard
      if (user && pathname.startsWith("/auth/")) {
        const redirectPath = roleBasedPaths[user.role];
        router.push(redirectPath);
      }
      return;
    }

    // Redirect to login if not authenticated
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }

    // Get base path for user's role
    const basePath = roleBasedPaths[user.role];

    // Check if current path is allowed for user's role
    const isAllowedPath = pathname.startsWith(basePath);

    // Redirect to role-specific dashboard if path is not allowed
    if (!isAllowedPath) {
      router.push(basePath);
    }
  }, [user, pathname, router]);

  return <>{children}</>;
}
