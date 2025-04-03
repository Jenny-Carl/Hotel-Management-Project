import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getHotelById, getRoomsByHotelId } from "@/lib/db-api"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Phone, Mail, MapPin, Users, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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

async function HotelDetailPage({ params }: { params: { id: string } }) {
  const hotelId = Number.parseInt(params.id)

  console.log(`Fetching hotel with ID ${hotelId}...`)
  const hotel = await getHotelById(hotelId)

  if (!hotel) {
    console.log(`Hotel with ID ${hotelId} not found, redirecting to 404`)
    notFound()
  }

  console.log(`Fetching rooms for hotel ID ${hotelId}...`)
  const rooms = await getRoomsByHotelId(hotelId)
  console.log(`Found ${rooms.length} rooms for hotel ID ${hotelId}`)

  return (
    <div className="container mx-auto py-8">
      <Link href="/hotels" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Retour à la liste des hôtels
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img
            src={hotel.image_url || `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(hotel.nom)}`}
            alt={hotel.nom}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold">{hotel.nom}</h1>
              <div className="flex items-center mt-2">
                <RatingStars rating={hotel.classement} />
                <span className="ml-2 text-gray-600">{hotel.classement} étoiles</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Informations</h2>
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                  <span>{hotel.adresse}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{hotel.telephone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{hotel.email}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-600">
                {hotel.description ||
                  `${hotel.nom} est un hôtel ${hotel.classement} étoiles situé à ${hotel.adresse}. Profitez de notre hospitalité et de nos services de qualité pour un séjour inoubliable.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Chambres disponibles</h2>

      {rooms.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Aucune chambre disponible</h3>
          <p className="text-gray-600 mb-4">Il n'y a actuellement aucune chambre disponible dans cet hôtel.</p>
          <Link href="/hotels">
            <Button>Voir d'autres hôtels</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.num_chambre} className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Chambre {room.num_chambre}</CardTitle>
                <CardDescription>
                  <Badge variant="outline" className="bg-blue-50">
                    {typeof room.prix === 'number' ? room.prix.toFixed(2) : Number(room.prix).toFixed(2)} € / nuit
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-md mb-4 overflow-hidden">
                  <img
                    src={room.image_url || `/placeholder.svg?height=150&width=300&text=Chambre%20${room.num_chambre}`}
                    alt={`Chambre ${room.num_chambre}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500 mr-2" />
                    <span>
                      Capacité: {room.capacite} personne{room.capacite > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 text-gray-500 mr-2" />
                    <span>Vue: {room.vue}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Étendue:</span>
                    <span>{room.etendue}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/rooms/${room.id || room.num_chambre}`} className="w-full">
                  <Button className="w-full">Réserver cette chambre</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default function HotelDetailPageWithSuspense({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="container mx-auto py-8">Chargement des détails de l'hôtel...</div>}>
      <HotelDetailPage params={params} />
    </Suspense>
  )
}

