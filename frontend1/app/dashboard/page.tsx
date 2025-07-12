"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Plus, Package, ArrowRightLeft, Star, Eye, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import SwapHistoryModal from "@/components/swap-history-modal"
import type { MouseEvent } from "react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [myItems, setMyItems] = useState<any[]>([])
  const [mySwaps, setMySwaps] = useState<any[]>([])
  const [selectedSwap, setSelectedSwap] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    fetchUserData(token)
    fetchMyItems(token)
    fetchMySwaps(token)
    // Show toast if redirected after edit
    if (typeof window !== 'undefined' && localStorage.getItem('itemUpdated')) {
      toast({ title: 'Item updated', description: 'Your item was updated successfully.' })
      localStorage.removeItem('itemUpdated')
    }
  }, [router])

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== 'undefined' && (window as any).VITE_API_BASE_URL) || 'http://localhost:5000';

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const fetchMyItems = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/my-items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const items = await response.json()
        setMyItems(items)
      }
    } catch (error) {
      console.error("Error fetching items:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMySwaps = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/my-swaps`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const swaps = await response.json()
        setMySwaps(swaps)
      }
    } catch (error) {
      console.error("Error fetching swaps:", error)
    }
  }

  const handleSwapClick = (swap: any) => {
    setSelectedSwap(swap)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 to-earth-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <p className="text-earth-600">Loading your dashboard...</p>
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
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-earth-800">ReWear</span>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/browse" className="text-earth-700 hover:text-primary transition-colors">
                Browse
              </Link>
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                <Link href="/add-item">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-earth-800 mb-2">Welcome back, {user?.name || "Eco Warrior"}! 🌱</h1>
          <p className="text-earth-600">Continue making a positive impact through sustainable fashion choices.</p>
        </div>

        {/* Points Card */}
        <Card className="mb-8 border-earth-200 shadow-sm bg-gradient-to-r from-sage-100 to-earth-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-earth-800 mb-1">Your Eco Points</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-primary">{user?.points || 0}</span>
                  <div className="flex space-x-1">
                    {[...Array(Math.min(5, Math.floor((user?.points || 0) / 10)))].map((_, i) => (
                      <Leaf key={i} className="w-5 h-5 text-sage-600" />
                    ))}
                  </div>
                </div>
                <p className="text-earth-600 text-sm mt-1">Earned through sustainable exchanges</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-2">
                  Level {Math.floor((user?.points || 0) / 50) + 1}
                </Badge>
                <p className="text-sm text-earth-600">{50 - ((user?.points || 0) % 50)} points to next level</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* My Listings */}
          <Card className="border-earth-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-sage-600" />
                <span>My Listings</span>
                <Badge variant="outline">{myItems.length}</Badge>
              </CardTitle>
              <CardDescription>Items you've shared with the community</CardDescription>
            </CardHeader>
            <CardContent>
              {myItems.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-earth-400 mx-auto mb-4" />
                  <p className="text-earth-600 mb-4">No items listed yet</p>
                  <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                    <Link href="/add-item">
                      <Plus className="w-4 h-4 mr-2" />
                      List Your First Item
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myItems.slice(0, 3).map((item, idx) => (
                    <div key={item._id || item.id || idx} className="flex items-center space-x-4 p-3 bg-sage-50 rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg?height=60&width=60"}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-earth-800">{item.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.condition}
                          </Badge>
                          <span className="text-sm text-earth-600">{item.points} pts</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-earth-500">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{item.views || 0}</span>
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{item.likes || 0}</span>
                      </div>
                      <div className="flex flex-col space-y-1 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary/10"
                          asChild
                        >
                          <Link href={`/edit-item/${item._id || item.id}`}>Edit</Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => setDeleteItemId(item.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                  {myItems.length > 3 && (
                    <Button variant="outline" className="w-full bg-transparent" size="sm" asChild>
                      <Link href="/my-items">View All {myItems.length} Items</Link>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* My Swaps */}
          <Card className="border-earth-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ArrowRightLeft className="w-5 h-5 text-sage-600" />
                <span>My Swaps</span>
                <Badge variant="outline">{mySwaps.length}</Badge>
              </CardTitle>
              <CardDescription>Your exchange history and pending swaps</CardDescription>
            </CardHeader>
            <CardContent>
              {mySwaps.length === 0 ? (
                <div className="text-center py-8">
                  <ArrowRightLeft className="w-12 h-12 text-earth-400 mx-auto mb-4" />
                  <p className="text-earth-600 mb-4">No swaps yet</p>
                  <Button asChild size="sm" variant="outline" className="border-earth-300 bg-transparent">
                    <Link href="/browse">Start Browsing Items</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {mySwaps.slice(0, 3).map((swap) => (
                    <div
                      key={swap.id}
                      className="flex items-center space-x-4 p-3 bg-sage-50 rounded-lg cursor-pointer hover:bg-sage-100 transition-colors"
                      onClick={() => handleSwapClick(swap)}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-earth-800">{swap.itemTitle}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={swap.status === "completed" ? "default" : "secondary"} className="text-xs">
                            {swap.status}
                          </Badge>
                          <span className="text-sm text-earth-600">{swap.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-earth-600">{swap.rating || "N/A"}</span>
                      </div>
                    </div>
                  ))}
                  {mySwaps.length > 3 && (
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      View All {mySwaps.length} Swaps
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Button asChild className="h-auto p-6 bg-primary hover:bg-primary/90">
            <Link href="/add-item" className="flex flex-col items-center space-y-2">
              <Plus className="w-8 h-8" />
              <span className="font-medium">Add New Item</span>
              <span className="text-sm opacity-90">Share clothing you no longer wear</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto p-6 border-earth-300 bg-transparent">
            <Link href="/browse" className="flex flex-col items-center space-y-2">
              <Package className="w-8 h-8" />
              <span className="font-medium">Browse Items</span>
              <span className="text-sm opacity-70">Discover new-to-you clothing</span>
            </Link>
          </Button>
          <Button asChild variant="secondary" className="h-auto p-6">
            <Link href="/profile" className="flex flex-col items-center space-y-2">
              <Star className="w-8 h-8" />
              <span className="font-medium">My Profile</span>
              <span className="text-sm opacity-70">Update your preferences</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Swap History Modal */}
      {selectedSwap && <SwapHistoryModal swap={selectedSwap} onClose={() => setSelectedSwap(null)} />}

      {/* Modal for delete confirmation */}
      <Dialog open={!!deleteItemId} onOpenChange={() => setDeleteItemId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteItemId(null)} disabled={isDeleting}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={async () => {
                setIsDeleting(true)
                const token = localStorage.getItem('token');
                try {
                  const response = await fetch(`${API_BASE_URL}/api/items/${deleteItemId}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  if (response.ok) {
                    setMyItems((prev) => prev.filter((i) => i.id !== deleteItemId));
                    toast({ title: 'Item deleted', description: 'Your item was deleted successfully.' })
                  } else {
                    toast({ title: 'Delete failed', description: 'Failed to delete item.', variant: 'destructive' })
                  }
                } catch {
                  toast({ title: 'Network error', description: 'Could not connect to server.', variant: 'destructive' })
                } finally {
                  setIsDeleting(false)
                  setDeleteItemId(null)
                }
              }}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
