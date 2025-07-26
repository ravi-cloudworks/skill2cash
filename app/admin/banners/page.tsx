"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  CalendarIcon,
  MoreHorizontal,
  Megaphone,
  AlertTriangle,
  Gift,
  Info,
  ExternalLink,
  ArrowRight,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Banner {
  id: string
  type: "maintenance" | "feature" | "promotion" | "notice"
  title: string
  message: string
  ctaText?: string
  ctaLink?: string
  isActive: boolean
  priority: number
  startDate?: Date
  endDate?: Date
  dismissible: boolean
  createdAt: Date
  updatedAt: Date
}

const mockBanners: Banner[] = [
  {
    id: "1",
    type: "promotion",
    title: "🎉 Limited Time Offer",
    message: "Get 50% off on your first product listing! Use code LAUNCH50",
    ctaText: "Claim Offer",
    ctaLink: "/wizard/income-assessment",
    isActive: true,
    priority: 1,
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
    dismissible: true,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  },
  {
    id: "2",
    type: "feature",
    title: "🚀 New Feature",
    message: "Introducing automated email marketing for your products",
    ctaText: "Learn More",
    ctaLink: "/features/email-marketing",
    isActive: false,
    priority: 2,
    dismissible: true,
    createdAt: new Date("2025-01-02"),
    updatedAt: new Date("2025-01-02"),
  },
  {
    id: "3",
    type: "maintenance",
    title: "⚠️ Scheduled Maintenance",
    message: "System maintenance scheduled for tonight 2-4 AM IST",
    isActive: true,
    priority: 0,
    dismissible: false,
    createdAt: new Date("2025-01-03"),
    updatedAt: new Date("2025-01-03"),
  },
]

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(mockBanners)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [formData, setFormData] = useState({
    type: "notice" as Banner["type"],
    title: "",
    message: "",
    ctaText: "",
    ctaLink: "",
    isActive: true,
    priority: 5,
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    dismissible: true,
  })

  const resetForm = () => {
    setFormData({
      type: "notice",
      title: "",
      message: "",
      ctaText: "",
      ctaLink: "",
      isActive: true,
      priority: 5,
      startDate: undefined,
      endDate: undefined,
      dismissible: true,
    })
  }

  const handleCreate = () => {
    const newBanner: Banner = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setBanners([...banners, newBanner])
    setIsCreateDialogOpen(false)
    resetForm()
  }

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setFormData({
      type: banner.type,
      title: banner.title,
      message: banner.message,
      ctaText: banner.ctaText || "",
      ctaLink: banner.ctaLink || "",
      isActive: banner.isActive,
      priority: banner.priority,
      startDate: banner.startDate,
      endDate: banner.endDate,
      dismissible: banner.dismissible,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = () => {
    if (!editingBanner) return

    setBanners(
      banners.map((banner) =>
        banner.id === editingBanner.id ? { ...banner, ...formData, updatedAt: new Date() } : banner,
      ),
    )
    setIsEditDialogOpen(false)
    setEditingBanner(null)
    resetForm()
  }

  const handleDelete = (id: string) => {
    setBanners(banners.filter((banner) => banner.id !== id))
  }

  const toggleActive = (id: string) => {
    setBanners(
      banners.map((banner) =>
        banner.id === id ? { ...banner, isActive: !banner.isActive, updatedAt: new Date() } : banner,
      ),
    )
  }

  const getBannerTypeIcon = (type: Banner["type"]) => {
    switch (type) {
      case "maintenance":
        return <AlertTriangle className="w-4 h-4" />
      case "feature":
        return <Megaphone className="w-4 h-4" />
      case "promotion":
        return <Gift className="w-4 h-4" />
      case "notice":
        return <Info className="w-4 h-4" />
    }
  }

  const getBannerTypeColor = (type: Banner["type"]) => {
    switch (type) {
      case "maintenance":
        return "bg-red-100 text-red-800"
      case "feature":
        return "bg-blue-100 text-blue-800"
      case "promotion":
        return "bg-green-100 text-green-800"
      case "notice":
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const isExternalLink = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://")
  }

  const BannerForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Banner Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value: Banner["type"]) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="notice">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Notice
                </div>
              </SelectItem>
              <SelectItem value="feature">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4" />
                  Feature
                </div>
              </SelectItem>
              <SelectItem value="promotion">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  Promotion
                </div>
              </SelectItem>
              <SelectItem value="maintenance">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Maintenance
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="priority">Priority (0 = Highest)</Label>
          <Input
            id="priority"
            type="number"
            min="0"
            max="10"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: Number.parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="🎉 Limited Time Offer"
        />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Get 50% off on your first product listing!"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ctaText">CTA Text (Optional)</Label>
          <Input
            id="ctaText"
            value={formData.ctaText}
            onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
            placeholder="Learn More"
          />
        </div>

        <div>
          <Label htmlFor="ctaLink">CTA Link (Optional)</Label>
          <Input
            id="ctaLink"
            value={formData.ctaLink}
            onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
            placeholder="/features or https://example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Start Date (Optional)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.startDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.startDate}
                onSelect={(date) => setFormData({ ...formData, startDate: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label>End Date (Optional)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.endDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.endDate}
                onSelect={(date) => setFormData({ ...formData, endDate: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
          />
          <Label htmlFor="isActive">Active</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="dismissible"
            checked={formData.dismissible}
            onCheckedChange={(checked) => setFormData({ ...formData, dismissible: checked })}
          />
          <Label htmlFor="dismissible">Dismissible</Label>
        </div>
      </div>

      {/* Live Preview */}
      <div className="border-t pt-4">
        <Label className="text-sm font-medium mb-2 block">Live Preview</Label>
        <div
          className={cn(
            "py-3 px-4 rounded-lg",
            formData.type === "maintenance" && "bg-red-600 text-white",
            formData.type === "feature" && "bg-blue-600 text-white",
            formData.type === "promotion" && "bg-green-600 text-white",
            formData.type === "notice" && "bg-yellow-600 text-white",
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                {formData.type.toUpperCase()}
              </Badge>
              <div className="flex items-center gap-2">
                <span className="font-medium">{formData.title || "Banner Title"}</span>
                <span className="hidden sm:inline">{formData.message || "Banner message will appear here"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {formData.ctaText && formData.ctaLink && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                >
                  {formData.ctaText}
                  {isExternalLink(formData.ctaLink) ? (
                    <ExternalLink className="w-3 h-3 ml-1" />
                  ) : (
                    <ArrowRight className="w-3 h-3 ml-1" />
                  )}
                </Button>
              )}

              {formData.dismissible && (
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1 h-auto">
                  <span className="text-xs">×</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banner Management</h1>
          <p className="text-gray-600">Create and manage platform-wide announcements</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Banner</DialogTitle>
              <DialogDescription>Create a new banner to display across the platform</DialogDescription>
            </DialogHeader>
            <BannerForm />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
                Create Banner
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Banners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{banners.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Banners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{banners.filter((b) => b.isActive).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {banners.filter((b) => b.startDate && b.startDate > new Date()).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Promotions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {banners.filter((b) => b.type === "promotion").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Banners Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Banners</CardTitle>
          <CardDescription>Manage your platform banners and announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners
                .sort((a, b) => a.priority - b.priority)
                .map((banner) => (
                  <TableRow key={banner.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getBannerTypeIcon(banner.type)}
                        <Badge className={getBannerTypeColor(banner.type)}>{banner.type}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{banner.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{banner.message}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {banner.isActive ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        )}
                        <span className={banner.isActive ? "text-green-600" : "text-gray-400"}>
                          {banner.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{banner.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {banner.startDate && <div>Start: {format(banner.startDate, "MMM dd")}</div>}
                        {banner.endDate && <div>End: {format(banner.endDate, "MMM dd")}</div>}
                        {!banner.startDate && !banner.endDate && <span className="text-gray-400">No schedule</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">{format(banner.updatedAt, "MMM dd, yyyy")}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(banner)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleActive(banner.id)}>
                            {banner.isActive ? (
                              <>
                                <EyeOff className="w-4 h-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(banner.id)} className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Banner</DialogTitle>
            <DialogDescription>Update banner settings and content</DialogDescription>
          </DialogHeader>
          <BannerForm isEdit />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700">
              Update Banner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
