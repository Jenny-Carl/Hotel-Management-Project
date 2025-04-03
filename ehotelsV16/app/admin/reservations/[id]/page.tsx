import Link from "next/link"
import { CalendarRange, Check, CreditCard, Hotel, MapPin, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Données simulées pour une réservation
const reservation = {
  id_reservation: 1,
  date_debut: "2025-06-01",
  date_fin: "2025-06-05",
  statut: "Confirmée",
  nas_client: "112233445",
  num_chambre: 101,
  client_name: "Paul Martin",
  hotel_name: "Hilton NY",
  prix: 799.96,
  client_email: "paul.martin@example.com",
  client_phone: "+1-514-555-6789",
  booking_date: "2023-12-15",
}

export default function AdminReservationDetailPage({ params }: { params: { id: string } }) {
  const reservationId = params.id

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/admin" className="text-blue-600 hover:underline mr-2">
          Administration
        </Link>
        <span className="mx-2">›</span>
        <Link href="/admin/reservations" className="text-blue-600 hover:underline mr-2">
          Réservations
        </Link>
        <span className="mx-2">›</span>
        <span>Réservation #{reservationId}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Détails de la Réservation</CardTitle>
                  <CardDescription>Réservation #{reservationId}</CardDescription>
                </div>
                <div className="flex items-center text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 rounded-full px-3 py-1">
                  <Check className="h-4 w-4 mr-1" />
                  <span>{reservation.statut}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Informations sur l'hôtel</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Hotel className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{reservation.hotel_name}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Chambre {reservation.num_chambre}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Dates du séjour</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Arrivée</p>
                      <p>{new Date(reservation.date_debut).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Départ</p>
                      <p>{new Date(reservation.date_fin).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Informations du client</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{reservation.client_name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-muted-foreground">NAS:</span>
                      <span>{reservation.nas_client}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-muted-foreground">Email:</span>
                      <span>{reservation.client_email}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-muted-foreground">Téléphone:</span>
                      <span>{reservation.client_phone}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Paiement</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between font-bold">
                      <span>Montant total</span>
                      <span>${typeof reservation.prix === 'number' ? reservation.prix.toFixed(2) : Number(reservation.prix).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Informations supplémentaires</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CalendarRange className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Réservé le {new Date(reservation.booking_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Modifier</Button>
              <Button variant="destructive">Annuler</Button>
              <Link href={`/admin/reservations/convert?id=${reservationId}`}>
                <Button>Convertir en Location</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href={`/admin/reservations/convert?id=${reservationId}`} className="w-full">
                <Button className="w-full">Convertir en Location</Button>
              </Link>
              <Button className="w-full" variant="outline">
                Modifier le statut
              </Button>
              <Button className="w-full" variant="outline">
                Contacter le client
              </Button>
              <Button className="w-full" variant="outline">
                Imprimer la réservation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

