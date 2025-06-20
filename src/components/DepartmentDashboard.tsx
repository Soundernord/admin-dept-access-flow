
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DepartmentDashboard = () => {
  const { user } = useAuth();

  // Mock account data based on department
  const getAccountData = (department: string) => {
    const budgets = {
      'Science': { total: 250000, used: 162500, remaining: 87500, proposals: 3 },
      'Arts': { total: 180000, used: 117000, remaining: 63000, proposals: 2 },
      'Engineering': { total: 320000, used: 208000, remaining: 112000, proposals: 5 },
      'Commerce': { total: 200000, used: 130000, remaining: 70000, proposals: 4 },
    };
    return budgets[department as keyof typeof budgets] || budgets['Science'];
  };

  const accountData = getAccountData(user?.department || '');
  const utilizationPercentage = (accountData.used / accountData.total) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800">
          {user?.department} Department Dashboard
        </h1>
        <Badge variant="secondary" className="px-3 py-1">
          Department User
        </Badge>
      </div>

      {/* Account Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${accountData.total.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${accountData.used.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {utilizationPercentage.toFixed(1)}% utilized
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${accountData.remaining.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Available for use
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountData.proposals}</div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Utilization */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Utilization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Used: ${accountData.used.toLocaleString()}</span>
              <span>Remaining: ${accountData.remaining.toLocaleString()}</span>
            </div>
            <Progress value={utilizationPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">${(accountData.used * 0.4).toLocaleString()}</div>
              <div className="text-sm text-green-700">Equipment</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">${(accountData.used * 0.35).toLocaleString()}</div>
              <div className="text-sm text-blue-700">Research</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">${(accountData.used * 0.25).toLocaleString()}</div>
              <div className="text-sm text-purple-700">Operations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Details */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Account Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Account ID:</span>
                    <span className="font-medium">AAF-{user?.department?.toUpperCase()}-001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Fiscal Year:</span>
                    <span className="font-medium">2024-2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Account Type:</span>
                    <span className="font-medium">Departmental Budget</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Status:</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">Recent Transactions</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-600">Lab Equipment Purchase</span>
                    <span className="font-medium text-red-600">-$15,000</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-600">Research Grant</span>
                    <span className="font-medium text-green-600">+$25,000</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span className="text-slate-600">Office Supplies</span>
                    <span className="font-medium text-red-600">-$2,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <Button>Submit New Proposal</Button>
            <Button variant="outline">Download Statement</Button>
            <Button variant="outline">View All Transactions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentDashboard;
