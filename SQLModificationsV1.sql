-- Requête 1 : Trouver les chambres disponibles pour une période donnée
SELECT c.num_chambre, h.nom AS hotel, c.prix, c.capacite 
FROM Chambre c
JOIN Hotel h ON c.id_hotel = h.id_hotel
WHERE NOT EXISTS (
    SELECT 1 
    FROM Location l 
    WHERE l.num_chambre = c.num_chambre 
    AND l.date_debut <= '2023-06-10' 
    AND l.date_fin >= '2023-06-01'
)
AND NOT EXISTS (
    SELECT 1 
    FROM Reservation r 
    WHERE r.num_chambre = c.num_chambre 
    AND r.date_debut <= '2023-06-10' 
    AND r.date_fin >= '2023-06-01'
);

-- Requête 2 : Mettre à jour les prix des chambres pour les hôtels 5 étoiles
UPDATE Chambre
SET prix = prix * 1.10  -- Augmentation de 10%
WHERE id_hotel IN (
    SELECT id_hotel 
    FROM Hotel 
    WHERE classement = 5
);

-- Requête 3 : Nombre de réservations par client
SELECT c.nom_complet, COUNT(r.id_reservation) AS total_reservations
FROM Client c
LEFT JOIN Reservation r ON c.nas_client = r.nas_client
GROUP BY c.nas_client;

-- Requête 4 : Liste des hôtels avec leur chaîne hôtelière
SELECT h.nom AS hotel, c.nom AS chaine, h.adresse, h.classement
FROM Hotel h
JOIN ChaineHoteliere c ON h.id_chain = c.id_chain;

-- Trigger 1 : Archivage automatique des réservations supprimées
CREATE OR REPLACE FUNCTION archive_reservation()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO ArchiveReservation(id_archiveReservation, id_reservation)
    VALUES (NEXTVAL('archive_reservation_seq'), OLD.id_reservation);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

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

CREATE TRIGGER trg_update_nb_hotels
AFTER INSERT OR DELETE ON Hotel
FOR EACH ROW EXECUTE FUNCTION update_nb_hotels();



/* Explications :
Requêtes :

Disponibilité des chambres : Vérifie les conflits de dates avec les locations et réservations existantes

Mise à jour des prix : Augmente les prix de 10% pour les hôtels 5 étoiles

Statistiques clients : Compte le nombre de réservations par client

Liste complète : Jointure entre hôtels et chaînes pour un rapport global

Triggers :

Archivage : Capture les réservations supprimées dans l'archive avant suppression

Mise à jour compteur : Maintenir à jour le nombre d'hôtels dans chaque chaîne automatiquement

Fonctionnalités Avancées :
Gestion des séquences pour les IDs d'archivage

Contrôle des opérations (INSERT/DELETE) dans les triggers

Mise à jour en temps réel des métriques clés

Conservation de l'historique malgré les suppressions

Ces éléments garantissent :

L'intégrité référentielle via les contraintes FOREIGN KEY

La cohérence des données avec les triggers

La persistance des données historiques

Des performances optimales avec des index appropriés
 */
