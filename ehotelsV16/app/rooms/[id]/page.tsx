"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, CalendarIcon, MapPin, Star, Users, Check, Wifi, Tv, Coffee, Wind } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { getRoomById, getHotelById, getRoomsByHotelId, rooms } from "@/lib/mock-data"
import { calculateNights, calculateTotalPrice } from "@/lib/reservation-service"

// Icônes pour les commodités
const commodityIcons: Record<string, React.ReactNode> = {
  TV: <Tv className="h-4 w-4" />,
  "Wi-Fi": <Wifi className="h-4 w-4" />,
  Climatisation: <Wind className="h-4 w-4" />,
  "Machine à café": <Coffee className="h-4 w-4" />,
}

// Type combiné pour gérer les deux formats de chambre
type CombinedRoom = {
  id?: number;
  num_chambre?: number;
  roomNumber?: string;
  price?: number;
  prix?: number;
  capacity?: number;
  capacite?: number;
  view?: string;
  vue?: string;
  area?: number;
  superficie?: number;
  commodities?: string[];
  commodite?: string;
  hotelId?: number;
  id_hotel?: number;
  [key: string]: any;
};

export default function RoomDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const roomId = Number.parseInt(params.id)

  const [isLoading, setIsLoading] = useState(true)
  const [room, setRoom] = useState<any>(null)
  const [hotel, setHotel] = useState<any>(null)
  const [similarRooms, setSimilarRooms] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("details")

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 3)),
  })

  // Charger les détails de la chambre
  useEffect(() => {
    setIsLoading(true)

    // Simuler un délai de chargement
    setTimeout(() => {
      // Essayer de trouver la chambre par id d'abord
      let foundRoom = getRoomById(roomId) as CombinedRoom | undefined
      
      if (!foundRoom) {
        // Si pas trouvé par id, chercher dans les chambres par num_chambre
        foundRoom = rooms.find(r => r.num_chambre === roomId || r.roomNumber === roomId.toString()) as CombinedRoom
      }

      if (foundRoom) {
        // Normaliser les propriétés de la chambre
        const normalizedRoom = {
          ...foundRoom,
          id: foundRoom.id || foundRoom.num_chambre || roomId,
          roomNumber: foundRoom.roomNumber || foundRoom.num_chambre?.toString() || roomId.toString(),
          hotelId: foundRoom.hotelId || foundRoom.id_hotel || 1,
          price: foundRoom.price || foundRoom.prix || 0,
          capacity: foundRoom.capacity || foundRoom.capacite || 2,
          view: foundRoom.view || foundRoom.vue || 'ville',
          area: foundRoom.area || foundRoom.superficie || 30,
          commodities: Array.isArray(foundRoom.commodities) 
            ? foundRoom.commodities 
            : (foundRoom.commodite || "").split(",").map((c: string) => c.trim()),
        }
        
        setRoom(normalizedRoom)
        const foundHotel = getHotelById(normalizedRoom.hotelId)
        setHotel(foundHotel)

        // Charger des chambres similaires
        if (foundHotel) {
          const hotelRooms = getRoomsByHotelId(foundHotel.id)
          const filtered = hotelRooms
            .filter((r) => (r.id !== roomId && r.num_chambre !== roomId))
            .slice(0, 3)
          setSimilarRooms(filtered)
        }
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

  const handleReservation = () => {
    if (!date?.from || !date?.to) {
      toast({
        title: "Dates manquantes",
        description: "Veuillez sélectionner les dates de votre séjour.",
        variant: "destructive"
      })
      return
    }

    // Rediriger vers la page de réservation avec les paramètres
    router.push(`/reservations/new?room=${roomId}&from=${date.from.toISOString()}&to=${date.to.toISOString()}`)
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

  if (!room || !hotel) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Chambre non trouvée</h1>
        <p>La chambre que vous recherchez n'existe pas.</p>
        <Link href="/search" className="text-blue-600 hover:underline mt-4 inline-block">
          Retour à la recherche
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/search" className="text-blue-600 hover:underline mr-2">
          Recherche
        </Link>
        <span className="mx-2">›</span>
        <Link href={`/hotels/${hotel.id}`} className="text-blue-600 hover:underline mr-2">
          {hotel.name}
        </Link>
        <span className="mx-2">›</span>
        <span>Chambre {room.roomNumber}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Images de la chambre */}
          <div className="mb-8 overflow-hidden rounded-lg">
            <img
              src={room.image || "/placeholder.svg"}
              alt={`Chambre ${room.roomNumber}`}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Onglets d'information */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="amenities">Commodités</TabsTrigger>
              <TabsTrigger value="hotel">Hôtel</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Détails de la chambre</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Capacité: {room.capacity} personnes</span>
                    </div>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Vue: {room.view}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-muted-foreground">Superficie:</span>
                      <span>{room.area} m²</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-muted-foreground">Prix:</span>
                      <span className="font-bold">${room.price} / nuit</span>
                    </div>
                  </div>
                </div>

                {room.extensionsPossible && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" />
                      <span className="text-green-600 dark:text-green-400 font-medium">Extensions possibles</span>
                    </div>
                    <p className="text-sm text-green-600/80 dark:text-green-400/80 mt-1">
                      Cette chambre peut être étendue avec des services supplémentaires sur demande.
                    </p>
                  </div>
                )}

                {room.damages && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md">
                    <h4 className="text-sm font-medium text-amber-600 dark:text-amber-400">Dommages notés:</h4>
                    <p className="text-sm text-amber-600/80 dark:text-amber-400/80">{room.damages}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="pt-4">
              <h3 className="text-lg font-medium mb-4">Commodités</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.commodities.map((commodity: string) => (
                  <div key={commodity} className="flex items-center p-2 border rounded-md">
                    {commodityIcons[commodity] || <Check className="h-4 w-4 mr-2 text-green-600" />}
                    <span className="ml-2">{commodity}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hotel" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium">{hotel.name}</h3>
                  <div className="ml-2 flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>

                <p className="text-muted-foreground">{hotel.description}</p>

                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {hotel.address}, {hotel.city}, {hotel.country}
                  </span>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Services de l'hôtel</h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity: string) => (
                      <span key={amenity} className="bg-muted px-2 py-1 rounded-md text-sm">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Chambres similaires */}
          {similarRooms.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Chambres similaires</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {similarRooms.map((similarRoom) => (
                  <Link href={`/rooms/${similarRoom.id}`} key={similarRoom.id}>
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={similarRoom.image || "/placeholder.svg"}
                          alt={`Chambre ${similarRoom.roomNumber}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium">Chambre {similarRoom.roomNumber}</h4>
                        <p className="text-sm text-muted-foreground">
                          {similarRoom.capacity} pers. • {similarRoom.area} m²
                        </p>
                        <p className="font-bold mt-2">${similarRoom.price} / nuit</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Réserver cette chambre</CardTitle>
              <CardDescription>Sélectionnez vos dates et réservez dès maintenant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Dates de séjour</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date?.from && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date?.to ? (
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
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="text-sm">
                  <div className="flex justify-between py-1">
                    <span>Arrivée</span>
                    <span>{date?.from ? format(date.from, "dd MMM yyyy", { locale: fr }) : "-"}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Départ</span>
                    <span>{date?.to ? format(date.to, "dd MMM yyyy", { locale: fr }) : "-"}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Durée du séjour</span>
                    <span>{date?.from && date?.to ? calculateNights(date.from, date.to) : 0} nuits</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span>Tarif par nuit</span>
                    <span>${room.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>
                      ${date?.from && date?.to ? calculateTotalPrice(room, date.from, date.to).toFixed(2) : "0.00"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleReservation}
                disabled={!date?.from || !date?.to || (date.from && date.to && calculateNights(date.from, date.to) === 0)}
              >
                Réserver maintenant
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

