"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, MapPin, Search, Star } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

// Mock data for available rooms
const mockRooms = [
  {
    id: 1,
    hotelName: "Hilton NY",
    hotelChain: "Hilton",
    roomNumber: "101",
    price: 200,
    capacity: 2,
    area: 30, // m²
    view: "ville",
    rating: 4,
    location: "New York, USA",
    hotelCategory: 4,
    totalRooms: 50,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    hotelName: "Wyndham LA",
    hotelChain: "Wyndham",
    roomNumber: "205",
    price: 350,
    capacity: 3,
    area: 45, // m²
    view: "mer",
    rating: 5,
    location: "Los Angeles, USA",
    hotelCategory: 5,
    totalRooms: 50,
    image: "https://images.unsplash.com/photo-1566073771259-6a690aa3dc54?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    hotelName: "Hyatt Chicago",
    hotelChain: "Hyatt",
    roomNumber: "310",
    price: 180,
    capacity: 2,
    area: 28, // m²
    view: "ville",
    rating: 3,
    location: "Chicago, USA",
    hotelCategory: 3,
    totalRooms: 50,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 4,
    hotelName: "Marriott SF",
    hotelChain: "Marriott",
    roomNumber: "422",
    price: 280,
    capacity: 4,
    area: 55, // m²
    view: "montagne",
    rating: 4,
    location: "San Francisco, USA",
    hotelCategory: 4,
    totalRooms: 50,
    image: "https://images.unsplash.com/photo-1568495286054-8905fa014946?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    hotelName: "Continental Miami",
    hotelChain: "Continental",
    roomNumber: "515",
    price: 220,
    capacity: 2,
    area: 32, // m²
    view: "mer",
    rating: 3,
    location: "Miami, USA",
    hotelCategory: 3,
    totalRooms: 50,
    image: "https://images.unsplash.com/photo-1598928506831-52b599d22103?q=80&w=2070&auto=format&fit=crop",
  },
]

export default function SearchPage() {
  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [priceRange, setPriceRange] = useState([100, 500])
  const [areaRange, setAreaRange] = useState([20, 60])
  const [location, setLocation] = useState("")
  const [capacity, setCapacity] = useState("")
  const [view, setView] = useState("")
  const [hotelChain, setHotelChain] = useState("")
  const [hotelCategory, setHotelCategory] = useState("")
  const [totalRooms, setTotalRooms] = useState("")

  // Filter rooms based on search criteria
  const filteredRooms = mockRooms.filter((room) => {
    if (location && !room.location.toLowerCase().includes(location.toLowerCase())) return false
    if (capacity && Number.parseInt(capacity) !== room.capacity) return false
    if (view && view !== "any" && view !== room.view) return false
    if (hotelChain && hotelChain !== "any" && hotelChain !== room.hotelChain) return false
    if (hotelCategory && hotelCategory !== "any" && Number.parseInt(hotelCategory) !== room.hotelCategory) return false
    if (totalRooms && totalRooms !== "any") {
      const [min, max] = totalRooms.split("-").map(Number)
      if (room.totalRooms < min || room.totalRooms > max) return false
    }
    if (room.price < priceRange[0] || room.price > priceRange[1]) return false
    if (room.area < areaRange[0] || room.area > areaRange[1]) return false
    return true
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Rechercher des Chambres Disponibles</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search Filters */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filtres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date Range */}
              <div className="space-y-2">
                <Label>Arrivée / Départ</Label>
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

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Emplacement</Label>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Ville ou nom d'hôtel"
                    className="pl-8"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* Hotel Chain */}
              <div className="space-y-2">
                <Label htmlFor="hotelChain">Chaîne Hôtelière</Label>
                <Select value={hotelChain} onValueChange={setHotelChain}>
                  <SelectTrigger id="hotelChain">
                    <SelectValue placeholder="Sélectionner une chaîne" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Toutes</SelectItem>
                    <SelectItem value="Hilton">Hilton</SelectItem>
                    <SelectItem value="Wyndham">Wyndham</SelectItem>
                    <SelectItem value="Hyatt">Hyatt</SelectItem>
                    <SelectItem value="Marriott">Marriott</SelectItem>
                    <SelectItem value="Continental">Continental</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Hotel Category */}
              <div className="space-y-2">
                <Label htmlFor="hotelCategory">Catégorie d'Hôtel</Label>
                <Select value={hotelCategory} onValueChange={setHotelCategory}>
                  <SelectTrigger id="hotelCategory">
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Toutes</SelectItem>
                    <SelectItem value="1">1 étoile</SelectItem>
                    <SelectItem value="2">2 étoiles</SelectItem>
                    <SelectItem value="3">3 étoiles</SelectItem>
                    <SelectItem value="4">4 étoiles</SelectItem>
                    <SelectItem value="5">5 étoiles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Total Rooms in Hotel */}
              <div className="space-y-2">
                <Label htmlFor="totalRooms">Nombre Total de Chambres</Label>
                <Select value={totalRooms} onValueChange={setTotalRooms}>
                  <SelectTrigger id="totalRooms">
                    <SelectValue placeholder="Sélectionner une option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Tous</SelectItem>
                    <SelectItem value="1-50">1-50 chambres</SelectItem>
                    <SelectItem value="51-100">51-100 chambres</SelectItem>
                    <SelectItem value="101-200">101-200 chambres</SelectItem>
                    <SelectItem value="201-500">201-500 chambres</SelectItem>
                    <SelectItem value="500+">Plus de 500 chambres</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Fourchette de Prix</Label>
                  <span className="text-sm text-muted-foreground">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[100, 500]}
                  max={1000}
                  min={0}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>

              {/* Area Range */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Superficie (m²)</Label>
                  <span className="text-sm text-muted-foreground">
                    {areaRange[0]} - {areaRange[1]} m²
                  </span>
                </div>
                <Slider
                  defaultValue={[20, 60]}
                  max={100}
                  min={10}
                  step={5}
                  value={areaRange}
                  onValueChange={setAreaRange}
                />
              </div>

              {/* Room Capacity */}
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacité</Label>
                <Select value={capacity} onValueChange={setCapacity}>
                  <SelectTrigger id="capacity">
                    <SelectValue placeholder="Sélectionner une capacité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Toutes</SelectItem>
                    <SelectItem value="1">1 Personne</SelectItem>
                    <SelectItem value="2">2 Personnes</SelectItem>
                    <SelectItem value="3">3 Personnes</SelectItem>
                    <SelectItem value="4">4+ Personnes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Type */}
              <div className="space-y-2">
                <Label htmlFor="view">Vue</Label>
                <Select value={view} onValueChange={setView}>
                  <SelectTrigger id="view">
                    <SelectValue placeholder="Sélectionner une vue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Toutes</SelectItem>
                    <SelectItem value="mer">Mer</SelectItem>
                    <SelectItem value="montagne">Montagne</SelectItem>
                    <SelectItem value="ville">Ville</SelectItem>
                    <SelectItem value="jardin">Jardin</SelectItem>
                    <SelectItem value="piscine">Piscine</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full mt-4" type="submit">
                <Search className="mr-2 h-4 w-4" /> Rechercher
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Search Results */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">
            {filteredRooms.length} {filteredRooms.length === 1 ? "Chambre" : "Chambres"} Disponibles
          </h2>

          <div className="space-y-4">
            {filteredRooms.map((room) => (
              <Card key={room.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={room.image || "/placeholder.svg"}
                      alt={`Chambre à ${room.hotelName}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{room.hotelName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {room.hotelChain} • Chambre {room.roomNumber}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{room.rating}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center text-sm">
                      <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{room.location}</span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
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
                        <span className="text-muted-foreground">Catégorie:</span> {room.hotelCategory} étoiles
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold">${room.price}</span>
                        <span className="text-sm text-muted-foreground"> / nuit</span>
                      </div>
                      <div className="space-x-2">
                        <Link href={`/reservations/new?room=${room.id}`}>
                          <Button>Réserver</Button>
                        </Link>
                        <Link href={`/rooms/${room.id}`}>
                          <Button variant="outline">Détails</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

