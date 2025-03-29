import { NextResponse } from "next/server"
import { testConnection } from "@/lib/db-config"

export async function GET() {
  try {
    const connected = await testConnection()
    if (connected) {
      return NextResponse.json({ status: "success", message: "Connexion à la base de données réussie" })
    } else {
      return NextResponse.json(
        { status: "error", message: "Échec de la connexion à la base de données" },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Erreur lors du test de connexion:", error)
    return NextResponse.json({ status: "error", message: "Erreur lors du test de connexion" }, { status: 500 })
  }
}

