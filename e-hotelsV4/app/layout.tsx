import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Hotel, LogIn, Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-Hotels - Trouvez et Réservez Votre Séjour Parfait",
  description: "Un système complet de gestion hôtelière pour trouver et réserver des hôtels parmi plusieurs chaînes.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center">
                <Link href="/" className="flex items-center gap-2 font-bold">
                  <Hotel className="h-6 w-6" />
                  <span>E-Hotels</span>
                </Link>
                <nav className="hidden md:flex gap-6 ml-10">
                  <Link href="/search" className="text-sm font-medium transition-colors hover:text-primary">
                    Recherche
                  </Link>
                  <Link href="/hotels" className="text-sm font-medium transition-colors hover:text-primary">
                    Hôtels
                  </Link>
                  <Link href="/chains" className="text-sm font-medium transition-colors hover:text-primary">
                    Chaînes
                  </Link>
                  <Link href="/reservations" className="text-sm font-medium transition-colors hover:text-primary">
                    Réservations
                  </Link>
                  <Link href="/views" className="text-sm font-medium transition-colors hover:text-primary">
                    Statistiques
                  </Link>
                  <Link href="/admin" className="text-sm font-medium transition-colors hover:text-primary">
                    Administration
                  </Link>
                </nav>
                <div className="flex items-center gap-2 ml-auto">
                  <Link href="/search">
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Search className="h-5 w-5" />
                      <span className="sr-only">Recherche</span>
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="gap-2 hidden md:flex">
                      <LogIn className="h-4 w-4" />
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="hidden md:flex">
                      Inscription
                    </Button>
                  </Link>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <div className="flex flex-col gap-6 mt-6">
                        <Link href="/" className="flex items-center gap-2 font-bold">
                          <Hotel className="h-6 w-6" />
                          <span>E-Hotels</span>
                        </Link>
                        <nav className="flex flex-col gap-4">
                          <Link href="/search" className="text-sm font-medium transition-colors hover:text-primary">
                            Recherche
                          </Link>
                          <Link href="/hotels" className="text-sm font-medium transition-colors hover:text-primary">
                            Hôtels
                          </Link>
                          <Link href="/chains" className="text-sm font-medium transition-colors hover:text-primary">
                            Chaînes
                          </Link>
                          <Link
                            href="/reservations"
                            className="text-sm font-medium transition-colors hover:text-primary"
                          >
                            Réservations
                          </Link>
                          <Link href="/views" className="text-sm font-medium transition-colors hover:text-primary">
                            Statistiques
                          </Link>
                          <Link href="/admin" className="text-sm font-medium transition-colors hover:text-primary">
                            Administration
                          </Link>
                          <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
                            Connexion
                          </Link>
                          <Link href="/register" className="text-sm font-medium transition-colors hover:text-primary">
                            Inscription
                          </Link>
                        </nav>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 md:py-10">
              <div className="container flex flex-col gap-4 md:flex-row md:gap-8">
                <div className="flex flex-col gap-2 md:gap-4">
                  <Link href="/" className="flex items-center gap-2 font-bold">
                    <Hotel className="h-6 w-6" />
                    <span>E-Hotels</span>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} E-Hotels. Tous droits réservés.
                  </p>
                </div>
                <div className="grid flex-1 grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Entreprise</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                          À propos
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                          Carrières
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Aide</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                          Support Client
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                          Conditions d'utilisation
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                          Politique de confidentialité
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Hôtels</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                          Hilton
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                          Wyndham
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                          Hyatt
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Nous suivre</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                          Twitter
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                          Instagram
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                          Facebook
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'