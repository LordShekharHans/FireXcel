import { UserRole } from '@/types/auth';

export const roleBasedPaths: Record<UserRole, string> = {
  SUPERADMIN: '/user/superadmin',
  ADMIN: '/user/admin',
  INSPECTOR: '/user/inspector',
  APPLICANT: '/user/applicant',
};

export const getRolePath = (role: UserRole): string => {
  return role.toLowerCase().replace('_', '-');
};

export const getSidebarItems = (rolePath: string) => {
  return [
    {
      title: 'Dashboard',
      href: `/user/${rolePath}`,
      icon: 'Home',
    },
    {
      title: 'Kanban Board',
      href: `/user/${rolePath}/kanban-board`,
      icon: 'LayoutDashboardIcon',
    },
    {
      title: 'List View',
      href: `/user/${rolePath}/list`,
      icon: 'List',
    },
    {
      title: 'Timeline',
      href: `/user/${rolePath}/timelines`,
      icon: 'Timer',
    },
    {
      title: 'Calendar',
      href: `/user/${rolePath}/calendar`,
      icon: 'Calendar',
    },
    {
      title: 'Blueprint Analyzer',
      href: `/user/${rolePath}/analyze`,
      icon: 'CombineIcon',
    },
    {
      title: 'Reports',
      href: `/user/${rolePath}/reports`,
      icon: 'LucideFilePieChart',
    },
  ];
};