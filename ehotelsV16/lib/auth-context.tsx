"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Types pour l'utilisateur
export interface User {
  id: string
  email: string
  name: string
  role: "client" | "admin" | "employee"
}

// Types pour le contexte d'authentification
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

// Création du contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Données simulées pour les utilisateurs
const mockUsers = [
  {
    id: "1",
    email: "admin@ehotels.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
  },
  {
    id: "2",
    email: "client@example.com",
    password: "client123",
    name: "Client User",
    role: "client" as const,
  },
  {
    id: "3",
    email: "employee@ehotels.com",
    password: "employee123",
    name: "Employee User",
    role: "employee" as const,
  },
]

// Provider du contexte d'authentification
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem("ehotels_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Fonction de connexion
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simuler un délai de réseau
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Vérifier les identifiants
    const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (foundUser) {
      // Créer l'objet utilisateur sans le mot de passe
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)

      // Stocker l'utilisateur dans le localStorage
      localStorage.setItem("ehotels_user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Fonction d'inscription
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simuler un délai de réseau
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Vérifier si l'email existe déjà
    const existingUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (existingUser) {
      setIsLoading(false)
      return false
    }

    // Dans une application réelle, nous ajouterions l'utilisateur à la base de données
    // Ici, nous allons simplement créer un nouvel utilisateur
    const newUser = {
      id: `${mockUsers.length + 1}`,
      email,
      name,
      role: "client" as const,
    }

    setUser(newUser)

    // Stocker l'utilisateur dans le localStorage
    localStorage.setItem("ehotels_user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  // Fonction de déconnexion
  const logout = () => {
    setUser(null)
    localStorage.removeItem("ehotels_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

// Hook pour utiliser le contexte d'authentification
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

