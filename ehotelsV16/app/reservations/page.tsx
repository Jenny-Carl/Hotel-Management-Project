"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRoomById, getHotelById } from "@/lib/mock-data"

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

function ReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [debug, setDebug] = useState(false)

  useEffect(() => {
    async function loadReservations() {
      try {
        // Charger les réservations de l'API
        const response = await fetch('/api/reservations')
        const dbReservations = await response.json()
        console.log(`Found ${dbReservations.length} reservations in database`)

        // Charger les réservations du localStorage
        let localReservations = []
        const localData = localStorage.getItem('ehotels_reservations')
        if (localData) {
          try {
            const parsedData = JSON.parse(localData)
            console.log('Raw local reservations data:', parsedData)
            localReservations = parsedData.map((res: any) => {
              console.log('Processing reservation:', res)
              const room = getRoomById(res.roomId)
              const hotel = room ? getHotelById(room.hotelId) : null
              
              return {
                id_reservation: res.id,
                date_debut: res.checkInDate,
                date_fin: res.checkOutDate,
                statut: res.status === 'confirmed' ? 'Confirmée' : res.status,
                nas_client: res.userId,
                num_chambre: room?.roomNumber || res.roomId,
                hotel_name: hotel?.name || 'Hôtel inconnu',
                room_details: {
                  num_chambre: room?.roomNumber || res.roomId,
                  prix: room?.price || parseFloat(res.totalPrice) / calculateDays(res.checkInDate, res.checkOutDate),
                  capacite: room?.capacity || 2,
                  vue: room?.view || 'ville',
                  id_hotel: room?.hotelId || 1
                },
                isLocalReservation: true
              }
            })
            console.log('Processed local reservations:', localReservations)
          } catch (error) {
            console.error('Error parsing local reservations:', error)
          }
        }

        // Combiner les réservations
        const allReservations = [...dbReservations, ...localReservations]
        console.log(`Total reservations: ${allReservations.length}`)
        console.log('All reservations:', JSON.stringify(allReservations, null, 2))
        setReservations(allReservations)
      } catch (error) {
        console.error('Error loading reservations:', error)
      } finally {
        setLoading(false)
      }
    }

    loadReservations()
  }, [])

  if (loading) {
    return <div className="container mx-auto py-8">Chargement des réservations...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mes réservations</h1>
        <div className="flex gap-4">
          <Button onClick={() => setDebug(!debug)} variant="outline">
            {debug ? "Masquer Debug" : "Afficher Debug"}
          </Button>
          <Link href="/search">
            <Button>Nouvelle réservation</Button>
          </Link>
        </div>
      </div>

      {debug && (
        <div className="mb-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Debug Info</h2>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(JSON.parse(localStorage.getItem('ehotels_reservations') || '[]'), null, 2)}
          </pre>
        </div>
      )}

      {reservations.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Aucune réservation trouvée</h2>
          <p className="text-gray-600 mb-6">
            Vous n'avez pas encore de réservations.
          </p>
          <Link href="/search">
            <Button>Réserver maintenant</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservations.map((reservation) => {
            const days = calculateDays(reservation.date_debut, reservation.date_fin)
            const totalPrice = reservation.room_details
              ? calculateTotalPrice(reservation.room_details.prix, days)
              : "Prix non disponible"

            return (
              <Card key={reservation.id_reservation} className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{reservation.hotel_name || "Hôtel"}</CardTitle>
                      <CardDescription>
                        Chambre {reservation.num_chambre} - {reservation.room_details?.capacite || ""} personne(s)
                      </CardDescription>
                    </div>
                    <ReservationStatus status={reservation.statut} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arrivée:</span>
                      <span className="font-medium">{formatDate(reservation.date_debut)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Départ:</span>
                      <span className="font-medium">{formatDate(reservation.date_fin)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durée:</span>
                      <span className="font-medium">
                        {days} jour{days > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prix total:</span>
                      <span className="font-bold">{totalPrice} €</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href={reservation.isLocalReservation ? `/reservations/local/${reservation.id_reservation}` : `/reservations/${reservation.id_reservation}`}>
                    <Button variant="outline">Détails</Button>
                  </Link>
                  {reservation.statut.toLowerCase() !== "annulée" &&
                    reservation.statut.toLowerCase() !== "annulee" &&
                    reservation.statut.toLowerCase() !== "cancelled" &&
                    reservation.statut.toLowerCase() !== "convertie" &&
                    reservation.statut.toLowerCase() !== "converted" && (
                      <Link href={reservation.isLocalReservation ? `/reservations/local/${reservation.id_reservation}/cancel` : `/reservations/${reservation.id_reservation}/cancel`}>
                        <Button variant="destructive">Annuler</Button>
                      </Link>
                    )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ReservationsPage

