import Link from "next/link"
import { ArrowRight, Building2, CalendarCheck, Hotel, Search, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Découvrez Votre Séjour Parfait
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Trouvez et réservez les meilleurs hôtels parmi plusieurs chaînes avec notre plateforme facile à
                  utiliser.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/search">
                  <Button className="gap-1">
                    Rechercher des Hôtels <Search className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/reservations/new">
                  <Button variant="outline" className="gap-1">
                    Réserver Maintenant <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto flex justify-center">
              <div className="relative">
                <img
                  alt="Chambre d'hôtel"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  height="310"
                  src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop"
                  width="550"
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Fonctionnalités Clés
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Tout Ce Dont Vous Avez Besoin</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Notre plateforme offre une expérience fluide pour trouver et réserver des hôtels.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Hotel className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-xl">Multiples Chaînes Hôtelières</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Parcourez les hôtels des chaînes Hilton, Wyndham, Hyatt, Marriott et Continental.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Search className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-xl">Recherche Avancée</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Trouvez des chambres disponibles par date, emplacement, prix, capacité et commodités.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <CalendarCheck className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-xl">Réservation Facile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Processus de réservation simple avec options de paiement sécurisées.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-xl">Détails des Hôtels</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Consultez des informations complètes sur chaque hôtel, y compris les commodités et les évaluations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Users className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-xl">Comptes Utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Gérez votre profil, consultez l'historique des réservations et enregistrez vos hôtels préférés.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <CalendarCheck className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-xl">Gestion des Réservations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Consultez, modifiez ou annulez vos réservations facilement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hotel Chains Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Nos Chaînes Hôtelières</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Explorez notre sélection de chaînes hôtelières premium disponibles sur notre plateforme.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {["Hilton", "Wyndham", "Hyatt", "Marriott", "Continental"].map((chain, index) => (
              <Link href={`/chains/${index + 1}`} key={chain} className="group">
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-video overflow-hidden">
                    <img
                      alt={`${chain} Hotels`}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      height="225"
                      src={`https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089&auto=format&fit=crop`}
                      width="400"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{chain}</CardTitle>
                    <CardDescription>Explorez les hôtels {chain} dans le monde entier</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      Voir les Hôtels
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

