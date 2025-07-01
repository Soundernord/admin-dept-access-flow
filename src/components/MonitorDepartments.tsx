
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Building2, Users, TrendingUp, Eye } from 'lucide-react';

const MonitorDepartments = () => {
  const departments = [
    { 
      name: 'Science', 
      budget: 2500000, 
      used: 1625000, 
      proposals: 3, 
      status: 'On Track',
      head: 'Dr. Sarah Johnson'
    },
    { 
      name: 'Arts', 
      budget: 1800000, 
      used: 1170000, 
      proposals: 2, 
      status: 'Under Budget',
      head: 'Prof. Michael Chen'
    },
    { 
      name: 'Engineering', 
      budget: 3200000, 
      used: 2080000, 
      proposals: 5, 
      status: 'On Track',
      head: 'Dr. Priya Sharma'
    },
    { 
      name: 'Commerce', 
      budget: 2000000, 
      used: 1300000, 
      proposals: 4, 
      status: 'Over Budget',
      head: 'Prof. David Wilson'
    },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Monitor Departments</h1>
        <Badge variant="secondary" className="px-3 py-1">
          4 Active Departments
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept, index) => (
          <Card key={dept.name} className={`hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scale-in`} style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{dept.name}</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold">₹{dept.budget.toLocaleString('en-IN')}</div>
                  <p className="text-xs text-muted-foreground">Total Budget</p>
                </div>
                
                <Progress 
                  value={(dept.used / dept.budget) * 100} 
                  className="h-2" 
                />
                
                <div className="flex justify-between text-xs">
                  <span>Used: ₹{dept.used.toLocaleString('en-IN')}</span>
                  <span>{((dept.used / dept.budget) * 100).toFixed(1)}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant={dept.status === 'On Track' ? 'default' : dept.status === 'Under Budget' ? 'secondary' : 'destructive'}>
                    {dept.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{dept.proposals} proposals</span>
                </div>
                
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">Head: {dept.head}</p>
                </div>
                
                <Button size="sm" variant="outline" className="w-full transition-all duration-200 hover:scale-105">
                  <Eye className="h-3 w-3 mr-1" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Department Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">75%</div>
              <div className="text-sm text-green-700 dark:text-green-400">Average Utilization</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">14</div>
              <div className="text-sm text-blue-700 dark:text-blue-400">Total Proposals</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">₹95,00,000</div>
              <div className="text-sm text-purple-700 dark:text-purple-400">Total Budget</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitorDepartments;
