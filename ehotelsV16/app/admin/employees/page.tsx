"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Plus, Search, Trash, User } from "lucide-react"

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
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

// Données simulées pour les employés
const initialEmployees = [
  {
    nas_employe: "123456789",
    nom_complet: "Jean Dupont",
    adresse: "12 Rue Principale, New York",
    id_hotel: 1,
    hotel_name: "Hilton NY",
    roles: ["Gestionnaire"],
    email: "jean.dupont@hotel.com",
    telephone: "+1-212-555-1234",
  },
  {
    nas_employe: "987654321",
    nom_complet: "Marie Curie",
    adresse: "45 Avenue Montagne, New York",
    id_hotel: 1,
    hotel_name: "Hilton NY",
    roles: ["Réceptionniste"],
    email: "marie.curie@hotel.com",
    telephone: "+1-212-555-5678",
  },
  {
    nas_employe: "456123789",
    nom_complet: "Albert Einstein",
    adresse: "78 Quantum Road, San Francisco",
    id_hotel: 2,
    hotel_name: "Hilton LA",
    roles: ["Service ménager"],
    email: "albert.einstein@hotel.com",
    telephone: "+1-415-555-9012",
  },
  {
    nas_employe: "321654987",
    nom_complet: "Isaac Newton",
    adresse: "99 Gravity Street, Los Angeles",
    id_hotel: 3,
    hotel_name: "Hilton Chicago",
    roles: ["Gestionnaire"],
    email: "isaac.newton@hotel.com",
    telephone: "+1-312-555-3456",
  },
  {
    nas_employe: "789456123",
    nom_complet: "Nikola Tesla",
    adresse: "1 Electric Ave, Chicago",
    id_hotel: 4,
    hotel_name: "Hilton SF",
    roles: ["Réceptionniste"],
    email: "nikola.tesla@hotel.com",
    telephone: "+1-415-555-7890",
  },
]

// Données simulées pour les hôtels
const hotels = [
  { id: 1, name: "Hilton NY" },
  { id: 2, name: "Hilton LA" },
  { id: 3, name: "Hilton Chicago" },
  { id: 4, name: "Hilton SF" },
  { id: 5, name: "Hilton Miami" },
]

// Données simulées pour les rôles
const roles = [
  { id: 1, name: "Gestionnaire" },
  { id: 2, name: "Réceptionniste" },
  { id: 3, name: "Service ménager" },
]

export default function EmployeesAdminPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHotel, setSelectedHotel] = useState("all")
  const [employees, setEmployees] = useState(initialEmployees)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState<any>(null)
  const [newEmployee, setNewEmployee] = useState({
    nas_employe: "",
    nom_complet: "",
    adresse: "",
    id_hotel: "",
    email: "",
    telephone: "",
    roles: [] as string[],
  })

  // Filtrer les employés en fonction du terme de recherche et de l'hôtel sélectionné
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.nas_employe.includes(searchTerm) ||
      employee.nom_complet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.adresse.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesHotel = selectedHotel === "all" || employee.hotel_name === selectedHotel
    return matchesSearch && matchesHotel
  })

  const handleAddEmployee = () => {
    const newEmployeeObj = {
      ...newEmployee,
      id_hotel: Number.parseInt(newEmployee.id_hotel),
      hotel_name: hotels.find((h) => h.id === Number.parseInt(newEmployee.id_hotel))?.name || "",
    }

    setEmployees([...employees, newEmployeeObj])
    setIsAddDialogOpen(false)

    toast({
      title: "Employé ajouté",
      description: `L'employé ${newEmployeeObj.nom_complet} a été ajouté avec succès.`,
      variant: "success",
    })

    // Réinitialiser le formulaire
    setNewEmployee({
      nas_employe: "",
      nom_complet: "",
      adresse: "",
      id_hotel: "",
      email: "",
      telephone: "",
      roles: [],
    })
  }

  const handleEditEmployee = () => {
    const updatedEmployees = employees.map((employee) =>
      employee.nas_employe === currentEmployee.nas_employe
        ? {
            ...currentEmployee,
            hotel_name: hotels.find((h) => h.id === currentEmployee.id_hotel)?.name || "",
          }
        : employee,
    )

    setEmployees(updatedEmployees)
    setIsEditDialogOpen(false)

    toast({
      title: "Employé modifié",
      description: `Les informations de ${currentEmployee.nom_complet} ont été mises à jour.`,
      variant: "success",
    })
  }

  const handleDeleteEmployee = () => {
    const updatedEmployees = employees.filter((employee) => employee.nas_employe !== currentEmployee.nas_employe)

    setEmployees(updatedEmployees)
    setIsDeleteDialogOpen(false)

    toast({
      title: "Employé supprimé",
      description: `L'employé ${currentEmployee.nom_complet} a été supprimé avec succès.`,
      variant: "success",
    })
  }

  const handleRoleChange = (roleName: string, checked: boolean) => {
    if (checked) {
      setNewEmployee({ ...newEmployee, roles: [...newEmployee.roles, roleName] })
    } else {
      setNewEmployee({ ...newEmployee, roles: newEmployee.roles.filter((name) => name !== roleName) })
    }
  }

  const handleCurrentRoleChange = (roleName: string, checked: boolean) => {
    if (!currentEmployee) return

    if (checked) {
      setCurrentEmployee({ ...currentEmployee, roles: [...currentEmployee.roles, roleName] })
    } else {
      setCurrentEmployee({
        ...currentEmployee,
        roles: currentEmployee.roles.filter((name: string) => name !== roleName),
      })
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Employés</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Ajouter un Employé
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter un Nouvel Employé</DialogTitle>
              <DialogDescription>Remplissez les informations pour créer un nouvel employé.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nas_employe" className="text-right">
                  NAS
                </Label>
                <Input
                  id="nas_employe"
                  value={newEmployee.nas_employe}
                  onChange={(e) => setNewEmployee({ ...newEmployee, nas_employe: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nom_complet" className="text-right">
                  Nom complet
                </Label>
                <Input
                  id="nom_complet"
                  value={newEmployee.nom_complet}
                  onChange={(e) => setNewEmployee({ ...newEmployee, nom_complet: e.target.value })}
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
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telephone" className="text-right">
                  Téléphone
                </Label>
                <Input
                  id="telephone"
                  value={newEmployee.telephone}
                  onChange={(e) => setNewEmployee({ ...newEmployee, telephone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="adresse" className="text-right">
                  Adresse
                </Label>
                <Input
                  id="adresse"
                  value={newEmployee.adresse}
                  onChange={(e) => setNewEmployee({ ...newEmployee, adresse: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id_hotel" className="text-right">
                  Hôtel
                </Label>
                <Select
                  value={newEmployee.id_hotel}
                  onValueChange={(value) => setNewEmployee({ ...newEmployee, id_hotel: value })}
                >
                  <SelectTrigger id="id_hotel" className="col-span-3">
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
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Rôles</Label>
                <div className="col-span-3 space-y-2">
                  {roles.map((role) => (
                    <div key={role.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`role-${role.id}`}
                        checked={newEmployee.roles.includes(role.name)}
                        onCheckedChange={(checked) => handleRoleChange(role.name, checked as boolean)}
                      />
                      <Label htmlFor={`role-${role.id}`} className="text-sm font-normal">
                        {role.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleAddEmployee}
                disabled={!newEmployee.nas_employe || !newEmployee.nom_complet || !newEmployee.id_hotel}
              >
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
                <TableHead>NAS</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Hôtel</TableHead>
                <TableHead>Rôles</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.nas_employe}>
                  <TableCell className="font-medium">{employee.nas_employe}</TableCell>
                  <TableCell>{employee.nom_complet}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{employee.email}</div>
                      <div className="text-muted-foreground">{employee.telephone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.adresse}</TableCell>
                  <TableCell>{employee.hotel_name}</TableCell>
                  <TableCell>{employee.roles.join(", ")}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/admin/employees/${employee.nas_employe}`}>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-1" /> Voir
                        </Button>
                      </Link>
                      <Dialog
                        open={isEditDialogOpen && currentEmployee?.nas_employe === employee.nas_employe}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open)
                          if (open) setCurrentEmployee(employee)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Modifier l'Employé</DialogTitle>
                            <DialogDescription>Modifiez les informations de l'employé.</DialogDescription>
                          </DialogHeader>
                          {currentEmployee && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-nas" className="text-right">
                                  NAS
                                </Label>
                                <Input
                                  id="edit-nas"
                                  value={currentEmployee.nas_employe}
                                  disabled
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-nom" className="text-right">
                                  Nom complet
                                </Label>
                                <Input
                                  id="edit-nom"
                                  value={currentEmployee.nom_complet}
                                  onChange={(e) =>
                                    setCurrentEmployee({ ...currentEmployee, nom_complet: e.target.value })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-email" className="text-right">
                                  Email
                                </Label>
                                <Input
                                  id="edit-email"
                                  type="email"
                                  value={currentEmployee.email}
                                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, email: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-telephone" className="text-right">
                                  Téléphone
                                </Label>
                                <Input
                                  id="edit-telephone"
                                  value={currentEmployee.telephone}
                                  onChange={(e) =>
                                    setCurrentEmployee({ ...currentEmployee, telephone: e.target.value })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-adresse" className="text-right">
                                  Adresse
                                </Label>
                                <Input
                                  id="edit-adresse"
                                  value={currentEmployee.adresse}
                                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, adresse: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-hotel" className="text-right">
                                  Hôtel
                                </Label>
                                <Select
                                  value={currentEmployee.id_hotel.toString()}
                                  onValueChange={(value) =>
                                    setCurrentEmployee({ ...currentEmployee, id_hotel: Number.parseInt(value) })
                                  }
                                >
                                  <SelectTrigger id="edit-hotel" className="col-span-3">
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
                              <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="text-right pt-2">Rôles</Label>
                                <div className="col-span-3 space-y-2">
                                  {roles.map((role) => (
                                    <div key={role.id} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`edit-role-${role.id}`}
                                        checked={currentEmployee.roles.includes(role.name)}
                                        onCheckedChange={(checked) =>
                                          handleCurrentRoleChange(role.name, checked as boolean)
                                        }
                                      />
                                      <Label htmlFor={`edit-role-${role.id}`} className="text-sm font-normal">
                                        {role.name}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button type="submit" onClick={handleEditEmployee}>
                              Enregistrer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={isDeleteDialogOpen && currentEmployee?.nas_employe === employee.nas_employe}
                        onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open)
                          if (open) setCurrentEmployee(employee)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="text-destructive">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Supprimer l'Employé</DialogTitle>
                            <DialogDescription>
                              Êtes-vous sûr de vouloir supprimer l'employé {employee.nom_complet} ? Cette action est
                              irréversible.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                              Annuler
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteEmployee}>
                              Supprimer
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEmployees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Aucun employé trouvé
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

