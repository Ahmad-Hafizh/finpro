// import { Metadata } from 'next';
import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";

interface IadminDashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage your store and product",
};

const AdminDashboardLayout: React.FunctionComponent<
  IadminDashboardLayoutProps
> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default AdminDashboardLayout;
