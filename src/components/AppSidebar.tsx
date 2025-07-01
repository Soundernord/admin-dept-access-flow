
import React from 'react';
import { Building2, Users, FileText, Settings, User } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface AppSidebarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const AppSidebar = ({ activeNav, setActiveNav }: AppSidebarProps) => {
  const { user } = useAuth();

  const adminItems = [
    {
      title: "Dashboard",
      icon: Building2,
      id: "dashboard",
    },
    {
      title: "Monitor Departments",
      icon: Users,
      id: "monitor",
    },
    {
      title: "Budget Proposals",
      icon: FileText,
      id: "proposals",
    },
    {
      title: "Settings",
      icon: Settings,
      id: "settings",
    },
  ];

  const departmentItems = [
    {
      title: "Dashboard",
      icon: Building2,
      id: "dashboard",
    },
    {
      title: "Budget Proposals",
      icon: FileText,
      id: "proposals",
    },
    {
      title: "Settings",
      icon: Settings,
      id: "settings",
    },
  ];

  const menuItems = user?.type === 'admin' ? adminItems : departmentItems;

  return (
    <Sidebar className="border-r border-slate-200 dark:border-slate-700 animate-slide-in-right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-slate-700 dark:text-slate-300">
            AAF Budget System
          </SidebarGroupLabel>
          <div className="px-2 py-2 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{user?.name}</span>
            </div>
            <Badge variant="secondary" className="mt-1 text-xs">
              {user?.type === 'admin' ? 'Administrator' : `${user?.department} Dept.`}
            </Badge>
          </div>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => setActiveNav(item.id)}
                    className={`transition-all duration-200 hover:scale-105 ${
                      activeNav === item.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-2 text-xs text-center text-slate-500 dark:text-slate-400">
          AAF Budget Management System v2.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
