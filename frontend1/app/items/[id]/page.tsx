"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Leaf, ArrowLeft, Heart, Share2, MapPin, Calendar, Package, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useParams } from "next/navigation"

export default function ItemDetailPage() {
  const [item, setItem] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isRequesting, setIsRequesting] = useState(false)
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      fetchItem(params.id)
    }
  }, [params.id])

  const HARDCODED_ITEMS = [
    {
      _id: '1',
      title: 'Vintage Denim Jacket',
      description: 'Classic blue denim, lightly worn, size M.',
      category: 'Outerwear',
      condition: 'Good',
      points: 45,
      image: 'https://www.shutterstock.com/image-photo/blue-denim-jacket-isolated-over-600nw-310155074.jpg',
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      title: 'Cotton Summer Dress',
      description: 'Floral print, perfect for summer, size S.',
      category: 'Dresses',
      condition: 'Excellent',
      points: 35,
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
      createdAt: new Date().toISOString(),
    },
    {
      _id: '3',
      title: 'Wool Sweater',
      description: 'Warm and cozy, size L.',
      category: 'Knitwear',
      condition: 'Good',
      points: 40,
      image: 'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=400&q=80',
      createdAt: new Date().toISOString(),
    },
    {
      _id: '4',
      title: 'Leather Boots',
      description: 'Brown leather, barely used, size 9.',
      category: 'Shoes',
      condition: 'Like New',
      points: 60,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      createdAt: new Date().toISOString(),
    },
    {
      _id: '5',
      title: 'Graphic Tee',
      description: 'Fun print, size M.',
      category: 'Tops',
      condition: 'Fair',
      points: 20,
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
      createdAt: new Date().toISOString(),
    },
  ];

  const fetchItem = async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`)
      if (response.ok) {
        const data = await response.json()
        setItem(data)
      } else {
        // fallback to hardcoded
        const fallback = HARDCODED_ITEMS.find(i => i._id === id || i.id === id)
        setItem(fallback || null)
      }
    } catch (error) {
      // fallback to hardcoded
      const fallback = HARDCODED_ITEMS.find(i => i._id === id || i.id === id)
      setItem(fallback || null)
      console.error("Error fetching item:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRequestSwap = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    setIsRequesting(true)
    try {
      const response = await fetch("/api/swaps/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: item.id }),
      })

      if (response.ok) {
        alert("Swap request sent successfully!")
      } else {
        const errorData = await response.json()
        alert(errorData.message || "Failed to send swap request")
      }
    } catch (error) {
      alert("Network error. Please try again.")
    } finally {
      setIsRequesting(false)
    }
  }

  const handleRedeemWithPoints = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    setIsRequesting(true)
    try {
      const response = await fetch("/api/swaps/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: item.id }),
      })

      if (response.ok) {
        alert("Item redeemed successfully!")
        router.push("/dashboard")
      } else {
        const errorData = await response.json()
        alert(errorData.message || "Failed to redeem item")
      }
    } catch (error) {
      alert("Network error. Please try again.")
    } finally {
      setIsRequesting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 to-earth-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <p className="text-earth-600">Loading item details...</p>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 to-earth-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-earth-800 mb-2">Item not found</h2>
          <p className="text-earth-600 mb-4">The item you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/browse">Browse Items</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-earth-50">
      {/* Header */}
      <header className="border-b border-earth-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/browse"
              className="flex items-center space-x-2 text-earth-700 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Browse</span>
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={item.images?.[currentImageIndex] || item.image || "/placeholder.svg?height=500&width=500"}
                alt={item.title}
                fill
                className="object-cover"
              />
              {item.availability === "available" && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white">Available</Badge>
                </div>
              )}
            </div>
            {item.images && item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square relative rounded-md overflow-hidden border-2 ${
                      currentImageIndex === index ? "border-primary" : "border-earth-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${item.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-earth-800 mb-2">{item.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="outline" className="text-sage-700 border-sage-300">
                  {item.condition}
                </Badge>
                <Badge variant="secondary">{item.category}</Badge>
                <Badge variant="outline">Size {item.size}</Badge>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-primary">{item.points} points</span>
                <div className="flex space-x-1">
                  {[...Array(Math.min(5, Math.floor(item.points / 10)))].map((_, i) => (
                    <Leaf key={i} className="w-4 h-4 text-sage-600" />
                  ))}
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <Card className="border-earth-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={item.owner?.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{item.owner?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-earth-800">{item.owner?.name || "Community Member"}</h3>
                    <div className="flex items-center space-x-4 text-sm text-earth-600">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{item.owner?.rating || "5.0"}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{item.owner?.location || "Local"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-earth-800 mb-2">Description</h3>
              <p className="text-earth-600 leading-relaxed">{item.description}</p>
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-earth-800 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-earth-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Item Details */}
            <div>
              <h3 className="text-lg font-semibold text-earth-800 mb-2">Item Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-earth-500" />
                  <span className="text-earth-600">Type: {item.type || "Not specified"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-earth-500" />
                  <span className="text-earth-600">Listed: {new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleRequestSwap}
                disabled={isRequesting || item.availability !== "available"}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isRequesting ? "Sending Request..." : "Request Swap"}
              </Button>
              <Button
                onClick={handleRedeemWithPoints}
                disabled={isRequesting || item.availability !== "available"}
                variant="outline"
                className="w-full border-earth-300 bg-transparent"
              >
                {isRequesting ? "Redeeming..." : `Redeem with ${item.points} Points`}
              </Button>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Sustainability Note */}
            <Card className="border-sage-200 bg-sage-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Leaf className="w-5 h-5 text-sage-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sage-800 mb-1">Sustainable Choice</h4>
                    <p className="text-sm text-sage-700">
                      By choosing this pre-loved item, you're helping reduce textile waste and supporting circular
                      fashion.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
