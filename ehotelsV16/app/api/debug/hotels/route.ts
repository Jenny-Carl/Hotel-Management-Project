import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Données simulées pour les hôtels
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
      {
        id_hotel: 7,
        nom: "Wyndham NYC",
        adresse: "456 Broadway, New York, USA",
        classement: 4,
        nb_chambres: 48,
        id_chain: 2,
      },
      {
        id_hotel: 8,
        nom: "Hyatt Boston",
        adresse: "789 Freedom Trail, Boston, USA",
        classement: 4,
        nb_chambres: 42,
        id_chain: 3,
      },
      {
        id_hotel: 9,
        nom: "Marriott DC",
        adresse: "101 Constitution Ave, Washington DC, USA",
        classement: 5,
        nb_chambres: 65,
        id_chain: 4,
      },
      {
        id_hotel: 10,
        nom: "Continental Vegas",
        adresse: "202 Las Vegas Blvd, Las Vegas, USA",
        classement: 5,
        nb_chambres: 70,
        id_chain: 5,
      },
    ]

    return NextResponse.json({
      count: mockHotels.length,
      hotels: mockHotels,
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des hôtels:", error)
    return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 })
  }
}

