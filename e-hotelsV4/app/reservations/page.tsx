"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarClock, Check, Clock, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for reservations
const reservations = [
  {
    id: 1,
    hotelName: "Hilton NY",
    roomNumber: "101",
    dateStart: "2025-06-01",
    dateEnd: "2025-06-05",
    status: "Confirmée",
    price: 799.96,
  },
]

// Mock data for past reservations
const pastReservations = [
  {
    id: 2,
    hotelName: "Wyndham LA",
    roomNumber: "205",
    dateStart: "2023-03-15",
    dateEnd: "2023-03-20",
    status: "Completed",
    price: 1250.0,
  },
  {
    id: 3,
    hotelName: "Hyatt Chicago",
    roomNumber: "310",
    dateStart: "2023-01-10",
    dateEnd: "2023-01-15",
    status: "Cancelled",
    price: 900.0,
  },
]

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Reservations</h1>
        <Link href="/reservations/new">
          <Button>New Reservation</Button>
        </Link>
      </div>

      <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {reservations.length === 0 ? (
            <div className="text-center py-12">
              <CalendarClock className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No upcoming reservations</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You don't have any upcoming reservations. Book a room to get started.
              </p>
              <Link href="/search" className="mt-4 inline-block">
                <Button>Find a Room</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} isUpcoming={true} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {pastReservations.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No past reservations</h3>
              <p className="mt-2 text-sm text-muted-foreground">You don't have any past reservations.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pastReservations.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} isUpcoming={false} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ReservationCard({ reservation, isUpcoming }: { reservation: any; isUpcoming: boolean }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{reservation.hotelName}</CardTitle>
            <p className="text-sm text-muted-foreground">Room {reservation.roomNumber}</p>
          </div>
          <ReservationStatus status={reservation.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Check-in</p>
            <p className="text-sm">{formatDate(reservation.dateStart)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Check-out</p>
            <p className="text-sm">{formatDate(reservation.dateEnd)}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium">Total Price</p>
          <p className="text-lg font-bold">${reservation.price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter>
        {isUpcoming ? (
          <div className="flex gap-2 w-full">
            <Link href={`/reservations/${reservation.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
            <Link href={`/reservations/${reservation.id}/cancel`} className="flex-1">
              <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                Cancel
              </Button>
            </Link>
          </div>
        ) : (
          <Link href={`/reservations/${reservation.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

function ReservationStatus({ status }: { status: string }) {
  if (status === "Confirmée" || status === "Completed") {
    return (
      <div className="flex items-center text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 rounded-full px-2 py-1">
        <Check className="h-3.5 w-3.5 mr-1" />
        <span>{status}</span>
      </div>
    )
  } else if (status === "Cancelled" || status === "Annulée") {
    return (
      <div className="flex items-center text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-full px-2 py-1">
        <X className="h-3.5 w-3.5 mr-1" />
        <span>{status}</span>
      </div>
    )
  } else {
    return (
      <div className="flex items-center text-sm font-medium text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-full px-2 py-1">
        <Clock className="h-3.5 w-3.5 mr-1" />
        <span>{status}</span>
      </div>
    )
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

