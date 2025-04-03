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
import { useToast } from "@/hooks/use-toast"

// Données simulées pour les paiements
const mockPayments = [
  {
    id_paiement: 1,
    montant: 799.96,
    date: "2023-12-15",
    methode: "Carte de crédit",
    status: "Complété",
    client_name: "Paul Martin",
    reservation_id: 1,
  },
  {
    id_paiement: 2,
    montant: 1250.0,
    date: "2023-11-20",
    methode: "Carte de débit",
    status: "Complété",
    client_name: "Sophie Tremblay",
    reservation_id: 2,
  },
  {
    id_paiement: 3,
    montant: 900.0,
    date: "2023-10-05",
    methode: "Espèces",
    status: "Complété",
    client_name: "Jean Lapointe",
    reservation_id: 3,
  },
  {
    id_paiement: 4,
    montant: 1400.0,
    date: "2023-09-18",
    methode: "Carte de crédit",
    status: "Remboursé",
    client_name: "Marie Dubois",
    reservation_id: 4,
  },
  {
    id_paiement: 5,
    montant: 650.0,
    date: "2023-08-22",
    methode: "Carte de crédit",
    status: "En attente",
    client_name: "Pierre Gagnon",
    reservation_id: 5,
  },
]

export default function PaymentsAdminPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [payments, setPayments] = useState(mockPayments)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentPayment, setCurrentPayment] = useState<any>(null)
  const [newPayment, setNewPayment] = useState({
    montant: "",
    methode: "credit-card",
    client_name: "",
    reservation_id: "",
  })

  // Filtrer les paiements en fonction du terme de recherche et du statut
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id_paiement.toString().includes(searchTerm) ||
      payment.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.montant.toString().includes(searchTerm)
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddPayment = () => {
    const id = Math.max(...payments.map((p) => p.id_paiement)) + 1
    const newPaymentObj = {
      id_paiement: id,
      montant: Number.parseFloat(newPayment.montant),
      date: new Date().toISOString().split("T")[0],
      methode:
        newPayment.methode === "credit-card"
          ? "Carte de crédit"
          : newPayment.methode === "debit-card"
            ? "Carte de débit"
            : "Espèces",
      status: "Complété",
      client_name: newPayment.client_name,
      reservation_id: Number.parseInt(newPayment.reservation_id),
    }

    setPayments([...payments, newPaymentObj])
    setIsAddDialogOpen(false)

    toast({
      title: "Paiement ajouté",
      description: `Le paiement de ${newPaymentObj.montant}$ a été ajouté avec succès.`,
      variant: "success",
    })

    // Réinitialiser le formulaire
    setNewPayment({
      montant: "",
      methode: "credit-card",
      client_name: "",
      reservation_id: "",
    })
  }

  const handleEditPayment = () => {
    const updatedPayments = payments.map((payment) =>
      payment.id_paiement === currentPayment.id_paiement ? currentPayment : payment,
    )

    setPayments(updatedPayments)
    setIsEditDialogOpen(false)

    toast({
      title: "Paiement modifié",
      description: `Le paiement #${currentPayment.id_paiement} a été modifié avec succès.`,
      variant: "success",
    })
  }

  const handleDeletePayment = () => {
    const updatedPayments = payments.filter((payment) => payment.id_paiement !== currentPayment.id_paiement)

    setPayments(updatedPayments)
    setIsDeleteDialogOpen(false)

    toast({
      title: "Paiement supprimé",
      description: `Le paiement #${currentPayment.id_paiement} a été supprimé avec succès.`,
      variant: "success",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Paiements</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Ajouter un Paiement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter un Nouveau Paiement</DialogTitle>
              <DialogDescription>Remplissez les informations pour créer un nouveau paiement.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="montant" className="text-right">
                  Montant
                </Label>
                <div className="relative col-span-3">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input
                    id="montant"
                    type="number"
                    step="0.01"
                    min="0"
                    value={newPayment.montant}
                    onChange={(e) => setNewPayment({ ...newPayment, montant: e.target.value })}
                    className="pl-7"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="methode" className="text-right">
                  Méthode
                </Label>
                <Select
                  value={newPayment.methode}
                  onValueChange={(value) => setNewPayment({ ...newPayment, methode: value })}
                >
                  <SelectTrigger id="methode" className="col-span-3">
                    <SelectValue placeholder="Sélectionner une méthode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit-card">Carte de crédit</SelectItem>
                    <SelectItem value="debit-card">Carte de débit</SelectItem>
                    <SelectItem value="cash">Espèces</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client_name" className="text-right">
                  Client
                </Label>
                <Input
                  id="client_name"
                  value={newPayment.client_name}
                  onChange={(e) => setNewPayment({ ...newPayment, client_name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reservation_id" className="text-right">
                  Réservation ID
                </Label>
                <Input
                  id="reservation_id"
                  type="number"
                  min="1"
                  value={newPayment.reservation_id}
                  onChange={(e) => setNewPayment({ ...newPayment, reservation_id: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddPayment}>
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
                  placeholder="Rechercher par ID, client ou montant"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <Label htmlFor="status-filter" className="mb-2 block">
                Filtrer par Statut
              </Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Complété">Complété</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Remboursé">Remboursé</SelectItem>
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
                <TableHead>Client</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Réservation</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id_paiement}>
                  <TableCell className="font-medium">#{payment.id_paiement}</TableCell>
                  <TableCell>{payment.client_name}</TableCell>
                  <TableCell>${payment.montant.toFixed(2)}</TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{payment.methode}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === "Complété"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "Remboursé"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell>#{payment.reservation_id}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog
                        open={isEditDialogOpen && currentPayment?.id_paiement === payment.id_paiement}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open)
                          if (open) setCurrentPayment(payment)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Modifier le Paiement</DialogTitle>
                            <DialogDescription>Modifiez les informations du paiement.</DialogDescription>
                          </DialogHeader>
                          {currentPayment && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-montant" className="text-right">
                                  Montant
                                </Label>
                                <div className="relative col-span-3">
                                  <span className="absolute left-3 top-2.5">$</span>
                                  <Input
                                    id="edit-montant"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={currentPayment.montant}
                                    onChange={(e) =>
                                      setCurrentPayment({
                                        ...currentPayment,
                                        montant: Number.parseFloat(e.target.value),
                                      })
                                    }
                                    className="pl-7"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-methode" className="text-right">
                                  Méthode
                                </Label>
                                <Select
                                  value={
                                    currentPayment.methode === "Carte de crédit"
                                      ? "credit-card"
                                      : currentPayment.methode === "Carte de débit"
                                        ? "debit-card"
                                        : "cash"
                                  }
                                  onValueChange={(value) => {
                                    const methodeMap = {
                                      "credit-card": "Carte de crédit",
                                      "debit-card": "Carte de débit",
                                      cash: "Espèces",
                                    }
                                    setCurrentPayment({
                                      ...currentPayment,
                                      methode: methodeMap[value as keyof typeof methodeMap],
                                    })
                                  }}
                                >
                                  <SelectTrigger id="edit-methode" className="col-span-3">
                                    <SelectValue placeholder="Sélectionner une méthode" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="credit-card">Carte de crédit</SelectItem>
                                    <SelectItem value="debit-card">Carte de débit</SelectItem>
                                    <SelectItem value="cash">Espèces</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-status" className="text-right">
                                  Statut
                                </Label>
                                <Select
                                  value={currentPayment.status}
                                  onValueChange={(value) => setCurrentPayment({ ...currentPayment, status: value })}
                                >
                                  <SelectTrigger id="edit-status" className="col-span-3">
                                    <SelectValue placeholder="Sélectionner un statut" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Complété">Complété</SelectItem>
                                    <SelectItem value="En attente">En attente</SelectItem>
                                    <SelectItem value="Remboursé">Remboursé</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button type="submit" onClick={handleEditPayment}>
                              Enregistrer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={isDeleteDialogOpen && currentPayment?.id_paiement === payment.id_paiement}
                        onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open)
                          if (open) setCurrentPayment(payment)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="text-destructive">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Supprimer le Paiement</DialogTitle>
                            <DialogDescription>
                              Êtes-vous sûr de vouloir supprimer le paiement #{payment.id_paiement} de{" "}
                              {payment.client_name} ? Cette action est irréversible.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                              Annuler
                            </Button>
                            <Button variant="destructive" onClick={handleDeletePayment}>
                              Supprimer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    Aucun paiement trouvé
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

