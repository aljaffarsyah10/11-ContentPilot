import {
  LayoutDashboard,
  Calendar,
  FileText,
  Lightbulb,
  Sparkles,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Contents",
    href: "/contents",
    icon: FileText,
  },
  {
    title: "Content Ideas",
    href: "/ideas",
    icon: Lightbulb,
  },
  {
    title: "AI Generator",
    href: "/ai-generator",
    icon: Sparkles,
  },
];

export const secondaryNavItems: NavItem[] = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

