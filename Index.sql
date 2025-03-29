-- Création des index pour les performances
CREATE INDEX idx_reservation_chambre ON Reservation(num_chambre); --Les requêtes qui récupèrent les réservations pour une chambre spécifique seront plus rapides.
CREATE INDEX idx_location_employe ON Location(nas_employe); --Permet d’accélérer les requêtes qui récupèrent toutes les locations gérées par un employé.
CREATE INDEX idx_reservation_dates ON Reservation(date_debut, date_fin); --Si des requêtes impliquent souvent date_debut et date_fin, un index composite aiderait.

-- Deja mis dans realtionalSchemeCode
CREATE INDEX idx_hotel_chain ON Hotel(id_chain);
CREATE INDEX idx_chambre_hotel ON Chambre(id_hotel);
CREATE INDEX idx_reservation_client ON Reservation(nas_client);
CREATE INDEX idx_location_client ON Location(nas_client);
