import { NextResponse } from "next/server"
import { getRoomsByArea } from "@/lib/db"

export async function GET() {
  try {
    const roomsByArea = await getRoomsByArea()
    return NextResponse.json(roomsByArea)
  } catch (error) {
    console.error("Erreur lors de la récupération des chambres par zone:", error)
    return NextResponse.json({ error: "Échec de la récupération des chambres par zone" }, { status: 500 })
  }
}

