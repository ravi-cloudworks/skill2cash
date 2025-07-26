"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X, Plus, Minus, FileText, ImageIcon, Edit3 } from "lucide-react"
import { clientStorage } from "@/lib/client-storage"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const pricePresets = [299, 599, 999]

export default function AddProductPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [showCustomPrice, setShowCustomPrice] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    shortDescription: "",
    detailedDescription: "",
    price: 599, // Default to middle preset
    comparePrice: "",
    whatsIncluded: [""],
    files: {
      mainFile: null as File | null,
      coverImage: null as File | null,
      previewFile: null as File | null,
      videoUrl: "",
      videoType: "upload", // upload, youtube, vimeo
    },
  })

  const categories = ["DevOps", "Frontend", "Backend", "Cloud", "Data", "Security", "Mobile", "AI/ML"]

  const addIncludedItem = () => {
    setFormData({
      ...formData,
      whatsIncluded: [...formData.whatsIncluded, ""],
    })
  }

  const removeIncludedItem = (index: number) => {
    setFormData({
      ...formData,
      whatsIncluded: formData.whatsIncluded.filter((_, i) => i !== index),
    })
  }

  const updateIncludedItem = (index: number, value: string) => {
    const updated = [...formData.whatsIncluded]
    updated[index] = value
    setFormData({
      ...formData,
      whatsIncluded: updated,
    })
  }

  const handleFileUpload = async (file: File, type: "main" | "cover" | "preview") => {
    console.log(`Uploading ${type} file:`, file.name)
    setIsUploading(true)

    // For GitHub Pages demo, we'll simulate file upload
    // In production, use Vercel Blob or similar service
    setTimeout(() => {
      setFormData({
        ...formData,
        files: {
          ...formData.files,
          [type === "main" ? "mainFile" : type === "cover" ? "coverImage" : "previewFile"]: file,
        },
      })
      setIsUploading(false)
    }, 1000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      const productData = {
        id: `${formData.title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
        title: formData.title,
        category: formData.category,
        shortDescription: formData.shortDescription,
        detailedDescription: formData.detailedDescription,
        price: formData.price,
        comparePrice: formData.comparePrice ? Number.parseFloat(formData.comparePrice) : null,
        whatsIncluded: formData.whatsIncluded.filter((item) => item.trim()),
        sellerId: "demo-user", // Remove Clerk dependency
        createdAt: new Date().toISOString(),
        status: "active",
        stats: {
          sales: 0,
          revenue: 0,
          views: 0,
          rating: 0,
          reviewCount: 0,
        },
      }

      // Save to client storage for demo
      clientStorage.saveProduct(productData)

      alert("Product created successfully! (Demo mode)")
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Error creating product:", error)
      alert("Error creating product")
    } finally {
      setIsUploading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const suggestedPriceRange = formData.category === "DevOps" ? "₹599-₹1,999" : "₹299-₹999"

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        subtitle="Add New Product"
        showStoreLink={true}
        storeUrl="demo-store"
        userType="creator"
        currentPage="products"
      />

      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">📦 Add New Product</h1>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Demo Mode:</strong> This is running on GitHub Pages. In production, files would be stored
                securely and payments processed via UPI.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Advanced Kubernetes Deployment Patterns"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Input
                      id="shortDescription"
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="Production-ready K8s deployments for scale"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="detailedDescription">Detailed Description *</Label>
                    <Textarea
                      id="detailedDescription"
                      value={formData.detailedDescription}
                      onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                      placeholder="Deep dive into advanced Kubernetes patterns used by top companies. Includes real-world examples, troubleshooting guides, and battle-tested configs..."
                      rows={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* What's Included */}
              <Card>
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.whatsIncluded.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={item}
                        onChange={(e) => updateIncludedItem(index, e.target.value)}
                        placeholder="45-page deployment guide"
                      />
                      {formData.whatsIncluded.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeIncludedItem(index)}>
                          <Minus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addIncludedItem}
                    className="w-full bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!showCustomPrice ? (
                    <div className="space-y-4">
                      <Label>Choose Price *</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {pricePresets.map((preset) => (
                          <Button
                            key={preset}
                            type="button"
                            variant={formData.price === preset ? "default" : "outline"}
                            onClick={() => setFormData({ ...formData, price: preset })}
                            className="h-16 flex flex-col"
                          >
                            <span className="text-lg font-bold">{formatCurrency(preset)}</span>
                            <span className="text-xs opacity-70">
                              {preset === 299 ? "Starter" : preset === 599 ? "Popular" : "Premium"}
                            </span>
                          </Button>
                        ))}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowCustomPrice(true)}
                        className="w-full"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Set Custom Price
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="price">Custom Price *</Label>
                        <Button type="button" variant="ghost" size="sm" onClick={() => setShowCustomPrice(false)}>
                          Back to Presets
                        </Button>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <Input
                          id="price"
                          type="number"
                          step="1"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                          placeholder="999"
                          className="pl-8"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="comparePrice">Compare Price (optional)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <Input
                        id="comparePrice"
                        type="number"
                        step="1"
                        value={formData.comparePrice}
                        onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })}
                        placeholder="1299"
                        className="pl-8"
                      />
                    </div>
                  </div>

                  {formData.category && (
                    <p className="text-sm text-blue-600">
                      💡 Suggested range for {formData.category} guides: {suggestedPriceRange}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* File Upload - Demo Version */}
              <Card>
                <CardHeader>
                  <CardTitle>Files Upload (Demo)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Demo Note:</strong> File uploads are simulated. In production, files would be securely
                      stored and delivered via download links.
                    </p>
                  </div>

                  {/* Main File */}
                  <div className="space-y-2">
                    <Label>Main Guide/Course File *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {formData.files.mainFile ? (
                        <div className="flex items-center justify-center gap-2">
                          <FileText className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium">{formData.files.mainFile.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setFormData({ ...formData, files: { ...formData.files, mainFile: null } })}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">Upload your main product file</p>
                          <input
                            type="file"
                            accept=".pdf,.zip,.docx"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "main")}
                            className="hidden"
                            id="main-file"
                          />
                          <Label htmlFor="main-file" className="cursor-pointer">
                            <Button type="button" variant="outline" size="sm">
                              Choose File
                            </Button>
                          </Label>
                          <p className="text-xs text-gray-500 mt-1">PDF, ZIP, DOCX up to 100MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cover Image */}
                  <div className="space-y-2">
                    <Label>Cover Image *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {formData.files.coverImage ? (
                        <div className="flex items-center justify-center gap-2">
                          <ImageIcon className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium">{formData.files.coverImage.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setFormData({ ...formData, files: { ...formData.files, coverImage: null } })}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">Upload cover image</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], "cover")}
                            className="hidden"
                            id="cover-image"
                          />
                          <Label htmlFor="cover-image" className="cursor-pointer">
                            <Button type="button" variant="outline" size="sm">
                              Choose Image
                            </Button>
                          </Label>
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Button type="button" variant="outline">
                    Save Draft
                  </Button>
                  <Button type="button" variant="outline">
                    Preview
                  </Button>
                </div>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? "Creating..." : "Create Product (Demo)"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
