import Link from "next/link"
import { Building2, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getChainById, getChainEmails, getChainTelephones, getHotelsByChain } from "@/lib/db"

export default async function ChainDetailPage({ params }: { params: { id: string } }) {
  const chainId = Number.parseInt(params.id)
  const chain = await getChainById(chainId)
  const hotels = await getHotelsByChain(chainId)
  const emails = await getChainEmails(chainId)
  const telephones = await getChainTelephones(chainId)

  if (!chain) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Chaîne hôtelière non trouvée</h1>
        <p>La chaîne hôtelière que vous recherchez n'existe pas.</p>
        <Link href="/chains" className="text-blue-600 hover:underline mt-4 inline-block">
          Retour à la liste des chaînes
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/chains" className="text-blue-600 hover:underline mr-2">
          Chaînes
        </Link>
        <span className="mx-2">›</span>
        <span>{chain.nom}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <div className="aspect-square">
              <img
                src={`https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089&auto=format&fit=crop`}
                alt={chain.nom}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">{chain.nom}</CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{chain.adresse_bureau}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Contact</h3>
                  <div className="space-y-2">
                    {emails.map((email) => (
                      <div key={email.email} className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={`mailto:${email.email}`} className="hover:underline">
                          {email.email}
                        </a>
                      </div>
                    ))}
                    {telephones.map((tel) => (
                      <div key={tel.telephone} className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={`tel:${tel.telephone}`} className="hover:underline">
                          {tel.telephone}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Informations</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{chain.nb_hotels} hôtels</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Hôtels de la chaîne {chain.nom}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map((hotel) => (
              <Card key={hotel.id_hotel} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop`}
                    alt={hotel.nom}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{hotel.nom}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{hotel.adresse}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm mb-4">
                    <span className="mr-2">{hotel.classement} étoiles</span>
                    <span>•</span>
                    <span className="ml-2">{hotel.nb_chambres} chambres</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/hotels/${hotel.id_hotel}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      Voir les détails
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

