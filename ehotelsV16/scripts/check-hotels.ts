import { getHotels } from "../lib/db"

async function main() {
  try {
    console.log("Vérification des hôtels dans la base de données...")
    const hotels = await getHotels()
    console.log(`Nombre d'hôtels trouvés: ${hotels.length}`)

    if (hotels.length > 0) {
      console.log("Liste des hôtels:")
      hotels.forEach((hotel, index) => {
        console.log(
          `${index + 1}. ${hotel.nom} (ID: ${hotel.id_hotel}) - ${hotel.adresse} - ${hotel.classement} étoiles - ${hotel.nb_chambres} chambres`,
        )
      })
    } else {
      console.log("Aucun hôtel trouvé dans la base de données.")
    }
  } catch (error) {
    console.error("Erreur lors de la vérification des hôtels:", error)
  }
}

main()

