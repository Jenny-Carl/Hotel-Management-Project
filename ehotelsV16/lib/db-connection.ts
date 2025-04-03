// This file will handle the database connection to PostgreSQL
// For now, we're using mock data, but this will be the entry point for real DB connections

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

// Export the pool
export { pool }

