import { NextResponse } from "next/server"
import { convertReservationToLocation, createPayment } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { reservationId, employeeId, paymentAmount } = body

    if (!reservationId || !employeeId || !paymentAmount) {
      return NextResponse.json({ error: "Tous les champs requis doivent être remplis" }, { status: 400 })
    }

    // Create payment first
    const payment = await createPayment(paymentAmount, new Date().toISOString())

    // Then convert reservation to location
    const rental = await convertReservationToLocation(reservationId, employeeId, payment.id_paiement)

    return NextResponse.json(rental, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la conversion de la réservation:", error)
    return NextResponse.json({ error: "Échec de la conversion de la réservation" }, { status: 500 })
  }
}

