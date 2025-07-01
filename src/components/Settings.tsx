
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Settings as SettingsIcon, Bell, Shield, Database, Mail, Palette } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      proposals: true,
      budgetAlerts: true
    },
    preferences: {
      language: 'en',
      currency: 'INR',
      dateFormat: 'DD/MM/YYYY',
      timeZone: 'Asia/Kolkata'
    },
    security: {
      twoFactor: false,
      sessionTimeout: '30',
      passwordExpiry: '90'
    },
    system: {
      autoBackup: true,
      dataRetention: '365',
      logLevel: 'info'
    }
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
    toast({
      title: "Setting Updated",
      description: "Your setting has been saved successfully",
    });
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <SettingsIcon className="h-8 w-8" />
          Settings
        </h1>
        <Badge variant="secondary" className="px-3 py-1">
          System Configuration
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme & Appearance */}
        <Card className="animate-scale-in" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Theme & Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme">Dark Mode</Label>
              <Switch
                id="theme"
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={settings.preferences.language} onValueChange={(value) => handleSettingChange('preferences', 'language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="mr">Marathi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Format</Label>
              <Select value={settings.preferences.dateFormat} onValueChange={(value) => handleSettingChange('preferences', 'dateFormat', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="animate-scale-in" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notif">Email Notifications</Label>
              <Switch
                id="email-notif"
                checked={settings.notifications.email}
                onCheckedChange={(value) => handleSettingChange('notifications', 'email', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notif">Push Notifications</Label>
              <Switch
                id="push-notif"
                checked={settings.notifications.push}
                onCheckedChange={(value) => handleSettingChange('notifications', 'push', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="proposal-notif">Proposal Updates</Label>
              <Switch
                id="proposal-notif"
                checked={settings.notifications.proposals}
                onCheckedChange={(value) => handleSettingChange('notifications', 'proposals', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="budget-notif">Budget Alerts</Label>
              <Switch
                id="budget-notif"
                checked={settings.notifications.budgetAlerts}
                onCheckedChange={(value) => handleSettingChange('notifications', 'budgetAlerts', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="animate-scale-in" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="2fa">Two-Factor Authentication</Label>
              <Switch
                id="2fa"
                checked={settings.security.twoFactor}
                onCheckedChange={(value) => handleSettingChange('security', 'twoFactor', value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Session Timeout (minutes)</Label>
              <Input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Password Expiry (days)</Label>
              <Input
                type="number"
                value={settings.security.passwordExpiry}
                onChange={(e) => handleSettingChange('security', 'passwordExpiry', e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="w-full transition-all duration-200 hover:scale-105">
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* System */}
        <Card className="animate-scale-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-backup">Auto Backup</Label>
              <Switch
                id="auto-backup"
                checked={settings.system.autoBackup}
                onCheckedChange={(value) => handleSettingChange('system', 'autoBackup', value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Data Retention (days)</Label>
              <Input
                type="number"
                value={settings.system.dataRetention}
                onChange={(e) => handleSettingChange('system', 'dataRetention', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Log Level</Label>
              <Select value={settings.system.logLevel} onValueChange={(value) => handleSettingChange('system', 'logLevel', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debug">Debug</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warn">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 transition-all duration-200 hover:scale-105">
                Export Data
              </Button>
              <Button variant="outline" size="sm" className="flex-1 transition-all duration-200 hover:scale-105">
                Clear Cache
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
        <CardContent className="pt-6">
          <div className="flex gap-4 justify-center">
            <Button className="transition-all duration-200 hover:scale-105">
              Save All Settings
            </Button>
            <Button variant="outline" className="transition-all duration-200 hover:scale-105">
              Reset to Defaults
            </Button>
            <Button variant="outline" className="transition-all duration-200 hover:scale-105">
              <Mail className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
