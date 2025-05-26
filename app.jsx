"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function App() {
  const [statements, setStatements] = useState({
    p: "",
    q: "",
    r: "",
  })

  const handleStatementChange = (proposition, value) => {
    setStatements((prev) => ({
      ...prev,
      [proposition]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Generador de Tablas de Verdad</h1>
          <p className="text-lg text-gray-600">Ingresa hasta tres afirmaciones y genera su tabla de verdad completa</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Afirmaciones Lógicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="statement-p" className="text-sm font-medium">
                  Proposición P
                </Label>
                <Input
                  id="statement-p"
                  placeholder="Ej: Hoy llueve"
                  value={statements.p}
                  onChange={(e) => handleStatementChange("p", e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="statement-q" className="text-sm font-medium">
                  Proposición Q
                </Label>
                <Input
                  id="statement-q"
                  placeholder="Ej: Voy al parque"
                  value={statements.q}
                  onChange={(e) => handleStatementChange("q", e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="statement-r" className="text-sm font-medium">
                  Proposición R
                </Label>
                <Input
                  id="statement-r"
                  placeholder="Ej: Llevo paraguas"
                  value={statements.r}
                  onChange={(e) => handleStatementChange("r", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-center pt-4">
              <Button onClick={generateTruthTable} size="lg" className="bg-blue-600 hover:bg-blue-700">
                Evaluar Expresiones
              </Button>

              {showTable && (
                <Button onClick={resetTable} variant="outline" size="lg">
                  Limpiar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {showTable && (
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
        )}

        {showTable && truthTable && (
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
                    {truthTable.map((row, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="text-center bg-blue-50">
                          <Badge variant={row.p ? "default" : "secondary"}>{row.p ? "V" : "F"}</Badge>
                        </TableCell>
                        <TableCell className="text-center bg-green-50">
                          <Badge variant={row.q ? "default" : "secondary"}>{row.q ? "V" : "F"}</Badge>
                        </TableCell>
                        <TableCell className="text-center bg-purple-50">
                          <Badge variant={row.r ? "default" : "secondary"}>{row.r ? "V" : "F"}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
