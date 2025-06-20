
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Users, DollarSign, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const departments = [
    { name: 'Science', budget: 250000, proposals: 3, status: 'active' },
    { name: 'Arts', budget: 180000, proposals: 2, status: 'active' },
    { name: 'Engineering', budget: 320000, proposals: 5, status: 'active' },
    { name: 'Commerce', budget: 200000, proposals: 4, status: 'active' },
  ];

  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);
  const totalProposals = departments.reduce((sum, dept) => sum + dept.proposals, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        <Badge variant="secondary" className="px-3 py-1">
          Master User
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProposals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length + 1}</div>
          </CardContent>
        </Card>
      </div>

      {/* Department Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Department Monitoring</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept) => (
              <Card 
                key={dept.name} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedDepartment === dept.name 
                    ? 'ring-2 ring-purple-500 bg-purple-50' 
                    : 'hover:bg-slate-50'
                }`}
                onClick={() => setSelectedDepartment(dept.name)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-purple-700">
                    Department of {dept.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Budget:</span>
                    <span className="font-semibold">${dept.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Proposals:</span>
                    <span className="font-semibold">{dept.proposals}</span>
                  </div>
                  <Badge 
                    variant={dept.status === 'active' ? 'default' : 'secondary'}
                    className="w-full justify-center"
                  >
                    {dept.status.toUpperCase()}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Department Details */}
      {selectedDepartment && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-purple-700">
              {selectedDepartment} Department Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-700">Account Information</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Account ID:</span> AAF-{selectedDepartment.toUpperCase()}-001</p>
                  <p><span className="font-medium">Budget Allocation:</span> ${departments.find(d => d.name === selectedDepartment)?.budget.toLocaleString()}</p>
                  <p><span className="font-medium">Utilized:</span> 65%</p>
                  <p><span className="font-medium">Remaining:</span> 35%</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-700">Recent Activity</h3>
                <div className="space-y-1 text-sm text-slate-600">
                  <p>• New proposal submitted</p>
                  <p>• Budget request approved</p>
                  <p>• Quarterly report filed</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-700">Actions</h3>
                <div className="space-y-2">
                  <Button size="sm" className="w-full">View Full Report</Button>
                  <Button size="sm" variant="outline" className="w-full">Generate Statement</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;
