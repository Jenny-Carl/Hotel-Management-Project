"use client"

import type React from "react"
import type { DateRange } from "react-day-picker"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { CalendarIcon, CreditCard, Check, Building, MapPin, Mail, Phone, Home, AlertTriangle } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth-context"
import { getRoomById, getHotelById, rooms } from "@/lib/mock-data"
import { calculateNights, calculateTotalPrice, createReservation } from "@/lib/reservation-service"

export default function NewReservationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const { user } = useAuth()

  const roomId = searchParams.get("room")
  const fromParam = searchParams.get("from")
  const toParam = searchParams.get("to")

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [room, setRoom] = useState<any>(null)
  const [hotel, setHotel] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("personal")

  const [date, setDate] = useState<DateRange | undefined>({
    from: fromParam ? new Date(fromParam) : new Date(),
    to: toParam ? new Date(toParam) : new Date(new Date().setDate(new Date().getDate() + 3)),
  })

  const [formData, setFormData] = useState({
    firstName: user?.name.split(" ")[0] || "",
    lastName: user?.name.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: "",
    address: "",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    agreeToTerms: false,
  })

  // Charger les détails de la chambre
  useEffect(() => {
    if (!roomId) return

    setIsLoading(true)
    const roomIdNum = parseInt(roomId)

    // Simuler un délai de chargement
    setTimeout(() => {
      // Essayer de trouver la chambre par id d'abord
      let foundRoom = getRoomById(roomIdNum)
      
      if (!foundRoom) {
        // Si pas trouvé par id, chercher dans les chambres par num_chambre
        foundRoom = rooms.find((r: { num_chambre?: number }) => r.num_chambre === roomIdNum)
      }

      if (foundRoom) {
        setRoom(foundRoom)
        const hotelId = foundRoom.hotelId || foundRoom.id_hotel || 1
        const foundHotel = getHotelById(hotelId)
        setHotel(foundHotel)
      } else {
        toast({
          title: "Chambre non trouvée",
          description: "La chambre demandée n'existe pas.",
          variant: "destructive"
        })
        router.push('/search')
      }

      setIsLoading(false)
    }, 500)
  }, [roomId, toast, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation de base
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs du formulaire.",
        variant: "default"
      })
      return
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Conditions non acceptées",
        description: "Vous devez accepter les conditions générales pour continuer.",
        variant: "default"
      })
      return
    }

    if (!date.from || !date.to) {
      toast({
        title: "Dates manquantes",
        description: "Veuillez sélectionner les dates de votre séjour.",
        variant: "default"
      })
      return
    }

    if (formData.paymentMethod === "credit-card" && (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc)) {
      toast({
        title: "Informations de paiement manquantes",
        description: "Veuillez remplir tous les champs de paiement.",
        variant: "default"
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Calculer le prix total
      const totalPrice = calculateTotalPrice(room, date.from, date.to)

      // Créer la réservation
      const reservation = createReservation({
        userId: user?.id || "guest",
        roomId: room.id,
        checkInDate: date.from.toISOString(),
        checkOutDate: date.to.toISOString(),
        guestName: `${formData.firstName} ${formData.lastName}`,
        guestEmail: formData.email,
        guestPhone: formData.phone,
        totalPrice,
        paymentMethod: formData.paymentMethod,
      })

      // Simuler un délai de traitement
      setTimeout(() => {
        setIsSubmitting(false)
        toast({
          title: "Réservation confirmée",
          description: "Votre réservation a été effectuée avec succès.",
          variant: "default"
        })

        // Rediriger vers la page de confirmation
        router.push(`/reservations/${reservation.id}/confirmation`)
      }, 1500)
    } catch (error) {
      console.error("Erreur lors de la réservation:", error)
      setIsSubmitting(false)
      toast({
        title: "Erreur de réservation",
        description: "Une erreur est survenue lors de la réservation. Veuillez réessayer.",
        variant: "destructive"
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement des détails de la chambre...</p>
        </div>
      </div>
    )
  }

  if (!room || !hotel) return null

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/search" className="text-blue-600 hover:underline mr-2">
          Recherche
        </Link>
        <span className="mx-2">›</span>
        <Link href={`/rooms/${room.id}`} className="text-blue-600 hover:underline mr-2">
          Chambre {room.roomNumber}
        </Link>
        <span className="mx-2">›</span>
        <span>Réservation</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Compléter votre réservation</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de réservation */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Informations personnelles</TabsTrigger>
                <TabsTrigger value="stay">Séjour</TabsTrigger>
                <TabsTrigger value="payment">Paiement</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations personnelles</CardTitle>
                    <CardDescription>Veuillez fournir vos coordonnées</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            className="pl-8"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <div className="relative">
                          <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="pl-8"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <div className="relative">
                        <Home className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          name="address"
                          className="pl-8"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button type="button" onClick={() => setActiveTab("stay")}>
                        Continuer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stay" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Détails du séjour</CardTitle>
                    <CardDescription>Vérifiez les détails de votre séjour</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img
                          src={room.image || "/placeholder.svg"}
                          alt={`Chambre à ${hotel.name}`}
                          className="rounded-md w-full h-auto"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center">
                          <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                          <h3 className="text-xl font-bold">{hotel.name}</h3>
                        </div>
                        <div className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            {hotel.address}, {hotel.city}, {hotel.country}
                          </p>
                        </div>

                        <p className="mt-4 font-medium">Chambre {room.roomNumber}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                          <div>
                            <span className="text-muted-foreground">Capacité:</span> {room.capacity}{" "}
                            {room.capacity === 1 ? "Personne" : "Personnes"}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Vue:</span> {room.view}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Superficie:</span> {room.area} m²
                          </div>
                          <div>
                            <span className="text-muted-foreground">Prix:</span> ${room.price}/nuit
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <Label>Dates du séjour</Label>
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
                                      {format(date.from, "dd MMM yyyy", { locale: fr })} -{" "}
                                      {format(date.to, "dd MMM yyyy", { locale: fr })}
                                    </>
                                  ) : (
                                    format(date.from, "dd MMM yyyy", { locale: fr })
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
                                locale={fr}
                                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-4">
                      <Button type="button" variant="outline" onClick={() => setActiveTab("personal")}>
                        Retour
                      </Button>
                      <Button type="button" onClick={() => setActiveTab("payment")}>
                        Continuer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations de paiement</CardTitle>
                    <CardDescription>Traitement sécurisé des paiements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Label>Méthode de paiement</Label>
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex-1">
                            Carte de crédit
                          </Label>
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="flex-1">
                            PayPal
                          </Label>
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M19.5 8.25H4.5C3.67157 8.25 3 8.92157 3 9.75V18.75C3 19.5784 3.67157 20.25 4.5 20.25H19.5C20.3284 20.25 21 19.5784 21 18.75V9.75C21 8.92157 20.3284 8.25 19.5 8.25Z"
                              stroke="#6b7280"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3 9.75L12 15L21 9.75"
                              stroke="#6b7280"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.paymentMethod === "credit-card" && (
                      <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Numéro de carte</Label>
                          <div className="relative">
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              required
                            />
                            <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardExpiry">Date d'expiration</Label>
                            <Input
                              id="cardExpiry"
                              name="cardExpiry"
                              placeholder="MM/AA"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardCvc">CVC</Label>
                            <Input
                              id="cardCvc"
                              name="cardCvc"
                              placeholder="123"
                              value={formData.cardCvc}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 mt-4">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300"
                        required
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm">
                        J'accepte les{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          conditions générales
                        </Link>{" "}
                        et la{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          politique de confidentialité
                        </Link>
                      </Label>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md mt-4">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-amber-800 dark:text-amber-300">Politique d'annulation</h4>
                          <p className="text-sm text-amber-700 dark:text-amber-400">
                            Vous pouvez annuler gratuitement jusqu'à 48 heures avant la date d'arrivée. Après cette
                            période, des frais d'annulation peuvent s'appliquer.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-4">
                      <Button type="button" variant="outline" onClick={() => setActiveTab("stay")}>
                        Retour
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⟳</span> Traitement...
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" /> Confirmer la réservation
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Résumé de la réservation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Résumé de la réservation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{hotel.name}</h3>
                    <p className="text-sm text-muted-foreground">Chambre {room.roomNumber}</p>
                  </div>

                  <div className="text-sm">
                    <div className="flex justify-between py-1">
                      <span>Arrivée</span>
                      <span>{date.from ? format(date.from, "dd MMM yyyy", { locale: fr }) : "-"}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Départ</span>
                      <span>{date.to ? format(date.to, "dd MMM yyyy", { locale: fr }) : "-"}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Durée du séjour</span>
                      <span>{date.from && date.to ? calculateNights(date.from, date.to) : 0} nuits</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span>Tarif par nuit</span>
                      <span>${room.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>
                        ${date.from && date.to ? calculateTotalPrice(room, date.from, date.to).toFixed(2) : "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes (10%)</span>
                      <span>
                        $
                        {date.from && date.to
                          ? (calculateTotalPrice(room, date.from, date.to) * 0.1).toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>
                        $
                        {date.from && date.to
                          ? (calculateTotalPrice(room, date.from, date.to) * 1.1).toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

