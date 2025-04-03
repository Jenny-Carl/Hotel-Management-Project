import { NextResponse } from "next/server"
import { createReservation, getReservationsByClient } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId") || "112233445" // ID par défaut pour Paul Martin

    console.log(`Fetching reservations for client: ${clientId}`)
    const reservations = await getReservationsByClient(clientId)
    console.log(`Found ${reservations.length} reservations`)

    return NextResponse.json(reservations)
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { startDate, endDate, clientId, roomNumber } = body

    console.log('Creating reservation with data:', { startDate, endDate, clientId, roomNumber })

    if (!startDate || !endDate || !clientId || !roomNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const reservation = await createReservation(startDate, endDate, clientId, roomNumber)
    console.log('Created reservation:', reservation)
    return NextResponse.json(reservation, { status: 201 })
  } catch (error) {
    console.error("Error creating reservation:", error)
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 })
  }
}

