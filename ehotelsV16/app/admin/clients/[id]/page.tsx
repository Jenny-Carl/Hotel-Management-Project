import Link from "next/link"
import { CalendarClock, CreditCard, Mail, MapPin, Phone, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Données simulées pour un client
const client = {
  nas_client: "112233445",
  nom_complet: "Paul Martin",
  adresse: "888 Rue du Commerce, Montréal",
  date_enregistrement: "2023-01-15",
  email: "paul.martin@example.com",
  telephone: "+1-514-555-6789",
  reservations: [
    {
      id: 1,
      hotel: "Hilton NY",
      dateStart: "2025-06-01",
      dateEnd: "2025-06-05",
      status: "Confirmée",
      price: 799.96,
    },
    {
      id: 2,
      hotel: "Wyndham LA",
      dateStart: "2024-08-10",
      dateEnd: "2024-08-15",
      status: "Annulée",
      price: 1250.0,
    },
  ],
}

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const clientId = params.id

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/admin" className="text-blue-600 hover:underline mr-2">
          Administration
        </Link>
        <span className="mx-2">›</span>
        <Link href="/admin/clients" className="text-blue-600 hover:underline mr-2">
          Clients
        </Link>
        <span className="mx-2">›</span>
        <span>{client.nom_complet}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">{client.nom_complet}</CardTitle>
              <CardDescription>NAS: {clientId}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Informations personnelles</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{client.nom_complet}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{client.adresse}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{client.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{client.telephone}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Client depuis le {new Date(client.date_enregistrement).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Historique des réservations</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Hôtel</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Prix</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {client.reservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell className="font-medium">#{reservation.id}</TableCell>
                          <TableCell>{reservation.hotel}</TableCell>
                          <TableCell>
                            {new Date(reservation.dateStart).toLocaleDateString()} -{" "}
                            {new Date(reservation.dateEnd).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <span className={reservation.status === "Confirmée" ? "text-green-600" : "text-red-600"}>
                              {reservation.status}
                            </span>
                          </TableCell>
                          <TableCell>${reservation.price.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Modifier</Button>
              <Button variant="destructive">Supprimer</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                Créer une nouvelle réservation
              </Button>
              <Button className="w-full" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Enregistrer un paiement
              </Button>
              <Button className="w-full" variant="outline">
                Générer un rapport
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

