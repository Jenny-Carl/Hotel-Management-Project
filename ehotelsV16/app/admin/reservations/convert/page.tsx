"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, CreditCard, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for employees
const employees = [
  { id: "123456789", name: "Jean Dupont" },
  { id: "987654321", name: "Marie Curie" },
  { id: "456123789", name: "Albert Einstein" },
  { id: "321654987", name: "Isaac Newton" },
  { id: "789456123", name: "Nikola Tesla" },
]

// Mock data for reservations
const reservations = [
  {
    id: 1,
    clientName: "Paul Martin",
    clientNas: "112233445",
    hotelName: "Hilton NY",
    roomNumber: 101,
    dateStart: "2025-06-01",
    dateEnd: "2025-06-05",
    status: "Confirmée",
    price: 799.96,
  },
  {
    id: 2,
    clientName: "Sophie Tremblay",
    clientNas: "556677889",
    hotelName: "Wyndham LA",
    roomNumber: 205,
    dateStart: "2025-07-10",
    dateEnd: "2025-07-15",
    status: "Confirmée",
    price: 1750.0,
  },
  {
    id: 3,
    clientName: "Jean Lefebvre",
    clientNas: "998877665",
    hotelName: "Hyatt Chicago",
    roomNumber: 310,
    dateStart: "2025-08-05",
    dateEnd: "2025-08-10",
    status: "Confirmée",
    price: 900.0,
  },
]

export default function ConvertReservationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReservation, setSelectedReservation] = useState<any>(null)
  const [employeeId, setEmployeeId] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  // Filter reservations based on search term
  const filteredReservations = reservations.filter((reservation) => {
    return (
      reservation.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.clientNas.includes(searchTerm) ||
      reservation.id.toString().includes(searchTerm)
    )
  })

  const handleConvert = () => {
    // In a real application, this would send a request to the server
    console.log("Converting reservation to rental:", {
      reservationId: selectedReservation.id,
      employeeId,
      paymentMethod,
    })
    alert("Réservation convertie en location avec succès!")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/admin" className="text-blue-600 hover:underline mr-2">
          Administration
        </Link>
        <span className="mx-2">›</span>
        <span>Convertir une Réservation</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Convertir une Réservation en Location</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Rechercher une Réservation</CardTitle>
              <CardDescription>
                Recherchez une réservation par nom de client, NAS ou numéro de réservation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Réservation</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Chambre</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Prix</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReservations.map((reservation) => (
                      <TableRow
                        key={reservation.id}
                        className={selectedReservation?.id === reservation.id ? "bg-muted/50" : ""}
                        onClick={() => setSelectedReservation(reservation)}
                      >
                        <TableCell>
                          <RadioGroup value={selectedReservation?.id.toString() || ""}>
                            <RadioGroupItem
                              value={reservation.id.toString()}
                              id={`reservation-${reservation.id}`}
                              className="mt-0"
                            />
                          </RadioGroup>
                        </TableCell>
                        <TableCell className="font-medium">#{reservation.id}</TableCell>
                        <TableCell>
                          <div>{reservation.clientName}</div>
                          <div className="text-sm text-muted-foreground">{reservation.clientNas}</div>
                        </TableCell>
                        <TableCell>
                          <div>{reservation.hotelName}</div>
                          <div className="text-sm text-muted-foreground">Chambre {reservation.roomNumber}</div>
                        </TableCell>
                        <TableCell>
                          <div>{new Date(reservation.dateStart).toLocaleDateString()}</div>
                          <div className="text-sm text-muted-foreground">
                            au {new Date(reservation.dateEnd).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>${reservation.price.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    {filteredReservations.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          Aucune réservation trouvée
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {selectedReservation && (
            <Card>
              <CardHeader>
                <CardTitle>Détails de la Conversion</CardTitle>
                <CardDescription>Complétez les informations pour convertir la réservation en location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employé Responsable</Label>
                    <Select value={employeeId} onValueChange={setEmployeeId}>
                      <SelectTrigger id="employeeId">
                        <SelectValue placeholder="Sélectionner un employé" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Méthode de Paiement</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger id="paymentMethod">
                        <SelectValue placeholder="Sélectionner une méthode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">Carte de Crédit</SelectItem>
                        <SelectItem value="debit-card">Carte de Débit</SelectItem>
                        <SelectItem value="cash">Espèces</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentMethod === "credit-card" && (
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Numéro de Carte</Label>
                        <div className="relative">
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                          <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Date d'Expiration</Label>
                          <Input id="cardExpiry" placeholder="MM/AA" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardCvc">CVC</Label>
                          <Input id="cardCvc" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Résumé</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedReservation ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Réservation #{selectedReservation.id}</h3>
                    <p className="text-sm text-muted-foreground">{selectedReservation.status}</p>
                  </div>

                  <div>
                    <h3 className="font-medium">Client</h3>
                    <p className="text-sm">{selectedReservation.clientName}</p>
                    <p className="text-sm text-muted-foreground">NAS: {selectedReservation.clientNas}</p>
                  </div>

                  <div>
                    <h3 className="font-medium">Chambre</h3>
                    <p className="text-sm">{selectedReservation.hotelName}</p>
                    <p className="text-sm text-muted-foreground">Chambre {selectedReservation.roomNumber}</p>
                  </div>

                  <div>
                    <h3 className="font-medium">Dates</h3>
                    <p className="text-sm">
                      Du {new Date(selectedReservation.dateStart).toLocaleDateString()} au{" "}
                      {new Date(selectedReservation.dateEnd).toLocaleDateString()}
                    </p>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span>Montant Total</span>
                    <span>${selectedReservation.price.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">Sélectionnez une réservation pour voir le résumé</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={!selectedReservation || !employeeId} onClick={handleConvert}>
                <Check className="mr-2 h-4 w-4" /> Convertir en Location
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

