"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

  function InputExpresion({ statements, onStatementsChange }) {
    const handleCambioInput = (proposition, value) => {
      const newStatements = {
        ...statements,
        [proposition]: value,
      }
      onStatementsChange(newStatements)
    }

  return (
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
              onChange={(e) => handleCambioInput("p", e.target.value)}
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
              onChange={(e) => handleCambioInput("q", e.target.value)}
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
              onChange={(e) => handleCambioInput("r", e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default InputExpresion
