"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EditItemPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params as { id: string }
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
    tags: [],
    points: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== 'undefined' && (window as any).VITE_API_BASE_URL) || 'http://localhost:5000';

  useEffect(() => {
    const fetchItem = async () => {
      const token = localStorage.getItem("token")
      try {
        const res = await fetch(`${API_BASE_URL}/api/items/${id}`)
        if (res.ok) {
          const data = await res.json()
          setFormData({
            title: data.title || "",
            description: data.description || "",
            category: data.category || "",
            type: data.type || "",
            size: data.size || "",
            condition: data.condition || "",
            tags: data.tags || [],
            points: data.points?.toString() || "",
          })
        }
      } catch {}
    }
    fetchItem()
  }, [id])

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          points: Number.parseInt(formData.points),
        }),
      })
      if (response.ok) {
        localStorage.setItem('itemUpdated', '1')
        router.push("/dashboard")
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Failed to update item")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-earth-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-earth-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-earth-800">Edit Item</CardTitle>
            <CardDescription className="text-earth-600">Update your item details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-earth-700">Title</Label>
                <Input id="title" name="title" type="text" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-earth-700">Description</Label>
                <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-earth-700">Category</Label>
                <Select value={formData.category} onValueChange={(v) => handleSelectChange("category", v)}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type" className="text-earth-700">Type</Label>
                <Input id="type" name="type" type="text" value={formData.type} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size" className="text-earth-700">Size</Label>
                <Select value={formData.size} onValueChange={(v) => handleSelectChange("size", v)}>
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((sz) => (
                      <SelectItem key={sz} value={sz}>{sz}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition" className="text-earth-700">Condition</Label>
                <Select value={formData.condition} onValueChange={(v) => handleSelectChange("condition", v)}>
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="points" className="text-earth-700">Points</Label>
                <Input id="points" name="points" type="number" value={formData.points} onChange={handleInputChange} required />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Item"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 