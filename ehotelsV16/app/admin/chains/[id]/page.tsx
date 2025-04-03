import Link from "next/link"
import { Building2, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Données simulées pour une chaîne hôtelière
const chain = {
  id_chain: 1,
  nom: "Hilton",
  adresse_bureau: "3080 Brannon Avenue, Cleveland, USA",
  nb_hotels: 8,
  emails: [{ email: "corporate@hilton.com" }, { email: "press@hilton.com" }],
  telephones: [{ telephone: "+1-800-445-8667" }],
  hotels: [
    { id_hotel: 1, nom: "Hilton NY", adresse: "3055 Martha Street, New York, USA", classement: 4 },
    { id_hotel: 2, nom: "Hilton LA", adresse: "574 Single Street, Los Angeles, USA", classement: 3 },
  ],
}

export default function AdminChainDetailPage({ params }: { params: { id: string } }) {
  const chainId = Number.parseInt(params.id)

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/admin" className="text-blue-600 hover:underline mr-2">
          Administration
        </Link>
        <span className="mx-2">›</span>
        <Link href="/admin/chains" className="text-blue-600 hover:underline mr-2">
          Chaînes
        </Link>
        <span className="mx-2">›</span>
        <span>{chain.nom}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">{chain.nom}</CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{chain.adresse_bureau}</span>
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
                        <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{chain.nb_hotels} hôtels</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Contact</h3>
                    <div className="space-y-2">
                      {chain.emails.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{item.email}</span>
                        </div>
                      ))}
                      {chain.telephones.map((item, index) => (
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
                  <h3 className="text-lg font-medium mb-2">Hôtels</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Adresse</TableHead>
                        <TableHead>Classement</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {chain.hotels.map((hotel) => (
                        <TableRow key={hotel.id_hotel}>
                          <TableCell className="font-medium">{hotel.id_hotel}</TableCell>
                          <TableCell>{hotel.nom}</TableCell>
                          <TableCell>{hotel.adresse}</TableCell>
                          <TableCell>{hotel.classement} étoiles</TableCell>
                          <TableCell>
                            <Link href={`/admin/hotels/${hotel.id_hotel}`}>
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
              <Button className="w-full">Ajouter un hôtel</Button>
              <Button className="w-full" variant="outline">
                Modifier les contacts
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

