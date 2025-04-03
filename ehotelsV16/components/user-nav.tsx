"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogIn, LogOut, User, UserCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export function UserNav() {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
      variant: "success",
    })
    router.push("/")
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled className="gap-2">
        <User className="h-4 w-4" />
        Chargement...
      </Button>
    )
  }

  if (!user) {
    return (
      <>
        <Link href="/login" className="hidden md:block">
          <Button variant="ghost" size="sm" className="gap-2">
            <LogIn className="h-4 w-4" />
            Connexion
          </Button>
        </Link>
        <Link href="/register" className="hidden md:block">
          <Button size="sm">Inscription</Button>
        </Link>
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 relative">
          <UserCircle className="h-5 w-5" />
          <span className="hidden md:inline-block">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile" className="flex w-full">
              Profil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/reservations" className="flex w-full">
              Mes réservations
            </Link>
          </DropdownMenuItem>
          {user.role === "admin" && (
            <DropdownMenuItem>
              <Link href="/admin" className="flex w-full">
                Administration
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

