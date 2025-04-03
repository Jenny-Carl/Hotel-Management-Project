import type { Room } from "./mock-data"

// Type pour une réservation
export interface Reservation {
  id: string
  userId: string
  roomId: number
  checkInDate: string
  checkOutDate: string
  guestName: string
  guestEmail: string
  guestPhone: string
  totalPrice: number
  paymentMethod: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: string
}

// Fonction pour créer une nouvelle réservation
export function createReservation(data: {
  userId: string
  roomId: number
  checkInDate: string
  checkOutDate: string
  guestName: string
  guestEmail: string
  guestPhone: string
  totalPrice: number
  paymentMethod: string
}): Reservation {
  const reservation: Reservation = {
    id: `res-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    status: "confirmed", // Changed from "confirmed" to match the status check in the UI
    createdAt: new Date().toISOString(),
    ...data,
  }

  // Dans une application réelle, nous sauvegarderions la réservation dans une base de données
  // Pour cette démo, nous la stockons dans le localStorage
  const existingReservations = getReservations()
  const updatedReservations = [...existingReservations, reservation]

  // Make sure we're running in a browser environment before using localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("ehotels_reservations", JSON.stringify(updatedReservations))
  }

  return reservation
}

// Fonction pour obtenir toutes les réservations d'un utilisateur
export function getReservationsByUserId(userId: string): Reservation[] {
  const reservations = getReservations()
  return reservations.filter((res) => res.userId === userId)
}

// Fonction pour obtenir une réservation par ID
export function getReservationById(id: string): Reservation | undefined {
  const reservations = getReservations()
  return reservations.find((res) => res.id === id)
}

// Fonction pour annuler une réservation
export function cancelReservation(id: string): boolean {
  const reservations = getReservations()
  const index = reservations.findIndex((res) => res.id === id)

  if (index === -1) return false

  reservations[index].status = "cancelled"

  // Make sure we're running in a browser environment before using localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("ehotels_reservations", JSON.stringify(reservations))
  }

  return true
}

// Fonction utilitaire pour obtenir toutes les réservations
function getReservations(): Reservation[] {
  // Make sure we're running in a browser environment before using localStorage
  if (typeof window === "undefined") {
    return []
  }

  const reservationsJson = localStorage.getItem("ehotels_reservations")
  return reservationsJson ? JSON.parse(reservationsJson) : []
}

// Fonction pour calculer le nombre de nuits entre deux dates
export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Fonction pour calculer le prix total
export function calculateTotalPrice(room: Room, checkIn: Date, checkOut: Date): number {
  const nights = calculateNights(checkIn, checkOut)
  return room.price * nights
}

// Fonction pour générer une facture
export interface Invoice {
  invoiceNumber: string
  reservationId: string
  customerName: string
  customerEmail: string
  roomDetails: {
    hotelName: string
    roomNumber: string
    checkInDate: string
    checkOutDate: string
    nights: number
    pricePerNight: number
  }
  totalAmount: number
  taxes: number
  grandTotal: number
  paymentMethod: string
  issueDate: string
}

export function generateInvoice(reservation: Reservation, hotelName: string, roomNumber: string): Invoice {
  const checkIn = new Date(reservation.checkInDate)
  const checkOut = new Date(reservation.checkOutDate)
  const nights = calculateNights(checkIn, checkOut)
  const pricePerNight = reservation.totalPrice / nights
  const taxes = reservation.totalPrice * 0.1 // 10% de taxes

  return {
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    reservationId: reservation.id,
    customerName: reservation.guestName,
    customerEmail: reservation.guestEmail,
    roomDetails: {
      hotelName,
      roomNumber,
      checkInDate: reservation.checkInDate,
      checkOutDate: reservation.checkOutDate,
      nights,
      pricePerNight,
    },
    totalAmount: reservation.totalPrice,
    taxes,
    grandTotal: reservation.totalPrice + taxes,
    paymentMethod: reservation.paymentMethod,
    issueDate: new Date().toISOString(),
  }
}

