"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarRange, Check, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for reservations
const reservations = [
  {
    id_reservation: 1,
    date_debut: "2025-06-01",
    date_fin: "2025-06-05",
    statut: "Confirmée",
    nas_client: "112233445",
    num_chambre: 101,
    client_name: "Paul Martin",
    hotel_name: "Hilton NY",
    prix: 799.96,
  },
  {
    id_reservation: 2,
    date_debut: "2025-07-10",
    date_fin: "2025-07-15",
    statut: "En attente",
    nas_client: "556677889",
    num_chambre: 205,
    client_name: "Sophie Tremblay",
    hotel_name: "Wyndham LA",
    prix: 1750.0,
  },
  {
    id_reservation: 3,
    date_debut: "2025-08-05",
    date_fin: "2025-08-10",
    statut: "Confirmée",
    nas_client: "223344556",
    num_chambre: 310,
    client_name: "Jean Lapointe",
    hotel_name: "Hyatt Chicago",
    prix: 900.0,
  },
  {
    id_reservation: 4,
    date_debut: "2025-09-15",
    date_fin: "2025-09-20",
    statut: "Annulée",
    nas_client: "667788990",
    num_chambre: 422,
    client_name: "Marie Dubois",
    hotel_name: "Marriott SF",
    prix: 1400.0,
  },
]

export default function ReservationsAdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter reservations based on search term and status
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.id_reservation.toString().includes(searchTerm) ||
      reservation.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.hotel_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || reservation.statut === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Réservations</h1>
        <Link href="/admin/reservations/convert">
          <Button>Convertir en Location</Button>
        </Link>
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
                  placeholder="Rechercher par ID, client ou hôtel"
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
                  <SelectItem value="Confirmée">Confirmée</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Annulée">Annulée</SelectItem>
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
                <TableHead>Hôtel</TableHead>
                <TableHead>Chambre</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.id_reservation}>
                  <TableCell className="font-medium">#{reservation.id_reservation}</TableCell>
                  <TableCell>{reservation.client_name}</TableCell>
                  <TableCell>{reservation.hotel_name}</TableCell>
                  <TableCell>{reservation.num_chambre}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarRange className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        {new Date(reservation.date_debut).toLocaleDateString()} -{" "}
                        {new Date(reservation.date_fin).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>${typeof reservation.prix === 'number' ? reservation.prix.toFixed(2) : Number(reservation.prix).toFixed(2)}</TableCell>
                  <TableCell>
                    <ReservationStatus status={reservation.statut} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/admin/reservations/${reservation.id_reservation}`}>
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </Link>
                      {reservation.statut === "Confirmée" && (
                        <Link href={`/admin/reservations/convert?id=${reservation.id_reservation}`}>
                          <Button size="sm">Convertir</Button>
                        </Link>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredReservations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    Aucune réservation trouvée
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

function ReservationStatus({ status }: { status: string }) {
  if (status === "Confirmée") {
    return (
      <div className="flex items-center text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 rounded-full px-2 py-1">
        <Check className="h-3.5 w-3.5 mr-1" />
        <span>{status}</span>
      </div>
    )
  } else if (status === "Annulée") {
    return (
      <div className="flex items-center text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-full px-2 py-1">
        <X className="h-3.5 w-3.5 mr-1" />
        <span>{status}</span>
      </div>
    )
  } else {
    return (
      <div className="flex items-center text-sm font-medium text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-full px-2 py-1">
        <CalendarRange className="h-3.5 w-3.5 mr-1" />
        <span>{status}</span>
      </div>
    )
  }
}

