"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Shield, CheckCircle, XCircle, Trash2, Ban, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [pendingItems, setPendingItems] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    // Check if user is admin (this would normally be validated on the server)
    fetchPendingItems(token)
    fetchUsers(token)
  }, [router])

  const fetchPendingItems = async (token) => {
    try {
      const response = await fetch("/api/admin/items/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setPendingItems(data)
      }
    } catch (error) {
      console.error("Error fetching pending items:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchUsers = async (token) => {
    try {
      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const handleApproveItem = async (itemId) => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`/api/admin/items/${itemId}/approve`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        setPendingItems((prev) => prev.filter((item) => item.id !== itemId))
      }
    } catch (error) {
      console.error("Error approving item:", error)
    }
  }

  const handleRejectItem = async (itemId) => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`/api/admin/items/${itemId}/reject`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        setPendingItems((prev) => prev.filter((item) => item.id !== itemId))
      }
    } catch (error) {
      console.error("Error rejecting item:", error)
    }
  }

  const handleRemoveItem = async (itemId) => {
    const token = localStorage.getItem("token")
    if (confirm("Are you sure you want to remove this item?")) {
      try {
        const response = await fetch(`/api/admin/items/${itemId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          setPendingItems((prev) => prev.filter((item) => item.id !== itemId))
        }
      } catch (error) {
        console.error("Error removing item:", error)
      }
    }
  }

  const handleBanUser = async (userId) => {
    const token = localStorage.getItem("token")
    if (confirm("Are you sure you want to ban this user?")) {
      try {
        const response = await fetch(`/api/admin/users/${userId}/ban`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: "banned" } : user)))
        }
      } catch (error) {
        console.error("Error banning user:", error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 to-earth-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <p className="text-earth-600">Loading admin panel...</p>
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
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-earth-800">ReWear Admin</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-earth-600" />
              <span className="text-earth-600">Administrator Panel</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-earth-800 mb-2">Admin Dashboard</h1>
          <p className="text-earth-600">Manage community items and users to maintain quality standards</p>
        </div>

        <Tabs defaultValue="pending-items" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending-items">Pending Items</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="pending-items" className="space-y-6">
            <Card className="border-earth-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-sage-600" />
                  <span>Pending Items Review</span>
                  <Badge variant="outline">{pendingItems.length}</Badge>
                </CardTitle>
                <CardDescription>Review and approve items submitted by community members</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingItems.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-earth-800 mb-2">All caught up!</h3>
                    <p className="text-earth-600">No pending items to review</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingItems.map((item) => (
                      <div key={item.id} className="border border-earth-200 rounded-lg p-4">
                        <div className="flex space-x-4">
                          <Image
                            src={item.images?.[0] || "/placeholder.svg?height=100&width=100"}
                            alt={item.title}
                            width={100}
                            height={100}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-earth-800 mb-2">{item.title}</h4>
                            <p className="text-sm text-earth-600 mb-3 line-clamp-2">{item.description}</p>
                            <div className="flex items-center space-x-2 mb-3">
                              <Badge variant="outline">{item.category}</Badge>
                              <Badge variant="outline">{item.condition}</Badge>
                              <Badge variant="secondary">{item.points} pts</Badge>
                            </div>
                            <div className="text-sm text-earth-500">
                              Submitted by: {item.ownerName} • {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproveItem(item.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRejectItem(item.id)}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="border-earth-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-sage-600" />
                  <span>User Management</span>
                  <Badge variant="outline">{users.length}</Badge>
                </CardTitle>
                <CardDescription>Manage community members and their account status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="border border-earth-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                            <span className="text-sage-700 font-medium text-lg">{user.name?.[0] || "U"}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-earth-800">{user.name}</h4>
                            <p className="text-sm text-earth-600">{user.email}</p>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-earth-500">
                              <span>{user.itemsListed || 0} items listed</span>
                              <span>{user.swapsCompleted || 0} swaps</span>
                              <span>{user.points || 0} points</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.status === "active" ? "default" : "destructive"}>
                            {user.status || "active"}
                          </Badge>
                          {user.status !== "banned" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleBanUser(user.id)}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <Ban className="w-4 h-4 mr-2" />
                              Ban User
                            </Button>
                          )}
                        </div>
                      </div>
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
