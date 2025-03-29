import Link from "next/link"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImageWithFallback } from "@/components/ui/image-with-fallback"

// Mock data for hotels
const hotels = [
  {
    id: 1,
    name: "Hilton NY",
    chain: "Hilton",
    address: "3055 Martha Street, New York, USA",
    rating: 4,
    rooms: 50,
    image: "/images/hotels/hilton-ny.jpg",
  },
  // ... autres hôtels
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
              <ImageWithFallback
                src={hotel.image || "/placeholder.svg"}
                alt={hotel.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{hotel.rating}</span>
              </div>
            </div>
            {/* ... reste du code */}
          </Card>
        ))}
      </div>
    </div>
  )
}

