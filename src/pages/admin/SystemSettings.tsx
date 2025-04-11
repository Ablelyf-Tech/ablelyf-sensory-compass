
import React, { useState } from "react";
import { PageTemplate } from "@/components/shared/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  Shield, 
  Bell, 
  Database, 
  Mail, 
  Server, 
  FileJson, 
  CheckCircle, 
  Globe,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Form schema for general settings
const generalSettingsSchema = z.object({
  siteName: z.string().min(2, { message: "Site name must be at least 2 characters" }),
  supportEmail: z.string().email({ message: "Invalid email address" }),
  timeZone: z.string().min(1, { message: "Time zone is required" }),
  dateFormat: z.string().min(1, { message: "Date format is required" }),
  languagePreference: z.string().min(1, { message: "Language preference is required" }),
});

// Form schema for security settings
const securitySettingsSchema = z.object({
  passwordPolicy: z.string().min(1, { message: "Password policy is required" }),
  mfaEnabled: z.boolean(),
  sessionTimeout: z.string().min(1, { message: "Session timeout is required" }),
  failedLoginAttempts: z.string().min(1, { message: "Failed login attempts is required" }),
});

// Form schema for notification settings
const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  alertNotifications: z.boolean(),
  reportNotifications: z.boolean(),
  systemUpdates: z.boolean(),
  newsletterEnabled: z.boolean(),
});

// Form schema for backup settings
const backupSettingsSchema = z.object({
  backupFrequency: z.string().min(1, { message: "Backup frequency is required" }),
  retentionPeriod: z.string().min(1, { message: "Retention period is required" }),
  backupLocation: z.string().min(1, { message: "Backup location is required" }),
  autoBackup: z.boolean(),
});

// Form schema for integration settings
const integrationSettingsSchema = z.object({
  apiBaseUrl: z.string().url({ message: "Must be a valid URL" }),
  apiKey: z.string().min(1, { message: "API key is required" }),
  webhookUrl: z.string().url({ message: "Must be a valid URL" }),
  integrationType: z.string().min(1, { message: "Integration type is required" }),
});

type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>;
type SecuritySettingsValues = z.infer<typeof securitySettingsSchema>;
type NotificationSettingsValues = z.infer<typeof notificationSettingsSchema>;
type BackupSettingsValues = z.infer<typeof backupSettingsSchema>;
type IntegrationSettingsValues = z.infer<typeof integrationSettingsSchema>;

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();

  // Default values and forms
  const generalForm = useForm<GeneralSettingsValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      siteName: "AbleLyf Sensory Care",
      supportEmail: "support@ablelyf.com",
      timeZone: "UTC",
      dateFormat: "MM/DD/YYYY",
      languagePreference: "en-US",
    },
  });

  const securityForm = useForm<SecuritySettingsValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      passwordPolicy: "complex",
      mfaEnabled: true,
      sessionTimeout: "30",
      failedLoginAttempts: "5",
    },
  });

  const notificationForm = useForm<NotificationSettingsValues>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailNotifications: true,
      alertNotifications: true,
      reportNotifications: true,
      systemUpdates: true,
      newsletterEnabled: false,
    },
  });

  const backupForm = useForm<BackupSettingsValues>({
    resolver: zodResolver(backupSettingsSchema),
    defaultValues: {
      backupFrequency: "daily",
      retentionPeriod: "30",
      backupLocation: "cloud",
      autoBackup: true,
    },
  });

  const integrationForm = useForm<IntegrationSettingsValues>({
    resolver: zodResolver(integrationSettingsSchema),
    defaultValues: {
      apiBaseUrl: "https://api.ablelyf.com",
      apiKey: "sk_test_abcdef123456",
      webhookUrl: "https://webhook.ablelyf.com/incoming",
      integrationType: "rest",
    },
  });

  const handleSaveSettings = (
    data: any,
    settingType: string
  ) => {
    console.log(`Saving ${settingType} settings:`, data);
    
    toast({
      title: "Settings saved",
      description: `Your ${settingType} settings have been updated successfully.`,
    });
  };

  return (
    <PageTemplate title="System Settings" description="Configure system-wide settings and preferences">
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Backup
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <FileJson className="h-4 w-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic system settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...generalForm}>
                  <form 
                    onSubmit={generalForm.handleSubmit((data) => handleSaveSettings(data, "general"))} 
                    className="space-y-6"
                  >
                    <FormField
                      control={generalForm.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            The name displayed throughout the application
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="supportEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Support Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Email address for support inquiries
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={generalForm.control}
                        name="timeZone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time Zone</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time zone" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="UTC">UTC</SelectItem>
                                <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                                <SelectItem value="CST">Central Time (CST)</SelectItem>
                                <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                                <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="dateFormat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date Format</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select date format" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                <SelectItem value="MMM DD, YYYY">MMM DD, YYYY</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="languagePreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Language</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="en-US">English (US)</SelectItem>
                                <SelectItem value="en-GB">English (UK)</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="mt-6">Save Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security and access control settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...securityForm}>
                  <form 
                    onSubmit={securityForm.handleSubmit((data) => handleSaveSettings(data, "security"))} 
                    className="space-y-6"
                  >
                    <FormField
                      control={securityForm.control}
                      name="passwordPolicy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password Policy</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select password policy" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="simple">Simple (8+ characters)</SelectItem>
                              <SelectItem value="moderate">Moderate (8+ chars, includes numbers)</SelectItem>
                              <SelectItem value="complex">Complex (8+ chars, upper/lower/numbers/symbols)</SelectItem>
                              <SelectItem value="very-complex">Very Complex (12+ chars, upper/lower/numbers/symbols)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Defines the complexity requirements for user passwords
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="mfaEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Multi-Factor Authentication</FormLabel>
                            <FormDescription>
                              Require users to provide a second form of authentication
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={securityForm.control}
                        name="sessionTimeout"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Session Timeout (minutes)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="5" max="240" />
                            </FormControl>
                            <FormDescription>
                              Time until users are automatically logged out
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={securityForm.control}
                        name="failedLoginAttempts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Failed Login Attempts</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="1" max="10" />
                            </FormControl>
                            <FormDescription>
                              Number of failed attempts before account lockout
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="mt-6">Save Security Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how and when notifications are sent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...notificationForm}>
                  <form 
                    onSubmit={notificationForm.handleSubmit((data) => handleSaveSettings(data, "notification"))} 
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <FormField
                        control={notificationForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Email Notifications</FormLabel>
                              <FormDescription>
                                Send notifications via email
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="alertNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Alert Notifications</FormLabel>
                              <FormDescription>
                                Send notifications for patient alerts
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="reportNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Report Notifications</FormLabel>
                              <FormDescription>
                                Send notifications when reports are generated
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="systemUpdates"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">System Updates</FormLabel>
                              <FormDescription>
                                Send notifications about system updates
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="newsletterEnabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Newsletter</FormLabel>
                              <FormDescription>
                                Send newsletters and promotional materials
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="mt-6">Save Notification Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup Settings */}
          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Backup & Recovery</CardTitle>
                <CardDescription>
                  Configure database backup and recovery settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...backupForm}>
                  <form 
                    onSubmit={backupForm.handleSubmit((data) => handleSaveSettings(data, "backup"))} 
                    className="space-y-6"
                  >
                    <FormField
                      control={backupForm.control}
                      name="backupFrequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Backup Frequency</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select backup frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How often backups should be created
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={backupForm.control}
                      name="retentionPeriod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Retention Period (days)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" min="1" max="365" />
                          </FormControl>
                          <FormDescription>
                            How long to keep backups before deleting
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={backupForm.control}
                      name="backupLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Backup Location</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select backup location" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="local">Local Storage</SelectItem>
                              <SelectItem value="cloud">Cloud Storage</SelectItem>
                              <SelectItem value="hybrid">Hybrid (Local + Cloud)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Where backups should be stored
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={backupForm.control}
                      name="autoBackup"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Automatic Backups</FormLabel>
                            <FormDescription>
                              Enable scheduled automatic backups
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between">
                      <Button type="submit">Save Backup Settings</Button>
                      <div className="space-x-2">
                        <Button type="button" variant="outline">
                          <Database className="mr-2 h-4 w-4" />
                          Run Manual Backup
                        </Button>
                        <Button type="button" variant="outline">
                          <Server className="mr-2 h-4 w-4" />
                          Restore from Backup
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration Settings */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API & Integrations</CardTitle>
                <CardDescription>
                  Configure external integrations and API settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...integrationForm}>
                  <form 
                    onSubmit={integrationForm.handleSubmit((data) => handleSaveSettings(data, "integration"))} 
                    className="space-y-6"
                  >
                    <FormField
                      control={integrationForm.control}
                      name="integrationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Integration Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select integration type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="rest">REST API</SelectItem>
                              <SelectItem value="graphql">GraphQL</SelectItem>
                              <SelectItem value="soap">SOAP</SelectItem>
                              <SelectItem value="webhook">Webhook</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Type of API integration
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={integrationForm.control}
                      name="apiBaseUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Base URL</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            The root URL for API endpoints
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={integrationForm.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Key</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormDescription>
                            Authentication key for API access
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={integrationForm.control}
                      name="webhookUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Webhook URL</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            URL to receive webhook notifications
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between">
                      <Button type="submit">Save Integration Settings</Button>
                      <div className="space-x-2">
                        <Button type="button" variant="outline">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Test Connection
                        </Button>
                        <Button type="button" variant="outline">
                          <Globe className="mr-2 h-4 w-4" />
                          API Documentation
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Available Integrations</CardTitle>
                <CardDescription>
                  Third-party services that can be integrated with the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Email Service Provider</h4>
                        <p className="text-sm text-muted-foreground">
                          Configure SMTP settings for sending emails
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-100 rounded-full">
                        <FileJson className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Electronic Health Records</h4>
                        <p className="text-sm text-muted-foreground">
                          Integrate with EHR systems via FHIR API
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-100 rounded-full">
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Authentication Provider</h4>
                        <p className="text-sm text-muted-foreground">
                          Single sign-on via OAuth2 or SAML
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default SystemSettings;
