
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import AppSidebar from './AppSidebar';
import AdminDashboard from './AdminDashboard';
import DepartmentDashboard from './DepartmentDashboard';
import MonitorDepartments from './MonitorDepartments';
import BudgetProposals from './BudgetProposals';
import Settings from './Settings';
import Profile from './Profile';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

type NavigationItem = 'dashboard' | 'monitor' | 'proposals' | 'settings';

const Dashboard = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeNav, setActiveNav] = useState<NavigationItem>('dashboard');

  const handleNavChange = (nav: string) => {
    setActiveNav(nav as NavigationItem);
  };

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return user?.type === 'admin' ? <AdminDashboard /> : <DepartmentDashboard />;
      case 'monitor':
        return <MonitorDepartments />;
      case 'proposals':
        return <BudgetProposals />;
      case 'settings':
        return <Settings />;
      default:
        return user?.type === 'admin' ? <AdminDashboard /> : <DepartmentDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeNav={activeNav} setActiveNav={handleNavChange} />
        <main className="flex-1">
          <div className="p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="transition-all duration-200 hover:scale-110"
                >
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
                <Profile />
              </div>
            </div>
          </div>
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
