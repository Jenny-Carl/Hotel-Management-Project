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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Données simulées pour les chaînes hôtelières
const chains = [
  {
    id_chain: 1,
    nom: "Hilton",
    adresse_bureau: "3080 Brannon Avenue, Cleveland, USA",
    nb_hotels: 8,
    emails: ["corporate@hilton.com", "press@hilton.com"],
    telephones: ["+1-800-445-8667"],
  },
  {
    id_chain: 2,
    nom: "Wyndham",
    adresse_bureau: "1487 Wood Street, Fort-Lauderdale, USA",
    nb_hotels: 6,
    emails: ["info@wyndham.com"],
    telephones: ["+1-888-999-4000"],
  },
  {
    id_chain: 3,
    nom: "Hyatt",
    adresse_bureau: "3950 Horner Street, Austin, USA",
    nb_hotels: 5,
    emails: ["info@hyatt.com"],
    telephones: ["+1-888-591-1234"],
  },
  {
    id_chain: 4,
    nom: "Marriott",
    adresse_bureau: "1214 Camden Place, Los Angeles, USA",
    nb_hotels: 7,
    emails: ["info@marriott.com"],
    telephones: ["+1-888-236-2427"],
  },
  {
    id_chain: 5,
    nom: "Continental",
    adresse_bureau: "3997 Farm Meadow Drive, Arizona, USA",
    nb_hotels: 4,
    emails: ["info@continental.com"],
    telephones: ["+1-800-555-1212"],
  },
]

export default function ChainsAdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentChain, setCurrentChain] = useState<any>(null)
  const [newChain, setNewChain] = useState({
    nom: "",
    adresse_bureau: "",
    email: "",
    telephone: "",
  })

  // Filtrer les chaînes en fonction du terme de recherche
  const filteredChains = chains.filter((chain) => {
    return (
      chain.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chain.adresse_bureau.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleAddChain = () => {
    // Dans une vraie application, cela enverrait une requête au serveur
    console.log("Ajout d'une chaîne:", newChain)
    setIsAddDialogOpen(false)
    // Réinitialiser le formulaire
    setNewChain({
      nom: "",
      adresse_bureau: "",
      email: "",
      telephone: "",
    })
  }

  const handleEditChain = () => {
    // Dans une vraie application, cela enverrait une requête au serveur
    console.log("Modification d'une chaîne:", currentChain)
    setIsEditDialogOpen(false)
  }

  const handleDeleteChain = () => {
    // Dans une vraie application, cela enverrait une requête au serveur
    console.log("Suppression d'une chaîne:", currentChain)
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Chaînes Hôtelières</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Ajouter une Chaîne
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter une Nouvelle Chaîne</DialogTitle>
              <DialogDescription>
                Remplissez les informations pour créer une nouvelle chaîne hôtelière.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nom" className="text-right">
                  Nom
                </Label>
                <Input
                  id="nom"
                  value={newChain.nom}
                  onChange={(e) => setNewChain({ ...newChain, nom: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="adresse_bureau" className="text-right">
                  Adresse du bureau
                </Label>
                <Input
                  id="adresse_bureau"
                  value={newChain.adresse_bureau}
                  onChange={(e) => setNewChain({ ...newChain, adresse_bureau: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newChain.email}
                  onChange={(e) => setNewChain({ ...newChain, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telephone" className="text-right">
                  Téléphone
                </Label>
                <Input
                  id="telephone"
                  value={newChain.telephone}
                  onChange={(e) => setNewChain({ ...newChain, telephone: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddChain}>
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
                <TableHead>Adresse du bureau</TableHead>
                <TableHead>Nombre d'hôtels</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChains.map((chain) => (
                <TableRow key={chain.id_chain}>
                  <TableCell className="font-medium">{chain.id_chain}</TableCell>
                  <TableCell>{chain.nom}</TableCell>
                  <TableCell>{chain.adresse_bureau}</TableCell>
                  <TableCell>{chain.nb_hotels}</TableCell>
                  <TableCell>
                    <div>
                      <div>{chain.emails[0]}</div>
                      <div>{chain.telephones[0]}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/admin/chains/${chain.id_chain}`}>
                        <Button variant="outline" size="sm">
                          Voir
                        </Button>
                      </Link>
                      <Dialog
                        open={isEditDialogOpen && currentChain?.id_chain === chain.id_chain}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open)
                          if (open) setCurrentChain(chain)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Modifier la Chaîne</DialogTitle>
                            <DialogDescription>Modifiez les informations de la chaîne hôtelière.</DialogDescription>
                          </DialogHeader>
                          {currentChain && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-nom" className="text-right">
                                  Nom
                                </Label>
                                <Input
                                  id="edit-nom"
                                  value={currentChain.nom}
                                  onChange={(e) => setCurrentChain({ ...currentChain, nom: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-adresse" className="text-right">
                                  Adresse du bureau
                                </Label>
                                <Input
                                  id="edit-adresse"
                                  value={currentChain.adresse_bureau}
                                  onChange={(e) => setCurrentChain({ ...currentChain, adresse_bureau: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button type="submit" onClick={handleEditChain}>
                              Enregistrer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={isDeleteDialogOpen && currentChain?.id_chain === chain.id_chain}
                        onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open)
                          if (open) setCurrentChain(chain)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="text-destructive">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Supprimer la Chaîne</DialogTitle>
                            <DialogDescription>
                              Êtes-vous sûr de vouloir supprimer la chaîne {chain.nom} ? Cette action est irréversible.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                              Annuler
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteChain}>
                              Supprimer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredChains.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Aucune chaîne trouvée
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

