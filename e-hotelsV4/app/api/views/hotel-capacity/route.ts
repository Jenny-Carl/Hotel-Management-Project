import { NextResponse } from "next/server"
import { getRoomCapacitiesByHotel } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const hotelId = searchParams.get("hotelId")

    if (!hotelId) {
      return NextResponse.json({ error: "L'ID de l'hôtel est requis" }, { status: 400 })
    }

    const capacities = await getRoomCapacitiesByHotel(Number.parseInt(hotelId))
    return NextResponse.json(capacities)
  } catch (error) {
    console.error("Erreur lors de la récupération des capacités de chambres:", error)
    return NextResponse.json({ error: "Échec de la récupération des capacités de chambres" }, { status: 500 })
  }
}

