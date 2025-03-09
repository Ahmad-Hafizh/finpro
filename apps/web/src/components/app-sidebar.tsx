"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  ChartSpline,
  Wallet,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavDashboard } from "./nav-dasboard";
import { NavReports } from "./nav-report";
import { NavSettings } from "./nav-settings";

// This is sample data.
const data = {
  dashboard: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: GalleryVerticalEnd,
    },
  ],

  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Greeneries",
      logo: GalleryVerticalEnd,
      plan: "Admin Area",
    },
  ],
  navMain: [
    {
      title: "Products Management",
      url: "/admin/product",
      icon: SquareTerminal,
    },
    {
      title: "Categories Management",
      url: "/admin/category",
      icon: Map,
    },
    {
      title: "Voucher Management",
      url: "/admin/voucher",
      icon: Bot,
    },
    {
      title: "Stock Management",
      url: "/admin/stock",
      icon: BookOpen,
    },
    {
      title: "User Management",
      url: "/admin/user",
      icon: Settings2,
    },
    {
      title: "Order Management",
      url: "/admin/order",
      icon: Wallet,
    },
    {
      title: "Store Management",
      url: "/admin/store",
      icon: Frame,
    },
  ],
  projects: [
    {
      title: "Stock Report",
      url: "/admin/stockreport",
      icon: PieChart,
    },
    {
      title: "Sales Report",
      url: "/admin/salesreport",
      icon: ChartSpline,
    },
  ],
  settings: [
    {
      name: "Settings",
      url: "setting/account",
      icon: Settings2,
    },
  ],
  testmain: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavDashboard items={data.dashboard} />
        <NavProjects items={data.navMain} />
        <NavReports items={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavSettings projects={data.settings} />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
