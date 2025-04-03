import Link from "next/link"
import { Building2, Mail, MapPin, Phone, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Données simulées pour un hôtel
const hotel = {
  id_hotel: 1,
  nom: "Hilton NY",
  adresse: "3055 Martha Street, New York, USA",
  classement: 4,
  nb_chambres: 50,
  id_chain: 1,
  chain_name: "Hilton",
  emails: [{ email: "info@hiltonny.com" }, { email: "reservations@hiltonny.com" }],
  telephones: [{ telephone: "+1-212-555-1234" }, { telephone: "+1-212-555-5678" }],
  employees: [
    { nas_employe: "123456789", nom_complet: "Jean Dupont", role: "Gestionnaire" },
    { nas_employe: "987654321", nom_complet: "Marie Curie", role: "Réceptionniste" },
  ],
}

export default function AdminHotelDetailPage({ params }: { params: { id: string } }) {
  const hotelId = Number.parseInt(params.id)

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/admin" className="text-blue-600 hover:underline mr-2">
          Administration
        </Link>
        <span className="mx-2">›</span>
        <Link href="/admin/hotels" className="text-blue-600 hover:underline mr-2">
          Hôtels
        </Link>
        <span className="mx-2">›</span>
        <span>{hotel.nom}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">{hotel.nom}</CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{hotel.adresse}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Informations générales</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{hotel.classement} étoiles</span>
                      </div>
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{hotel.nb_chambres} chambres</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 text-muted-foreground">Chaîne:</span>
                        <span>{hotel.chain_name}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Contact</h3>
                    <div className="space-y-2">
                      {hotel.emails.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{item.email}</span>
                        </div>
                      ))}
                      {hotel.telephones.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{item.telephone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Employés</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>NAS</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hotel.employees.map((employee) => (
                        <TableRow key={employee.nas_employe}>
                          <TableCell className="font-medium">{employee.nas_employe}</TableCell>
                          <TableCell>{employee.nom_complet}</TableCell>
                          <TableCell>{employee.role}</TableCell>
                          <TableCell>
                            <Link href={`/admin/employees/${employee.nas_employe}`}>
                              <Button variant="outline" size="sm">
                                Voir
                              </Button>
                            </Link>
                          </TableCell>
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
              <Link href={`/admin/rooms?hotel=${hotelId}`} className="w-full">
                <Button className="w-full">Gérer les chambres</Button>
              </Link>
              <Button className="w-full" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Ajouter un employé
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

