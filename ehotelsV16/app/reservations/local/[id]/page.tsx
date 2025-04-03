"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Fonction pour formater les dates
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Fonction pour calculer le nombre de jours
function calculateDays(startDate: string, endDate: string) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export default function LocalReservationDetailPage({ params }: { params: { id: string } }) {
  const [reservation, setReservation] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Charger la réservation depuis le localStorage
    const localData = localStorage.getItem('ehotels_reservations')
    if (localData) {
      try {
        const reservations = JSON.parse(localData)
        const found = reservations.find((res: any) => res.id === params.id)
        if (found) {
          console.log('Found reservation:', found)
          const roomNumber = found.room?.number || found.roomNumber || found.roomId || '?'
          const hotelName = found.hotel?.name || found.hotelName || 'Hôtel'
          const roomCapacity = found.room?.capacity || found.roomCapacity || 2

          setReservation({
            id_reservation: found.id,
            date_debut: found.checkInDate,
            date_fin: found.checkOutDate,
            statut: found.status === 'confirmed' ? 'Confirmée' : found.status,
            nas_client: found.userId,
            num_chambre: roomNumber,
            hotel_name: hotelName,
            room_details: {
              num_chambre: roomNumber,
              prix: parseFloat(found.totalPrice) / calculateDays(found.checkInDate, found.checkOutDate),
              capacite: roomCapacity,
              vue: found.room?.view || found.roomView || 'ville',
              id_hotel: found.hotel?.id || found.hotelId || 1
            },
            client_details: {
              nom: found.guestName,
              email: found.guestEmail,
              telephone: found.guestPhone
            }
          })
        }
      } catch (error) {
        console.error('Error loading local reservation:', error)
      }
    }
    setLoading(false)
  }, [params.id])

  if (loading) {
    return <div className="container mx-auto py-8">Chargement de la réservation...</div>
  }

  if (!reservation) {
    notFound()
  }

  const days = calculateDays(reservation.date_debut, reservation.date_fin)
  const totalPrice = reservation.room_details.prix * days

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Détails de la réservation</h1>
        <Link href="/reservations">
          <Button variant="outline">Retour aux réservations</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{reservation.hotel_name}</CardTitle>
                <CardDescription>
                  Chambre {reservation.num_chambre} - {reservation.room_details.capacite} personne(s)
                </CardDescription>
              </div>
              <Badge className={reservation.statut === 'Confirmée' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}>
                {reservation.statut}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Dates du séjour</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Arrivée</p>
                      <p className="font-medium">{formatDate(reservation.date_debut)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Départ</p>
                      <p className="font-medium">{formatDate(reservation.date_fin)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Durée: {days} jour{days > 1 ? 's' : ''}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Informations client</h3>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Nom</p>
                    <p>{reservation.client_details.nom}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{reservation.client_details.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p>{reservation.client_details.telephone}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Détails du paiement</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Prix par nuit</p>
                      <p>{reservation.room_details.prix.toFixed(2)} €</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">Nombre de nuits</p>
                      <p>{days}</p>
                    </div>
                    <div className="flex justify-between font-medium">
                      <p>Prix total</p>
                      <p>{totalPrice.toFixed(2)} €</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/reservations">
              <Button variant="outline">Retour</Button>
            </Link>
            {reservation.statut !== 'Annulée' && (
              <Link href={`/reservations/local/${reservation.id_reservation}/cancel`}>
                <Button variant="destructive">Annuler la réservation</Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 