"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { CalendarIcon, MapPin, SearchIcon, Star, Filter, X } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { getAvailableRooms, getHotelById, hotelChains, viewTypes, type Room } from "@/lib/mock-data"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // État pour le chargement
  const [isLoading, setIsLoading] = useState(false)

  // État pour les résultats de recherche
  const [searchResults, setSearchResults] = useState<
    (Room & { hotelName: string; hotelRating: number; hotelCity: string })[]
  >([])

  // État pour les filtres
  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 3)),
  })

  const [filters, setFilters] = useState({
    location: "",
    capacity: "",
    view: "",
    hotelChain: "",
    hotelCategory: "",
    priceRange: [100, 500] as [number, number],
    areaRange: [20, 60] as [number, number],
  })

  // État pour le filtre mobile
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Nombre de filtres actifs
  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "priceRange") return value[0] > 100 || value[1] < 500
    if (key === "areaRange") return value[0] > 20 || value[1] < 60
    return !!value && value !== "any"
  }).length

  // Initialiser les filtres à partir des paramètres d'URL
  useEffect(() => {
    const locationParam = searchParams.get("location")
    const capacityParam = searchParams.get("capacity")
    const viewParam = searchParams.get("view")
    const chainParam = searchParams.get("chain")
    const ratingParam = searchParams.get("rating")
    const minPriceParam = searchParams.get("minPrice")
    const maxPriceParam = searchParams.get("maxPrice")
    const minAreaParam = searchParams.get("minArea")
    const maxAreaParam = searchParams.get("maxArea")
    const fromDateParam = searchParams.get("from")
    const toDateParam = searchParams.get("to")

    // Mettre à jour les filtres avec les paramètres d'URL
    if (locationParam) setFilters((prev) => ({ ...prev, location: locationParam }))
    if (capacityParam) setFilters((prev) => ({ ...prev, capacity: capacityParam }))
    if (viewParam) setFilters((prev) => ({ ...prev, view: viewParam }))
    if (chainParam) setFilters((prev) => ({ ...prev, hotelChain: chainParam }))
    if (ratingParam) setFilters((prev) => ({ ...prev, hotelCategory: ratingParam }))

    // Mettre à jour les plages de prix et de superficie
    const newPriceRange: [number, number] = [...filters.priceRange]
    if (minPriceParam) newPriceRange[0] = Number.parseInt(minPriceParam)
    if (maxPriceParam) newPriceRange[1] = Number.parseInt(maxPriceParam)
    setFilters((prev) => ({ ...prev, priceRange: newPriceRange }))

    const newAreaRange: [number, number] = [...filters.areaRange]
    if (minAreaParam) newAreaRange[0] = Number.parseInt(minAreaParam)
    if (maxAreaParam) newAreaRange[1] = Number.parseInt(maxAreaParam)
    setFilters((prev) => ({ ...prev, areaRange: newAreaRange }))

    // Mettre à jour les dates
    if (fromDateParam) {
      const fromDate = new Date(fromDateParam)
      if (!isNaN(fromDate.getTime())) {
        setDate((prev) => ({ ...prev, from: fromDate }))
      }
    }

    if (toDateParam) {
      const toDate = new Date(toDateParam)
      if (!isNaN(toDate.getTime())) {
        setDate((prev) => ({ ...prev, to: toDate }))
      }
    }

    // Effectuer la recherche initiale
    handleSearch()
  }, [searchParams])

  // Fonction pour effectuer la recherche
  const handleSearch = () => {
    setIsLoading(true)

    // Simuler un délai de chargement
    setTimeout(() => {
      try {
        // Convertir les filtres pour la recherche
        const searchFilters = {
          location: filters.location || undefined,
          capacity: filters.capacity ? Number.parseInt(filters.capacity) : undefined,
          view: filters.view !== "any" ? filters.view : undefined,
          hotelChain: filters.hotelChain !== "any" ? filters.hotelChain : undefined,
          hotelCategory: filters.hotelCategory ? Number.parseInt(filters.hotelCategory) : undefined,
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1],
          minArea: filters.areaRange[0],
          maxArea: filters.areaRange[1],
        }

        // Obtenir les résultats
        const results = getAvailableRooms(searchFilters)

        // Enrichir les résultats avec les informations de l'hôtel
        const enrichedResults = results.map((room) => {
          const hotel = getHotelById(room.hotelId)
          return {
            ...room,
            hotelName: hotel?.name || "Hôtel inconnu",
            hotelRating: hotel?.rating || 0,
            hotelCity: hotel?.city || "",
          }
        })

        setSearchResults(enrichedResults)

        // Afficher un toast avec le nombre de résultats
        if (enrichedResults.length === 0) {
          toast({
            title: "Aucune chambre trouvée",
            description: "Essayez de modifier vos critères de recherche.",
            variant: "warning",
          })
        } else {
          toast({
            title: `${enrichedResults.length} chambres trouvées`,
            description: "Voici les chambres disponibles pour vos dates.",
            variant: "success",
          })
        }
      } catch (error) {
        console.error("Erreur lors de la recherche:", error)
        toast({
          title: "Erreur de recherche",
          description: "Une erreur est survenue lors de la recherche. Veuillez réessayer.",
          variant: "error",
        })
      } finally {
        setIsLoading(false)
        setIsFilterOpen(false)
      }
    }, 1000)
  }

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      location: "",
      capacity: "",
      view: "",
      hotelChain: "",
      hotelCategory: "",
      priceRange: [100, 500],
      areaRange: [20, 60],
    })
  }

  // Fonction pour mettre à jour l'URL avec les filtres
  const updateUrlWithFilters = () => {
    const params = new URLSearchParams()

    if (filters.location) params.set("location", filters.location)
    if (filters.capacity) params.set("capacity", filters.capacity)
    if (filters.view && filters.view !== "any") params.set("view", filters.view)
    if (filters.hotelChain && filters.hotelChain !== "any") params.set("chain", filters.hotelChain)
    if (filters.hotelCategory) params.set("rating", filters.hotelCategory)

    if (filters.priceRange[0] > 100) params.set("minPrice", filters.priceRange[0].toString())
    if (filters.priceRange[1] < 500) params.set("maxPrice", filters.priceRange[1].toString())

    if (filters.areaRange[0] > 20) params.set("minArea", filters.areaRange[0].toString())
    if (filters.areaRange[1] < 60) params.set("maxArea", filters.areaRange[1].toString())

    if (date.from) params.set("from", date.from.toISOString())
    if (date.to) params.set("to", date.to.toISOString())

    router.push(`/search?${params.toString()}`)
  }

  // Fonction pour réserver une chambre
  const handleBookRoom = (roomId: number) => {
    if (!date.from || !date.to) {
      toast({
        title: "Dates manquantes",
        description: "Veuillez sélectionner les dates de votre séjour.",
        variant: "warning",
      })
      return
    }

    router.push(`/reservations/new?room=${roomId}&from=${date.from.toISOString()}&to=${date.to.toISOString()}`)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Rechercher des Chambres Disponibles</h1>

      {/* Barre de recherche principale */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Destination</Label>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Ville ou hôtel"
                className="pl-8"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Dates</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date.from && "text-muted-foreground")}
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

          <div className="space-y-2">
            <Label htmlFor="capacity">Voyageurs</Label>
            <Select value={filters.capacity} onValueChange={(value) => setFilters({ ...filters, capacity: value })}>
              <SelectTrigger id="capacity">
                <SelectValue placeholder="Nombre de personnes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="1">1 personne</SelectItem>
                <SelectItem value="2">2 personnes</SelectItem>
                <SelectItem value="3">3 personnes</SelectItem>
                <SelectItem value="4">4+ personnes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              className="w-full"
              onClick={() => {
                handleSearch()
                updateUrlWithFilters()
              }}
            >
              <SearchIcon className="mr-2 h-4 w-4" /> Rechercher
            </Button>
          </div>
        </div>

        {/* Filtres supplémentaires pour mobile */}
        <div className="md:hidden mt-4">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filtres
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Filtres de recherche</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4 overflow-y-auto max-h-[calc(80vh-80px)]">
                {/* Contenu des filtres mobile */}
                <div className="space-y-2">
                  <Label htmlFor="mobile-view">Vue</Label>
                  <Select value={filters.view} onValueChange={(value) => setFilters({ ...filters, view: value })}>
                    <SelectTrigger id="mobile-view">
                      <SelectValue placeholder="Type de vue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      {viewTypes.map((view) => (
                        <SelectItem key={view.id} value={view.id}>
                          {view.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile-chain">Chaîne hôtelière</Label>
                  <Select
                    value={filters.hotelChain}
                    onValueChange={(value) => setFilters({ ...filters, hotelChain: value })}
                  >
                    <SelectTrigger id="mobile-chain">
                      <SelectValue placeholder="Chaîne hôtelière" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      {hotelChains.map((chain) => (
                        <SelectItem key={chain.id} value={chain.name}>
                          {chain.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile-category">Catégorie d'hôtel</Label>
                  <Select
                    value={filters.hotelCategory}
                    onValueChange={(value) => setFilters({ ...filters, hotelCategory: value })}
                  >
                    <SelectTrigger id="mobile-category">
                      <SelectValue placeholder="Nombre d'étoiles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="1">1 étoile</SelectItem>
                      <SelectItem value="2">2 étoiles</SelectItem>
                      <SelectItem value="3">3 étoiles</SelectItem>
                      <SelectItem value="4">4 étoiles</SelectItem>
                      <SelectItem value="5">5 étoiles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Fourchette de Prix</Label>
                    <span className="text-sm text-muted-foreground">
                      ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    max={1000}
                    min={0}
                    step={10}
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters({ ...filters, priceRange: value as [number, number] })}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Superficie (m²)</Label>
                    <span className="text-sm text-muted-foreground">
                      {filters.areaRange[0]} - {filters.areaRange[1]} m²
                    </span>
                  </div>
                  <Slider
                    max={100}
                    min={10}
                    step={5}
                    value={filters.areaRange}
                    onValueChange={(value) => setFilters({ ...filters, areaRange: value as [number, number] })}
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1" onClick={resetFilters}>
                    Réinitialiser
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      handleSearch()
                      updateUrlWithFilters()
                    }}
                  >
                    Appliquer
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filtres de recherche (desktop) */}
        <div className="hidden lg:block lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Filtres</CardTitle>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    <X className="h-4 w-4 mr-1" /> Réinitialiser
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="view">Vue</Label>
                <Select value={filters.view} onValueChange={(value) => setFilters({ ...filters, view: value })}>
                  <SelectTrigger id="view">
                    <SelectValue placeholder="Type de vue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    {viewTypes.map((view) => (
                      <SelectItem key={view.id} value={view.id}>
                        {view.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hotelChain">Chaîne hôtelière</Label>
                <Select
                  value={filters.hotelChain}
                  onValueChange={(value) => setFilters({ ...filters, hotelChain: value })}
                >
                  <SelectTrigger id="hotelChain">
                    <SelectValue placeholder="Chaîne hôtelière" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    {hotelChains.map((chain) => (
                      <SelectItem key={chain.id} value={chain.name}>
                        {chain.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hotelCategory">Catégorie d'hôtel</Label>
                <Select
                  value={filters.hotelCategory}
                  onValueChange={(value) => setFilters({ ...filters, hotelCategory: value })}
                >
                  <SelectTrigger id="hotelCategory">
                    <SelectValue placeholder="Nombre d'étoiles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes</SelectItem>
                    <SelectItem value="1">1 étoile</SelectItem>
                    <SelectItem value="2">2 étoiles</SelectItem>
                    <SelectItem value="3">3 étoiles</SelectItem>
                    <SelectItem value="4">4 étoiles</SelectItem>
                    <SelectItem value="5">5 étoiles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Fourchette de Prix</Label>
                  <span className="text-sm text-muted-foreground">
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </span>
                </div>
                <Slider
                  max={1000}
                  min={0}
                  step={10}
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters({ ...filters, priceRange: value as [number, number] })}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Superficie (m²)</Label>
                  <span className="text-sm text-muted-foreground">
                    {filters.areaRange[0]} - {filters.areaRange[1]} m²
                  </span>
                </div>
                <Slider
                  max={100}
                  min={10}
                  step={5}
                  value={filters.areaRange}
                  onValueChange={(value) => setFilters({ ...filters, areaRange: value as [number, number] })}
                />
              </div>

              <Button
                className="w-full mt-4"
                onClick={() => {
                  handleSearch()
                  updateUrlWithFilters()
                }}
              >
                Appliquer les filtres
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Résultats de recherche */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">
            {searchResults.length} {searchResults.length === 1 ? "Chambre" : "Chambres"} Disponibles
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Recherche des chambres disponibles...</p>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Aucune chambre trouvée</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Essayez de modifier vos critères de recherche pour trouver des chambres disponibles.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((room) => (
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
                            Chambre {room.roomNumber} • {room.hotelCity}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm font-medium">{room.hotelRating}</span>
                        </div>
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
                          <span className="text-muted-foreground">Commodités:</span>{" "}
                          {room.commodities.slice(0, 2).join(", ")}
                          {room.commodities.length > 2 && "..."}
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold">${room.price}</span>
                          <span className="text-sm text-muted-foreground"> / nuit</span>
                        </div>
                        <div className="space-x-2">
                          <Button onClick={() => handleBookRoom(room.id)}>Réserver</Button>
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
          )}
        </div>
      </div>
    </div>
  )
}

