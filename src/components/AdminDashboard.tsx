
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Building2, Users, DollarSign, TrendingUp, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const departments = [
    { name: 'Science', budget: 2500000, proposals: 3, status: 'active' },
    { name: 'Arts', budget: 1800000, proposals: 2, status: 'active' },
    { name: 'Engineering', budget: 3200000, proposals: 5, status: 'active' },
    { name: 'Commerce', budget: 2000000, proposals: 4, status: 'active' },
  ];

  // Mock detailed transaction data for sheet view
  const getTransactionDetails = (department: string) => {
    const transactions = {
      'Science': [
        { refNo: 'SCI-2024-001', date: '2024-06-15', description: 'Laboratory Equipment Purchase', subHead: 'Major/Equipment', amount: 150000 },
        { refNo: 'SCI-2024-002', date: '2024-06-10', description: 'Research Materials', subHead: 'Minor/Supplies', amount: 25000 },
        { refNo: 'SCI-2024-003', date: '2024-06-08', description: 'Conference Registration Fees', subHead: 'Minor/Travel', amount: 12000 },
        { refNo: 'SCI-2024-004', date: '2024-06-05', description: 'Microscope Maintenance', subHead: 'Major/Equipment', amount: 18000 },
        { refNo: 'SCI-2024-005', date: '2024-06-01', description: 'Chemical Reagents', subHead: 'Minor/Supplies', amount: 8500 },
      ],
      'Arts': [
        { refNo: 'ART-2024-001', date: '2024-06-12', description: 'Art Supplies and Materials', subHead: 'Minor/Supplies', amount: 35000 },
        { refNo: 'ART-2024-002', date: '2024-06-09', description: 'Exhibition Setup Costs', subHead: 'Major/Events', amount: 80000 },
        { refNo: 'ART-2024-003', date: '2024-06-07', description: 'Workshop Equipment', subHead: 'Major/Equipment', amount: 45000 },
        { refNo: 'ART-2024-004', date: '2024-06-03', description: 'Guest Artist Honorarium', subHead: 'Minor/Professional', amount: 15000 },
      ],
      'Engineering': [
        { refNo: 'ENG-2024-001', date: '2024-06-14', description: 'CAD Software License', subHead: 'Major/Software', amount: 120000 },
        { refNo: 'ENG-2024-002', date: '2024-06-11', description: 'Industrial Training Program', subHead: 'Major/Training', amount: 95000 },
        { refNo: 'ENG-2024-003', date: '2024-06-09', description: 'Laboratory Tools', subHead: 'Minor/Equipment', amount: 28000 },
        { refNo: 'ENG-2024-004', date: '2024-06-06', description: 'Project Materials', subHead: 'Minor/Supplies', amount: 42000 },
        { refNo: 'ENG-2024-005', date: '2024-06-04', description: 'Workstation Upgrade', subHead: 'Major/Equipment', amount: 85000 },
        { refNo: 'ENG-2024-006', date: '2024-06-02', description: 'Safety Equipment', subHead: 'Minor/Safety', amount: 22000 },
      ],
      'Commerce': [
        { refNo: 'COM-2024-001', date: '2024-06-13', description: 'Business Software Suite', subHead: 'Major/Software', amount: 75000 },
        { refNo: 'COM-2024-002', date: '2024-06-10', description: 'Market Research Tools', subHead: 'Minor/Research', amount: 18000 },
        { refNo: 'COM-2024-003', date: '2024-06-08', description: 'Industry Seminar Costs', subHead: 'Major/Events', amount: 65000 },
        { refNo: 'COM-2024-004', date: '2024-06-05', description: 'Office Stationery', subHead: 'Minor/Supplies', amount: 5500 },
        { refNo: 'COM-2024-005', date: '2024-06-01', description: 'Professional Development', subHead: 'Minor/Training', amount: 32000 },
      ],
    };
    return transactions[department as keyof typeof transactions] || [];
  };

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
            <div className="text-2xl font-bold">₹{totalBudget.toLocaleString('en-IN')}</div>
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
                    <span className="font-semibold">₹{dept.budget.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Proposals:</span>
                    <span className="font-semibold">{dept.proposals}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge 
                      variant={dept.status === 'active' ? 'default' : 'secondary'}
                      className="flex-1 justify-center"
                    >
                      {dept.status.toUpperCase()}
                    </Badge>
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button size="sm" variant="outline" className="ml-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-[800px] sm:max-w-[800px]">
                        <SheetHeader>
                          <SheetTitle>{dept.name} Department - Transaction Details</SheetTitle>
                          <SheetDescription>
                            Detailed view of all transactions and activities for {dept.name} Department
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Ref No.</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Sub-Head</TableHead>
                                <TableHead className="text-right">Amount (₹)</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {getTransactionDetails(dept.name).map((transaction) => (
                                <TableRow key={transaction.refNo}>
                                  <TableCell className="font-medium">{transaction.refNo}</TableCell>
                                  <TableCell>{transaction.date}</TableCell>
                                  <TableCell>{transaction.description}</TableCell>
                                  <TableCell>
                                    <Badge variant={transaction.subHead.startsWith('Major') ? 'default' : 'secondary'}>
                                      {transaction.subHead}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right font-medium">
                                    ₹{transaction.amount.toLocaleString('en-IN')}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
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
                  <p><span className="font-medium">Budget Allocation:</span> ₹{departments.find(d => d.name === selectedDepartment)?.budget.toLocaleString('en-IN')}</p>
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
