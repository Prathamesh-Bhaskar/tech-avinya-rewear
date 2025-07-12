"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Leaf, Upload, X, ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AddItemPage() {
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
    points: "",
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState<string>("")
  const [images, setImages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  const categories = [
    "Tops",
    "Bottoms",
    "Dresses",
    "Outerwear",
    "Shoes",
    "Accessories",
    "Activewear",
    "Formal",
    "Casual",
    "Vintage",
  ]

  const conditions = ["Excellent", "Good", "Fair", "Like New"]

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "6", "8", "10", "12", "14", "16"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages((prev: any[]) => [...prev, ...files].slice(0, 5)) // Max 5 images
  }

  const removeImage = (index: number) => {
    setImages((prev: any[]) => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag: string) => tag !== tagToRemove),
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    try {
      // First upload images
      let imageUrls = []
      if (images.length > 0) {
        const imageFormData = new FormData()
        images.forEach((image) => {
          imageFormData.append("images", image)
        })

        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== 'undefined' && (window as any).VITE_API_BASE_URL) || 'http://localhost:5000';
        const uploadResponse = await fetch(`${API_BASE_URL}/api/items/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: imageFormData,
        })

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json()
          imageUrls = uploadData.urls
        }
      }

      // Then create the item
      const itemData = {
        ...formData,
        images: imageUrls,
        points: Number.parseInt(formData.points),
      }

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== 'undefined' && (window as any).VITE_API_BASE_URL) || 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
      })

      if (response.ok) {
        router.push("/dashboard")
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Failed to create item")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-earth-50">
      {/* Header */}
      <header className="border-b border-earth-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-earth-700 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-earth-800">ReWear</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-earth-800 mb-2">List Your Item</h1>
            <p className="text-earth-600">Share your pre-loved clothing with the community and earn eco points</p>
          </div>

          <Card className="border-earth-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-earth-800">Item Details</CardTitle>
              <CardDescription className="text-earth-600">
                Provide detailed information to help others discover your item
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>
                )}

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label className="text-earth-700">Photos (up to 5)</Label>
                  <div className="border-2 border-dashed border-earth-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-earth-500 mx-auto mb-2" />
                      <p className="text-earth-600">Click to upload photos</p>
                    </label>
                  </div>
                  {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image) || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-earth-700">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Vintage Denim Jacket"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="border-earth-300 focus:border-primary"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-earth-700">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the item, its history, and any special features..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="border-earth-300 focus:border-primary min-h-[100px]"
                    required
                  />
                </div>

                {/* Category and Type */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-earth-700">Category</Label>
                    <Select onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger className="border-earth-300">
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
                    <Label htmlFor="type" className="text-earth-700">
                      Type/Brand
                    </Label>
                    <Input
                      id="type"
                      name="type"
                      placeholder="e.g., H&M, Vintage, Handmade"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="border-earth-300 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Size and Condition */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-earth-700">Size</Label>
                    <Select onValueChange={(value) => handleSelectChange("size", value)}>
                      <SelectTrigger className="border-earth-300">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-earth-700">Condition</Label>
                    <Select onValueChange={(value) => handleSelectChange("condition", value)}>
                      <SelectTrigger className="border-earth-300">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Points */}
                <div className="space-y-2">
                  <Label htmlFor="points" className="text-earth-700">
                    Points Value
                  </Label>
                  <Input
                    id="points"
                    name="points"
                    type="number"
                    placeholder="e.g., 25"
                    value={formData.points}
                    onChange={handleInputChange}
                    className="border-earth-300 focus:border-primary"
                    min="1"
                    max="100"
                    required
                  />
                  <p className="text-sm text-earth-500">Suggested: 20-50 points based on condition and brand</p>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label className="text-earth-700">Tags</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="border-earth-300 focus:border-primary"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm" variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                          {tag} <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? "Creating Item..." : "List Item"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
