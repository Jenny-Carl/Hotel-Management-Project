"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Fonction pour formater les dates
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function CancelLocalReservationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [reason, setReason] = useState("")
  const [cancelReason, setCancelReason] = useState("change-plans")
  const [isSubmitting, setIsSubmitting] = useState(false)
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
          
          setReservation({
            id: found.id,
            hotelName: hotelName,
            roomNumber: roomNumber,
            dateStart: found.checkInDate,
            dateEnd: found.checkOutDate,
            status: found.status,
            price: found.totalPrice,
            roomCapacity: found.room?.capacity || found.roomCapacity || 2
          })
        }
      } catch (error) {
        console.error('Error loading local reservation:', error)
        toast({
          title: "Erreur",
          description: "Impossible de charger la réservation",
          variant: "destructive",
        })
        router.push("/reservations")
      }
    }
    setLoading(false)
  }, [params.id, router, toast])

  const handleCancel = () => {
    setIsSubmitting(true)

    try {
      // Récupérer les réservations actuelles
      const localData = localStorage.getItem('ehotels_reservations')
      if (localData) {
        const reservations = JSON.parse(localData)
        // Trouver et mettre à jour la réservation
        const updatedReservations = reservations.map((res: any) => {
          if (res.id === params.id) {
            return {
              ...res,
              status: 'cancelled',
              cancelReason,
              cancelNote: reason,
              cancelDate: new Date().toISOString()
            }
          }
          return res
        })
        // Sauvegarder les réservations mises à jour
        localStorage.setItem('ehotels_reservations', JSON.stringify(updatedReservations))

        setTimeout(() => {
          setIsSubmitting(false)
          toast({
            title: "Réservation annulée",
            description: "Votre réservation a été annulée avec succès.",
            variant: "default"
          })
          router.push("/reservations")
        }, 1000)
      }
    } catch (error) {
      console.error('Error cancelling reservation:', error)
      setIsSubmitting(false)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'annulation de la réservation.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Chargement des détails de la réservation...</span>
      </div>
    )
  }

  if (!reservation) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Réservation introuvable</h1>
        <p>La réservation que vous cherchez n'existe pas.</p>
        <Link href="/reservations" className="text-blue-600 hover:underline mt-4 inline-block">
          Retour à mes réservations
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Annuler la réservation
          </CardTitle>
          <CardDescription>
            Êtes-vous sûr de vouloir annuler cette réservation ? Cette action ne peut pas être annulée.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="font-medium mb-2">Détails de la réservation</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Hôtel:</span>
                <span>{reservation.hotelName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Chambre:</span>
                <span>{reservation.roomNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Arrivée:</span>
                <span>{formatDate(reservation.dateStart)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Départ:</span>
                <span>{formatDate(reservation.dateEnd)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Prix total:</span>
                <span className="font-medium">{parseFloat(reservation.price).toFixed(2)} €</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Raison de l'annulation</Label>
              <RadioGroup value={cancelReason} onValueChange={setCancelReason} className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="change-plans" id="change-plans" />
                  <Label htmlFor="change-plans">Changement de plans</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="better-price" id="better-price" />
                  <Label htmlFor="better-price">Meilleur prix trouvé ailleurs</Label>
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

            <div className="space-y-2">
              <Label>Commentaires additionnels</Label>
              <Textarea
                placeholder="Expliquez brièvement la raison de votre annulation..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/reservations">
            <Button variant="outline">Retour</Button>
          </Link>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Annulation en cours..." : "Confirmer l'annulation"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 