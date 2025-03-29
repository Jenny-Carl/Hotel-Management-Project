import Link from "next/link"
import { Building2, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for hotel chains
const chains = [
  {
    id: 1,
    name: "Hilton",
    address: "3080 Brannon Avenue, Cleveland, USA",
    hotels: 8,
    email: "info@hilton.com",
    phone: "+1-216-456-1234",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Wyndham",
    address: "1487 Wood Street, Fort-Lauderdale, USA",
    hotels: 8,
    email: "info@marriott.com",
    phone: "+1-305-789-1234",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Hyatt",
    address: "3950 Horner Street, Austin, USA",
    hotels: 8,
    email: "info@hyatt.com",
    phone: "+1-512-444-2345",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Marriott",
    address: "1214 Camden Place, Los Angeles, USA",
    hotels: 8,
    email: "info@sheraton.com",
    phone: "+1-213-555-3456",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Continental",
    address: "3997 Farm Meadow Drive, Arizona, USA",
    hotels: 8,
    email: "info@intercontinental.com",
    phone: "+1-480-666-4567",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089&auto=format&fit=crop",
  },
]

export default function ChainsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Hotel Chains</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chains.map((chain) => (
          <Card key={chain.id} className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img src={chain.image || "/placeholder.svg"} alt={chain.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-6 md:w-2/3">
                <CardHeader className="p-0 pb-4">
                  <CardTitle>{chain.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-2">
                  <div className="flex items-center text-sm">
                    <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{chain.address}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{chain.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{chain.phone}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{chain.hotels}</span> hotels in this chain
                  </div>
                </CardContent>
                <CardFooter className="p-0 pt-4">
                  <Link href={`/chains/${chain.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      View Hotels
                    </Button>
                  </Link>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

