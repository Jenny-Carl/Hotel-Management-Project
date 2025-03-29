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

export interface Room {
  num_chambre: number
  prix: number
  capacite: number
  superficie: number // m²
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

// Fonctions d'accès aux données
export async function getHotels(): Promise<Hotel[]> {
  const result = await query(`
    SELECT h.id_hotel, h.nom, h.adresse, h.classement, h.nb_chambres, h.id_chain
    FROM Hotel h
    ORDER BY h.nom
  `)
  return result.rows
}

export async function getHotelById(id: number): Promise<Hotel | null> {
  const result = await query(
    `
    SELECT h.id_hotel, h.nom, h.adresse, h.classement, h.nb_chambres, h.id_chain
    FROM Hotel h
    WHERE h.id_hotel = $1
  `,
    [id],
  )

  return result.rows.length > 0 ? result.rows[0] : null
}

export async function getHotelsByChain(chainId: number): Promise<Hotel[]> {
  const result = await query(
    `
    SELECT h.id_hotel, h.nom, h.adresse, h.classement, h.nb_chambres, h.id_chain
    FROM Hotel h
    WHERE h.id_chain = $1
    ORDER BY h.nom
  `,
    [chainId],
  )

  return result.rows
}

export async function getChains(): Promise<ChaineHoteliere[]> {
  const result = await query(`
    SELECT c.id_chain, c.nom, c.adresse_bureau, c.nb_hotels
    FROM ChaineHoteliere c
    ORDER BY c.nom
  `)

  return result.rows
}

export async function getChainById(id: number): Promise<ChaineHoteliere | null> {
  const result = await query(
    `
    SELECT c.id_chain, c.nom, c.adresse_bureau, c.nb_hotels
    FROM ChaineHoteliere c
    WHERE c.id_chain = $1
  `,
    [id],
  )

  return result.rows.length > 0 ? result.rows[0] : null
}

export async function getRooms(hotelId?: number): Promise<Room[]> {
  let sql = `
    SELECT c.num_chambre, c.prix, c.capacite, c.vue, c.commodite, 
           c.extensions_possible, c.dommages, c.id_hotel
    FROM Chambre c
  `

  if (hotelId) {
    sql += ` WHERE c.id_hotel = $1`
    const result = await query(sql, [hotelId])
    return result.rows
  } else {
    const result = await query(sql)
    return result.rows
  }
}

export async function getRoomById(roomId: number): Promise<Room | null> {
  const result = await query(
    `
    SELECT c.num_chambre, c.prix, c.capacite, c.vue, c.commodite, 
           c.extensions_possible, c.dommages, c.id_hotel
    FROM Chambre c
    WHERE c.num_chambre = $1
  `,
    [roomId],
  )

  return result.rows.length > 0 ? result.rows[0] : null
}

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
  // Construire la requête SQL avec les filtres optionnels
  let sql = `
    SELECT c.num_chambre, h.nom AS hotel_name, ch.nom AS chain_name, c.prix, c.capacite, c.vue, 
           h.adresse AS location, h.classement AS category, h.id_hotel
    FROM Chambre c
    JOIN Hotel h ON c.id_hotel = h.id_hotel
    JOIN ChaineHoteliere ch ON h.id_chain = ch.id_chain
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

  const params = [startDate, endDate]
  let paramIndex = 3

  if (location) {
    sql += ` AND h.adresse ILIKE $${paramIndex}`
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

  if (hotelCategory && hotelCategory !== 0) {
    sql += ` AND h.classement = $${paramIndex}`
    params.push(hotelCategory)
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

  sql += ` ORDER BY c.prix`

  const result = await query(sql, params)
  return result.rows
}

export async function createReservation(
  startDate: string,
  endDate: string,
  clientId: string,
  roomNumber: number,
): Promise<Reservation> {
  // Obtenir le prochain ID de réservation
  const idResult = await query(`SELECT COALESCE(MAX(id_reservation), 0) + 1 AS next_id FROM Reservation`)
  const nextId = idResult.rows[0].next_id

  const result = await query(
    `
    INSERT INTO Reservation (id_reservation, date_debut, date_fin, statut, nas_client, num_chambre)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `,
    [nextId, startDate, endDate, "Confirmée", clientId, roomNumber],
  )

  return result.rows[0]
}

export async function getReservationsByClient(clientId: string): Promise<any[]> {
  const result = await query(
    `
    SELECT r.id_reservation, r.date_debut, r.date_fin, r.statut, r.nas_client, r.num_chambre,
           h.nom AS hotel_name, c.prix
    FROM Reservation r
    JOIN Chambre c ON r.num_chambre = c.num_chambre
    JOIN Hotel h ON c.id_hotel = h.id_hotel
    WHERE r.nas_client = $1
    ORDER BY r.date_debut DESC
  `,
    [clientId],
  )

  return result.rows
}

export async function getClients(): Promise<Client[]> {
  const result = await query(`
    SELECT nas_client, nom_complet, adresse, date_enregistrement
    FROM Client
    ORDER BY nom_complet
  `)

  return result.rows
}

export async function getClientById(nasClient: string): Promise<Client | null> {
  const result = await query(
    `
    SELECT nas_client, nom_complet, adresse, date_enregistrement
    FROM Client
    WHERE nas_client = $1
  `,
    [nasClient],
  )

  return result.rows.length > 0 ? result.rows[0] : null
}

export async function createClient(nasClient: string, nomComplet: string, adresse: string): Promise<Client> {
  const result = await query(
    `
    INSERT INTO Client (nas_client, nom_complet, adresse, date_enregistrement)
    VALUES ($1, $2, $3, CURRENT_DATE)
    RETURNING *
  `,
    [nasClient, nomComplet, adresse],
  )

  return result.rows[0]
}

export async function getEmployees(): Promise<Employe[]> {
  const result = await query(`
    SELECT e.nas_employe, e.nom_complet, e.adresse, e.id_hotel,
           h.nom AS hotel_name
    FROM Employe e
    JOIN Hotel h ON e.id_hotel = h.id_hotel
    ORDER BY e.nom_complet
  `)

  return result.rows
}

export async function createPayment(amount: number, date: string = new Date().toISOString()): Promise<Paiement> {
  // Obtenir le prochain ID de paiement
  const idResult = await query(`SELECT COALESCE(MAX(id_paiement), 0) + 1 AS next_id FROM Paiement`)
  const nextId = idResult.rows[0].next_id

  const result = await query(
    `
    INSERT INTO Paiement (id_paiement, montant, date)
    VALUES ($1, $2, $3)
    RETURNING *
  `,
    [nextId, amount, date],
  )

  return result.rows[0]
}

export async function createLocation(
  startDate: string,
  endDate: string,
  employeeId: string,
  clientId: string,
  roomNumber: number,
  paymentId: number,
): Promise<Location> {
  // Obtenir le prochain ID de location
  const idResult = await query(`SELECT COALESCE(MAX(id_location), 0) + 1 AS next_id FROM Location`)
  const nextId = idResult.rows[0].next_id

  const result = await query(
    `
    INSERT INTO Location (id_location, date_debut, date_fin, nas_employe, nas_client, num_chambre, id_paiement)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `,
    [nextId, startDate, endDate, employeeId, clientId, roomNumber, paymentId],
  )

  return result.rows[0]
}

export async function convertReservationToLocation(
  reservationId: number,
  employeeId: string,
  paymentId: number,
): Promise<Location> {
  // Récupérer les informations de la réservation
  const reservationResult = await query(
    `
    SELECT * FROM Reservation WHERE id_reservation = $1
  `,
    [reservationId],
  )

  if (reservationResult.rows.length === 0) {
    throw new Error(`Réservation ${reservationId} non trouvée`)
  }

  const reservation = reservationResult.rows[0]

  // Créer la location
  const location = await createLocation(
    reservation.date_debut,
    reservation.date_fin,
    employeeId,
    reservation.nas_client,
    reservation.num_chambre,
    paymentId,
  )

  // Mettre à jour le statut de la réservation
  await query(
    `
    UPDATE Reservation
    SET statut = 'Confirmée'
    WHERE id_reservation = $1
  `,
    [reservationId],
  )

  return location
}

export async function getRoomsByArea(): Promise<{ area: string; available: number }[]> {
  const result = await query(`
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
        AND r.date_debut <= CURRENT_DATE 
        AND r.date_fin >= CURRENT_DATE
    )
    GROUP BY h.adresse
    ORDER BY available DESC
  `)

  return result.rows
}

export async function getRoomCapacitiesByHotel(
  hotelId: number,
): Promise<{ type: string; capacity: number; count: number }[]> {
  const result = await query(
    `
    SELECT 
      CASE 
        WHEN c.capacite = 1 THEN 'Standard'
        WHEN c.capacite = 2 THEN 'Double'
        WHEN c.capacite = 3 THEN 'Triple'
        WHEN c.capacite = 4 THEN 'Familiale'
        ELSE 'Suite'
      END AS type,
      c.capacite,
      COUNT(c.num_chambre) AS count
    FROM Chambre c
    JOIN Hotel h ON c.id_hotel = h.id_hotel
    WHERE h.id_hotel = $1
    GROUP BY c.capacite
    ORDER BY c.capacite
  `,
    [hotelId],
  )

  return result.rows
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
  const result = await query(
    `
    INSERT INTO Chambre (prix, capacite, vue, commodite, extensions_possible, dommages, id_hotel)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `,
    [prix, capacite, vue, commodite, extensions_possible, dommages, id_hotel],
  )

  return result.rows[0]
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
  const result = await query(
    `
    UPDATE Chambre
    SET prix = $2, capacite = $3, vue = $4, commodite = $5, extensions_possible = $6, dommages = $7
    WHERE num_chambre = $1
    RETURNING *
  `,
    [num_chambre, prix, capacite, vue, commodite, extensions_possible, dommages],
  )

  return result.rows[0]
}

export async function deleteRoom(num_chambre: number): Promise<boolean> {
  const result = await query(
    `
    DELETE FROM Chambre
    WHERE num_chambre = $1
  `,
    [num_chambre],
  )

  return result.rowCount > 0
}

