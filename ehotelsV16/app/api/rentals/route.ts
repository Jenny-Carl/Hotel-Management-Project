import { NextResponse } from "next/server"
import { createLocation, createPayment } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { startDate, endDate, employeeId, clientId, roomNumber, paymentAmount } = body

    if (!startDate || !endDate || !employeeId || !clientId || !roomNumber || !paymentAmount) {
      return NextResponse.json({ error: "Tous les champs requis doivent être remplis" }, { status: 400 })
    }

    // Create payment first
    const payment = await createPayment(paymentAmount, new Date().toISOString())

    // Then create location with payment ID
    const rental = await createLocation(startDate, endDate, employeeId, clientId, roomNumber, payment.id_paiement)

    return NextResponse.json(rental, { status: 201 })
  } catch (error) {
    console.error("Erreur lors de la création de la location:", error)
    return NextResponse.json({ error: "Échec de la création de la location" }, { status: 500 })
  }
}

