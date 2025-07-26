"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, Save, Globe, CreditCard, Mail, Zap, Code, Bell, ArrowLeft } from "lucide-react"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    // Platform Settings
    siteName: "SkillCash",
    siteDescription: "Transform your skills into digital products and start earning today",
    siteUrl: "https://skillcash.com",
    supportEmail: "support@skillcash.com",
    maintenanceMode: false,

    // Payment Settings
    platformFee: 5,
    payoutSchedule: "weekly",
    minimumPayout: 100,
    paymentMethods: ["upi", "bank", "paypal"],

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUser: "noreply@skillcash.com",
    smtpPassword: "••••••••",
    fromEmail: "SkillCash <noreply@skillcash.com>",

    // Feature Flags
    aiRecommendations: true,
    socialLogin: true,
    bulkUpload: false,
    advancedAnalytics: true,

    // API Settings
    rateLimit: 1000,
    webhookUrl: "https://api.skillcash.com/webhooks",
    corsOrigins: "https://skillcash.com,https://app.skillcash.com",
  })

  const handleSave = () => {
    // In a real app, this would save to the backend
    alert("Settings saved successfully!")
  }

  const handleReset = () => {
    // Reset to default values
    if (confirm("Are you sure you want to reset all settings to default values?")) {
      // Reset logic here
      alert("Settings reset to defaults!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Admin</span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">SkillCash Admin</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleReset}>
                Reset to Defaults
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Settings ⚙️</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Settings Management:</strong> Configure platform-wide settings, payment options, email templates,
              and feature flags.
            </p>
          </div>
        </div>

        <Tabs defaultValue="platform" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="platform" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Platform
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payment
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Features
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              API
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Platform Settings */}
          <TabsContent value="platform">
            <Card>
              <CardHeader>
                <CardTitle>Platform Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteUrl">Site URL</Label>
                    <Input
                      id="siteUrl"
                      value={settings.siteUrl}
                      onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                    />
                    <Label>Maintenance Mode</Label>
                    {settings.maintenanceMode && <Badge variant="destructive">Active</Badge>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Settings */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="platformFee">Platform Fee (%)</Label>
                    <Input
                      id="platformFee"
                      type="number"
                      min="0"
                      max="50"
                      value={settings.platformFee}
                      onChange={(e) => setSettings({ ...settings, platformFee: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Payout Schedule</Label>
                    <Select
                      value={settings.payoutSchedule}
                      onValueChange={(value) => setSettings({ ...settings, payoutSchedule: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minimumPayout">Minimum Payout (₹)</Label>
                    <Input
                      id="minimumPayout"
                      type="number"
                      min="1"
                      value={settings.minimumPayout}
                      onChange={(e) => setSettings({ ...settings, minimumPayout: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Supported Payment Methods</Label>
                  <div className="flex flex-wrap gap-4">
                    {["upi", "bank", "paypal", "stripe", "razorpay"].map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <Switch
                          checked={settings.paymentMethods.includes(method)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSettings({
                                ...settings,
                                paymentMethods: [...settings.paymentMethods, method],
                              })
                            } else {
                              setSettings({
                                ...settings,
                                paymentMethods: settings.paymentMethods.filter((m) => m !== method),
                              })
                            }
                          }}
                        />
                        <Label className="capitalize">{method}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={settings.smtpHost}
                      onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      type="number"
                      value={settings.smtpPort}
                      onChange={(e) => setSettings({ ...settings, smtpPort: Number.parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUser">SMTP Username</Label>
                    <Input
                      id="smtpUser"
                      value={settings.smtpUser}
                      onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={settings.smtpPassword}
                      onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email Address</Label>
                  <Input
                    id="fromEmail"
                    value={settings.fromEmail}
                    onChange={(e) => setSettings({ ...settings, fromEmail: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feature Flags */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Feature Flags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">AI Recommendations</div>
                      <div className="text-sm text-gray-600">Enable AI-powered product recommendations</div>
                    </div>
                    <Switch
                      checked={settings.aiRecommendations}
                      onCheckedChange={(checked) => setSettings({ ...settings, aiRecommendations: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Social Login</div>
                      <div className="text-sm text-gray-600">Allow Google/Facebook login</div>
                    </div>
                    <Switch
                      checked={settings.socialLogin}
                      onCheckedChange={(checked) => setSettings({ ...settings, socialLogin: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Bulk Upload</div>
                      <div className="text-sm text-gray-600">Enable bulk product uploads</div>
                    </div>
                    <Switch
                      checked={settings.bulkUpload}
                      onCheckedChange={(checked) => setSettings({ ...settings, bulkUpload: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Advanced Analytics</div>
                      <div className="text-sm text-gray-600">Enable detailed analytics dashboard</div>
                    </div>
                    <Switch
                      checked={settings.advancedAnalytics}
                      onCheckedChange={(checked) => setSettings({ ...settings, advancedAnalytics: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Settings */}
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
                    <Input
                      id="rateLimit"
                      type="number"
                      value={settings.rateLimit}
                      onChange={(e) => setSettings({ ...settings, rateLimit: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      value={settings.webhookUrl}
                      onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="corsOrigins">CORS Origins (comma-separated)</Label>
                  <Textarea
                    id="corsOrigins"
                    value={settings.corsOrigins}
                    onChange={(e) => setSettings({ ...settings, corsOrigins: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                  <p>Notification settings will be available in the next update.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
