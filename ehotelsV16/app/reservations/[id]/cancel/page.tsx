"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { getReservationById, cancelReservation } from "@/lib/reservation-service"
import { getRoomById, getHotelById } from "@/lib/mock-data"

export default function CancelReservationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const reservationId = params.id
  const [reason, setReason] = useState("")
  const [cancelReason, setCancelReason] = useState("change-plans")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reservation, setReservation] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load reservation data
  useEffect(() => {
    setIsLoading(true)
    const res = getReservationById(reservationId)

    if (res) {
      const room = getRoomById(res.roomId)
      const hotel = room ? getHotelById(room.hotelId) : null

      setReservation({
        id: res.id,
        hotelName: hotel?.name || "Unknown Hotel",
        roomNumber: room?.roomNumber || "Unknown",
        dateStart: res.checkInDate,
        dateEnd: res.checkOutDate,
        status: res.status,
        price: res.totalPrice,
      })
    } else {
      toast({
        title: "Reservation not found",
        description: "The reservation you're trying to cancel could not be found.",
        variant: "error",
      })
      router.push("/reservations")
    }

    setIsLoading(false)
  }, [reservationId, router, toast])

  const handleCancel = () => {
    setIsSubmitting(true)

    // Cancel the reservation
    const success = cancelReservation(reservationId)

    if (success) {
      setTimeout(() => {
        setIsSubmitting(false)
        toast({
          title: "Reservation cancelled",
          description: "Your reservation has been successfully cancelled.",
          variant: "success",
        })
        router.push(`/reservations`)
      }, 1500)
    } else {
      setIsSubmitting(false)
      toast({
        title: "Error",
        description: "There was a problem cancelling your reservation. Please try again.",
        variant: "error",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading reservation details...</span>
      </div>
    )
  }

  if (!reservation) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Reservation not found</h1>
        <p>The reservation you're looking for doesn't exist.</p>
        <Link href="/reservations" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to my reservations
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/reservations" className="text-blue-600 hover:underline mr-2">
          Mes Réservations
        </Link>
        <span className="mx-2">›</span>
        <Link href={`/reservations/${reservationId}`} className="text-blue-600 hover:underline mr-2">
          Réservation #{reservationId}
        </Link>
        <span className="mx-2">›</span>
        <span>Annuler</span>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-red-600">Annuler votre réservation</CardTitle>
            <CardDescription>
              Veuillez confirmer que vous souhaitez annuler votre réservation à {reservation.hotelName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Politique d'annulation</h3>
                  <p className="text-sm text-amber-700">
                    Vous pouvez annuler gratuitement jusqu'à 48 heures avant la date d'arrivée. Après cette période, des
                    frais d'annulation peuvent s'appliquer.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Détails de la réservation</h3>
                <div className="text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Hôtel:</span>
                    <span>{reservation.hotelName}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Chambre:</span>
                    <span>{reservation.roomNumber}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Arrivée:</span>
                    <span>{new Date(reservation.dateStart).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Départ:</span>
                    <span>{new Date(reservation.dateEnd).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Montant total:</span>
                    <span className="font-bold">${reservation.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label htmlFor="cancel-reason" className="text-base font-medium mb-2 block">
                  Raison de l'annulation
                </Label>
                <RadioGroup value={cancelReason} onValueChange={setCancelReason} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="change-plans" id="change-plans" />
                    <Label htmlFor="change-plans">Changement de plans</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="found-better" id="found-better" />
                    <Label htmlFor="found-better">J'ai trouvé une meilleure offre</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emergency" id="emergency" />
                    <Label htmlFor="emergency">Urgence personnelle</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Autre raison</Label>
                  </div>
                </RadioGroup>
              </div>

              {cancelReason === "other" && (
                <div>
                  <Label htmlFor="reason-text" className="text-base font-medium mb-2 block">
                    Veuillez préciser
                  </Label>
                  <Textarea
                    id="reason-text"
                    placeholder="Veuillez nous indiquer la raison de votre annulation..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleCancel}
              disabled={isSubmitting || (cancelReason === "other" && !reason)}
            >
              {isSubmitting ? "Annulation en cours..." : "Confirmer l'annulation"}
            </Button>
            <Link href={`/reservations/${reservationId}`} className="w-full">
              <Button variant="outline" className="w-full">
                Retour
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

