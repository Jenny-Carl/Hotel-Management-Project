import { Suspense } from "react"
import Link from "next/link"
import { hotels } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

// Composant pour afficher les étoiles du classement
function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))}
    </div>
  )
}

function HotelsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Nos hôtels</h1>

      {hotels.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Aucun hôtel trouvé</h2>
          <p className="text-gray-600">Veuillez réessayer plus tard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{hotel.name}</CardTitle>
                <CardDescription>
                  <div className="flex items-center space-x-2">
                    <RatingStars rating={hotel.rating} />
                    <span>{hotel.rating} étoiles</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{hotel.address}</p>
                <p className="text-gray-600 mb-2">
                  {hotel.city}, {hotel.country}
                </p>
                <p className="text-gray-600 line-clamp-2">{hotel.description}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/hotels/${hotel.id}`} className="w-full">
                  <Button className="w-full">Voir les détails</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default function HotelsPageWithSuspense() {
  return (
    <Suspense fallback={<div className="container mx-auto py-8">Chargement des hôtels...</div>}>
      <HotelsPage />
    </Suspense>
  )
}

