"use client"

import { useState } from "react"
import { Edit, Plus, Search, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

// Mock data for rooms
const rooms = [
  {
    id: 101,
    hotelName: "Hilton NY",
    price: 200,
    capacity: 2,
    area: 30,
    view: "ville",
    commodities: "TV, Climatisation, Mini-bar",
    extensionsPossible: true,
    damages: null,
  },
  {
    id: 205,
    hotelName: "Wyndham LA",
    price: 350,
    capacity: 3,
    area: 45,
    view: "mer",
    commodities: "TV, Climatisation, Mini-bar, Balcon",
    extensionsPossible: true,
    damages: "Légère marque sur le mur",
  },
  {
    id: 310,
    hotelName: "Hyatt Chicago",
    price: 180,
    capacity: 2,
    area: 28,
    view: "ville",
    commodities: "TV, Climatisation",
    extensionsPossible: false,
    damages: null,
  },
  {
    id: 422,
    hotelName: "Marriott SF",
    price: 280,
    capacity: 4,
    area: 55,
    view: "montagne",
    commodities: "TV, Climatisation, Mini-bar, Jacuzzi",
    extensionsPossible: true,
    damages: null,
  },
  {
    id: 515,
    hotelName: "Continental Miami",
    price: 220,
    capacity: 2,
    area: 32,
    view: "mer",
    commodities: "TV, Climatisation, Mini-bar",
    extensionsPossible: false,
    damages: "Tapis taché",
  },
]

// Mock data for hotels - import from mock-data
import { hotels as allHotels } from "@/lib/mock-data"

// Convert the imported hotels to the format expected by the component
const hotels = allHotels.map((hotel) => ({
  id: hotel.id,
  name: hotel.name,
}))

export default function RoomsAdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHotel, setSelectedHotel] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentRoom, setCurrentRoom] = useState<any>(null)
  const [newRoom, setNewRoom] = useState({
    hotelId: "",
    price: "",
    capacity: "",
    area: "",
    view: "",
    commodities: "",
    extensionsPossible: "true",
    damages: "",
  })

  // Filter rooms based on search term and selected hotel
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.id.toString().includes(searchTerm) || room.hotelName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesHotel = selectedHotel === "all" || room.hotelName === selectedHotel
    return matchesSearch && matchesHotel
  })

  const handleAddRoom = () => {
    // In a real app, this would send a request to the server
    console.log("Adding room:", newRoom)
    setIsAddDialogOpen(false)
    // Reset form
    setNewRoom({
      hotelId: "",
      price: "",
      capacity: "",
      area: "",
      view: "",
      commodities: "",
      extensionsPossible: "true",
      damages: "",
    })
  }

  const handleEditRoom = () => {
    // In a real app, this would send a request to the server
    console.log("Editing room:", currentRoom)
    setIsEditDialogOpen(false)
  }

  const handleDeleteRoom = () => {
    // In a real app, this would send a request to the server
    console.log("Deleting room:", currentRoom)
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Chambres</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Ajouter une Chambre
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter une Nouvelle Chambre</DialogTitle>
              <DialogDescription>Remplissez les informations pour créer une nouvelle chambre.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hotelId" className="text-right">
                  Hôtel
                </Label>
                <Select value={newRoom.hotelId} onValueChange={(value) => setNewRoom({ ...newRoom, hotelId: value })}>
                  <SelectTrigger id="hotelId" className="col-span-3">
                    <SelectValue placeholder="Sélectionner un hôtel" />
                  </SelectTrigger>
                  <SelectContent>
                    {hotels.map((hotel) => (
                      <SelectItem key={hotel.id} value={hotel.id.toString()}>
                        {hotel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Prix
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newRoom.price}
                  onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity" className="text-right">
                  Capacité
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="area" className="text-right">
                  Superficie (m²)
                </Label>
                <Input
                  id="area"
                  type="number"
                  value={newRoom.area}
                  onChange={(e) => setNewRoom({ ...newRoom, area: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="view" className="text-right">
                  Vue
                </Label>
                <Select value={newRoom.view} onValueChange={(value) => setNewRoom({ ...newRoom, view: value })}>
                  <SelectTrigger id="view" className="col-span-3">
                    <SelectValue placeholder="Sélectionner une vue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mer">Mer</SelectItem>
                    <SelectItem value="montagne">Montagne</SelectItem>
                    <SelectItem value="ville">Ville</SelectItem>
                    <SelectItem value="jardin">Jardin</SelectItem>
                    <SelectItem value="piscine">Piscine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="commodities" className="text-right">
                  Commodités
                </Label>
                <Textarea
                  id="commodities"
                  value={newRoom.commodities}
                  onChange={(e) => setNewRoom({ ...newRoom, commodities: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="extensionsPossible" className="text-right">
                  Extensions Possibles
                </Label>
                <Select
                  value={newRoom.extensionsPossible}
                  onValueChange={(value) => setNewRoom({ ...newRoom, extensionsPossible: value })}
                >
                  <SelectTrigger id="extensionsPossible" className="col-span-3">
                    <SelectValue placeholder="Sélectionner une option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Oui</SelectItem>
                    <SelectItem value="false">Non</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="damages" className="text-right">
                  Dommages
                </Label>
                <Textarea
                  id="damages"
                  value={newRoom.damages}
                  onChange={(e) => setNewRoom({ ...newRoom, damages: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddRoom}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="mb-2 block">
                Recherche
              </Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Rechercher par numéro ou hôtel"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <Label htmlFor="hotel-filter" className="mb-2 block">
                Filtrer par Hôtel
              </Label>
              <Select value={selectedHotel} onValueChange={setSelectedHotel}>
                <SelectTrigger id="hotel-filter">
                  <SelectValue placeholder="Tous les hôtels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les hôtels</SelectItem>
                  {hotels.map((hotel) => (
                    <SelectItem key={hotel.id} value={hotel.name}>
                      {hotel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro</TableHead>
                <TableHead>Hôtel</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Capacité</TableHead>
                <TableHead>Superficie</TableHead>
                <TableHead>Vue</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.id}</TableCell>
                  <TableCell>{room.hotelName}</TableCell>
                  <TableCell>${room.price}</TableCell>
                  <TableCell>{room.capacity} personnes</TableCell>
                  <TableCell>{room.area} m²</TableCell>
                  <TableCell>{room.view}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog
                        open={isEditDialogOpen && currentRoom?.id === room.id}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open)
                          if (open) setCurrentRoom(room)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Modifier la Chambre {room.id}</DialogTitle>
                            <DialogDescription>Modifiez les informations de la chambre.</DialogDescription>
                          </DialogHeader>
                          {currentRoom && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-price" className="text-right">
                                  Prix
                                </Label>
                                <Input
                                  id="edit-price"
                                  type="number"
                                  value={currentRoom.price}
                                  onChange={(e) => setCurrentRoom({ ...currentRoom, price: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-capacity" className="text-right">
                                  Capacité
                                </Label>
                                <Input
                                  id="edit-capacity"
                                  type="number"
                                  value={currentRoom.capacity}
                                  onChange={(e) => setCurrentRoom({ ...currentRoom, capacity: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-area" className="text-right">
                                  Superficie (m²)
                                </Label>
                                <Input
                                  id="edit-area"
                                  type="number"
                                  value={currentRoom.area}
                                  onChange={(e) => setCurrentRoom({ ...currentRoom, area: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-view" className="text-right">
                                  Vue
                                </Label>
                                <Select
                                  value={currentRoom.view}
                                  onValueChange={(value) => setCurrentRoom({ ...currentRoom, view: value })}
                                >
                                  <SelectTrigger id="edit-view" className="col-span-3">
                                    <SelectValue placeholder="Sélectionner une vue" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="mer">Mer</SelectItem>
                                    <SelectItem value="montagne">Montagne</SelectItem>
                                    <SelectItem value="ville">Ville</SelectItem>
                                    <SelectItem value="jardin">Jardin</SelectItem>
                                    <SelectItem value="piscine">Piscine</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-commodities" className="text-right">
                                  Commodités
                                </Label>
                                <Textarea
                                  id="edit-commodities"
                                  value={currentRoom.commodities}
                                  onChange={(e) => setCurrentRoom({ ...currentRoom, commodities: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-damages" className="text-right">
                                  Dommages
                                </Label>
                                <Textarea
                                  id="edit-damages"
                                  value={currentRoom.damages || ""}
                                  onChange={(e) => setCurrentRoom({ ...currentRoom, damages: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button type="submit" onClick={handleEditRoom}>
                              Enregistrer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={isDeleteDialogOpen && currentRoom?.id === room.id}
                        onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open)
                          if (open) setCurrentRoom(room)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="text-destructive">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Supprimer la Chambre</DialogTitle>
                            <DialogDescription>
                              Êtes-vous sûr de vouloir supprimer la chambre {room.id} de l'hôtel {room.hotelName} ?
                              Cette action est irréversible.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                              Annuler
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteRoom}>
                              Supprimer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredRooms.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Aucune chambre trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

