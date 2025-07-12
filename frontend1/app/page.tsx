import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Recycle, Users, ArrowRight, Heart, Shirt } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      points: 45,
      condition: "Good",
      image: "https://www.shutterstock.com/image-photo/blue-denim-jacket-isolated-over-600nw-310155074.jpg",
      category: "Outerwear",
    },
    {
      id: 2,
      title: "Cotton Summer Dress",
      points: 35,
      condition: "Excellent",
      image: "https://www.shutterstock.com/image-photo/stylish-warm-female-sweater-on-260nw-1350751142.jpg",
      category: "Dresses",
    },
    {
      id: 3,
      title: "Wool Sweater",
      points: 40,
      condition: "Good",
      image: "/placeholder.svg?height=200&width=200",
      category: "Knitwear",
    },
  ]

  const FEATURED_ITEMS = [
    {
      _id: '1',
      title: 'Vintage Denim Jacket',
      image: 'https://www.shutterstock.com/image-photo/blue-denim-jacket-isolated-over-600nw-310155074.jpg',
    },
    {
      _id: '2',
      title: 'Cotton Summer Dress',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    },
    {
      _id: '3',
      title: 'Wool Sweater',
      image: 'https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?auto=format&fit=crop&w=400&q=80',
    },
    {
      _id: '4',
      title: 'Leather Boots',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    },
    {
      _id: '5',
      title: 'Graphic Tee',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 to-sage-50">
      {/* Header */}
      <header className="border-b border-earth-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-earth-800">ReWear</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/browse" className="text-earth-700 hover:text-primary transition-colors">
                Browse Items
              </Link>
              <Link href="/add-item" className="text-earth-700 hover:text-primary transition-colors">
                List an Item
              </Link>
              <Link href="/login" className="text-earth-700 hover:text-primary transition-colors">
                Login
              </Link>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/signup">Start Swapping</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 leaf-pattern">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-earth-800 mb-6">
              Sustainable Fashion Through <span className="text-primary">Community Exchange</span>
            </h1>
            <p className="text-xl text-earth-600 mb-8 leading-relaxed">
              Join thousands of eco-conscious individuals reducing textile waste by swapping, sharing, and redeeming
              unused clothing. Every exchange makes a difference for our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-lg px-8">
                <Link href="/signup">
                  <Shirt className="w-5 h-5 mr-2" />
                  Sign Up Free
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 border-earth-300 bg-transparent">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="text-lg px-8">
                <Link href="/add-item">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  List Clothing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-earth-800 mb-6 text-center">Featured Items</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center">
            {FEATURED_ITEMS.map((item) => (
              <div key={item._id} className="flex flex-col items-center">
                <img src={item.image} alt={item.title} className="w-32 h-32 object-cover rounded-lg shadow-md mb-2" />
                <span className="text-sm text-earth-700 text-center">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-earth-200 shadow-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="w-8 h-8 text-sage-600" />
                </div>
                <h3 className="text-2xl font-bold text-earth-800 mb-2">50,000+</h3>
                <p className="text-earth-600">Items Exchanged</p>
              </CardContent>
            </Card>
            <Card className="text-center border-earth-200 shadow-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-sage-600" />
                </div>
                <h3 className="text-2xl font-bold text-earth-800 mb-2">15,000+</h3>
                <p className="text-earth-600">Community Members</p>
              </CardContent>
            </Card>
            <Card className="text-center border-earth-200 shadow-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-sage-600" />
                </div>
                <h3 className="text-2xl font-bold text-earth-800 mb-2">2.5M lbs</h3>
                <p className="text-earth-600">Textile Waste Saved</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-sage-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth-800 mb-4">Featured Items</h2>
            <p className="text-earth-600 max-w-2xl mx-auto">
              Discover amazing clothing items from our community. Each piece has been lovingly cared for and is ready
              for its next adventure.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden border-earth-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square relative">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90">
                      {item.points} pts
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-earth-800 mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-sage-700 border-sage-300">
                      {item.condition}
                    </Badge>
                    <span className="text-sm text-earth-600">{item.category}</span>
                  </div>
                  <div className="flex items-center mt-3 text-sm text-earth-600">
                    <Heart className="w-4 h-4 mr-1" />
                    <span>Loved by community</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg" className="border-earth-300 bg-transparent">
              <Link href="/browse">
                View All Items
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-earth-800 mb-4">How ReWear Works</h2>
            <p className="text-earth-600 max-w-2xl mx-auto">
              Simple, sustainable, and rewarding. Join our circular fashion economy in three easy steps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-earth-800 mb-3">List Your Items</h3>
              <p className="text-earth-600">
                Upload photos and details of clothing you no longer wear. Earn points for each item listed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-sage-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-earth-800 mb-3">Browse & Swap</h3>
              <p className="text-earth-600">
                Discover items from other members. Request swaps or redeem items using your earned points.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-earth-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-earth-800 mb-3">Enjoy & Repeat</h3>
              <p className="text-earth-600">
                Receive your new-to-you items and continue the cycle. Every swap helps reduce textile waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-800 text-earth-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">ReWear</span>
              </div>
              <p className="text-earth-300">
                Building a sustainable future through community-driven clothing exchange.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-earth-300">
                <li>
                  <Link href="/browse" className="hover:text-white transition-colors">
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link href="/add-item" className="hover:text-white transition-colors">
                    List an Item
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-white transition-colors">
                    Join Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About Us</h4>
              <ul className="space-y-2 text-earth-300">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link href="/impact" className="hover:text-white transition-colors">
                    Environmental Impact
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-earth-300">
                <li>hello@rewear.com</li>
                <li>1-800-REWEAR-1</li>
                <li>San Francisco, CA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-earth-700 mt-8 pt-8 text-center text-earth-400">
            <p>&copy; 2024 ReWear. All rights reserved. Made with 💚 for the planet.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
