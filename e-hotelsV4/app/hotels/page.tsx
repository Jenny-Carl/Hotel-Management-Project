import Link from "next/link"
import { Building2, MapPin, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for hotels
const hotels = [
  {
    id: 1,
    name: "Hilton NY",
    chain: "Hilton",
    address: "3055 Martha Street, New York, USA",
    rating: 4,
    rooms: 50,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Hilton LA",
    chain: "Hilton",
    address: "574 Single Street, Los Angeles, USA",
    rating: 3,
    rooms: 50,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Wyndham NY",
    chain: "Wyndham",
    address: "1005 Broadway, New York, USA",
    rating: 4,
    rooms: 50,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Wyndham LA",
    chain: "Wyndham",
    address: "225 Sunset Blvd, Los Angeles, USA",
    rating: 5,
    rooms: 50,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Hyatt NY",
    chain: "Hyatt",
    address: "90 Wall Street, New York, USA",
    rating: 5,
    rooms: 50,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Hyatt LA",
    chain: "Hyatt",
    address: "888 Vine St, Los Angeles, USA",
    rating: 4,
    rooms: 50,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  },
]

export default function HotelsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Hotels</h1>
        <Link href="/search">
          <Button>Search Rooms</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="object-cover w-full h-full" />
              <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{hotel.rating}</span>
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{hotel.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{hotel.chain}</p>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4 mr-1" />
                  <span>{hotel.rooms} rooms</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm mb-4">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{hotel.address}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/hotels/${hotel.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

