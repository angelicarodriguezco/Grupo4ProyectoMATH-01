import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

function TruthTable({ statements, truthTable }) {
  if (!truthTable) return null

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Proposiciones Ingresadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {statements.p && (
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <Badge variant="secondary" className="mb-2">
                  P
                </Badge>
                <p className="text-sm text-gray-700">{statements.p}</p>
              </div>
            )}
            {statements.q && (
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <Badge variant="secondary" className="mb-2">
                  Q
                </Badge>
                <p className="text-sm text-gray-700">{statements.q}</p>
              </div>
            )}
            {statements.r && (
              <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <Badge variant="secondary" className="mb-2">
                  R
                </Badge>
                <p className="text-sm text-gray-700">{statements.r}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Tabla de Verdad Completa
          </CardTitle>
          <CardDescription>Todas las combinaciones posibles de valores de verdad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-center font-bold bg-blue-100">P</TableHead>
                  <TableHead className="text-center font-bold bg-green-100">Q</TableHead>
                  <TableHead className="text-center font-bold bg-purple-100">R</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Aquí va la lógica para renderizar las filas de la tabla de verdad */}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default TruthTable
