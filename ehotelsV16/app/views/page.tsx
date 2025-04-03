"use client"

import { useState } from "react"
import { Building2, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for available rooms by area
const roomsByArea = [
  { area: "New York", available: 120 },
  { area: "Los Angeles", available: 85 },
  { area: "Chicago", available: 67 },
  { area: "Miami", available: 93 },
  { area: "San Francisco", available: 45 },
  { area: "Boston", available: 38 },
  { area: "Dallas", available: 72 },
  { area: "Houston", available: 64 },
]

// Mock data for hotel room capacities
const hotelCapacities = {
  "Hilton NY": [
    { type: "Standard", capacity: 2, count: 20 },
    { type: "Deluxe", capacity: 3, count: 15 },
    { type: "Suite", capacity: 4, count: 10 },
    { type: "Penthouse", capacity: 6, count: 5 },
  ],
  "Wyndham LA": [
    { type: "Standard", capacity: 2, count: 25 },
    { type: "Deluxe", capacity: 3, count: 15 },
    { type: "Suite", capacity: 4, count: 8 },
    { type: "Penthouse", capacity: 6, count: 2 },
  ],
  "Hyatt Chicago": [
    { type: "Standard", capacity: 2, count: 30 },
    { type: "Deluxe", capacity: 3, count: 12 },
    { type: "Suite", capacity: 4, count: 6 },
    { type: "Penthouse", capacity: 6, count: 2 },
  ],
  "Marriott SF": [
    { type: "Standard", capacity: 2, count: 22 },
    { type: "Deluxe", capacity: 3, count: 18 },
    { type: "Suite", capacity: 4, count: 7 },
    { type: "Penthouse", capacity: 6, count: 3 },
  ],
  "Continental Miami": [
    { type: "Standard", capacity: 2, count: 28 },
    { type: "Deluxe", capacity: 3, count: 14 },
    { type: "Suite", capacity: 4, count: 5 },
    { type: "Penthouse", capacity: 6, count: 3 },
  ],
}

export default function ViewsPage() {
  const [selectedHotel, setSelectedHotel] = useState("Hilton NY")

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Statistiques</h1>

      <Tabs defaultValue="rooms-by-area" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="rooms-by-area">Chambres par Zone</TabsTrigger>
          <TabsTrigger value="hotel-capacity">Capacité d'Hôtel</TabsTrigger>
        </TabsList>

        <TabsContent value="rooms-by-area" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Vue 1: Nombre de Chambres Disponibles par Zone</CardTitle>
              <CardDescription>
                Cette vue montre le nombre total de chambres disponibles dans chaque zone géographique.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {roomsByArea.map((item) => (
                    <Card key={item.area} className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <h3 className="font-medium">{item.area}</h3>
                            <p className="text-2xl font-bold">{item.available}</p>
                            <p className="text-sm text-muted-foreground">chambres disponibles</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Requête SQL pour cette vue:</h3>
                  <pre className="bg-muted p-2 rounded text-sm overflow-x-auto">
                    {`
SELECT h.adresse AS zone, COUNT(c.num_chambre) AS chambres_disponibles
FROM Hotel h
JOIN Chambre c ON h.id_hotel = c.id_hotel
WHERE NOT EXISTS (
    SELECT 1 
    FROM Location l 
    WHERE l.num_chambre = c.num_chambre 
    AND l.date_debut <= CURRENT_DATE 
    AND l.date_fin >= CURRENT_DATE
)
AND NOT EXISTS (
    SELECT 1 
    FROM Reservation r 
    WHERE r.num_chambre = c.num_chambre 
    AND r.date_debut <= CURRENT_DATE 
    AND r.date_fin >= CURRENT_DATE
)
GROUP BY h.adresse
ORDER BY chambres_disponibles DESC;
                    `}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hotel-capacity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Vue 2: Capacité de Toutes les Chambres d'un Hôtel Spécifique</CardTitle>
              <CardDescription>
                Cette vue montre la capacité de toutes les chambres pour un hôtel sélectionné.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="max-w-xs">
                  <Select value={selectedHotel} onValueChange={setSelectedHotel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un hôtel" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(hotelCapacities).map((hotel) => (
                        <SelectItem key={hotel} value={hotel}>
                          {hotel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {hotelCapacities[selectedHotel as keyof typeof hotelCapacities].map((item) => (
                    <Card key={item.type} className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-2">
                          <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <h3 className="font-medium">{item.type}</h3>
                            <p className="text-2xl font-bold">{item.count}</p>
                            <p className="text-sm text-muted-foreground">
                              chambres pour {item.capacity} {item.capacity === 1 ? "personne" : "personnes"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Requête SQL pour cette vue:</h3>
                  <pre className="bg-muted p-2 rounded text-sm overflow-x-auto">
                    {`
SELECT c.capacite, COUNT(c.num_chambre) AS nombre_chambres
FROM Chambre c
JOIN Hotel h ON c.id_hotel = h.id_hotel
WHERE h.nom = '${selectedHotel}'
GROUP BY c.capacite
ORDER BY c.capacite;
                    `}
                  </pre>
                </div>

                <div className="flex justify-end">
                  <Button>Exporter en PDF</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

