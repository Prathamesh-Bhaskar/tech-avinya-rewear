"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, Search, Filter, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BrowsePage() {
  const [items, setItems] = useState<any[]>([])
  const [filteredItems, setFilteredItems] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [conditionFilter, setConditionFilter] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    "All",
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

  const conditions = ["All", "Excellent", "Good", "Fair", "Like New"]

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== 'undefined' && (window as any).VITE_API_BASE_URL) || 'http://localhost:5000';

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

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    filterAndSortItems()
  }, [items, searchTerm, categoryFilter, conditionFilter, sortBy])

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/items`)
      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          setItems(data)
        } else {
          setItems(HARDCODED_ITEMS)
        }
      } else {
        setItems(HARDCODED_ITEMS)
      }
    } catch (error) {
      setItems(HARDCODED_ITEMS)
      console.error("Error fetching items:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndSortItems = () => {
    const filtered = items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "" || categoryFilter === "All" || item.category === categoryFilter
      const matchesCondition = conditionFilter === "" || conditionFilter === "All" || item.condition === conditionFilter

      return matchesSearch && matchesCategory && matchesCondition
    })

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt)
        case "points-low":
          return a.points - b.points
        case "points-high":
          return b.points - a.points
        default:
          return 0
      }
    })

    setFilteredItems(filtered)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 to-earth-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <p className="text-earth-600">Loading items...</p>
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
            <Link href="/" className="flex items-center space-x-2 text-earth-700 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
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
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-earth-800 mb-2">Browse Items</h1>
          <p className="text-earth-600">Discover amazing pre-loved clothing from our sustainable community</p>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-earth-200 shadow-sm">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-earth-500" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-earth-300 focus:border-primary"
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="border-earth-300">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Condition Filter */}
              <Select value={conditionFilter} onValueChange={setConditionFilter}>
                <SelectTrigger className="border-earth-300">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-earth-300">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="points-low">Points: Low to High</SelectItem>
                  <SelectItem value="points-high">Points: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("")
                  setConditionFilter("")
                  setSortBy("newest")
                }}
                className="border-earth-300"
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-earth-600">
            Showing {filteredItems.length} of {items.length} items
          </p>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-earth-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-earth-500" />
            </div>
            <h3 className="text-xl font-semibold text-earth-800 mb-2">No items found</h3>
            <p className="text-earth-600 mb-4">Try adjusting your filters or search terms</p>
            <Button asChild variant="outline" className="border-earth-300 bg-transparent">
              <Link href="/add-item">List the first item</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <Card
                key={item._id || item.id || idx}
                className="overflow-hidden border-earth-200 shadow-sm hover:shadow-md transition-shadow group"
              >
                <Link href={`/items/${item.id}`}>
                  <div className="aspect-square relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90">
                        {item.points} pts
                      </Badge>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant="outline" className="bg-white/90 border-sage-300 text-sage-700">
                        {item.condition}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-earth-800 mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-earth-600 mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <span className="text-xs text-earth-500">Size {item.size}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-earth-500">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{item.likes || 0}</span>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-earth-500">by {item.ownerName || "Community Member"}</div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
