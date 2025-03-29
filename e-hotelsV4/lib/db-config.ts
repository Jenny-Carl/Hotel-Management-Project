import { Pool } from "pg"

const pool = new Pool({
  user: process.env.DB_USER || "postgres", 
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "ajoute le nom du database",
  password: process.env.DB_PASSWORD || "ajoute ton password",
  port: process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT) : 5432,
})

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params)
}

export async function testConnection(): Promise<boolean> {
  try {
    await pool.query("SELECT 1 + 1 AS result")
    return true
  } catch (error) {
    console.error("Database connection test failed:", error)
    return false
  }
}

