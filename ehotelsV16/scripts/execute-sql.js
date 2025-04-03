import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

// Configuration de la connexion à la base de données
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number.parseInt(process.env.DB_PORT || "5432"),
})

// SQL à exécuter
const sql = `
-- Réservations et Locations
-- Insertion d'une réservation pour le client Paul Martin (chambre 101) et paiement associé
INSERT INTO Reservation (id_reservation, date_debut, date_fin, statut, nas_client, num_chambre) VALUES
(1, '2025-06-01', '2025-06-05', 'Confirmée', '112233445', 101);

INSERT INTO Paiement (id_paiement, montant, date) VALUES
(1, 799.96, '2025-03-29'); -- Paiement du montant pour la réservation

-- Insertion de la location pour Paul Martin (associée à l'employé et à la chambre)
INSERT INTO Location (id_location, date_debut, date_fin, nas_employe, nas_client, num_chambre, id_paiement) VALUES
(1, '2025-06-01', '2025-06-05', '123456789', '112233445', 101, 1);

-- Archivage des réservations et locations
-- Déplacement des informations de réservation et de location dans les tables d'archive
INSERT INTO ArchiveReservation (id_archiveReservation, id_reservation) VALUES
(1, 1);

INSERT INTO ArchiveLocation (id_archiveLocation, id_location) VALUES
(1, 1);

-- Trigger 1 : Archivage automatique des réservations supprimées
CREATE OR REPLACE FUNCTION archive_reservation()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO ArchiveReservation(id_archiveReservation, id_reservation)
    VALUES (NEXTVAL('archive_reservation_seq'), OLD.id_reservation);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_archive_reservation ON Reservation;
CREATE TRIGGER trg_archive_reservation
BEFORE DELETE ON Reservation
FOR EACH ROW EXECUTE FUNCTION archive_reservation();

-- Trigger 2 : Mise à jour automatique du nombre d'hôtels dans la chaîne
CREATE OR REPLACE FUNCTION update_nb_hotels()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        UPDATE ChaineHoteliere 
        SET nb_hotels = nb_hotels - 1 
        WHERE id_chain = OLD.id_chain;
    ELSIF (TG_OP = 'INSERT') THEN
        UPDATE ChaineHoteliere 
        SET nb_hotels = nb_hotels + 1 
        WHERE id_chain = NEW.id_chain;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_nb_hotels ON Hotel;
CREATE TRIGGER trg_update_nb_hotels
AFTER INSERT OR DELETE ON Hotel
FOR EACH ROW EXECUTE FUNCTION update_nb_hotels();

-- Création des index pour les performances
DROP INDEX IF EXISTS idx_reservation_chambre;
CREATE INDEX idx_reservation_chambre ON Reservation(num_chambre);

DROP INDEX IF EXISTS idx_location_employe;
CREATE INDEX idx_location_employe ON Location(nas_employe);

DROP INDEX IF EXISTS idx_reservation_dates;
CREATE INDEX idx_reservation_dates ON Reservation(date_debut, date_fin);

DROP INDEX IF EXISTS idx_hotel_chain;
CREATE INDEX idx_hotel_chain ON Hotel(id_chain);

DROP INDEX IF EXISTS idx_chambre_hotel;
CREATE INDEX idx_chambre_hotel ON Chambre(id_hotel);

DROP INDEX IF EXISTS idx_reservation_client;
CREATE INDEX idx_reservation_client ON Reservation(nas_client);

DROP INDEX IF EXISTS idx_location_client;
CREATE INDEX idx_location_client ON Location(nas_client);
`

async function executeSQL() {
  const client = await pool.connect()
  try {
    console.log("Exécution du script SQL...")
    await client.query("BEGIN")
    await client.query(sql)
    await client.query("COMMIT")
    console.log("Script SQL exécuté avec succès!")

    // Vérification des triggers
    console.log("\nVérification des triggers:")
    const triggerResult = await client.query(`
      SELECT trigger_name, event_manipulation, action_statement
      FROM information_schema.triggers
      WHERE trigger_schema = 'public'
    `)
    console.log("Triggers dans la base de données:")
    triggerResult.rows.forEach((trigger) => {
      console.log(
        `- ${trigger.trigger_name}: ${trigger.event_manipulation} - ${trigger.action_statement.substring(0, 50)}...`,
      )
    })

    // Vérification des index
    console.log("\nVérification des index:")
    const indexResult = await client.query(`
      SELECT indexname, tablename
      FROM pg_indexes
      WHERE schemaname = 'public'
    `)
    console.log("Index dans la base de données:")
    indexResult.rows.forEach((index) => {
      console.log(`- ${index.indexname} sur la table ${index.tablename}`)
    })

    // Vérification des réservations
    console.log("\nVérification des réservations:")
    const reservationResult = await client.query("SELECT * FROM Reservation")
    console.log("Réservations dans la base de données:")
    reservationResult.rows.forEach((reservation) => {
      console.log(
        `- Réservation #${reservation.id_reservation}: ${reservation.date_debut} à ${reservation.date_fin}, Statut: ${reservation.statut}`,
      )
    })
  } catch (err) {
    await client.query("ROLLBACK")
    console.error("Erreur lors de l'exécution du script SQL:", err)
  } finally {
    client.release()
    await pool.end()
  }
}

executeSQL()

