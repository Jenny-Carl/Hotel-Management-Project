import { NextResponse } from "next/server"
import { createReservation, getReservationsByClient } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")

    if (!clientId) {
      return NextResponse.json({ error: "Client ID is required" }, { status: 400 })
    }

    const reservations = await getReservationsByClient(clientId)
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

    if (!startDate || !endDate || !clientId || !roomNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const reservation = await createReservation(startDate, endDate, clientId, roomNumber)
    return NextResponse.json(reservation, { status: 201 })
  } catch (error) {
    console.error("Error creating reservation:", error)
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 })
  }
}

