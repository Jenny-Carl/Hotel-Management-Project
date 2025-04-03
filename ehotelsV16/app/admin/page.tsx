"use client"
import Link from "next/link"
import { Building, Building2, CreditCard, Hotel, User, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Administration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Building className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle>Chaînes Hôtelières</CardTitle>
              <CardDescription>Gérer les chaînes hôtelières</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ajouter, modifier ou supprimer des chaînes hôtelières et leurs informations.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/chains" className="w-full">
              <Button variant="outline" className="w-full">
                Gérer
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Hotel className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle>Hôtels</CardTitle>
              <CardDescription>Gérer les hôtels</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ajouter, modifier ou supprimer des hôtels et leurs informations.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/hotels" className="w-full">
              <Button variant="outline" className="w-full">
                Gérer
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle>Chambres</CardTitle>
              <CardDescription>Gérer les chambres</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ajouter, modifier ou supprimer des chambres et leurs informations.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/rooms" className="w-full">
              <Button variant="outline" className="w-full">
                Gérer
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <User className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle>Clients</CardTitle>
              <CardDescription>Gérer les clients</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ajouter, modifier ou supprimer des clients et leurs informations.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/clients" className="w-full">
              <Button variant="outline" className="w-full">
                Gérer
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle>Employés</CardTitle>
              <CardDescription>Gérer les employés</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ajouter, modifier ou supprimer des employés et leurs informations.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/employees" className="w-full">
              <Button variant="outline" className="w-full">
                Gérer
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <CreditCard className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle>Paiements</CardTitle>
              <CardDescription>Gérer les paiements</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ajouter, modifier ou supprimer des paiements et leurs informations.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/payments" className="w-full">
              <Button variant="outline" className="w-full">
                Gérer
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
          <CardDescription>Effectuer des actions courantes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="reservations" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="reservations">Réservations</TabsTrigger>
              <TabsTrigger value="rentals">Locations</TabsTrigger>
              <TabsTrigger value="payments">Paiements</TabsTrigger>
            </TabsList>

            <TabsContent value="reservations" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Convertir une Réservation en Location</h3>
                  <Link href="/admin/reservations/convert">
                    <Button>Convertir</Button>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">
                  Convertissez une réservation existante en location lorsqu'un client s'enregistre à l'hôtel.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="rentals" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Créer une Nouvelle Location</h3>
                  <Link href="/admin/rentals/new">
                    <Button>Créer</Button>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">
                  Créez une nouvelle location directement lorsqu'un client se présente physiquement à l'hôtel.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="payments" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Enregistrer un Paiement</h3>
                  <Link href="/admin/payments/new">
                    <Button>Enregistrer</Button>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">Enregistrez un paiement pour une location existante.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

