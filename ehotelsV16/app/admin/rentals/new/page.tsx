"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, CreditCard } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Mock data for employees
const employees = [
  { id: "123456789", name: "Jean Dupont" },
  { id: "987654321", name: "Marie Curie" },
  { id: "456123789", name: "Albert Einstein" },
  { id: "321654987", name: "Isaac Newton" },
  { id: "789456123", name: "Nikola Tesla" },
]

// Mock data for available rooms
const availableRooms = [
  {
    id: 101,
    hotelName: "Hilton NY",
    price: 200,
    capacity: 2,
    area: 30,
    view: "ville",
  },
  {
    id: 205,
    hotelName: "Wyndham LA",
    price: 350,
    capacity: 3,
    area: 45,
    view: "mer",
  },
  {
    id: 310,
    hotelName: "Hyatt Chicago",
    price: 180,
    capacity: 2,
    area: 28,
    view: "ville",
  },
]

export default function NewRentalPage() {
  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 3)),
  })

  const [formData, setFormData] = useState({
    employeeId: "",
    clientNas: "",
    clientFirstName: "",
    clientLastName: "",
    clientAddress: "",
    roomId: "",
    paymentAmount: "",
    paymentMethod: "credit-card",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const calculateNights = () => {
    if (!date.from || !date.to) return 0
    const diffTime = Math.abs(date.to.getTime() - date.from.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    if (!formData.roomId) return 0
    const room = availableRooms.find((room) => room.id.toString() === formData.roomId)
    return room ? room.price * calculateNights() : 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would submit the rental to the server
    console.log("Rental data:", {
      ...formData,
      dateFrom: date.from,
      dateTo: date.to,
      totalAmount: calculateTotal(),
    })
    alert("Location créée avec succès!")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/admin" className="text-blue-600 hover:underline mr-2">
          Administration
        </Link>
        <span className="mx-2">›</span>
        <span>Nouvelle Location</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Créer une Nouvelle Location</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Employee and Client Information */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Informations de l'Employé</CardTitle>
                <CardDescription>Sélectionnez l'employé qui gère cette location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employé</Label>
                    <Select
                      value={formData.employeeId}
                      onValueChange={(value) => setFormData({ ...formData, employeeId: value })}
                      required
                    >
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
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Informations du Client</CardTitle>
                <CardDescription>Entrez les informations du client</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientNas">NAS du Client</Label>
                    <Input
                      id="clientNas"
                      name="clientNas"
                      placeholder="123456789"
                      value={formData.clientNas}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientFirstName">Prénom</Label>
                      <Input
                        id="clientFirstName"
                        name="clientFirstName"
                        value={formData.clientFirstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientLastName">Nom</Label>
                      <Input
                        id="clientLastName"
                        name="clientLastName"
                        value={formData.clientLastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientAddress">Adresse</Label>
                    <Input
                      id="clientAddress"
                      name="clientAddress"
                      value={formData.clientAddress}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Détails de la Location</CardTitle>
                <CardDescription>Sélectionnez la chambre et les dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="roomId">Chambre</Label>
                    <Select
                      value={formData.roomId}
                      onValueChange={(value) => setFormData({ ...formData, roomId: value })}
                      required
                    >
                      <SelectTrigger id="roomId">
                        <SelectValue placeholder="Sélectionner une chambre" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRooms.map((room) => (
                          <SelectItem key={room.id} value={room.id.toString()}>
                            {room.hotelName} - Chambre {room.id} (${room.price}/nuit)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Dates de Séjour</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date.from && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "dd/MM/yyyy")} - {format(date.to, "dd/MM/yyyy")}
                              </>
                            ) : (
                              format(date.from, "dd/MM/yyyy")
                            )
                          ) : (
                            "Sélectionner les dates"
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations de Paiement</CardTitle>
                <CardDescription>Entrez les détails du paiement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentAmount">Montant du Paiement</Label>
                    <div className="relative">
                      <Input
                        id="paymentAmount"
                        name="paymentAmount"
                        type="number"
                        value={formData.paymentAmount || calculateTotal().toString()}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">$</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Méthode de Paiement</Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    >
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

                  {formData.paymentMethod === "credit-card" && (
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
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Résumé de la Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.roomId && (
                    <div>
                      <h3 className="font-medium">
                        {availableRooms.find((room) => room.id.toString() === formData.roomId)?.hotelName}
                      </h3>
                      <p className="text-sm text-muted-foreground">Chambre {formData.roomId}</p>
                    </div>
                  )}

                  <div className="text-sm">
                    <div className="flex justify-between py-1">
                      <span>Arrivée</span>
                      <span>{date.from ? format(date.from, "dd/MM/yyyy") : "-"}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Départ</span>
                      <span>{date.to ? format(date.to, "dd/MM/yyyy") : "-"}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Durée du séjour</span>
                      <span>{calculateNights()} nuits</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-1.5">
                    {formData.roomId && (
                      <div className="flex justify-between">
                        <span>Tarif de la chambre</span>
                        <span>
                          ${availableRooms.find((room) => room.id.toString() === formData.roomId)?.price.toFixed(2)} par
                          nuit
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold">
                      <span>Total ({calculateNights()} nuits)</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit">
                  Créer la Location
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

