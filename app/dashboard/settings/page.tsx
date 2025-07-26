"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { User, Store, CreditCard, Bell, Shield, Save, MapPin, Globe, Phone } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)

  // Profile Settings
  const [profile, setProfile] = useState({
    name: "Ravishankar Palaniappan",
    email: "ravi@skill2cash.com",
    phone: "+91 9876543210",
    bio: "Experienced HR professional with 8+ years in talent acquisition, performance management, and employee relations. Specialized in building scalable HR processes for growing companies.",
    location: "Bangalore, India",
    website: "https://ravihr.com",
    linkedin: "https://linkedin.com/in/ravihr",
    twitter: "https://twitter.com/ravihr",
  })

  // Store Settings
  const [store, setStore] = useState({
    storeName: "Ravi's HR Hub",
    storeUrl: "ravi-hr-hub",
    tagline: "Your Complete HR Solutions Partner",
    description:
      "Professional HR templates, guides, and tools for modern workplaces. 8+ years of experience helping companies build better HR processes.",
    colorTheme: "blue",
    logo: "",
    banner: "",
  })

  // Payment Settings
  const [payment, setPayment] = useState({
    upiId: "ravishankar.pala@okicici",
    bankAccount: "1234567890",
    ifscCode: "ICIC0001234",
    panNumber: "ABCDE1234F",
    gstNumber: "",
  })

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailSales: true,
    emailMarketing: false,
    emailUpdates: true,
    pushSales: true,
    pushMarketing: false,
    pushUpdates: true,
    smsImportant: true,
    smsMarketing: false,
  })

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    showStats: true,
    allowMessages: true,
    showOnDirectory: true,
  })

  // Load saved settings
  useEffect(() => {
    const savedProfile = localStorage.getItem("creatorProfile")
    const savedStore = localStorage.getItem("creatorStore")
    const savedPayment = localStorage.getItem("creatorPayment")
    const savedNotifications = localStorage.getItem("creatorNotifications")
    const savedPrivacy = localStorage.getItem("creatorPrivacy")

    if (savedProfile) setProfile(JSON.parse(savedProfile))
    if (savedStore) setStore(JSON.parse(savedStore))
    if (savedPayment) setPayment(JSON.parse(savedPayment))
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications))
    if (savedPrivacy) setPrivacy(JSON.parse(savedPrivacy))
  }, [])

  const handleSave = async (section: string) => {
    setIsSaving(true)

    // Save to localStorage (in production, this would be an API call)
    switch (section) {
      case "profile":
        localStorage.setItem("creatorProfile", JSON.stringify(profile))
        break
      case "store":
        localStorage.setItem("creatorStore", JSON.stringify(store))
        break
      case "payment":
        localStorage.setItem("creatorPayment", JSON.stringify(payment))
        break
      case "notifications":
        localStorage.setItem("creatorNotifications", JSON.stringify(notifications))
        break
      case "privacy":
        localStorage.setItem("creatorPrivacy", JSON.stringify(privacy))
        break
    }

    // Simulate API delay
    setTimeout(() => {
      setIsSaving(false)
      alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        subtitle="Settings"
        showStoreLink={true}
        storeUrl={store.storeUrl}
        userType="creator"
        currentPage="settings"
      />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your profile, store, and account preferences</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="store" className="flex items-center gap-2">
                <Store className="w-4 h-4" />
                Store
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Payment
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Privacy
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          placeholder="+91 9876543210"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          placeholder="City, Country"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="Tell people about your HR expertise and experience..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="website"
                          value={profile.website}
                          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                          placeholder="https://yourwebsite.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={profile.linkedin}
                        onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={profile.twitter}
                        onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                        placeholder="https://twitter.com/yourhandle"
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave("profile")} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Profile"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Store Tab */}
            <TabsContent value="store">
              <Card>
                <CardHeader>
                  <CardTitle>Store Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name *</Label>
                      <Input
                        id="storeName"
                        value={store.storeName}
                        onChange={(e) => setStore({ ...store, storeName: e.target.value })}
                        placeholder="Your HR Store Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeUrl">Store URL *</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          skill2cash.com/store/
                        </span>
                        <Input
                          id="storeUrl"
                          value={store.storeUrl}
                          onChange={(e) => setStore({ ...store, storeUrl: e.target.value })}
                          placeholder="your-store-url"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline">Store Tagline</Label>
                    <Input
                      id="tagline"
                      value={store.tagline}
                      onChange={(e) => setStore({ ...store, tagline: e.target.value })}
                      placeholder="Your Complete HR Solutions Partner"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Store Description</Label>
                    <Textarea
                      id="description"
                      value={store.description}
                      onChange={(e) => setStore({ ...store, description: e.target.value })}
                      placeholder="Describe your HR expertise and what customers can expect from your products..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="colorTheme">Color Theme</Label>
                    <Select
                      value={store.colorTheme}
                      onValueChange={(value) => setStore({ ...store, colorTheme: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={() => handleSave("store")} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Store Settings"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Important:</strong> This information is used for receiving payments from customers. Keep
                      it accurate and up-to-date.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID *</Label>
                    <Input
                      id="upiId"
                      value={payment.upiId}
                      onChange={(e) => setPayment({ ...payment, upiId: e.target.value })}
                      placeholder="your-upi-id@bank"
                    />
                    <p className="text-xs text-gray-500">
                      This will be used to generate QR codes for customer payments
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankAccount">Bank Account Number</Label>
                      <Input
                        id="bankAccount"
                        value={payment.bankAccount}
                        onChange={(e) => setPayment({ ...payment, bankAccount: e.target.value })}
                        placeholder="1234567890"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ifscCode">IFSC Code</Label>
                      <Input
                        id="ifscCode"
                        value={payment.ifscCode}
                        onChange={(e) => setPayment({ ...payment, ifscCode: e.target.value })}
                        placeholder="ICIC0001234"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="panNumber">PAN Number *</Label>
                      <Input
                        id="panNumber"
                        value={payment.panNumber}
                        onChange={(e) => setPayment({ ...payment, panNumber: e.target.value })}
                        placeholder="ABCDE1234F"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                      <Input
                        id="gstNumber"
                        value={payment.gstNumber}
                        onChange={(e) => setPayment({ ...payment, gstNumber: e.target.value })}
                        placeholder="22AAAAA0000A1Z5"
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave("payment")} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Payment Settings"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailSales">Sales & Orders</Label>
                          <p className="text-sm text-gray-500">Get notified when someone purchases your products</p>
                        </div>
                        <Switch
                          id="emailSales"
                          checked={notifications.emailSales}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, emailSales: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailMarketing">Marketing Updates</Label>
                          <p className="text-sm text-gray-500">Tips, best practices, and platform updates</p>
                        </div>
                        <Switch
                          id="emailMarketing"
                          checked={notifications.emailMarketing}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, emailMarketing: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailUpdates">Product Updates</Label>
                          <p className="text-sm text-gray-500">New features and important announcements</p>
                        </div>
                        <Switch
                          id="emailUpdates"
                          checked={notifications.emailUpdates}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, emailUpdates: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="pushSales">Sales & Orders</Label>
                          <p className="text-sm text-gray-500">Instant notifications for new sales</p>
                        </div>
                        <Switch
                          id="pushSales"
                          checked={notifications.pushSales}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, pushSales: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="pushMarketing">Marketing Updates</Label>
                          <p className="text-sm text-gray-500">Platform tips and growth opportunities</p>
                        </div>
                        <Switch
                          id="pushMarketing"
                          checked={notifications.pushMarketing}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, pushMarketing: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="pushUpdates">Product Updates</Label>
                          <p className="text-sm text-gray-500">New features and announcements</p>
                        </div>
                        <Switch
                          id="pushUpdates"
                          checked={notifications.pushUpdates}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, pushUpdates: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">SMS Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="smsImportant">Important Updates</Label>
                          <p className="text-sm text-gray-500">Critical account and security notifications</p>
                        </div>
                        <Switch
                          id="smsImportant"
                          checked={notifications.smsImportant}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, smsImportant: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="smsMarketing">Marketing Messages</Label>
                          <p className="text-sm text-gray-500">Promotional offers and tips</p>
                        </div>
                        <Switch
                          id="smsMarketing"
                          checked={notifications.smsMarketing}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, smsMarketing: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => handleSave("notifications")} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Notification Settings"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="profileVisibility">Profile Visibility</Label>
                        <p className="text-sm text-gray-500">Who can see your profile information</p>
                      </div>
                      <Select
                        value={privacy.profileVisibility}
                        onValueChange={(value) => setPrivacy({ ...privacy, profileVisibility: value })}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="customers">Customers Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showEmail">Show Email Address</Label>
                        <p className="text-sm text-gray-500">Display your email on your public profile</p>
                      </div>
                      <Switch
                        id="showEmail"
                        checked={privacy.showEmail}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showPhone">Show Phone Number</Label>
                        <p className="text-sm text-gray-500">Display your phone number on your public profile</p>
                      </div>
                      <Switch
                        id="showPhone"
                        checked={privacy.showPhone}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, showPhone: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showStats">Show Sales Statistics</Label>
                        <p className="text-sm text-gray-500">Display your sales numbers and ratings publicly</p>
                      </div>
                      <Switch
                        id="showStats"
                        checked={privacy.showStats}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, showStats: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allowMessages">Allow Customer Messages</Label>
                        <p className="text-sm text-gray-500">Let customers contact you directly through the platform</p>
                      </div>
                      <Switch
                        id="allowMessages"
                        checked={privacy.allowMessages}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, allowMessages: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showOnDirectory">Show in Creator Directory</Label>
                        <p className="text-sm text-gray-500">Appear in the public creator directory</p>
                      </div>
                      <Switch
                        id="showOnDirectory"
                        checked={privacy.showOnDirectory}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, showOnDirectory: checked })}
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave("privacy")} disabled={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? "Saving..." : "Save Privacy Settings"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
