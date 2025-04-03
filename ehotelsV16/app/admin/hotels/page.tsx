"use client"

import { useState } from "react"
import Link from "next/link"
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

// Données simulées pour les hôtels
const hotels = [
  {
    id_hotel: 1,
    nom: "Hilton NY",
    adresse: "3055 Martha Street, New York, USA",
    classement: 4,
    nb_chambres: 50,
    id_chain: 1,
    chain_name: "Hilton",
  },
  {
    id_hotel: 2,
    nom: "Wyndham LA",
    adresse: "574 Single Street, Los Angeles, USA",
    classement: 3,
    nb_chambres: 40,
    id_chain: 2,
    chain_name: "Wyndham",
  },
  {
    id_hotel: 3,
    nom: "Hyatt Chicago",
    adresse: "1005 Broadway, Chicago, USA",
    classement: 5,
    nb_chambres: 60,
    id_chain: 3,
    chain_name: "Hyatt",
  },
  {
    id_hotel: 4,
    nom: "Marriott SF",
    adresse: "225 Sunset Blvd, San Francisco, USA",
    classement: 4,
    nb_chambres: 45,
    id_chain: 4,
    chain_name: "Marriott",
  },
  {
    id_hotel: 5,
    nom: "Continental Miami",
    adresse: "888 Ocean Drive, Miami, USA",
    classement: 3,
    nb_chambres: 35,
    id_chain: 5,
    chain_name: "Continental",
  },
]

// Données simulées pour les chaînes
const chains = [
  { id: 1, name: "Hilton" },
  { id: 2, name: "Wyndham" },
  { id: 3, name: "Hyatt" },
  { id: 4, name: "Marriott" },
  { id: 5, name: "Continental" },
]

export default function HotelsAdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChain, setSelectedChain] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentHotel, setCurrentHotel] = useState<any>(null)
  const [newHotel, setNewHotel] = useState({
    nom: "",
    adresse: "",
    classement: "",
    nb_chambres: "",
    id_chain: "",
  })

  // Filtrer les hôtels en fonction du terme de recherche et de la chaîne sélectionnée
  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.adresse.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChain = selectedChain === "all" || hotel.chain_name === selectedChain
    return matchesSearch && matchesChain
  })

  const handleAddHotel = () => {
    // Dans une vraie application, cela enverrait une requête au serveur
    console.log("Ajout d'un hôtel:", newHotel)
    setIsAddDialogOpen(false)
    // Réinitialiser le formulaire
    setNewHotel({
      nom: "",
      adresse: "",
      classement: "",
      nb_chambres: "",
      id_chain: "",
    })
  }

  const handleEditHotel = () => {
    // Dans une vraie application, cela enverrait une requête au serveur
    console.log("Modification d'un hôtel:", currentHotel)
    setIsEditDialogOpen(false)
  }

  const handleDeleteHotel = () => {
    // Dans une vraie application, cela enverrait une requête au serveur
    console.log("Suppression d'un hôtel:", currentHotel)
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Hôtels</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Ajouter un Hôtel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter un Nouvel Hôtel</DialogTitle>
              <DialogDescription>Remplissez les informations pour créer un nouvel hôtel.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nom" className="text-right">
                  Nom
                </Label>
                <Input
                  id="nom"
                  value={newHotel.nom}
                  onChange={(e) => setNewHotel({ ...newHotel, nom: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="adresse" className="text-right">
                  Adresse
                </Label>
                <Input
                  id="adresse"
                  value={newHotel.adresse}
                  onChange={(e) => setNewHotel({ ...newHotel, adresse: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="classement" className="text-right">
                  Classement
                </Label>
                <Select
                  value={newHotel.classement}
                  onValueChange={(value) => setNewHotel({ ...newHotel, classement: value })}
                >
                  <SelectTrigger id="classement" className="col-span-3">
                    <SelectValue placeholder="Sélectionner un classement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 étoile</SelectItem>
                    <SelectItem value="2">2 étoiles</SelectItem>
                    <SelectItem value="3">3 étoiles</SelectItem>
                    <SelectItem value="4">4 étoiles</SelectItem>
                    <SelectItem value="5">5 étoiles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nb_chambres" className="text-right">
                  Nombre de chambres
                </Label>
                <Input
                  id="nb_chambres"
                  type="number"
                  value={newHotel.nb_chambres}
                  onChange={(e) => setNewHotel({ ...newHotel, nb_chambres: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id_chain" className="text-right">
                  Chaîne
                </Label>
                <Select
                  value={newHotel.id_chain}
                  onValueChange={(value) => setNewHotel({ ...newHotel, id_chain: value })}
                >
                  <SelectTrigger id="id_chain" className="col-span-3">
                    <SelectValue placeholder="Sélectionner une chaîne" />
                  </SelectTrigger>
                  <SelectContent>
                    {chains.map((chain) => (
                      <SelectItem key={chain.id} value={chain.id.toString()}>
                        {chain.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddHotel}>
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
                  placeholder="Rechercher par nom ou adresse"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <Label htmlFor="chain-filter" className="mb-2 block">
                Filtrer par Chaîne
              </Label>
              <Select value={selectedChain} onValueChange={setSelectedChain}>
                <SelectTrigger id="chain-filter">
                  <SelectValue placeholder="Toutes les chaînes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les chaînes</SelectItem>
                  {chains.map((chain) => (
                    <SelectItem key={chain.id} value={chain.name}>
                      {chain.name}
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
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Classement</TableHead>
                <TableHead>Chambres</TableHead>
                <TableHead>Chaîne</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHotels.map((hotel) => (
                <TableRow key={hotel.id_hotel}>
                  <TableCell className="font-medium">{hotel.id_hotel}</TableCell>
                  <TableCell>{hotel.nom}</TableCell>
                  <TableCell>{hotel.adresse}</TableCell>
                  <TableCell>{hotel.classement} étoiles</TableCell>
                  <TableCell>{hotel.nb_chambres}</TableCell>
                  <TableCell>{hotel.chain_name}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/admin/hotels/${hotel.id_hotel}`}>
                        <Button variant="outline" size="sm">
                          Voir
                        </Button>
                      </Link>
                      <Dialog
                        open={isEditDialogOpen && currentHotel?.id_hotel === hotel.id_hotel}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open)
                          if (open) setCurrentHotel(hotel)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Modifier l'Hôtel</DialogTitle>
                            <DialogDescription>Modifiez les informations de l'hôtel.</DialogDescription>
                          </DialogHeader>
                          {currentHotel && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-nom" className="text-right">
                                  Nom
                                </Label>
                                <Input
                                  id="edit-nom"
                                  value={currentHotel.nom}
                                  onChange={(e) => setCurrentHotel({ ...currentHotel, nom: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-adresse" className="text-right">
                                  Adresse
                                </Label>
                                <Input
                                  id="edit-adresse"
                                  value={currentHotel.adresse}
                                  onChange={(e) => setCurrentHotel({ ...currentHotel, adresse: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-classement" className="text-right">
                                  Classement
                                </Label>
                                <Select
                                  value={currentHotel.classement.toString()}
                                  onValueChange={(value) =>
                                    setCurrentHotel({ ...currentHotel, classement: Number.parseInt(value) })
                                  }
                                >
                                  <SelectTrigger id="edit-classement" className="col-span-3">
                                    <SelectValue placeholder="Sélectionner un classement" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1 étoile</SelectItem>
                                    <SelectItem value="2">2 étoiles</SelectItem>
                                    <SelectItem value="3">3 étoiles</SelectItem>
                                    <SelectItem value="4">4 étoiles</SelectItem>
                                    <SelectItem value="5">5 étoiles</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-nb_chambres" className="text-right">
                                  Nombre de chambres
                                </Label>
                                <Input
                                  id="edit-nb_chambres"
                                  type="number"
                                  value={currentHotel.nb_chambres}
                                  onChange={(e) => setCurrentHotel({ ...currentHotel, nb_chambres: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-id_chain" className="text-right">
                                  Chaîne
                                </Label>
                                <Select
                                  value={currentHotel.id_chain.toString()}
                                  onValueChange={(value) =>
                                    setCurrentHotel({ ...currentHotel, id_chain: Number.parseInt(value) })
                                  }
                                >
                                  <SelectTrigger id="edit-id_chain" className="col-span-3">
                                    <SelectValue placeholder="Sélectionner une chaîne" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {chains.map((chain) => (
                                      <SelectItem key={chain.id} value={chain.id.toString()}>
                                        {chain.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button type="submit" onClick={handleEditHotel}>
                              Enregistrer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={isDeleteDialogOpen && currentHotel?.id_hotel === hotel.id_hotel}
                        onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open)
                          if (open) setCurrentHotel(hotel)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="text-destructive">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Supprimer l'Hôtel</DialogTitle>
                            <DialogDescription>
                              Êtes-vous sûr de vouloir supprimer l'hôtel {hotel.nom} ? Cette action est irréversible.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                              Annuler
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteHotel}>
                              Supprimer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredHotels.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Aucun hôtel trouvé
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

