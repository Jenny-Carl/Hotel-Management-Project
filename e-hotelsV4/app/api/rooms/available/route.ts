import { NextResponse } from "next/server"
import { getAvailableRooms } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate") || ""
    const endDate = searchParams.get("endDate") || ""
    const location = searchParams.get("location") || undefined
    const capacity = searchParams.get("capacity") ? Number.parseInt(searchParams.get("capacity") as string) : undefined
    const view = searchParams.get("view") || undefined
    const hotelChain = searchParams.get("hotelChain") || undefined
    const hotelCategory = searchParams.get("hotelCategory")
      ? Number.parseInt(searchParams.get("hotelCategory") as string)
      : undefined
    const minArea = searchParams.get("minArea") ? Number.parseInt(searchParams.get("minArea") as string) : undefined
    const maxArea = searchParams.get("maxArea") ? Number.parseInt(searchParams.get("maxArea") as string) : undefined
    const minPrice = searchParams.get("minPrice")
      ? Number.parseFloat(searchParams.get("minPrice") as string)
      : undefined
    const maxPrice = searchParams.get("maxPrice")
      ? Number.parseFloat(searchParams.get("maxPrice") as string)
      : undefined

    if (!startDate || !endDate) {
      return NextResponse.json({ error: "Les dates de début et de fin sont requises" }, { status: 400 })
    }

    const rooms = await getAvailableRooms(
      startDate,
      endDate,
      location,
      capacity,
      view,
      hotelChain,
      hotelCategory,
      minArea,
      maxArea,
      minPrice,
      maxPrice,
    )

    return NextResponse.json(rooms)
  } catch (error) {
    console.error("Erreur lors de la recherche de chambres disponibles:", error)
    return NextResponse.json({ error: "Échec de la recherche de chambres disponibles" }, { status: 500 })
  }
}

