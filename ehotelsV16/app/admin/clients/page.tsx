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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for clients
const clients = [
  {
    nas_client: "112233445",
    nom_complet: "Paul Martin",
    adresse: "888 Rue du Commerce, Montréal",
    date_enregistrement: "2023-01-15",
  },
  {
    nas_client: "556677889",
    nom_complet: "Sophie Tremblay",
    adresse: "999 Avenue des Champs, Québec",
    date_enregistrement: "2023-03-20",
  },
  {
    nas_client: "223344556",
    nom_complet: "Jean Lapointe",
    adresse: "123 Boulevard Principal, Laval",
    date_enregistrement: "2023-04-10",
  },
  {
    nas_client: "667788990",
    nom_complet: "Marie Dubois",
    adresse: "456 Rue Sainte-Catherine, Montréal",
    date_enregistrement: "2023-05-05",
  },
  {
    nas_client: "334455667",
    nom_complet: "Pierre Gagnon",
    adresse: "789 Avenue du Parc, Sherbrooke",
    date_enregistrement: "2023-06-15",
  },
]

export default function ClientsAdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentClient, setCurrentClient] = useState<any>(null)
  const [newClient, setNewClient] = useState({
    nas_client: "",
    nom_complet: "",
    adresse: "",
  })

  // Filter clients based on search term
  const filteredClients = clients.filter((client) => {
    return (
      client.nas_client.includes(searchTerm) ||
      client.nom_complet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.adresse.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleAddClient = () => {
    // In a real app, this would send a request to the server
    console.log("Adding client:", newClient)
    setIsAddDialogOpen(false)
    // Reset form
    setNewClient({
      nas_client: "",
      nom_complet: "",
      adresse: "",
    })
  }

  const handleEditClient = () => {
    // In a real app, this would send a request to the server
    console.log("Editing client:", currentClient)
    setIsEditDialogOpen(false)
  }

  const handleDeleteClient = () => {
    // In a real app, this would send a request to the server
    console.log("Deleting client:", currentClient)
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Clients</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Ajouter un Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter un Nouveau Client</DialogTitle>
              <DialogDescription>Remplissez les informations pour créer un nouveau client.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nas_client" className="text-right">
                  NAS
                </Label>
                <Input
                  id="nas_client"
                  value={newClient.nas_client}
                  onChange={(e) => setNewClient({ ...newClient, nas_client: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nom_complet" className="text-right">
                  Nom complet
                </Label>
                <Input
                  id="nom_complet"
                  value={newClient.nom_complet}
                  onChange={(e) => setNewClient({ ...newClient, nom_complet: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="adresse" className="text-right">
                  Adresse
                </Label>
                <Input
                  id="adresse"
                  value={newClient.adresse}
                  onChange={(e) => setNewClient({ ...newClient, adresse: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddClient}>
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
                  placeholder="Rechercher par NAS, nom ou adresse"
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
                <TableHead>NAS</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Date d'enregistrement</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.nas_client}>
                  <TableCell className="font-medium">{client.nas_client}</TableCell>
                  <TableCell>{client.nom_complet}</TableCell>
                  <TableCell>{client.adresse}</TableCell>
                  <TableCell>{new Date(client.date_enregistrement).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog
                        open={isEditDialogOpen && currentClient?.nas_client === client.nas_client}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open)
                          if (open) setCurrentClient(client)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Modifier le Client</DialogTitle>
                            <DialogDescription>Modifiez les informations du client.</DialogDescription>
                          </DialogHeader>
                          {currentClient && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-nas" className="text-right">
                                  NAS
                                </Label>
                                <Input id="edit-nas" value={currentClient.nas_client} disabled className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-nom" className="text-right">
                                  Nom complet
                                </Label>
                                <Input
                                  id="edit-nom"
                                  value={currentClient.nom_complet}
                                  onChange={(e) => setCurrentClient({ ...currentClient, nom_complet: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-adresse" className="text-right">
                                  Adresse
                                </Label>
                                <Input
                                  id="edit-adresse"
                                  value={currentClient.adresse}
                                  onChange={(e) => setCurrentClient({ ...currentClient, adresse: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button type="submit" onClick={handleEditClient}>
                              Enregistrer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={isDeleteDialogOpen && currentClient?.nas_client === client.nas_client}
                        onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open)
                          if (open) setCurrentClient(client)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="text-destructive">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Supprimer le Client</DialogTitle>
                            <DialogDescription>
                              Êtes-vous sûr de vouloir supprimer le client {client.nom_complet} ? Cette action est
                              irréversible.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                              Annuler
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteClient}>
                              Supprimer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredClients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Aucun client trouvé
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

