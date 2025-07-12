"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Heart, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export default function MyItemsPage() {
  const [myItems, setMyItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }
    fetchMyItems(token)
  }, [router])

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== 'undefined' && (window as any).VITE_API_BASE_URL) || 'http://localhost:5000';

  const fetchMyItems = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/my-items`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const items = await response.json()
        setMyItems(items)
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch items.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-earth-50">
      <div className="container mx-auto px-4 py-8">
        <Card className="border-earth-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>My Listings</span>
              <Badge variant="outline">{myItems.length}</Badge>
            </CardTitle>
            <CardDescription>All items you've shared with the community</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : myItems.length === 0 ? (
              <div className="text-center py-8">
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
                {myItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-sage-50 rounded-lg">
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
              </div>
            )}
          </CardContent>
        </Card>
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
    </div>
  )
} 