import { Suspense } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getReservationById, getClientById, getHotelById, getRoomById } from "@/lib/db-api"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Home, Clock } from "lucide-react"

// Fonction pour formater les dates
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Fonction pour calculer le nombre de jours entre deux dates
function calculateDays(startDate: string, endDate: string) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Fonction pour calculer le prix total
function calculateTotalPrice(price: number, days: number) {
  return (price * days).toFixed(2)
}

// Composant pour afficher le statut de la réservation
function ReservationStatus({ status }: { status: string }) {
  let color = ""

  switch (status.toLowerCase()) {
    case "confirmée":
    case "confirmee":
    case "confirmed":
      color = "bg-green-100 text-green-800"
      break
    case "en attente":
    case "pending":
      color = "bg-yellow-100 text-yellow-800"
      break
    case "annulée":
    case "annulee":
    case "cancelled":
      color = "bg-red-100 text-red-800"
      break
    case "convertie":
    case "converted":
      color = "bg-blue-100 text-blue-800"
      break
    default:
      color = "bg-gray-100 text-gray-800"
  }

  return <Badge className={color}>{status}</Badge>
}

async function ReservationDetailPage({ params }: { params: { id: string } }) {
  const reservationId = Number.parseInt(params.id)

  console.log(`Fetching reservation with ID ${reservationId}...`)
  const reservation = await getReservationById(reservationId)

  if (!reservation) {
    console.log(`Reservation with ID ${reservationId} not found, redirecting to 404`)
    notFound()
  }

  console.log(`Fetching client with ID ${reservation.nas_client}...`)
  const client = await getClientById(reservation.nas_client)

  console.log(`Fetching room with ID ${reservation.num_chambre}...`)
  const room = await getRoomById(reservation.num_chambre)

  let hotel = null
  if (room) {
    console.log(`Fetching hotel with ID ${room.id_hotel}...`)
    hotel = await getHotelById(room.id_hotel)
  }

  const days = calculateDays(reservation.date_debut, reservation.date_fin)
  const totalPrice = room ? calculateTotalPrice(room.prix, days) : "Prix non disponible"

  return (
    <div className="container mx-auto py-8">
      <Link href="/reservations" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Retour à mes réservations
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold">Réservation #{reservation.id_reservation}</h1>
              <p className="text-gray-600 mt-1">
                {hotel?.nom || "Hôtel"} - Chambre {reservation.num_chambre}
              </p>
            </div>
            <ReservationStatus status={reservation.statut} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Détails de la réservation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium">Dates du séjour</p>
                    <p className="text-gray-600">
                      Du {formatDate(reservation.date_debut)} au {formatDate(reservation.date_fin)}
                    </p>
                    <p className="text-gray-600">
                      {days} nuit{days > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Home className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium">Hébergement</p>
                    <p className="text-gray-600">
                      {hotel?.nom || "Hôtel"} - {hotel?.classement || "?"} étoiles
                    </p>
                    <p className="text-gray-600">
                      Chambre {reservation.num_chambre} - {room?.capacite || "?"} personne(s)
                    </p>
                    {room && (
                      <p className="text-gray-600">
                        Vue: {room.vue}, Étendue: {room.etendue}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium">Client</p>
                    <p className="text-gray-600">{client?.nom_complet || "Client"}</p>
                    {client && <p className="text-gray-600">{client.adresse}</p>}
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium">Statut</p>
                    <p className="text-gray-600">{reservation.statut}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Résumé du paiement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix par nuit:</span>
                  <span>{room ? `${typeof room.prix === 'number' ? room.prix.toFixed(2) : Number(room.prix).toFixed(2)} €` : "Non disponible"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nombre de nuits:</span>
                  <span>{days}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span>{totalPrice} €</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {reservation.statut.toLowerCase() !== "annulée" &&
                  reservation.statut.toLowerCase() !== "annulee" &&
                  reservation.statut.toLowerCase() !== "cancelled" &&
                  reservation.statut.toLowerCase() !== "convertie" &&
                  reservation.statut.toLowerCase() !== "converted" && (
                    <Link href={`/reservations/${reservation.id_reservation}/cancel`}>
                      <Button variant="destructive">Annuler la réservation</Button>
                    </Link>
                  )}
                {reservation.statut.toLowerCase() === "convertie" ||
                reservation.statut.toLowerCase() === "converted" ? (
                  <div className="bg-blue-100 text-blue-800 p-3 rounded-md w-full text-center">
                    Cette réservation a été convertie en location
                  </div>
                ) : null}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ReservationDetailPageWithSuspense({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="container mx-auto py-8">Chargement des détails de la réservation...</div>}>
      <ReservationDetailPage params={params} />
    </Suspense>
  )
}

