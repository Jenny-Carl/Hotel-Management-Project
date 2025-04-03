"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Check,
  Download,
  Printer,
  Share2,
  Calendar,
  CreditCard,
  Building,
  MapPin,
  User,
  Mail,
  Phone,
} from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { getReservationById, generateInvoice } from "@/lib/reservation-service"
import { getRoomById, getHotelById } from "@/lib/mock-data"

export default function ReservationConfirmationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const reservationId = params.id
  const invoiceRef = useRef<HTMLDivElement>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [reservation, setReservation] = useState<any>(null)
  const [room, setRoom] = useState<any>(null)
  const [hotel, setHotel] = useState<any>(null)
  const [invoice, setInvoice] = useState<any>(null)

  // Charger les détails de la réservation
  useEffect(() => {
    setIsLoading(true)

    // Simuler un délai de chargement
    setTimeout(() => {
      const foundReservation = getReservationById(reservationId)

      if (foundReservation) {
        setReservation(foundReservation)

        const foundRoom = getRoomById(foundReservation.roomId)
        if (foundRoom) {
          setRoom(foundRoom)

          const foundHotel = getHotelById(foundRoom.hotelId)
          if (foundHotel) {
            setHotel(foundHotel)

            // Générer la facture
            const generatedInvoice = generateInvoice(foundReservation, foundHotel.name, foundRoom.roomNumber)
            setInvoice(generatedInvoice)
          }
        }
      } else {
        toast({
          title: "Réservation non trouvée",
          description: "La réservation demandée n'existe pas.",
          variant: "error",
        })
        router.push("/reservations")
      }

      setIsLoading(false)
    }, 500)
  }, [reservationId, router, toast])

  // Fonction pour imprimer la facture
  const handlePrint = () => {
    if (invoiceRef.current) {
      const printContents = invoiceRef.current.innerHTML
      const originalContents = document.body.innerHTML

      document.body.innerHTML = `
        <html>
          <head>
            <title>Facture - E-Hotels</title>
            <style>
              body { font-family: Arial, sans-serif; }
              .invoice-container { max-width: 800px; margin: 0 auto; padding: 20px; }
              .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; }
              .invoice-details { margin-bottom: 20px; }
              .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              .invoice-table th, .invoice-table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
              .invoice-total { text-align: right; }
            </style>
          </head>
          <body>
            <div class="invoice-container">
              ${printContents}
            </div>
          </body>
        </html>
      `

      window.print()
      document.body.innerHTML = originalContents
    }
  }

  // Fonction pour télécharger la facture (simulée)
  const handleDownload = () => {
    toast({
      title: "Téléchargement de la facture",
      description: "La facture a été téléchargée avec succès.",
      variant: "success",
    })
  }

  // Fonction pour partager la facture (simulée)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Facture E-Hotels - ${hotel?.name}`,
        text: `Ma réservation à ${hotel?.name} du ${format(new Date(reservation?.checkInDate), "dd/MM/yyyy")} au ${format(new Date(reservation?.checkOutDate), "dd/MM/yyyy")}`,
        url: window.location.href,
      })
    } else {
      toast({
        title: "Partage non supporté",
        description: "Votre navigateur ne supporte pas la fonction de partage.",
        variant: "warning",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement des détails de la réservation...</p>
        </div>
      </div>
    )
  }

  if (!reservation || !room || !hotel || !invoice) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Réservation non trouvée</h1>
        <p>La réservation que vous recherchez n'existe pas.</p>
        <Link href="/reservations" className="text-blue-600 hover:underline mt-4 inline-block">
          Retour à mes réservations
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/reservations" className="text-blue-600 hover:underline mr-2">
          Mes réservations
        </Link>
        <span className="mx-2">›</span>
        <span>Confirmation</span>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-8">
        <div className="flex items-center">
          <div className="bg-green-100 dark:bg-green-800 rounded-full p-2 mr-4">
            <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-800 dark:text-green-400">Réservation confirmée</h2>
            <p className="text-green-700 dark:text-green-500">
              Votre réservation a été confirmée avec succès. Un email de confirmation a été envoyé à{" "}
              {reservation.guestEmail}.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Détails de la réservation</CardTitle>
              <CardDescription>Réservation #{reservation.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Informations sur l'hôtel</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{hotel.name}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        {hotel.address}, {hotel.city}, {hotel.country}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Dates du séjour</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        Du {format(new Date(reservation.checkInDate), "dd MMMM yyyy", { locale: fr })} au{" "}
                        {format(new Date(reservation.checkOutDate), "dd MMMM yyyy", { locale: fr })}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Chambre:</span> {room.roomNumber}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Capacité:</span> {room.capacity} personnes
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Informations du client</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{reservation.guestName}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{reservation.guestEmail}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{reservation.guestPhone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Paiement</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Méthode: {reservation.paymentMethod === "credit-card" ? "Carte de crédit" : "PayPal"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Statut:</span>{" "}
                      <span className="text-green-600 font-medium">Payé</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Montant total:</span>{" "}
                      <span className="font-bold">${(reservation.totalPrice * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facture */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Facture</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <Printer className="h-4 w-4 mr-2" /> Imprimer
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" /> Télécharger
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" /> Partager
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div ref={invoiceRef} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-bold">E-Hotels</h2>
                    <p className="text-muted-foreground">Facture #{invoice.invoiceNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Date d'émission:</p>
                    <p>{format(new Date(invoice.issueDate), "dd/MM/yyyy")}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-medium mb-2">Facturé à:</h3>
                    <p>{invoice.customerName}</p>
                    <p>{invoice.customerEmail}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Détails de l'hôtel:</h3>
                    <p>{invoice.roomDetails.hotelName}</p>
                    <p>Chambre {invoice.roomDetails.roomNumber}</p>
                  </div>
                </div>

                <table className="w-full mb-8">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Description</th>
                      <th className="text-right py-2">Prix unitaire</th>
                      <th className="text-right py-2">Quantité</th>
                      <th className="text-right py-2">Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">
                        <p className="font-medium">Séjour à {invoice.roomDetails.hotelName}</p>
                        <p className="text-sm text-muted-foreground">
                          Du {format(new Date(invoice.roomDetails.checkInDate), "dd/MM/yyyy")} au{" "}
                          {format(new Date(invoice.roomDetails.checkOutDate), "dd/MM/yyyy")}
                        </p>
                      </td>
                      <td className="text-right py-3">${invoice.roomDetails.pricePerNight.toFixed(2)}</td>
                      <td className="text-right py-3">{invoice.roomDetails.nights} nuits</td>
                      <td className="text-right py-3">${invoice.totalAmount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex justify-end">
                  <div className="w-full max-w-xs">
                    <div className="flex justify-between py-1">
                      <span>Sous-total:</span>
                      <span>${invoice.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Taxes (10%):</span>
                      <span>${invoice.taxes.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between py-1 font-bold">
                      <span>Total:</span>
                      <span>${invoice.grandTotal.toFixed(2)}</span>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>
                        Méthode de paiement: {invoice.paymentMethod === "credit-card" ? "Carte de crédit" : "PayPal"}
                      </p>
                      <p>Statut: Payé</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" /> Imprimer la facture
              </Button>
              <Button className="w-full" variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" /> Télécharger la facture
              </Button>
              <Link href="/reservations" className="w-full">
                <Button className="w-full" variant="outline">
                  Voir mes réservations
                </Button>
              </Link>
              <Link href="/search" className="w-full">
                <Button className="w-full" variant="outline">
                  Rechercher d'autres chambres
                </Button>
              </Link>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Besoin d'aide ? Contactez notre service client au +1-800-123-4567 ou par email à support@ehotels.com
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

