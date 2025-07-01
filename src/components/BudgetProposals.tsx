
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const BudgetProposals = () => {
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    category: '',
    priority: ''
  });

  const proposals = [
    {
      id: 'BP001',
      title: 'Laboratory Equipment Upgrade',
      department: 'Science',
      amount: 150000,
      status: 'Pending',
      date: '2024-06-15',
      priority: 'High'
    },
    {
      id: 'BP002',
      title: 'Library Digital Resources',
      department: 'Arts',
      amount: 75000,
      status: 'Approved',
      date: '2024-06-10',
      priority: 'Medium'
    },
    {
      id: 'BP003',
      title: 'Computer Lab Setup',
      department: 'Engineering',
      amount: 200000,
      status: 'Under Review',
      date: '2024-06-20',
      priority: 'High'
    },
    {
      id: 'BP004',
      title: 'Seminar Hall Audio System',
      department: 'Commerce',
      amount: 85000,
      status: 'Rejected',
      date: '2024-06-08',
      priority: 'Low'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Proposal Submitted",
      description: "Your budget proposal has been submitted for review",
    });
    setIsCreating(false);
    setFormData({ title: '', description: '', amount: '', category: '', priority: '' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Rejected': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Approved': return 'default';
      case 'Rejected': return 'destructive';
      case 'Under Review': return 'secondary';
      default: return 'outline';
    }
  };

  const filteredProposals = user?.type === 'admin' 
    ? proposals 
    : proposals.filter(p => p.department === user?.department);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Budget Proposals</h1>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="transition-all duration-200 hover:scale-105">
              <Plus className="h-4 w-4 mr-2" />
              New Proposal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] animate-scale-in">
            <DialogHeader>
              <DialogTitle>Create New Budget Proposal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Proposal Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">Submit Proposal</Button>
                <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {filteredProposals.map((proposal, index) => (
          <Card key={proposal.id} className={`hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">{proposal.title}</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(proposal.status)}
                <Badge variant={getStatusVariant(proposal.status)}>
                  {proposal.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Proposal ID</div>
                  <div className="font-medium">{proposal.id}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Department</div>
                  <div className="font-medium">{proposal.department}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Amount</div>
                  <div className="font-medium">₹{proposal.amount.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Priority</div>
                  <Badge variant={proposal.priority === 'High' ? 'destructive' : proposal.priority === 'Medium' ? 'secondary' : 'outline'}>
                    {proposal.priority}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">Submitted: {proposal.date}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="transition-all duration-200 hover:scale-105">
                    View Details
                  </Button>
                  {user?.type === 'admin' && proposal.status === 'Pending' && (
                    <>
                      <Button size="sm" variant="default" className="transition-all duration-200 hover:scale-105">
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" className="transition-all duration-200 hover:scale-105">
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BudgetProposals;
