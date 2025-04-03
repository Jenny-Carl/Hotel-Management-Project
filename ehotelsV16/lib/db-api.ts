import { pool } from "./db-connection"

// Types
export type Hotel = {
  id_hotel: number
  nom: string
  adresse: string
  classement: number
  telephone: string
  email: string
  id_chain: number
  image_url?: string
  description?: string
}

export type Room = {
  num_chambre: number
  prix: number
  capacite: number
  vue: string
  etendue: string
  id_hotel: number
  image_url?: string
  description?: string
}

export type Reservation = {
  id_reservation: number
  date_debut: string
  date_fin: string
  statut: string
  nas_client: string
  num_chambre: number
  hotel_name?: string
  room_details?: Room
}

export type Client = {
  nas_client: string
  nom_complet: string
  adresse: string
  date_enregistrement: string
}

export type Payment = {
  id_paiement: number
  montant: number
  date: string
}

export type Location = {
  id_location: number
  date_debut: string
  date_fin: string
  nas_employe: string
  nas_client: string
  num_chambre: number
  id_paiement: number
}

// Fonctions pour récupérer les données de la base de données
export async function getAllHotels(): Promise<Hotel[]> {
  try {
    console.log("Fetching all hotels from database...")
    const result = await pool.query("SELECT * FROM Hotel")
    console.log(`Found ${result.rows.length} hotels in database`)
    return result.rows
  } catch (error) {
    console.error("Error fetching hotels:", error)
    return []
  }
}

export async function getHotelById(id: number): Promise<Hotel | null> {
  try {
    console.log(`Fetching hotel with ID ${id} from database...`)
    const result = await pool.query("SELECT * FROM Hotel WHERE id_hotel = $1", [id])
    if (result.rows.length === 0) {
      console.log(`No hotel found with ID ${id}`)
      return null
    }
    console.log(`Found hotel: ${result.rows[0].nom}`)
    return result.rows[0]
  } catch (error) {
    console.error(`Error fetching hotel with ID ${id}:`, error)
    return null
  }
}

export async function getRoomsByHotelId(hotelId: number): Promise<Room[]> {
  try {
    console.log(`Fetching rooms for hotel ID ${hotelId} from database...`)
    const result = await pool.query("SELECT * FROM Chambre WHERE id_hotel = $1", [hotelId])
    console.log(`Found ${result.rows.length} rooms for hotel ID ${hotelId}`)
    return result.rows
  } catch (error) {
    console.error(`Error fetching rooms for hotel ID ${hotelId}:`, error)
    return []
  }
}

export async function getRoomById(roomId: number): Promise<Room | null> {
  try {
    console.log(`Fetching room with ID ${roomId} from database...`)
    const result = await pool.query("SELECT * FROM Chambre WHERE num_chambre = $1", [roomId])
    if (result.rows.length === 0) {
      console.log(`No room found with ID ${roomId}`)
      return null
    }
    console.log(`Found room: ${result.rows[0].num_chambre}`)
    return result.rows[0]
  } catch (error) {
    console.error(`Error fetching room with ID ${roomId}:`, error)
    return null
  }
}

export async function getReservationsByClient(clientId: string): Promise<Reservation[]> {
  try {
    console.log(`Fetching reservations for client ${clientId} from database...`)
    const query = `
      SELECT r.*, h.nom as hotel_name, c.*
      FROM Reservation r
      JOIN Chambre c ON r.num_chambre = c.num_chambre
      JOIN Hotel h ON c.id_hotel = h.id_hotel
      WHERE r.nas_client = $1
    `
    const result = await pool.query(query, [clientId])
    console.log(`Found ${result.rows.length} reservations for client ${clientId}`)

    // Transform the result to match the Reservation type
    return result.rows.map((row) => ({
      id_reservation: row.id_reservation,
      date_debut: row.date_debut,
      date_fin: row.date_fin,
      statut: row.statut,
      nas_client: row.nas_client,
      num_chambre: row.num_chambre,
      hotel_name: row.hotel_name,
      room_details: {
        num_chambre: row.num_chambre,
        prix: row.prix,
        capacite: row.capacite,
        vue: row.vue,
        etendue: row.etendue,
        id_hotel: row.id_hotel,
      },
    }))
  } catch (error) {
    console.error(`Error fetching reservations for client ${clientId}:`, error)
    return []
  }
}

export async function getReservationById(reservationId: number): Promise<Reservation | null> {
  try {
    console.log(`Fetching reservation with ID ${reservationId} from database...`)
    const query = `
      SELECT r.*, h.nom as hotel_name, c.*
      FROM Reservation r
      JOIN Chambre c ON r.num_chambre = c.num_chambre
      JOIN Hotel h ON c.id_hotel = h.id_hotel
      WHERE r.id_reservation = $1
    `
    const result = await pool.query(query, [reservationId])

    if (result.rows.length === 0) {
      console.log(`No reservation found with ID ${reservationId}`)
      return null
    }

    const row = result.rows[0]
    console.log(`Found reservation: ${row.id_reservation}`)

    return {
      id_reservation: row.id_reservation,
      date_debut: row.date_debut,
      date_fin: row.date_fin,
      statut: row.statut,
      nas_client: row.nas_client,
      num_chambre: row.num_chambre,
      hotel_name: row.hotel_name,
      room_details: {
        num_chambre: row.num_chambre,
        prix: row.prix,
        capacite: row.capacite,
        vue: row.vue,
        etendue: row.etendue,
        id_hotel: row.id_hotel,
      },
    }
  } catch (error) {
    console.error(`Error fetching reservation with ID ${reservationId}:`, error)
    return null
  }
}

export async function getClientById(clientId: string): Promise<Client | null> {
  try {
    console.log(`Fetching client with ID ${clientId} from database...`)
    const result = await pool.query("SELECT * FROM Client WHERE nas_client = $1", [clientId])
    if (result.rows.length === 0) {
      console.log(`No client found with ID ${clientId}`)
      return null
    }
    console.log(`Found client: ${result.rows[0].nom_complet}`)
    return result.rows[0]
  } catch (error) {
    console.error(`Error fetching client with ID ${clientId}:`, error)
    return null
  }
}

export async function getPaymentById(paymentId: number): Promise<Payment | null> {
  try {
    console.log(`Fetching payment with ID ${paymentId} from database...`)
    const result = await pool.query("SELECT * FROM Paiement WHERE id_paiement = $1", [paymentId])
    if (result.rows.length === 0) {
      console.log(`No payment found with ID ${paymentId}`)
      return null
    }
    console.log(`Found payment: ${result.rows[0].id_paiement}`)
    return result.rows[0]
  } catch (error) {
    console.error(`Error fetching payment with ID ${paymentId}:`, error)
    return null
  }
}

export async function getLocationById(locationId: number): Promise<Location | null> {
  try {
    console.log(`Fetching location with ID ${locationId} from database...`)
    const result = await pool.query("SELECT * FROM Location WHERE id_location = $1", [locationId])
    if (result.rows.length === 0) {
      console.log(`No location found with ID ${locationId}`)
      return null
    }
    console.log(`Found location: ${result.rows[0].id_location}`)
    return result.rows[0]
  } catch (error) {
    console.error(`Error fetching location with ID ${locationId}:`, error)
    return null
  }
}

export async function getLocationsByClient(clientId: string): Promise<Location[]> {
  try {
    console.log(`Fetching locations for client ${clientId} from database...`)
    const result = await pool.query("SELECT * FROM Location WHERE nas_client = $1", [clientId])
    console.log(`Found ${result.rows.length} locations for client ${clientId}`)
    return result.rows
  } catch (error) {
    console.error(`Error fetching locations for client ${clientId}:`, error)
    return []
  }
}

export async function getAvailableRooms(startDate: string, endDate: string): Promise<Room[]> {
  try {
    console.log(`Fetching available rooms from ${startDate} to ${endDate} from database...`)
    const query = `
      SELECT c.*, h.nom AS hotel_name
      FROM Chambre c
      JOIN Hotel h ON c.id_hotel = h.id_hotel
      WHERE NOT EXISTS (
          SELECT 1 
          FROM Location l 
          WHERE l.num_chambre = c.num_chambre 
          AND l.date_debut <= $2
          AND l.date_fin >= $1
      )
      AND NOT EXISTS (
          SELECT 1 
          FROM Reservation r 
          WHERE r.num_chambre = c.num_chambre 
          AND r.date_debut <= $2
          AND r.date_fin >= $1
      )
    `
    const result = await pool.query(query, [startDate, endDate])
    console.log(`Found ${result.rows.length} available rooms from ${startDate} to ${endDate}`)
    return result.rows
  } catch (error) {
    console.error(`Error fetching available rooms from ${startDate} to ${endDate}:`, error)
    return []
  }
}

export async function getTriggers(): Promise<any[]> {
  try {
    console.log("Fetching triggers from database...")
    const query = `
      SELECT trigger_name, event_manipulation, action_statement
      FROM information_schema.triggers
      WHERE trigger_schema = 'public'
    `
    const result = await pool.query(query)
    console.log(`Found ${result.rows.length} triggers`)
    return result.rows
  } catch (error) {
    console.error("Error fetching triggers:", error)
    return []
  }
}

export async function getIndexes(): Promise<any[]> {
  try {
    console.log("Fetching indexes from database...")
    const query = `
      SELECT indexname, tablename
      FROM pg_indexes
      WHERE schemaname = 'public'
    `
    const result = await pool.query(query)
    console.log(`Found ${result.rows.length} indexes`)
    return result.rows
  } catch (error) {
    console.error("Error fetching indexes:", error)
    return []
  }
}

