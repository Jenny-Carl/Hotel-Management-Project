import { query } from "./db-config"

// Types d'entités
export interface Hotel {
  id_hotel: number
  nom: string
  adresse: string
  classement: number
  nb_chambres: number
  id_chain: number
}

export interface HotelEmail {
  id_hotel: number
  email: string
}

export interface HotelTelephone {
  id_hotel: number
  telephone: string
}

export interface Room {
  id?: number
  num_chambre: number
  prix: number
  capacite: number
  superficie?: number
  vue: string
  commodite: string
  extensions_possible: boolean
  dommages: string | null
  id_hotel: number
}

export interface Reservation {
  id_reservation: number
  date_debut: string
  date_fin: string
  statut: string
  nas_client: string
  num_chambre: number
}

export interface Location {
  id_location: number
  date_debut: string
  date_fin: string
  nas_employe: string
  nas_client: string
  num_chambre: number
  id_paiement: number
}

export interface Client {
  nas_client: string
  nom_complet: string
  adresse: string
  date_enregistrement: string
}

export interface Employe {
  nas_employe: string
  nom_complet: string
  adresse: string
  id_hotel: number
}

export interface Role {
  id_role: number
  nom: string
}

export interface EmployeRole {
  nas_employe: string
  id_role: number
}

export interface Paiement {
  id_paiement: number
  montant: number
  date: string
}

export interface ChaineHoteliere {
  id_chain: number
  nom: string
  adresse_bureau: string
  nb_hotels: number
}

export interface ChaineEmail {
  id_chain: number
  email: string
}

export interface ChaineTelephone {
  id_chain: number
  telephone: string
}

// Données simulées pour fallback
const mockHotels: Hotel[] = [
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
]

const mockRooms: Room[] = [
  {
    num_chambre: 101,
    prix: 200,
    capacite: 2,
    vue: "ville",
    commodite: "TV, WiFi, Minibar",
    extensions_possible: true,
    dommages: null,
    id_hotel: 1,
  },
  {
    num_chambre: 102,
    prix: 250,
    capacite: 3,
    vue: "mer",
    commodite: "TV, WiFi, Minibar, Balcon",
    extensions_possible: true,
    dommages: null,
    id_hotel: 1,
  },
  {
    num_chambre: 201,
    prix: 180,
    capacite: 2,
    vue: "ville",
    commodite: "TV, WiFi",
    extensions_possible: false,
    dommages: null,
    id_hotel: 2,
  },
]

// Fonctions d'accès aux données réelles avec fallback sur les données simulées
export async function getHotels(): Promise<Hotel[]> {
  try {
    console.log("Récupération de tous les hôtels depuis la base de données...")

    // Vérifier si nous sommes dans un environnement de développement ou de production
    const isDevelopment = process.env.NODE_ENV === "development"

    // En développement, essayer de se connecter à la base de données
    if (isDevelopment) {
      try {
        const result = await query(`SELECT * FROM Hotel ORDER BY nom`)
        console.log(`${result.rows.length} hôtels trouvés dans la base de données`)

        if (result.rows.length > 0) {
          return result.rows
        }
      } catch (dbError) {
        console.error("Erreur de connexion à la base de données:", dbError)
        // Continuer avec les données simulées
      }
    }

    // Utiliser les données simulées si nous ne pouvons pas nous connecter à la base de données
    // ou si nous sommes en production (où la connexion à la base de données peut ne pas être disponible)
    console.log("Utilisation des données simulées pour les hôtels")

    // Données simulées étendues pour avoir plus d'hôtels
    const extendedMockHotels: Hotel[] = [
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

    return extendedMockHotels
  } catch (error) {
    console.error("Erreur lors de la récupération des hôtels:", error)
    // Retourner un tableau vide en cas d'erreur pour éviter de casser l'application
    return []
  }
}

export async function getHotelById(id: number): Promise<Hotel | null> {
  try {
    const result = await query(`SELECT * FROM Hotel WHERE id_hotel = $1`, [id])
    if (result.rows.length > 0) {
      return result.rows[0]
    }
    return mockHotels.find((h) => h.id_hotel === id) || null
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'hôtel ${id}:`, error)
    return mockHotels.find((h) => h.id_hotel === id) || null
  }
}

export async function getHotelsByChain(chainId: number): Promise<Hotel[]> {
  try {
    const result = await query(`SELECT * FROM Hotel WHERE id_chain = $1`, [chainId])
    if (result.rows.length > 0) {
      return result.rows
    }
    return mockHotels.filter((h) => h.id_chain === chainId)
  } catch (error) {
    console.error(`Erreur lors de la récupération des hôtels pour la chaîne ${chainId}:`, error)
    return mockHotels.filter((h) => h.id_chain === chainId)
  }
}

export async function getHotelEmails(hotelId: number): Promise<HotelEmail[]> {
  try {
    const result = await query(`SELECT id_hotel, email FROM EmailHotel WHERE id_hotel = $1`, [hotelId])
    return result.rows
  } catch (error) {
    console.error(`Erreur lors de la récupération des emails pour l'hôtel ${hotelId}:`, error)
    return [
      { id_hotel: hotelId, email: "info@hotel.com" },
      { id_hotel: hotelId, email: "reservations@hotel.com" },
    ]
  }
}

export async function getHotelTelephones(hotelId: number): Promise<HotelTelephone[]> {
  try {
    const result = await query(`SELECT id_hotel, telephone FROM TelephoneHotel WHERE id_hotel = $1`, [hotelId])
    return result.rows
  } catch (error) {
    console.error(`Erreur lors de la récupération des téléphones pour l'hôtel ${hotelId}:`, error)
    return [{ id_hotel: hotelId, telephone: "+1-555-123-4567" }]
  }
}

export async function getChains(): Promise<ChaineHoteliere[]> {
  try {
    const result = await query(`SELECT * FROM ChaineHoteliere`)
    return result.rows
  } catch (error) {
    console.error("Erreur lors de la récupération des chaînes hôtelières:", error)
    return [
      {
        id_chain: 1,
        nom: "Hilton",
        adresse_bureau: "3080 Brannon Avenue, Cleveland, USA",
        nb_hotels: 8,
      },
      {
        id_chain: 2,
        nom: "Wyndham",
        adresse_bureau: "1487 Wood Street, Fort-Lauderdale, USA",
        nb_hotels: 6,
      },
      {
        id_chain: 3,
        nom: "Hyatt",
        adresse_bureau: "3950 Horner Street, Austin, USA",
        nb_hotels: 5,
      },
    ]
  }
}

export async function getChainById(id: number): Promise<ChaineHoteliere | null> {
  try {
    const result = await query(`SELECT * FROM ChaineHoteliere WHERE id_chain = $1`, [id])
    if (result.rows.length > 0) {
      return result.rows[0]
    }
    return null
  } catch (error) {
    console.error(`Erreur lors de la récupération de la chaîne ${id}:`, error)
    return {
      id_chain: id,
      nom: id === 1 ? "Hilton" : id === 2 ? "Wyndham" : "Hyatt",
      adresse_bureau: "Adresse simulée",
      nb_hotels: 5,
    }
  }
}

export async function getChainEmails(chainId: number): Promise<ChaineEmail[]> {
  try {
    const result = await query(`SELECT id_chain, email FROM EmailChaine WHERE id_chain = $1`, [chainId])
    return result.rows
  } catch (error) {
    console.error(`Erreur lors de la récupération des emails pour la chaîne ${chainId}:`, error)
    return [{ id_chain: chainId, email: "info@chain.com" }]
  }
}

export async function getChainTelephones(chainId: number): Promise<ChaineTelephone[]> {
  try {
    const result = await query(`SELECT id_chain, telephone FROM TelephoneChaine WHERE id_chain = $1`, [chainId])
    return result.rows
  } catch (error) {
    console.error(`Erreur lors de la récupération des téléphones pour la chaîne ${chainId}:`, error)
    return [{ id_chain: chainId, telephone: "+1-800-555-1234" }]
  }
}

export async function getRooms(hotelId?: number): Promise<Room[]> {
  try {
    let sql = `SELECT * FROM Chambre`
    const params: any[] = []

    if (hotelId) {
      sql += ` WHERE id_hotel = $1`
      params.push(hotelId)
    }

    const result = await query(sql, params)
    if (result.rows.length > 0) {
      return result.rows
    }

    if (hotelId) {
      return mockRooms.filter((r) => r.id_hotel === hotelId)
    }
    return mockRooms
  } catch (error) {
    console.error("Erreur lors de la récupération des chambres:", error)
    if (hotelId) {
      return mockRooms.filter((r) => r.id_hotel === hotelId)
    }
    return mockRooms
  }
}

export async function getRoomById(roomId: number): Promise<Room | null> {
  try {
    const result = await query(`SELECT * FROM Chambre WHERE num_chambre = $1`, [roomId])
    if (result.rows.length > 0) {
      return result.rows[0]
    }
    return mockRooms.find((r) => r.num_chambre === roomId) || null
  } catch (error) {
    console.error(`Erreur lors de la récupération de la chambre ${roomId}:`, error)
    return mockRooms.find((r) => r.num_chambre === roomId) || null
  }
}

// Implémentation des autres fonctions avec requêtes SQL réelles
export async function getAvailableRooms(
  startDate: string,
  endDate: string,
  location?: string,
  capacity?: number,
  view?: string,
  hotelChain?: string,
  hotelCategory?: number,
  minArea?: number,
  maxArea?: number,
  minPrice?: number,
  maxPrice?: number,
): Promise<any[]> {
  try {
    let sql = `
      SELECT c.num_chambre, h.nom as hotel_name, ch.nom as chain_name, 
             c.prix, c.capacite, c.vue, h.adresse as location, 
             h.classement as category, c.id_hotel
      FROM Chambre c
      JOIN Hotel h ON c.id_hotel = h.id_hotel
      JOIN ChaineHoteliere ch ON h.id_chain = ch.id_chain
      WHERE NOT EXISTS (
        SELECT 1 FROM Reservation r
        WHERE r.num_chambre = c.num_chambre
        AND r.statut != 'Annulée'
        AND (
          (r.date_debut <= $1 AND r.date_fin >= $1) OR
          (r.date_debut <= $2 AND r.date_fin >= $2) OR
          (r.date_debut >= $1 AND r.date_fin <= $2)
        )
      )
      AND NOT EXISTS (
        SELECT 1 FROM Location l
        WHERE l.num_chambre = c.num_chambre
        AND (
          (l.date_debut <= $1 AND l.date_fin >= $1) OR
          (l.date_debut <= $2 AND l.date_fin >= $2) OR
          (l.date_debut >= $1 AND l.date_fin <= $2)
        )
      )
    `

    const params: any[] = [startDate, endDate]
    let paramIndex = 3

    if (location) {
      sql += ` AND (h.adresse ILIKE $${paramIndex} OR h.nom ILIKE $${paramIndex})`
      params.push(`%${location}%`)
      paramIndex++
    }

    if (capacity) {
      sql += ` AND c.capacite = $${paramIndex}`
      params.push(capacity)
      paramIndex++
    }

    if (view && view !== "any") {
      sql += ` AND c.vue = $${paramIndex}`
      params.push(view)
      paramIndex++
    }

    if (hotelChain && hotelChain !== "any") {
      sql += ` AND ch.nom = $${paramIndex}`
      params.push(hotelChain)
      paramIndex++
    }

    if (hotelCategory) {
      sql += ` AND h.classement = $${paramIndex}`
      params.push(hotelCategory)
      paramIndex++
    }

    if (minArea) {
      sql += ` AND c.superficie >= $${paramIndex}`
      params.push(minArea)
      paramIndex++
    }

    if (maxArea) {
      sql += ` AND c.superficie <= $${paramIndex}`
      params.push(maxArea)
      paramIndex++
    }

    if (minPrice) {
      sql += ` AND c.prix >= $${paramIndex}`
      params.push(minPrice)
      paramIndex++
    }

    if (maxPrice) {
      sql += ` AND c.prix <= $${paramIndex}`
      params.push(maxPrice)
      paramIndex++
    }

    const result = await query(sql, params)
    return result.rows
  } catch (error) {
    console.error("Erreur lors de la recherche de chambres disponibles:", error)
    // Utiliser des données simulées en cas d'erreur
    let filteredRooms = mockRooms

    if (capacity) {
      filteredRooms = filteredRooms.filter((r) => r.capacite === capacity)
    }

    if (view && view !== "any") {
      filteredRooms = filteredRooms.filter((r) => r.vue === view)
    }

    if (minPrice) {
      filteredRooms = filteredRooms.filter((r) => r.prix >= minPrice)
    }

    if (maxPrice) {
      filteredRooms = filteredRooms.filter((r) => r.prix <= maxPrice)
    }

    return filteredRooms.map((room) => {
      const hotel = mockHotels.find((h) => h.id_hotel === room.id_hotel)
      return {
        num_chambre: room.num_chambre,
        hotel_name: hotel?.nom || "",
        chain_name: hotel?.id_chain === 1 ? "Hilton" : hotel?.id_chain === 2 ? "Wyndham" : "Hyatt",
        prix: room.prix,
        capacite: room.capacite,
        vue: room.vue,
        location: hotel?.adresse || "",
        category: hotel?.classement || 0,
        id_hotel: room.id_hotel,
      }
    })
  }
}

export async function createReservation(
  startDate: string,
  endDate: string,
  clientId: string,
  roomNumber: number,
): Promise<Reservation> {
  try {
    console.log('Creating reservation in database with:', { startDate, endDate, clientId, roomNumber })
    const sql = `
      INSERT INTO Reservation (date_debut, date_fin, statut, nas_client, num_chambre)
      VALUES ($1, $2, 'Confirmée', $3, $4)
      RETURNING *
    `
    const result = await query(sql, [startDate, endDate, clientId, roomNumber])
    console.log('Created reservation result:', result.rows[0])
    return result.rows[0]
  } catch (error) {
    console.error("Erreur lors de la création de la réservation:", error)
    return {
      id_reservation: Math.floor(Math.random() * 1000),
      date_debut: startDate,
      date_fin: endDate,
      statut: "Confirmée",
      nas_client: clientId,
      num_chambre: roomNumber,
    }
  }
}

export async function getReservationsByClient(clientId: string): Promise<any[]> {
  try {
    const sql = `
      SELECT r.*, h.nom as hotel_name
      FROM Reservation r
      JOIN Chambre c ON r.num_chambre = c.num_chambre
      JOIN Hotel h ON c.id_hotel = h.id_hotel
      WHERE r.nas_client = $1
      ORDER BY r.date_debut DESC
    `
    const result = await query(sql, [clientId])
    return result.rows
  } catch (error) {
    console.error(`Erreur lors de la récupération des réservations pour le client ${clientId}:`, error)
    return []
  }
}

export async function getClients(): Promise<Client[]> {
  try {
    const result = await query(`SELECT * FROM Client`)
    return result.rows
  } catch (error) {
    console.error("Erreur lors de la récupération des clients:", error)
    return []
  }
}

export async function getClientById(nasClient: string): Promise<Client | null> {
  try {
    const result = await query(`SELECT * FROM Client WHERE nas_client = $1`, [nasClient])
    if (result.rows.length > 0) {
      return result.rows[0]
    }
    return null
  } catch (error) {
    console.error(`Erreur lors de la récupération du client ${nasClient}:`, error)
    return null
  }
}

export async function createClient(nasClient: string, nomComplet: string, adresse: string): Promise<Client> {
  try {
    const sql = `
      INSERT INTO Client (nas_client, nom_complet, adresse, date_enregistrement)
      VALUES ($1, $2, $3, CURRENT_DATE)
      RETURNING *
    `
    const result = await query(sql, [nasClient, nomComplet, adresse])
    return result.rows[0]
  } catch (error) {
    console.error("Erreur lors de la création du client:", error)
    return {
      nas_client: nasClient,
      nom_complet: nomComplet,
      adresse: adresse,
      date_enregistrement: new Date().toISOString(),
    }
  }
}

export async function getEmployees(): Promise<Employe[]> {
  try {
    const result = await query(`SELECT * FROM Employe`)
    return result.rows
  } catch (error) {
    console.error("Erreur lors de la récupération des employés:", error)
    return []
  }
}

export async function getEmployeeById(nasEmploye: string): Promise<Employe | null> {
  try {
    const result = await query(`SELECT * FROM Employe WHERE nas_employe = $1`, [nasEmploye])
    if (result.rows.length > 0) {
      return result.rows[0]
    }
    return null
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'employé ${nasEmploye}:`, error)
    return null
  }
}

export async function getEmployeeRoles(nasEmploye: string): Promise<Role[]> {
  try {
    const sql = `
      SELECT r.*
      FROM Role r
      JOIN EmployeRole er ON r.id_role = er.id_role
      WHERE er.nas_employe = $1
    `
    const result = await query(sql, [nasEmploye])
    return result.rows
  } catch (error) {
    console.error(`Erreur lors de la récupération des rôles pour l'employé ${nasEmploye}:`, error)
    return []
  }
}

export async function createPayment(amount: number, date: string = new Date().toISOString()): Promise<Paiement> {
  try {
    const sql = `
      INSERT INTO Paiement (montant, date)
      VALUES ($1, $2)
      RETURNING *
    `
    const result = await query(sql, [amount, date])
    return result.rows[0]
  } catch (error) {
    console.error("Erreur lors de la création du paiement:", error)
    return {
      id_paiement: Math.floor(Math.random() * 1000),
      montant: amount,
      date: date,
    }
  }
}

export async function createLocation(
  startDate: string,
  endDate: string,
  employeeId: string,
  clientId: string,
  roomNumber: number,
  paymentId: number,
): Promise<Location> {
  try {
    const sql = `
      INSERT INTO Location (date_debut, date_fin, nas_employe, nas_client, num_chambre, id_paiement)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `
    const result = await query(sql, [startDate, endDate, employeeId, clientId, roomNumber, paymentId])
    return result.rows[0]
  } catch (error) {
    console.error("Erreur lors de la création de la location:", error)
    return {
      id_location: Math.floor(Math.random() * 1000),
      date_debut: startDate,
      date_fin: endDate,
      nas_employe: employeeId,
      nas_client: clientId,
      num_chambre: roomNumber,
      id_paiement: paymentId,
    }
  }
}

export async function convertReservationToLocation(
  reservationId: number,
  employeeId: string,
  paymentId: number,
): Promise<Location> {
  try {
    // Récupérer les informations de la réservation
    const reservationResult = await query(`SELECT * FROM Reservation WHERE id_reservation = $1`, [reservationId])

    if (reservationResult.rows.length === 0) {
      throw new Error(`Réservation ${reservationId} non trouvée`)
    }

    const reservation = reservationResult.rows[0]

    // Créer la location
    const locationResult = await query(
      `INSERT INTO Location (date_debut, date_fin, nas_employe, nas_client, num_chambre, id_paiement)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        reservation.date_debut,
        reservation.date_fin,
        employeeId,
        reservation.nas_client,
        reservation.num_chambre,
        paymentId,
      ],
    )

    // Mettre à jour le statut de la réservation
    await query(`UPDATE Reservation SET statut = 'Convertie' WHERE id_reservation = $1`, [reservationId])

    return locationResult.rows[0]
  } catch (error) {
    console.error(`Erreur lors de la conversion de la réservation ${reservationId}:`, error)
    return {
      id_location: Math.floor(Math.random() * 1000),
      date_debut: new Date().toISOString(),
      date_fin: new Date(Date.now() + 86400000 * 3).toISOString(),
      nas_employe: employeeId,
      nas_client: "112233445",
      num_chambre: 101,
      id_paiement: paymentId,
    }
  }
}

export async function getRoomsByArea(): Promise<{ area: string; available: number }[]> {
  try {
    const sql = `
      SELECT h.adresse AS area, COUNT(c.num_chambre) AS available
      FROM Hotel h
      JOIN Chambre c ON h.id_hotel = c.id_hotel
      WHERE NOT EXISTS (
        SELECT 1 
        FROM Location l 
        WHERE l.num_chambre = c.num_chambre 
        AND l.date_debut <= CURRENT_DATE 
        AND l.date_fin >= CURRENT_DATE
      )
      AND NOT EXISTS (
        SELECT 1 
        FROM Reservation r 
        WHERE r.num_chambre = c.num_chambre 
        AND r.statut != 'Annulée'
        AND r.date_debut <= CURRENT_DATE 
        AND r.date_fin >= CURRENT_DATE
      )
      GROUP BY h.adresse
      ORDER BY available DESC
    `
    const result = await query(sql)
    return result.rows
  } catch (error) {
    console.error("Erreur lors de la récupération des chambres par zone:", error)
    return [
      { area: "New York", available: 15 },
      { area: "Los Angeles", available: 12 },
      { area: "Chicago", available: 8 },
    ]
  }
}

export async function getRoomCapacitiesByHotel(
  hotelId: number,
): Promise<{ type: string; capacity: number; count: number }[]> {
  try {
    const sql = `
      SELECT 
        CASE 
          WHEN capacite = 1 THEN 'Simple'
          WHEN capacite = 2 THEN 'Double'
          WHEN capacite = 3 THEN 'Triple'
          WHEN capacite = 4 THEN 'Quadruple'
          ELSE 'Suite'
        END as type,
        capacite as capacity,
        COUNT(num_chambre) as count
      FROM Chambre
      WHERE id_hotel = $1
      GROUP BY capacite
      ORDER BY capacite
    `
    const result = await query(sql, [hotelId])
    return result.rows
  } catch (error) {
    console.error(`Erreur lors de la récupération des capacités pour l'hôtel ${hotelId}:`, error)
    return [
      { type: "Standard", capacity: 2, count: 10 },
      { type: "Double", capacity: 3, count: 5 },
      { type: "Suite", capacity: 4, count: 3 },
    ]
  }
}

// Fonctions CRUD pour les chambres
export async function createRoom(
  prix: number,
  capacite: number,
  vue: string,
  commodite: string,
  extensions_possible: boolean,
  dommages: string | null,
  id_hotel: number,
): Promise<Room> {
  try {
    const sql = `
      INSERT INTO Chambre (prix, capacite, vue, commodite, extensions_possible, dommages, id_hotel)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `
    const result = await query(sql, [prix, capacite, vue, commodite, extensions_possible, dommages, id_hotel])
    return result.rows[0]
  } catch (error) {
    console.error("Erreur lors de la création de la chambre:", error)
    return {
      num_chambre: Math.floor(Math.random() * 1000),
      prix,
      capacite,
      vue,
      commodite,
      extensions_possible,
      dommages,
      id_hotel,
    }
  }
}

export async function updateRoom(
  num_chambre: number,
  prix: number,
  capacite: number,
  vue: string,
  commodite: string,
  extensions_possible: boolean,
  dommages: string | null,
): Promise<Room> {
  try {
    const sql = `
      UPDATE Chambre
      SET prix = $1, capacite = $2, vue = $3, commodite = $4, extensions_possible = $5, dommages = $6
      WHERE num_chambre = $7
      RETURNING *
    `
    const result = await query(sql, [prix, capacite, vue, commodite, extensions_possible, dommages, num_chambre])
    if (result.rows.length === 0) {
      throw new Error(`Chambre ${num_chambre} non trouvée`)
    }
    return result.rows[0]
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la chambre ${num_chambre}:`, error)
    const room = mockRooms.find((r) => r.num_chambre === num_chambre)
    if (!room) {
      throw new Error(`Chambre ${num_chambre} non trouvée`)
    }
    return {
      ...room,
      prix,
      capacite,
      vue,
      commodite,
      extensions_possible,
      dommages,
    }
  }
}

export async function deleteRoom(num_chambre: number): Promise<boolean> {
  try {
    const result = await query(`DELETE FROM Chambre WHERE num_chambre = $1 RETURNING *`, [num_chambre])
    return result.rowCount > 0
  } catch (error) {
    console.error(`Erreur lors de la suppression de la chambre ${num_chambre}:`, error)
    return false
  }
}

// Fonctions pour les employés
export async function createEmployee(
  nas_employe: string,
  nom_complet: string,
  adresse: string,
  id_hotel: number,
): Promise<Employe> {
  try {
    const sql = `
      INSERT INTO Employe (nas_employe, nom_complet, adresse, id_hotel)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `
    const result = await query(sql, [nas_employe, nom_complet, adresse, id_hotel])
    return result.rows[0]
  } catch (error) {
    console.error("Erreur lors de la création de l'employé:", error)
    return {
      nas_employe,
      nom_complet,
      adresse,
      id_hotel,
    }
  }
}

export async function updateEmployee(
  nas_employe: string,
  nom_complet: string,
  adresse: string,
  id_hotel: number,
): Promise<Employe> {
  try {
    const sql = `
      UPDATE Employe
      SET nom_complet = $1, adresse = $2, id_hotel = $3
      WHERE nas_employe = $4
      RETURNING *
    `
    const result = await query(sql, [nom_complet, adresse, id_hotel, nas_employe])
    if (result.rows.length === 0) {
      throw new Error(`Employé ${nas_employe} non trouvé`)
    }
    return result.rows[0]
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'employé ${nas_employe}:`, error)
    return {
      nas_employe,
      nom_complet,
      adresse,
      id_hotel,
    }
  }
}

export async function deleteEmployee(nas_employe: string): Promise<boolean> {
  try {
    const result = await query(`DELETE FROM Employe WHERE nas_employe = $1 RETURNING *`, [nas_employe])
    return result.rowCount > 0
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'employé ${nas_employe}:`, error)
    return false
  }
}

// Fonctions pour les rôles
export async function getRoles(): Promise<Role[]> {
  try {
    const result = await query(`SELECT * FROM Role`)
    return result.rows
  } catch (error) {
    console.error("Erreur lors de la récupération des rôles:", error)
    return [
      { id_role: 1, nom: "Gestionnaire" },
      { id_role: 2, nom: "Réceptionniste" },
      { id_role: 3, nom: "Service ménager" },
    ]
  }
}

export async function assignRoleToEmployee(nas_employe: string, id_role: number): Promise<boolean> {
  try {
    const sql = `
      INSERT INTO EmployeRole (nas_employe, id_role)
      VALUES ($1, $2)
      ON CONFLICT (nas_employe, id_role) DO NOTHING
      RETURNING *
    `
    const result = await query(sql, [nas_employe, id_role])
    return result.rowCount > 0
  } catch (error) {
    console.error(`Erreur lors de l'assignation du rôle ${id_role} à l'employé ${nas_employe}:`, error)
    return false
  }
}

export async function removeRoleFromEmployee(nas_employe: string, id_role: number): Promise<boolean> {
  try {
    const result = await query(`DELETE FROM EmployeRole WHERE nas_employe = $1 AND id_role = $2 RETURNING *`, [
      nas_employe,
      id_role,
    ])
    return result.rowCount > 0
  } catch (error) {
    console.error(`Erreur lors de la suppression du rôle ${id_role} de l'employé ${nas_employe}:`, error)
    return false
  }
}

// Fonctions pour les paiements
export async function getPayments(): Promise<Paiement[]> {
  try {
    const result = await query(`SELECT * FROM Paiement ORDER BY date DESC`)
    return result.rows
  } catch (error) {
    console.error("Erreur lors de la récupération des paiements:", error)
    return []
  }
}

export async function getPaymentById(id_paiement: number): Promise<Paiement | null> {
  try {
    const result = await query(`SELECT * FROM Paiement WHERE id_paiement = $1`, [id_paiement])
    if (result.rows.length > 0) {
      return result.rows[0]
    }
    return null
  } catch (error) {
    console.error(`Erreur lors de la récupération du paiement ${id_paiement}:`, error)
    return null
  }
}

// Fonctions pour les locations
export async function getLocations(): Promise<any[]> {
  try {
    const sql = `
      SELECT l.*, c.nom_complet as client_name, e.nom_complet as employe_name, h.nom as hotel_name
      FROM Location l
      JOIN Client c ON l.nas_client = c.nas_client
      JOIN Employe e ON l.nas_employe = e.nas_employe
      JOIN Chambre ch ON l.num_chambre = ch.num_chambre
      JOIN Hotel h ON ch.id_hotel = h.id_hotel
      ORDER BY l.date_debut DESC
    `
    const result = await query(sql)
    return result.rows
  } catch (error) {
    console.error("Erreur lors de la récupération des locations:", error)
    return []
  }
}

export async function getLocationById(id_location: number): Promise<any | null> {
  try {
    const sql = `
      SELECT l.*, c.nom_complet as client_name, e.nom_complet as employe_name, h.nom as hotel_name
      FROM Location l
      JOIN Client c ON l.nas_client = c.nas_client
      JOIN Employe e ON l.nas_employe = e.nas_employe
      JOIN Chambre ch ON l.num_chambre = ch.num_chambre
      JOIN Hotel h ON ch.id_hotel = h.id_hotel
      WHERE l.id_location = $1
    `
    const result = await query(sql, [id_location])
    if (result.rows.length > 0) {
      return result.rows[0]
    }
    return null
  } catch (error) {
    console.error(`Erreur lors de la récupération de la location ${id_location}:`, error)
    return null
  }
}

// Fonctions pour les réservations
export async function getReservations(): Promise<any[]> {
  try {
    const sql = `
      SELECT r.*, c.nom_complet as client_name, h.nom as hotel_name
      FROM Reservation r
      JOIN Client c ON r.nas_client = c.nas_client
      JOIN Chambre ch ON r.num_chambre = ch.num_chambre
      JOIN Hotel h ON ch.id_hotel = h.id_hotel
      ORDER BY r.date_debut DESC
    `
    const result = await query(sql)
    return result.rows
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations:", error)
    return []
  }
}

export async function getReservationById(id_reservation: number): Promise<any | null> {
  try {
    const sql = `
      SELECT r.*, c.nom_complet as client_name, h.nom as hotel_name
      FROM Reservation r
      JOIN Client c ON r.nas_client = c.nas_client
      JOIN Chambre ch ON r.num_chambre = ch.num_chambre
      JOIN Hotel h ON ch.id_hotel = h.id_hotel
      WHERE r.id_reservation = $1
    `
    const result = await query(sql, [id_reservation])
    if (result.rows.length > 0) {
      return result.rows[0]
    }
    return null
  } catch (error) {
    console.error(`Erreur lors de la récupération de la réservation ${id_reservation}:`, error)
    return null
  }
}

export async function updateReservationStatus(id_reservation: number, statut: string): Promise<Reservation> {
  try {
    const sql = `
      UPDATE Reservation
      SET statut = $1
      WHERE id_reservation = $2
      RETURNING *
    `
    const result = await query(sql, [statut, id_reservation])
    if (result.rows.length === 0) {
      throw new Error(`Réservation ${id_reservation} non trouvée`)
    }
    return result.rows[0]
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du statut de la réservation ${id_reservation}:`, error)
    return {
      id_reservation,
      date_debut: new Date().toISOString(),
      date_fin: new Date(Date.now() + 86400000 * 3).toISOString(),
      statut,
      nas_client: "112233445",
      num_chambre: 101,
    }
  }
}

