// Types pour les données
export type Room = {
  id: number
  hotelId: number
  roomNumber: string
  price: number
  capacity: number
  area: number
  view: string
  commodities: string[]
  extensionsPossible: boolean
  damages: string | null
  image?: string
  available: boolean
  num_chambre?: number
  id_hotel?: number
}

export interface Hotel {
  id: number
  name: string
  chainId: number
  chainName: string
  address: string
  city: string
  country: string
  rating: number
  totalRooms: number
  amenities: string[]
  images: string[]
  description: string
}

// Données simulées pour les hôtels
export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Hilton New York",
    chainId: 1,
    chainName: "Hilton",
    address: "3055 Martha Street",
    city: "New York",
    country: "USA",
    rating: 4,
    totalRooms: 50,
    amenities: ["Piscine", "Spa", "Restaurant", "Salle de sport", "Wi-Fi gratuit"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
    ],
    description:
      "Situé au cœur de Manhattan, le Hilton New York offre un hébergement luxueux à proximité des principales attractions de la ville.",
  },
  {
    id: 2,
    name: "Wyndham Los Angeles",
    chainId: 2,
    chainName: "Wyndham",
    address: "574 Single Street",
    city: "Los Angeles",
    country: "USA",
    rating: 5,
    totalRooms: 40,
    amenities: ["Piscine", "Spa", "Restaurant", "Bar sur le toit", "Wi-Fi gratuit"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a690aa3dc54?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?q=80&w=2121&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
    ],
    description:
      "Le Wyndham Los Angeles est un hôtel de luxe situé près de Beverly Hills, offrant une expérience 5 étoiles avec des vues imprenables sur la ville.",
  },
  {
    id: 3,
    name: "Hyatt Chicago",
    chainId: 3,
    chainName: "Hyatt",
    address: "1005 Broadway",
    city: "Chicago",
    country: "USA",
    rating: 3,
    totalRooms: 60,
    amenities: ["Restaurant", "Salle de conférence", "Wi-Fi gratuit"],
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598928506831-52b599d22103?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621275471769-e6aa344546d5?q=80&w=2070&auto=format&fit=crop",
    ],
    description:
      "Le Hyatt Chicago est idéalement situé dans le centre-ville, offrant un accès facile aux attractions touristiques et aux quartiers d'affaires.",
  },
  {
    id: 4,
    name: "Marriott San Francisco",
    chainId: 4,
    chainName: "Marriott",
    address: "225 Sunset Blvd",
    city: "San Francisco",
    country: "USA",
    rating: 4,
    totalRooms: 45,
    amenities: ["Piscine", "Restaurant", "Salle de sport", "Wi-Fi gratuit", "Vue sur la baie"],
    images: [
      "https://images.unsplash.com/photo-1568495286054-8905fa614946?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?q=80&w=2121&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
    ],
    description:
      "Le Marriott San Francisco offre des vues spectaculaires sur la baie et le Golden Gate Bridge, avec un service de première classe.",
  },
  {
    id: 5,
    name: "Continental Miami",
    chainId: 5,
    chainName: "Continental",
    address: "888 Ocean Drive",
    city: "Miami",
    country: "USA",
    rating: 3,
    totalRooms: 35,
    amenities: ["Accès à la plage", "Restaurant", "Bar", "Wi-Fi gratuit"],
    images: [
      "https://images.unsplash.com/photo-1598928506831-52b599d22103?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621275471769-e6aa344546d5?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2069&auto=format&fit=crop",
    ],
    description:
      "Le Continental Miami est situé directement sur la plage, offrant un accès facile à l'océan et à la vie nocturne animée de Miami Beach.",
  },
  {
    id: 6,
    name: "Hilton Paris",
    chainId: 1,
    chainName: "Hilton",
    address: "123 Avenue des Champs-Élysées",
    city: "Paris",
    country: "France",
    rating: 5,
    totalRooms: 60,
    amenities: ["Spa de luxe", "Restaurant étoilé", "Vue sur la Tour Eiffel", "Concierge 24/7", "Wi-Fi gratuit"],
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?q=80&w=2121&auto=format&fit=crop",
    ],
    description:
      "Le Hilton Paris est un hôtel de luxe situé sur les Champs-Élysées, offrant une vue imprenable sur la Tour Eiffel et un service impeccable.",
  },
  {
    id: 7,
    name: "Wyndham Rome",
    chainId: 2,
    chainName: "Wyndham",
    address: "45 Via del Corso",
    city: "Rome",
    country: "Italie",
    rating: 4,
    totalRooms: 45,
    amenities: ["Restaurant italien", "Terrasse sur le toit", "Proximité du Colisée", "Wi-Fi gratuit"],
    images: [
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?q=80&w=2121&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598928506831-52b599d22103?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621275471769-e6aa344546d5?q=80&w=2070&auto=format&fit=crop",
    ],
    description:
      "Le Wyndham Rome est situé au cœur de la ville éternelle, à quelques pas du Colisée et des principales attractions historiques.",
  },
  {
    id: 8,
    name: "Hyatt Tokyo",
    chainId: 3,
    chainName: "Hyatt",
    address: "2-7-2 Nishi-Shinjuku",
    city: "Tokyo",
    country: "Japon",
    rating: 5,
    totalRooms: 70,
    amenities: ["Restaurant japonais", "Spa", "Vue panoramique", "Navette aéroport", "Wi-Fi gratuit"],
    images: [
      "https://images.unsplash.com/photo-1621275471769-e6aa344546d5?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
    ],
    description:
      "Le Hyatt Tokyo offre une expérience de luxe au cœur de Shinjuku, avec des vues spectaculaires sur la skyline de Tokyo et le mont Fuji.",
  },
  {
    id: 9,
    name: "Hilton London",
    chainId: 1,
    chainName: "Hilton",
    address: "35 Great Russell Street",
    city: "London",
    country: "UK",
    rating: 4,
    totalRooms: 55,
    amenities: ["Restaurant britannique", "Bar à thé", "Proximité de Big Ben", "Wi-Fi gratuit"],
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2069&auto=format&fit=crop",
    ],
    description:
      "Le Hilton London est idéalement situé au centre de Londres, à proximité des principales attractions touristiques et des quartiers commerçants.",
  },
  {
    id: 10,
    name: "Marriott Berlin",
    chainId: 4,
    chainName: "Marriott",
    address: "Inge-Beisheim-Platz 1",
    city: "Berlin",
    country: "Allemagne",
    rating: 5,
    totalRooms: 65,
    amenities: ["Restaurant allemand", "Spa", "Vue sur la Porte de Brandebourg", "Wi-Fi gratuit"],
    images: [
      "https://images.unsplash.com/photo-1568495286054-8905fa614946?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?q=80&w=2121&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598928506831-52b599d22103?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621275471769-e6aa344546d5?q=80&w=2070&auto=format&fit=crop",
    ],
    description:
      "Le Marriott Berlin offre un hébergement de luxe au cœur de Berlin, avec une vue imprenable sur les monuments emblématiques de la ville.",
  },
]

// Données simulées pour les chambres
export const rooms: Room[] = [
  // Hilton New York
  {
    id: 1,
    hotelId: 1,
    roomNumber: "101",
    price: 200,
    capacity: 2,
    area: 30,
    view: "ville",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Coffre-fort"],
    extensionsPossible: true,
    damages: null,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },
  {
    id: 2,
    hotelId: 1,
    roomNumber: "102",
    price: 220,
    capacity: 2,
    area: 32,
    view: "ville",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Coffre-fort", "Machine à café"],
    extensionsPossible: true,
    damages: null,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
    available: true,
  },
  {
    id: 3,
    hotelId: 1,
    roomNumber: "201",
    price: 250,
    capacity: 3,
    area: 40,
    view: "parc",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Coffre-fort", "Machine à café", "Canapé-lit"],
    extensionsPossible: true,
    damages: null,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },

  // Wyndham Los Angeles
  {
    id: 4,
    hotelId: 2,
    roomNumber: "205",
    price: 350,
    capacity: 3,
    area: 45,
    view: "mer",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Balcon", "Machine à café", "Baignoire à remous"],
    extensionsPossible: true,
    damages: "Légère marque sur le mur",
    image: "https://images.unsplash.com/photo-1566073771259-6a690aa3dc54?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },
  {
    id: 5,
    hotelId: 2,
    roomNumber: "206",
    price: 380,
    capacity: 3,
    area: 48,
    view: "mer",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Balcon", "Machine à café", "Baignoire à remous"],
    extensionsPossible: true,
    damages: null,
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?q=80&w=2121&auto=format&fit=crop",
    available: true,
  },

  // Hyatt Chicago
  {
    id: 6,
    hotelId: 3,
    roomNumber: "310",
    price: 180,
    capacity: 2,
    area: 28,
    view: "ville",
    commodities: ["TV", "Wi-Fi", "Climatisation"],
    extensionsPossible: false,
    damages: null,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2069&auto=format&fit=crop",
    available: true,
  },
  {
    id: 7,
    hotelId: 3,
    roomNumber: "311",
    price: 190,
    capacity: 2,
    area: 30,
    view: "ville",
    commodities: ["TV", "Wi-Fi", "Climatisation", "Minibar"],
    extensionsPossible: false,
    damages: null,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },

  // Marriott San Francisco
  {
    id: 8,
    hotelId: 4,
    roomNumber: "422",
    price: 280,
    capacity: 4,
    area: 55,
    view: "montagne",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Jacuzzi", "Cuisine équipée"],
    extensionsPossible: true,
    damages: null,
    image: "https://images.unsplash.com/photo-1568495286054-8905fa014946?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },
  {
    id: 9,
    hotelId: 4,
    roomNumber: "423",
    price: 300,
    capacity: 4,
    area: 60,
    view: "montagne",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Jacuzzi", "Cuisine équipée", "Terrasse privée"],
    extensionsPossible: true,
    damages: null,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },

  // Continental Miami
  {
    id: 10,
    hotelId: 5,
    roomNumber: "515",
    price: 220,
    capacity: 2,
    area: 32,
    view: "mer",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Balcon"],
    extensionsPossible: false,
    damages: "Tapis taché",
    image: "https://images.unsplash.com/photo-1598928506831-52b599d22103?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },
  {
    id: 11,
    hotelId: 5,
    roomNumber: "516",
    price: 240,
    capacity: 2,
    area: 35,
    view: "mer",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Balcon", "Machine à café"],
    extensionsPossible: false,
    damages: null,
    image: "https://images.unsplash.com/photo-1621275471769-e6aa344546d5?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },

  // Hilton Paris
  {
    id: 12,
    hotelId: 6,
    roomNumber: "201",
    price: 320,
    capacity: 2,
    area: 35,
    view: "ville",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Vue sur la Tour Eiffel", "Machine à café Nespresso"],
    extensionsPossible: true,
    damages: null,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },
  {
    id: 13,
    hotelId: 6,
    roomNumber: "202",
    price: 340,
    capacity: 2,
    area: 38,
    view: "ville",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Vue sur la Tour Eiffel", "Machine à café Nespresso", "Balcon"],
    extensionsPossible: true,
    damages: null,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
    available: true,
  },

  // Wyndham Rome
  {
    id: 14,
    hotelId: 7,
    roomNumber: "305",
    price: 290,
    capacity: 3,
    area: 40,
    view: "monument",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Vue sur le Colisée", "Balcon"],
    extensionsPossible: true,
    damages: null,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },
  {
    id: 15,
    hotelId: 7,
    roomNumber: "306",
    price: 310,
    capacity: 4,
    area: 45,
    view: "monument",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Vue sur le Colisée", "Balcon", "Cuisine équipée"],
    extensionsPossible: true,
    damages: null,
    image: "https://images.unsplash.com/photo-1566073771259-6a690aa3dc54?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },

  // Hyatt Tokyo
  {
    id: 16,
    hotelId: 8,
    roomNumber: "410",
    price: 380,
    capacity: 2,
    area: 38,
    view: "ville",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Vue panoramique", "Baignoire traditionnelle"],
    extensionsPossible: false,
    damages: null,
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?q=80&w=2121&auto=format&fit=crop",
    available: true,
  },
  {
    id: 17,
    hotelId: 8,
    roomNumber: "411",
    price: 420,
    capacity: 3,
    area: 45,
    view: "ville",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Vue panoramique", "Baignoire traditionnelle", "Salon séparé"],
    extensionsPossible: false,
    damages: null,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2069&auto=format&fit=crop",
    available: true,
  },

  // Hilton London
  {
    id: 18,
    hotelId: 9,
    roomNumber: "501",
    price: 280,
    capacity: 2,
    area: 32,
    view: "ville",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Vue sur Big Ben"],
    extensionsPossible: true,
    damages: null,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },
  {
    id: 19,
    hotelId: 9,
    roomNumber: "502",
    price: 300,
    capacity: 3,
    area: 38,
    view: "ville",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Vue sur Big Ben", "Salon de thé privé"],
    extensionsPossible: true,
    damages: null,
    image: "https://images.unsplash.com/photo-1598928506831-52b599d22103?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },

  // Marriott Berlin
  {
    id: 20,
    hotelId: 10,
    roomNumber: "601",
    price: 340,
    capacity: 2,
    area: 36,
    view: "monument",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Vue sur la Porte de Brandebourg"],
    extensionsPossible: true,
    damages: null,
    image: "https://images.unsplash.com/photo-1621275471769-e6aa344546d5?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },
  {
    id: 21,
    hotelId: 10,
    roomNumber: "602",
    price: 380,
    capacity: 4,
    area: 50,
    view: "monument",
    commodities: ["TV", "Wi-Fi", "Minibar", "Climatisation", "Vue sur la Porte de Brandebourg", "Salon séparé", "Cuisine équipée"],
    extensionsPossible: true,
    damages: null,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
    available: true,
  },
]

// Fonction pour obtenir un hôtel par ID
export function getHotelById(id: number): Hotel | undefined {
  console.log("Looking for hotel with ID:", id, "Available hotels:", hotels.length)
  const hotel = hotels.find((hotel) => hotel.id === id)
  console.log("Found hotel:", hotel ? hotel.name : "Not found")
  return hotel
}

// Fonction pour obtenir une chambre par ID
export function getRoomById(id: number): Room | undefined {
  return rooms.find((room) => room.id === id)
}

// Fonction pour obtenir les chambres d'un hôtel
export function getRoomsByHotelId(hotelId: number): Room[] {
  console.log("Getting rooms for hotel ID:", hotelId)
  const filteredRooms = rooms.filter((room) => room.hotelId === hotelId)
  console.log("Found rooms:", filteredRooms.length)
  return filteredRooms
}

// Fonction pour obtenir les chambres disponibles avec filtres
export function getAvailableRooms(filters: {
  location?: string
  capacity?: number
  view?: string
  hotelChain?: string
  hotelCategory?: number
  minPrice?: number
  maxPrice?: number
  minArea?: number
  maxArea?: number
}): Room[] {
  return rooms.filter((room) => {
    const hotel = getHotelById(room.hotelId)
    if (!hotel) return false

    // Filtre par disponibilité
    if (!room.available) return false

    // Filtre par emplacement (ville ou nom d'hôtel)
    if (
      filters.location &&
      !hotel.city.toLowerCase().includes(filters.location.toLowerCase()) &&
      !hotel.name.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false
    }

    // Filtre par capacité
    if (filters.capacity && room.capacity < filters.capacity) return false

    // Filtre par vue
    if (filters.view && filters.view !== "any" && room.view !== filters.view) return false

    // Filtre par chaîne hôtelière
    if (filters.hotelChain && filters.hotelChain !== "any" && hotel.chainName !== filters.hotelChain) return false

    // Filtre par catégorie d'hôtel (étoiles)
    if (filters.hotelCategory && hotel.rating !== filters.hotelCategory) return false

    // Filtre par prix
    if (filters.minPrice && room.price < filters.minPrice) return false
    if (filters.maxPrice && room.price > filters.maxPrice) return false

    // Filtre par superficie
    if (filters.minArea && room.area < filters.minArea) return false
    if (filters.maxArea && room.area > filters.maxArea) return false

    return true
  })
}

// Chaînes hôtelières disponibles
export const hotelChains = [
  { id: 1, name: "Hilton" },
  { id: 2, name: "Wyndham" },
  { id: 3, name: "Hyatt" },
  { id: 4, name: "Marriott" },
  { id: 5, name: "Continental" },
]

// Types de vue disponibles
export const viewTypes = [
  { id: "ville", name: "Ville" },
  { id: "mer", name: "Mer" },
  { id: "montagne", name: "Montagne" },
  { id: "parc", name: "Parc" },
  { id: "monument", name: "Monument" },
]

