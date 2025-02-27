"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Calendar,
  KanbanSquare,
  LayoutDashboard,
  List,
  LogOut,
  Menu,
  Settings,
  Timer,
  User,
  CombineIcon,
  LucideFilePieChart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

import { LogoutButton } from "../auth/LogOutButton";



const iconMap = {
  LayoutDashboard,
  List,
  Timer,
  Calendar,
  Settings,
  User,
  KanbanSquare,
  CombineIcon,
};

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/user/inspector",
    icon: "LayoutDashboard",
  },
  {
    title: "Action Center",
    href: `/user/inspector/action`,
    icon: "List",
  },
 
];

export function InspectorNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const NavContent = () => (
    <>
      <div className="p-6 ">
        <h1 className="text-2xl font-bold">Fire Noc Manager</h1>
        <p className="text-sm text-muted-foreground mt-2">{user.name}</p>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {sidebarItems.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === item.href && "bg-secondary"
                )}
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href={item.href}>
                  {Icon && <Icon className="mr-2 h-4 w-4" />}
                  {item.title}
                </Link>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
      <div className="border-t p-4 fixed bottom-0 w-[15rem]">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <LogoutButton />

        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <NavContent />
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-bold">Task Manager</h1>
        <ThemeToggle />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex w-64 flex-col border-r bg-muted/50">
        <NavContent />
      </div>
    </>
  );
}
