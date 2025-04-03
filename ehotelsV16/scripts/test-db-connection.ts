import { testConnection } from "../lib/db-config"

async function main() {
  try {
    const connected = await testConnection()
    if (connected) {
      console.log("✅ Connexion à la base de données réussie")
    } else {
      console.error("❌ Échec de la connexion à la base de données")
    }
  } catch (error) {
    console.error("❌ Erreur lors du test de connexion:", error)
  }
}

main()

