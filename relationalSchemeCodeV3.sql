-- Suppression des tables si elles existent (pour éviter les conflits)
DROP TABLE IF EXISTS ArchiveLocation CASCADE;
DROP TABLE IF EXISTS ArchiveReservation CASCADE;
DROP TABLE IF EXISTS Paiement CASCADE;
DROP TABLE IF EXISTS Location CASCADE;
DROP TABLE IF EXISTS Reservation CASCADE;
DROP TABLE IF EXISTS EmployeRole CASCADE;
DROP TABLE IF EXISTS Role CASCADE;
DROP TABLE IF EXISTS Employe CASCADE;
DROP TABLE IF EXISTS Client CASCADE;
DROP TABLE IF EXISTS Chambre CASCADE;
DROP TABLE IF EXISTS HotelEmails CASCADE;
DROP TABLE IF EXISTS HotelTelephones CASCADE;
DROP TABLE IF EXISTS Hotel CASCADE;
DROP TABLE IF EXISTS ChaineEmails CASCADE;
DROP TABLE IF EXISTS ChaineTelephones CASCADE;
DROP TABLE IF EXISTS ChaineHoteliere CASCADE;

-- Création des tables
CREATE TABLE ChaineHoteliere (
    id_chain INT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    adresse_bureau VARCHAR(255) NOT NULL,
    nb_hotels INT CHECK (nb_hotels >= 0)
);

CREATE TABLE ChaineTelephones (
    id_chain INT,
    telephone VARCHAR(20) CHECK (telephone ~ '^\+?[0-9\- ]{7,20}$'),
    PRIMARY KEY (id_chain, telephone),
    FOREIGN KEY (id_chain) REFERENCES ChaineHoteliere(id_chain) ON DELETE CASCADE
);

CREATE TABLE ChaineEmails (
    id_chain INT,
    email VARCHAR(255) CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    PRIMARY KEY (id_chain, email),
    FOREIGN KEY (id_chain) REFERENCES ChaineHoteliere(id_chain) ON DELETE CASCADE
);

CREATE TABLE Hotel (
    id_hotel INT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    classement INT CHECK (classement BETWEEN 1 AND 5),
    nb_chambres INT CHECK (nb_chambres >= 1),
    id_chain INT NOT NULL,
    FOREIGN KEY (id_chain) REFERENCES ChaineHoteliere(id_chain) ON DELETE CASCADE
);

CREATE TABLE HotelTelephones (
    id_hotel INT,
    telephone VARCHAR(20) CHECK (telephone ~ '^\+?[0-9\- ]{7,20}$'),
    PRIMARY KEY (id_hotel, telephone),
    FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel) ON DELETE CASCADE
);

CREATE TABLE HotelEmails (
    id_hotel INT,
    email VARCHAR(255) CHECK (email ~* '^[A-Za-z0-9._%+\- ]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    PRIMARY KEY (id_hotel, email),
    FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel) ON DELETE CASCADE
);

CREATE TABLE Chambre (
    num_chambre SERIAL PRIMARY KEY,
    prix DECIMAL(10,2) NOT NULL CHECK (prix > 0),
    capacite INT NOT NULL CHECK (capacite > 0),
    vue VARCHAR(100) CHECK (vue IN ('mer', 'montagne', 'ville', 'jardin', 'piscine')),
    commodite TEXT,
    extensions_possible BOOLEAN,
    dommages TEXT,
    id_hotel INT NOT NULL,
    FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel) ON DELETE CASCADE
);

CREATE TABLE Employe (
    nas_employe VARCHAR(15) PRIMARY KEY CHECK (nas_employe ~ '^[0-9]{9}$'),
    nom_complet VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    id_hotel INT NOT NULL,
    FOREIGN KEY (id_hotel) REFERENCES Hotel(id_hotel) ON DELETE CASCADE
);

CREATE TABLE Role (
    id_role INT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE EmployeRole (
    nas_employe VARCHAR(15),
    id_role INT,
    PRIMARY KEY (nas_employe, id_role),
    FOREIGN KEY (nas_employe) REFERENCES Employe(nas_employe) ON DELETE CASCADE,
    FOREIGN KEY (id_role) REFERENCES Role(id_role) ON DELETE CASCADE
);

CREATE TABLE Client (
    nas_client VARCHAR(15) PRIMARY KEY CHECK (nas_client ~ '^[0-9]{9}$'),
    nom_complet VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    date_enregistrement DATE NOT NULL CHECK (date_enregistrement <= CURRENT_DATE)
);

CREATE TABLE Reservation (
    id_reservation INT PRIMARY KEY,
    date_debut DATE NOT NULL CHECK (date_debut >= CURRENT_DATE),
    date_fin DATE NOT NULL CHECK (date_fin > date_debut),
    statut VARCHAR(50) NOT NULL CHECK (statut IN ('Confirmée', 'Annulée', 'En attente')),
    nas_client VARCHAR(15) NOT NULL,
    num_chambre INT NOT NULL,
    FOREIGN KEY (nas_client) REFERENCES Client(nas_client) ON DELETE CASCADE,
    FOREIGN KEY (num_chambre) REFERENCES Chambre(num_chambre) ON DELETE RESTRICT
);

CREATE TABLE ArchiveReservation (
    id_archiveReservation INT PRIMARY KEY,
    id_reservation INT NOT NULL UNIQUE,
    FOREIGN KEY (id_reservation) REFERENCES Reservation(id_reservation) ON DELETE RESTRICT
);

CREATE TABLE Paiement (
    id_paiement INT PRIMARY KEY,
    montant DECIMAL(10,2) NOT NULL CHECK (montant > 0),
    date DATE NOT NULL CHECK (date <= CURRENT_DATE)
);

CREATE TABLE Location (
    id_location INT PRIMARY KEY,
    date_debut DATE NOT NULL CHECK (date_debut >= CURRENT_DATE),
    date_fin DATE NOT NULL CHECK (date_fin > date_debut),
    nas_employe VARCHAR(15) NOT NULL,
    nas_client VARCHAR(15) NOT NULL,
    num_chambre INT NOT NULL,
    id_paiement INT NOT NULL,
    FOREIGN KEY (nas_employe) REFERENCES Employe(nas_employe),
    FOREIGN KEY (nas_client) REFERENCES Client(nas_client),
    FOREIGN KEY (num_chambre) REFERENCES Chambre(num_chambre) ON DELETE RESTRICT,
    FOREIGN KEY (id_paiement) REFERENCES Paiement(id_paiement)
);

CREATE TABLE ArchiveLocation (
    id_archiveLocation INT PRIMARY KEY,
    id_location INT NOT NULL UNIQUE,
    FOREIGN KEY (id_location) REFERENCES Location(id_location) ON DELETE RESTRICT
);

-- Création des index pour les performances
CREATE INDEX idx_hotel_chain ON Hotel(id_chain);
CREATE INDEX idx_chambre_hotel ON Chambre(id_hotel);
CREATE INDEX idx_reservation_client ON Reservation(nas_client);
CREATE INDEX idx_location_client ON Location(nas_client);