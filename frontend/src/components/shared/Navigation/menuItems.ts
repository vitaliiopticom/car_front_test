import type { TFunction } from '@/i18n';
import { PERMISSIONS } from '@/modules/auth';
import { routes } from '@/router/routesList';

import type { NavItemProps } from './elements/NavItem';

export const getMenuItems = (t: TFunction): NavItemProps[] => [
  {
    to: '/',
    icon: 'dashboard',
    label: 'DASHBOARD',
    isLocked: true,
  },
  {
    to: routes.product(),
    icon: 'sliders',
    label: 'Opti(product)',
    isLocked: false,
  },
  {
    to: '/',
    icon: 'activity',
    label: 'Opti(value)',
    isLocked: true,
  },
  {
    to: '/',
    icon: 'file',
    label: 'Opti(ads)',
    isLocked: true,
  },
  {
    to: '/leads',
    icon: 'crossahair',
    label: 'Opti(leads)',
    isLocked: false,
    end: true
  },
  {
    to: '/leads/incoming',
    icon: 'folderPlus',
    label: 'Incoming Leads',
    isLocked: false,
  },
  {
    to: '/',
    icon: 'disc',
    label: 'Lead Management',
    isLocked: true,
  },
  {
    to: routes.audit(),
    icon: 'barChart',
    label: t('audit.title'),
    permission: PERMISSIONS.Module_OptiAudit,
  },
  {
    to: routes.companies(),
    icon: 'users',
    label: t('common.companies'),
    permission: PERMISSIONS.Module_Companies,
  },
  {
    to: routes.content(),
    icon: 'layers',
    label: 'Opti(content)',
    permission: PERMISSIONS.Module_OptiContent,
  },
  {
    to: '/',
    icon: 'calendar',
    label: 'AGENDA',
    isLocked: true,
  },
  {
    to: '/',
    icon: 'settings',
    label: 'SETTINGS',
    isLocked: true,
  },
  {
    to: routes.users(),
    icon: 'user',
    label: t('common.users'),
    permission: PERMISSIONS.Module_Users,
  },
];
