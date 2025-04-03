import Link from "next/link"
import { Building2, Mail, MapPin, Phone, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Données simulées pour un employé
const employee = {
  nas_employe: "123456789",
  nom_complet: "Jean Dupont",
  adresse: "12 Rue Principale, New York",
  id_hotel: 1,
  hotel_name: "Hilton NY",
  email: "jean.dupont@hilton.com",
  telephone: "+1-212-555-1234",
  date_embauche: "2020-03-15",
  roles: ["Gestionnaire"],
}

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  const employeeId = params.id

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/admin" className="text-blue-600 hover:underline mr-2">
          Administration
        </Link>
        <span className="mx-2">›</span>
        <Link href="/admin/employees" className="text-blue-600 hover:underline mr-2">
          Employés
        </Link>
        <span className="mx-2">›</span>
        <span>{employee.nom_complet}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{employee.nom_complet}</CardTitle>
              <CardDescription>NAS: {employeeId}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Informations personnelles</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{employee.nom_complet}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{employee.adresse}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{employee.telephone}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Informations professionnelles</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Hôtel: {employee.hotel_name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-muted-foreground">Date d'embauche:</span>
                      <span>{new Date(employee.date_embauche).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-muted-foreground">Rôles:</span>
                      <span>{employee.roles.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Historique des activités</h3>
                  <p className="text-muted-foreground">Aucune activité récente</p>
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
                Assigner un nouveau rôle
              </Button>
              <Button className="w-full" variant="outline">
                Changer d'hôtel
              </Button>
              <Button className="w-full" variant="outline">
                Générer un rapport d'activité
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

