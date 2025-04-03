import { Suspense } from "react"
import { getTriggers, getIndexes } from "@/lib/db-api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

async function DatabaseInfoPage() {
  // Récupérer les triggers et les index de la base de données
  const triggers = await getTriggers()
  const indexes = await getIndexes()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Informations de la base de données</h1>

      {/* Section des triggers */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Triggers</CardTitle>
          <CardDescription>Liste des triggers configurés dans la base de données</CardDescription>
        </CardHeader>
        <CardContent>
          {triggers.length === 0 ? (
            <p className="text-gray-500">Aucun trigger trouvé dans la base de données.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du trigger</TableHead>
                  <TableHead>Événement</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {triggers.map((trigger, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{trigger.trigger_name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50">
                        {trigger.event_manipulation}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md truncate">
                      {trigger.action_statement.substring(0, 100)}
                      {trigger.action_statement.length > 100 ? "..." : ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Section des index */}
      <Card>
        <CardHeader>
          <CardTitle>Index</CardTitle>
          <CardDescription>
            Liste des index configurés dans la base de données pour optimiser les performances
          </CardDescription>
        </CardHeader>
        <CardContent>
          {indexes.length === 0 ? (
            <p className="text-gray-500">Aucun index trouvé dans la base de données.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom de l'index</TableHead>
                  <TableHead>Table</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {indexes.map((index, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{index.indexname}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50">
                        {index.tablename}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function DatabaseInfoPageWithSuspense() {
  return (
    <Suspense
      fallback={<div className="container mx-auto py-8">Chargement des informations de la base de données...</div>}
    >
      <DatabaseInfoPage />
    </Suspense>
  )
}

