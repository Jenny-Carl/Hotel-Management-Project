import { NextResponse } from "next/server"
import { getHotels } from "@/lib/db"

export async function GET() {
  try {
    // Utiliser des données simulées pour éviter les problèmes de connexion à la base de données
    const mockHotels = [
      {
        id_hotel: 1,
        nom: "Hilton NY",
        adresse: "3055 Martha Street, New York, USA",
        classement: 4,
        nb_chambres: 50,
        id_chain: 1,
      },
      {
        id_hotel: 2,
        nom: "Wyndham LA",
        adresse: "574 Single Street, Los Angeles, USA",
        classement: 3,
        nb_chambres: 40,
        id_chain: 2,
      },
      {
        id_hotel: 3,
        nom: "Hyatt Chicago",
        adresse: "1005 Broadway, Chicago, USA",
        classement: 5,
        nb_chambres: 60,
        id_chain: 3,
      },
      {
        id_hotel: 4,
        nom: "Marriott SF",
        adresse: "225 Sunset Blvd, San Francisco, USA",
        classement: 4,
        nb_chambres: 45,
        id_chain: 4,
      },
      {
        id_hotel: 5,
        nom: "Continental Miami",
        adresse: "888 Ocean Drive, Miami, USA",
        classement: 3,
        nb_chambres: 35,
        id_chain: 5,
      },
      {
        id_hotel: 6,
        nom: "Hilton LA",
        adresse: "123 Hollywood Blvd, Los Angeles, USA",
        classement: 4,
        nb_chambres: 55,
        id_chain: 1,
      },
    ]

    // Essayer de récupérer les hôtels de la base de données, mais utiliser les données simulées en cas d'erreur
    let hotels
    try {
      hotels = await getHotels()
      if (!hotels || hotels.length === 0) {
        console.log("Aucun hôtel trouvé dans la base de données, utilisation des données simulées")
        hotels = mockHotels
      }
    } catch (dbError) {
      console.error("Erreur lors de la récupération des hôtels depuis la base de données:", dbError)
      hotels = mockHotels
    }

    return NextResponse.json(hotels)
  } catch (error) {
    console.error("Erreur dans la route API /api/hotels:", error)
    return NextResponse.json({ error: "Une erreur s'est produite lors de la récupération des hôtels" }, { status: 500 })
  }
}

