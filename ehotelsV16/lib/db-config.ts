// Define a type for query results
export interface QueryResult {
  rows: any[]
  rowCount: number
}

// Mock Pool implementation for client-side
class MockPool {
  async connect() {
    return {
      query: async () => ({ rows: [], rowCount: 0 }),
      release: () => {},
    }
  }
}

// Use a conditional import approach
let Pool: any
let pool: any

// Only import pg in a server context
if (typeof window === "undefined") {
  try {
    // Dynamic import for server-side only
    const pg = require("pg")
    Pool = pg.Pool

    // Create the pool if we're on the server
    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number.parseInt(process.env.DB_PORT || "5432"),
      connectionTimeoutMillis: 5000,
    })

    console.log("PostgreSQL pool created successfully")
  } catch (error) {
    console.error("Failed to load pg module:", error)
    // Fallback to mock implementation
    Pool = MockPool
    pool = new MockPool()
  }
} else {
  // Client-side mock
  Pool = MockPool
  pool = new MockPool()
}

// Fonction pour exécuter des requêtes SQL
export const query = async (text: string, params?: any[]): Promise<QueryResult> => {
  try {
    // If we're in the browser, return mock data
    if (typeof window !== "undefined") {
      console.warn("Database queries are not supported in the browser. Returning mock data.")
      return { rows: [], rowCount: 0 }
    }

    const client = await pool.connect()
    try {
      console.log(`Executing query: ${text}`, params)
      const result = await client.query(text, params)
      console.log(`Query result: ${result.rowCount} rows`)
      return result
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Erreur de base de données:", error)
    // Utiliser des données simulées en cas d'erreur
    return { rows: [], rowCount: 0 }
  }
}

// Fonction pour tester la connexion
export async function testConnection(): Promise<boolean> {
  try {
    // If we're in the browser, return false
    if (typeof window !== "undefined") {
      console.warn("Database connection tests are not supported in the browser.")
      return false
    }

    const client = await pool.connect()
    try {
      const result = await client.query("SELECT NOW()")
      console.log("Connexion à la base de données réussie:", result.rows[0])
      return true
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error)
    return false
  }
}

