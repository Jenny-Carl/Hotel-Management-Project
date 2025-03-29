-- Suppression des anciennes données pour éviter les conflits lors de l'insertion
DELETE FROM ArchiveLocation;  -- Suppression des archives de locations existantes
DELETE FROM ArchiveReservation;  -- Suppression des archives de réservations existantes
DELETE FROM Location; -- Suppression des locations en cours
DELETE FROM Paiement; -- Suppression des paiements enregistrés
DELETE FROM Reservation; -- Suppression des réservations effectuées
DELETE FROM Client;  -- Suppression des clients enregistrés
DELETE FROM employerole;  -- Suppression des associations entre employés et rôles
DELETE FROM Employe; -- Suppression des employés enregistrés
DELETE FROM Role; -- Suppression des rôles définis
DELETE FROM Chambre;  -- Suppression des chambres existantes
DELETE FROM HotelTelephones; -- Suppression des téléphones des hôtels
DELETE FROM HotelEmails; -- Suppression des emails des hôtels
DELETE FROM Hotel; -- Suppression des hôtels existants
DELETE FROM ChaineTelephones; -- Suppression des téléphones des chaînes hôtelières
DELETE FROM ChaineEmails; -- Suppression des emails des chaînes hôtelières
DELETE FROM ChaineHoteliere;  -- Suppression des chaînes hôtelières enregistrées

-- Création des Chaînes Hôtelières --
-- Insertion de 5 chaînes hôtelières avec des informations de base
INSERT INTO ChaineHoteliere (id_chain, nom, adresse_bureau, nb_hotels) VALUES
(1, 'Hilton', '3080 Brannon Avenue, Cleveland, USA', 8),
(2, 'Wyndham', '1487 Wood Street, Fort-Lauderdale, USA', 8),
(3, 'Hyatt', '3950 Horner Street, Austin, USA', 8),
(4, 'Marriott', '1214 Camden Place, Los Angeles, USA', 8),
(5, 'Continental', '3997 Farm Meadow Drive, Arizona, USA', 8);

-- Emails et téléphones pour chaque chaîne
-- Insertion des emails associés à chaque chaîne hôtelière
INSERT INTO ChaineEmails (id_chain, email) VALUES
(1, 'info@hilton.com'),
(1, 'reservation@hilton.com'),
(2, 'info@marriott.com'),
(2, 'reservation@marriott.com'),
(3, 'info@hyatt.com'),
(3, 'reservation@hyatt.com'),
(4, 'info@sheraton.com'),
(4, 'reservation@sheraton.com'),
(5, 'info@intercontinental.com'),
(5, 'reservation@intercontinental.com');

-- Insertion des numéros de téléphone associés à chaque chaîne hôtelière
INSERT INTO ChaineTelephones (id_chain, telephone) VALUES
(1, '+1-216-456-1234'),
(1, '+1-216-456-0000'),
(2, '+1-305-789-1234'),
(2, '+1-305-789-5678'),
(3, '+1-512-444-2345'),
(3, '+1-512-444-6789'),
(4, '+1-213-555-3456'),
(4, '+1-213-555-7890'),
(5, '+1-480-666-4567'),
(5, '+1-480-666-8901');

-- Insertion des Hôtels --
-- Insertion de 40 hôtels répartis sur 5 chaînes hôtelières (8 par chaîne) avec leurs informations
INSERT INTO Hotel (id_hotel, nom, adresse, classement, nb_chambres, id_chain) VALUES
-- Hilton
(1, 'Hilton NY', '3055 Martha Street, New York, USA', 4, 50, 1),
(2, 'Hilton LA', '574 Single Street, Los Angeles, USA', 3, 50, 1),
(3, 'Hilton Chicago', '1025 Main Street, Chicago, USA', 5, 50, 1),
(4, 'Hilton SF', '6789 Market St, San Francisco, USA', 4, 50, 1),
(5, 'Hilton Miami', '555 Ocean Drive, Miami, USA', 3, 50, 1),
(6, 'Hilton Houston', '908 Texas Ave, Houston, USA', 4, 50, 1),
(7, 'Hilton Dallas', '711 Pearl St, Dallas, USA', 5, 50, 1),
(8, 'Hilton Boston', '303 Atlantic Ave, Boston, USA', 4, 50, 1),
-- Wyndham
(9, 'Wyndham NY', '1005 Broadway, New York, USA', 4, 50, 2),
(10, 'Wyndham LA', '225 Sunset Blvd, Los Angeles, USA', 5, 50, 2),
(11, 'Wyndham Chicago', '650 Michigan Ave, Chicago, USA', 3, 50, 2),
(12, 'Wyndham SF', '220 Castro St, San Francisco, USA', 4, 50, 2),
(13, 'Wyndham Miami', '777 Collins Ave, Miami, USA', 3, 50, 2),
(14, 'Wyndham Houston', '505 Westheimer Rd, Houston, USA', 4, 50, 2),
(15, 'Wyndham Dallas', '404 Elm St, Dallas, USA', 5, 50, 2),
(16, 'Wyndham Boston', '901 Seaport Blvd, Boston, USA', 4, 50, 2),
-- Hyatt
(17, 'Hyatt NY', '90 Wall Street, New York, USA', 5, 50, 3),
(18, 'Hyatt LA', '888 Vine St, Los Angeles, USA', 4, 50, 3),
(19, 'Hyatt Chicago', '133 Wacker Dr, Chicago, USA', 3, 50, 3),
(20, 'Hyatt SF', '789 Van Ness Ave, San Francisco, USA', 4, 50, 3),
(21, 'Hyatt Miami', '66 Ocean Drive, Miami, USA', 3, 50, 3),
(22, 'Hyatt Houston', '404 Main St, Houston, USA', 4, 50, 3),
(23, 'Hyatt Dallas', '515 Deep Ellum, Dallas, USA', 5, 50, 3),
(24, 'Hyatt Boston', '200 Cambridge St, Boston, USA', 4, 50, 3),
-- Marriott
(25, 'Marriott NY', '34 Park Ave, New York, USA', 4, 50, 4),
(26, 'Marriott LA', '555 Wilshire Blvd, Los Angeles, USA', 5, 50, 4),
(27, 'Marriott Chicago', '222 Lake Shore Dr, Chicago, USA', 3, 50, 4),
(28, 'Marriott SF', '404 Golden Gate, San Francisco, USA', 4, 50, 4),
(29, 'Marriott Miami', '202 South Beach, Miami, USA', 3, 50, 4),
(30, 'Marriott Houston', '300 Space Center Blvd, Houston, USA', 4, 50, 4),
(31, 'Marriott Dallas', '600 Reunion Tower, Dallas, USA', 5, 50, 4),
(32, 'Marriott Boston', '122 Waterfront St, Boston, USA', 4, 50, 4),
-- Continental
(33, 'Continental NY', '44 Empire State, New York, USA', 5, 50, 5),
(34, 'Continental LA', '333 Hollywood Blvd, Los Angeles, USA', 4, 50, 5),
(35, 'Continental Chicago', '88 Navy Pier, Chicago, USA', 3, 50, 5),
(36, 'Continental SF', '77 Haight St, San Francisco, USA', 4, 50, 5),
(37, 'Continental Miami', '55 Ocean Drive, Miami, USA', 3, 50, 5),
(38, 'Continental Houston', '101 Space Blvd, Houston, USA', 4, 50, 5),
(39, 'Continental Dallas', '909 City Park, Dallas, USA', 5, 50, 5),
(40, 'Continental Boston', '777 Beacon St, Boston, USA', 4, 50, 5);

-- Contacts pour les hôtels --
-- Insertion automatique des emails pour chaque hôtel basé sur leur nom
INSERT INTO HotelEmails (id_hotel, email)
SELECT id_hotel, CONCAT(LOWER(nom), '@hotel.com') FROM Hotel;

-- Insertion automatique des téléphones pour chaque hôtel, formaté avec un préfixe spécifique
INSERT INTO HotelTelephones (id_hotel, telephone)
SELECT id_hotel, CONCAT('+1-555-', LPAD(id_hotel::TEXT, 4, '0')) FROM Hotel;

-- Insertion des Chambres (5 types par hôtel) --
-- Insertion manuelle d'une chambre pour le premier hôtel de la liste (Hilton NY)
INSERT INTO Chambre (num_chambre, prix, capacite, vue, commodite, extensions_possible, dommages, id_hotel)
VALUES (101, 200.00, 2, 'ville', 'TV, Climatisation, Mini-bar', TRUE, NULL, 1);

-- Insertion automatique de 5 chambres supplémentaires pour chaque hôtel avec des informations aléatoires
-- La fonction RANDOM() génère des prix, tailles et types de vue au hasard
INSERT INTO Chambre (prix, capacite, vue, commodite, extensions_possible, dommages, id_hotel)
SELECT
    ROUND((RANDOM() * 500 + 100)::NUMERIC, 2),
    (RANDOM() * 4 + 1)::INT,
    (ARRAY['mer', 'montagne', 'ville', 'jardin', 'piscine'])[FLOOR(RANDOM() * 5 + 1)],
    'TV, Climatisation, Mini-bar',
    TRUE,
    NULL,
    h.id_hotel
FROM Hotel h, generate_series(1, 5);


-- Insertion des Employés --
-- Insertion de quelques employés avec leur NAS, nom et adresse associés à un hôtel
INSERT INTO Employe (nas_employe, nom_complet, adresse, id_hotel) VALUES
('123456789', 'Jean Dupont', '12 Rue Principale, New York', 1),
('987654321', 'Marie Curie', '45 Avenue Montagne, New York', 1),
('456123789', 'Albert Einstein', '78 Quantum Road, San Francisco', 2),
('321654987', 'Isaac Newton', '99 Gravity Street, Los Angeles', 3),
('789456123', 'Nikola Tesla', '1 Electric Ave, Chicago', 4),
('654321987', 'Galileo Galilei', '7 Astronomy Lane, Miami', 5);

-- Assignation des rôles aux employés
-- Rattachement des employés à des rôles spécifiques (Gestionnaire, Réceptionniste, Service ménager)
INSERT INTO Role (id_role, nom) VALUES
(1, 'Gestionnaire'),
(2, 'Réceptionniste'),
(3, 'Service ménager');

-- Assignation des rôles aux employés
INSERT INTO employerole (nas_employe, id_role) VALUES
('123456789', 1),
('987654321', 2),
('456123789', 3),
('321654987', 1),
('789456123', 2),
('654321987', 3);

-- Insertion des Clients --
-- Insertion de deux clients avec leur NAS, nom, adresse et date d'enregistrement-- Insertion des Clients
INSERT INTO Client (nas_client, nom_complet, adresse, date_enregistrement) VALUES
('112233445', 'Paul Martin', '888 Rue du Commerce, Montréal', '2023-01-15'),
('556677889', 'Sophie Tremblay', '999 Avenue des Champs, Québec', '2023-03-20');

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

-- Contraintes de suppression
--DELETE FROM Reservation WHERE num_chambre = 101;
-- DELETE FROM ArchiveLocation WHERE id_location = 1;
-- DELETE FROM Location WHERE id_location = 1;
-- DELETE FROM ArchiveReservation WHERE id_reservation = 1;
-- DELETE FROM Reservation WHERE id_reservation = 1;
-- DELETE FROM Location WHERE id_location = 1;
-- DELETE FROM ChaineHoteliere WHERE id_chain = 1;
-- DELETE FROM Chambre WHERE num_chambre = 101;

