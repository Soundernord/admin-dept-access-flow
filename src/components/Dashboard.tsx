
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import AdminDashboard from './AdminDashboard';
import DepartmentDashboard from './DepartmentDashboard';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-4">
            <SidebarTrigger />
          </div>
          {user?.type === 'admin' ? <AdminDashboard /> : <DepartmentDashboard />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
