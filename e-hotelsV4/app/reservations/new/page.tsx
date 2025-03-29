"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CalendarIcon, CreditCard } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Mock room data
const rooms = [
  {
    id: 1,
    hotelName: "Hilton NY",
    hotelChain: "Hilton",
    roomNumber: "101",
    price: 200,
    capacity: 2,
    view: "ville",
    rating: 4,
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    hotelName: "Wyndham LA",
    hotelChain: "Wyndham",
    roomNumber: "205",
    price: 350,
    capacity: 3,
    view: "mer",
    rating: 5,
    location: "Los Angeles, USA",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
  },
]

export default function NewReservationPage() {
  const searchParams = useSearchParams()
  const roomId = searchParams.get("room")

  const foundRoom = roomId ? rooms.find((room) => room.id === Number.parseInt(roomId)) : null
  const selectedRoom = foundRoom ||
    rooms[0] || {
      id: 0,
      hotelName: "Sample Hotel",
      hotelChain: "Sample Chain",
      roomNumber: "000",
      price: 100,
      capacity: 2,
      view: "city",
      rating: 3,
      location: "Sample Location",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    }

  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 3)),
  })

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const calculateNights = () => {
    if (!date.from || !date.to) return 0
    const diffTime = Math.abs(date.to.getTime() - date.from.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = () => {
    return selectedRoom.price * calculateNights()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would submit the reservation to the server
    alert("Reservation submitted successfully!")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/search" className="text-blue-600 hover:underline mr-2">
          Search
        </Link>
        <span className="mx-2">›</span>
        <span>New Reservation</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Complete Your Reservation</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Room Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
              <CardDescription>Review the details of your selected room</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <img
                    src={selectedRoom.image || "/placeholder.svg"}
                    alt={`Room at ${selectedRoom.hotelName}`}
                    className="rounded-md w-full h-auto"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold">{selectedRoom.hotelName}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedRoom.hotelChain} • Room {selectedRoom.roomNumber}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-muted-foreground">Location:</span> {selectedRoom.location}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Capacity:</span> {selectedRoom.capacity}{" "}
                      {selectedRoom.capacity === 1 ? "Person" : "People"}
                    </div>
                    <div>
                      <span className="text-muted-foreground">View:</span> {selectedRoom.view}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price:</span> ${selectedRoom.price}/night
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Check-in / Check-out</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date.from && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(date.from, "LLL dd, y")
                              )
                            ) : (
                              "Select dates"
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
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Guest Information</CardTitle>
              <CardDescription>Please provide your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Secure payment processing</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                    <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input
                      id="cardExpiry"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvc">CVC</Label>
                    <Input
                      id="cardCvc"
                      name="cardCvc"
                      placeholder="123"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Reservation Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Reservation Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{selectedRoom.hotelName}</h3>
                  <p className="text-sm text-muted-foreground">Room {selectedRoom.roomNumber}</p>
                </div>

                <div className="text-sm">
                  <div className="flex justify-between py-1">
                    <span>Check-in</span>
                    <span>{date.from ? format(date.from, "LLL dd, y") : "-"}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Check-out</span>
                    <span>{date.to ? format(date.to, "LLL dd, y") : "-"}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Length of stay</span>
                    <span>{calculateNights()} nights</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span>Room rate</span>
                    <span>${selectedRoom.price.toFixed(2)} per night</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total ({calculateNights()} nights)</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubmit}>
                Complete Reservation
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

