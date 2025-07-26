"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, Key, Activity, Ban, Download, ArrowLeft, Eye, Trash2, RefreshCw } from "lucide-react"

export default function AdminSecurity() {
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    sessionTimeout: 24,
    twoFactorRequired: false,
    maxLoginAttempts: 5,
    lockoutDuration: 30,
  })

  const [failedLogins] = useState([
    {
      id: 1,
      email: "suspicious@example.com",
      ip: "192.168.1.100",
      attempts: 8,
      lastAttempt: "2024-01-20 14:30:00",
      status: "blocked",
    },
    {
      id: 2,
      email: "user@example.com",
      ip: "10.0.0.1",
      attempts: 3,
      lastAttempt: "2024-01-20 12:15:00",
      status: "monitoring",
    },
  ])

  const [blockedIPs, setBlockedIPs] = useState([
    {
      id: 1,
      ip: "192.168.1.100",
      reason: "Multiple failed login attempts",
      blockedAt: "2024-01-20 14:30:00",
      expiresAt: "2024-01-21 14:30:00",
    },
    {
      id: 2,
      ip: "203.0.113.0",
      reason: "Suspicious activity",
      blockedAt: "2024-01-19 10:00:00",
      expiresAt: "Permanent",
    },
  ])

  const [apiKeys] = useState([
    {
      id: 1,
      name: "Production API",
      key: "sk_live_••••••••••••••••••••••••••••••••",
      created: "2024-01-15",
      lastUsed: "2024-01-20 15:30:00",
      status: "active",
    },
    {
      id: 2,
      name: "Development API",
      key: "sk_test_••••••••••••••••••••••••••••••••",
      created: "2024-01-10",
      lastUsed: "2024-01-19 09:15:00",
      status: "active",
    },
  ])

  const [auditLogs] = useState([
    {
      id: 1,
      action: "User Login",
      user: "admin@skillcash.com",
      ip: "10.0.0.1",
      timestamp: "2024-01-20 15:45:00",
      status: "success",
    },
    {
      id: 2,
      action: "Password Change",
      user: "creator@example.com",
      ip: "192.168.1.50",
      timestamp: "2024-01-20 14:20:00",
      status: "success",
    },
    {
      id: 3,
      action: "Failed Login",
      user: "suspicious@example.com",
      ip: "192.168.1.100",
      timestamp: "2024-01-20 14:30:00",
      status: "failed",
    },
  ])

  const handleSaveSettings = () => {
    alert("Security settings saved successfully!")
  }

  const unblockIP = (id: number) => {
    setBlockedIPs(blockedIPs.filter((ip) => ip.id !== id))
  }

  const exportAuditLogs = () => {
    alert("Audit logs exported successfully!")
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
            <Button onClick={handleSaveSettings}>
              <Shield className="w-4 h-4 mr-2" />
              Save Security Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Management 🔒</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              <strong>Security Center:</strong> Monitor platform security, manage access controls, and track suspicious
              activities.
            </p>
          </div>
        </div>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="failed-logins" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Failed Logins
            </TabsTrigger>
            <TabsTrigger value="blocked-ips" className="flex items-center gap-2">
              <Ban className="w-4 h-4" />
              Blocked IPs
            </TabsTrigger>
            <TabsTrigger value="api-keys" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="audit-logs" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Audit Logs
            </TabsTrigger>
          </TabsList>

          {/* Security Settings */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password Policy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      min="6"
                      max="32"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordMinLength: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={securitySettings.requireSpecialChars}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          requireSpecialChars: checked,
                        })
                      }
                    />
                    <Label>Require Special Characters</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={securitySettings.requireNumbers}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          requireNumbers: checked,
                        })
                      }
                    />
                    <Label>Require Numbers</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session & Authentication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      min="1"
                      max="168"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          sessionTimeout: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={securitySettings.twoFactorRequired}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          twoFactorRequired: checked,
                        })
                      }
                    />
                    <Label>Require Two-Factor Authentication</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      min="3"
                      max="10"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          maxLoginAttempts: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                    <Input
                      id="lockoutDuration"
                      type="number"
                      min="5"
                      max="1440"
                      value={securitySettings.lockoutDuration}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          lockoutDuration: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Failed Logins */}
          <TabsContent value="failed-logins">
            <Card>
              <CardHeader>
                <CardTitle>Failed Login Attempts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {failedLogins.map((login) => (
                    <div key={login.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{login.email}</span>
                          <Badge variant={login.status === "blocked" ? "destructive" : "secondary"}>
                            {login.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          IP: {login.ip} • {login.attempts} attempts • Last: {login.lastAttempt}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Ban className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blocked IPs */}
          <TabsContent value="blocked-ips">
            <Card>
              <CardHeader>
                <CardTitle>Blocked IP Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blockedIPs.map((ip) => (
                    <div key={ip.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{ip.ip}</span>
                          <Badge variant="destructive">Blocked</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">{ip.reason}</div>
                        <div className="text-xs text-gray-500">
                          Blocked: {ip.blockedAt} • Expires: {ip.expiresAt}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => unblockIP(ip.id)}>
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Keys */}
          <TabsContent value="api-keys">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  API Key Management
                  <Button>
                    <Key className="w-4 h-4 mr-2" />
                    Generate New Key
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{key.name}</span>
                          <Badge variant={key.status === "active" ? "default" : "secondary"}>{key.status}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-1 font-mono">{key.key}</div>
                        <div className="text-xs text-gray-500">
                          Created: {key.created} • Last used: {key.lastUsed}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Logs */}
          <TabsContent value="audit-logs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Security Audit Logs
                  <Button onClick={exportAuditLogs}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Logs
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{log.action}</span>
                          <Badge variant={log.status === "success" ? "default" : "destructive"}>{log.status}</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          User: {log.user} • IP: {log.ip} • {log.timestamp}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
