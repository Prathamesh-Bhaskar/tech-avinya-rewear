"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Calendar, Package, User, ArrowRightLeft } from "lucide-react"
import Image from "next/image"

export default function SwapHistoryModal({ swap, onClose }) {
  const [swapDetails, setSwapDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (swap?.id) {
      fetchSwapDetails(swap.id)
    }
  }, [swap])

  const fetchSwapDetails = async (swapId) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/swaps/${swapId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setSwapDetails(data)
      }
    } catch (error) {
      console.error("Error fetching swap details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!swap) return null

  return (
    <Dialog open={!!swap} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ArrowRightLeft className="w-5 h-5 text-primary" />
            <span>Swap Details</span>
          </DialogTitle>
          <DialogDescription>View the details of your clothing exchange</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : swapDetails ? (
          <div className="space-y-6">
            {/* Swap Status */}
            <div className="flex items-center justify-between">
              <Badge variant={swapDetails.status === "completed" ? "default" : "secondary"} className="text-sm">
                {swapDetails.status}
              </Badge>
              <div className="flex items-center space-x-2 text-sm text-earth-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date(swapDetails.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Items Involved */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Your Item */}
              <div className="border border-earth-200 rounded-lg p-4">
                <h4 className="font-medium text-earth-800 mb-3 flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  Your Item
                </h4>
                <div className="flex space-x-3">
                  <Image
                    src={swapDetails.yourItem?.image || "/placeholder.svg?height=60&width=60"}
                    alt={swapDetails.yourItem?.title}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h5 className="font-medium text-earth-800">{swapDetails.yourItem?.title}</h5>
                    <p className="text-sm text-earth-600">{swapDetails.yourItem?.points} points</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {swapDetails.yourItem?.condition}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Their Item */}
              <div className="border border-earth-200 rounded-lg p-4">
                <h4 className="font-medium text-earth-800 mb-3 flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  Received Item
                </h4>
                <div className="flex space-x-3">
                  <Image
                    src={swapDetails.theirItem?.image || "/placeholder.svg?height=60&width=60"}
                    alt={swapDetails.theirItem?.title}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h5 className="font-medium text-earth-800">{swapDetails.theirItem?.title}</h5>
                    <p className="text-sm text-earth-600">{swapDetails.theirItem?.points} points</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {swapDetails.theirItem?.condition}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Swap Partner */}
            <div className="border border-earth-200 rounded-lg p-4">
              <h4 className="font-medium text-earth-800 mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Swap Partner
              </h4>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                  <span className="text-sage-700 font-medium">{swapDetails.partner?.name?.[0] || "U"}</span>
                </div>
                <div>
                  <h5 className="font-medium text-earth-800">{swapDetails.partner?.name}</h5>
                  <div className="flex items-center space-x-2 text-sm text-earth-600">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{swapDetails.partner?.rating || "5.0"}</span>
                    <span>•</span>
                    <span>{swapDetails.partner?.totalSwaps || 0} swaps</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Swap Timeline */}
            <div className="border border-earth-200 rounded-lg p-4">
              <h4 className="font-medium text-earth-800 mb-3">Timeline</h4>
              <div className="space-y-3">
                {swapDetails.timeline?.map((event, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-earth-800">{event.description}</p>
                      <p className="text-xs text-earth-500">{new Date(event.date).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating */}
            {swapDetails.status === "completed" && (
              <div className="border border-earth-200 rounded-lg p-4">
                <h4 className="font-medium text-earth-800 mb-3">Your Rating</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < (swapDetails.yourRating || 0) ? "text-yellow-500 fill-current" : "text-earth-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-earth-600">
                    {swapDetails.yourRating ? `${swapDetails.yourRating}/5` : "Not rated"}
                  </span>
                </div>
                {swapDetails.yourReview && <p className="text-sm text-earth-600 mt-2">"{swapDetails.yourReview}"</p>}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-earth-600">Unable to load swap details</p>
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
