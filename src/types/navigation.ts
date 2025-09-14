export interface NavigationState {
  currentPath: string;
  navigationStack: NavigationStackItem[];
  breadcrumbs: BreadcrumbItem[];
}

export interface NavigationStackItem {
  path: string;
  title: string;
  timestamp: number;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  path?: string;
  type?: 'phone' | 'page' | 'external';
  phone?: string;
  url?: string;
  children?: MenuItem[];
}

export interface ServiceCard {
  id: string;
  label: string;
  path?: string;
  type?: 'phone' | 'page';
  phone?: string;
  description?: string;
  icon?: string;
}

export type HeaderConfiguration = 'home' | 'detail';

export interface RouteConfig {
  path: string;
  title: string;
  breadcrumbs: BreadcrumbItem[];
  headerType: HeaderConfiguration;
}