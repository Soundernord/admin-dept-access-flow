
import React from 'react';
import { Building2, Users, FileText, Settings, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const AppSidebar = () => {
  const { user, logout } = useAuth();

  const adminItems = [
    {
      title: "Dashboard",
      icon: Building2,
      url: "#dashboard",
    },
    {
      title: "Monitor Departments",
      icon: Users,
      url: "#monitor",
    },
    {
      title: "Budget Proposals",
      icon: FileText,
      url: "#proposals",
    },
    {
      title: "Settings",
      icon: Settings,
      url: "#settings",
    },
  ];

  const departmentItems = [
    {
      title: "Dashboard",
      icon: Building2,
      url: "#dashboard",
    },
    {
      title: "My Budget",
      icon: FileText,
      url: "#budget",
    },
    {
      title: "Proposals",
      icon: FileText,
      url: "#proposals",
    },
  ];

  const menuItems = user?.type === 'admin' ? adminItems : departmentItems;

  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-slate-700">
            AAF Budget System
          </SidebarGroupLabel>
          <div className="px-2 py-2 text-sm text-slate-600">
            Welcome, {user?.name}
          </div>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
