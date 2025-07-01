
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserType } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState<UserType | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginType) {
      toast({
        title: "Login Type Required",
        description: "Please select admin or department login type",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const success = login(username, password, loginType as UserType);
    
    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome to AAF Budget Proposal System",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials for the selected login type",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 animate-fade-in">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">AAF Budget System</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="loginType">Login Type</Label>
              <Select value={loginType} onValueChange={setLoginType}>
                <SelectTrigger className="transition-all duration-200 hover:bg-accent">
                  <SelectValue placeholder="Select login type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border shadow-lg">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="transition-all duration-200 focus:scale-105"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-all duration-200 focus:scale-105"
                required
              />
            </div>
            <Button type="submit" className="w-full transition-all duration-200 hover:scale-105" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg animate-fade-in">
            <p className="text-sm font-medium mb-2">Demo Credentials:</p>
            <div className="text-xs space-y-1">
              <p><strong>Admin:</strong> admin / admin123</p>
              <p><strong>Science:</strong> science / science123</p>
              <p><strong>Arts:</strong> arts / arts123</p>
              <p><strong>Engineering:</strong> engineering / eng123</p>
              <p><strong>Commerce:</strong> commerce / comm123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
