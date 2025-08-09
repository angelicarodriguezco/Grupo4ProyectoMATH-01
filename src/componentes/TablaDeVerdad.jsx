import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// FUNCIÓN PARA DETERMINAR PROPOSICIONES ACTIVAS
// Propósito: Identificar cuáles proposiciones (p, q, r) tienen texto para mostrar solo esas columnas
function obtenerProposicionesActivas(statements) {
  const activas = [];
  if (statements.p && statements.p.trim()) activas.push('p');
  if (statements.q && statements.q.trim()) activas.push('q');
  if (statements.r && statements.r.trim()) activas.push('r');
  return activas;
}

// COMPONENTE PRINCIPAL PARA MOSTRAR LA TABLA DE VERDAD
// Propósito: Visualizar las proposiciones originales, símbolos convertidos y tabla de verdad completa
function TablaDeVerdad({ statements, truthTable, evaluation }) {
  // VALIDACIÓN: No mostrar nada si no hay tabla de verdad generada
  if (!truthTable) return null

  // OBTENER PROPOSICIONES ACTIVAS: Solo mostrar columnas para proposiciones con texto
  const proposicionesActivas = obtenerProposicionesActivas(statements)

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
                {/* SÍMBOLOS CONVERTIDOS: Resultado de usar el archivo logica_simbologia.js */}
                {evaluation?.simbolosConvertidos?.p && (
                  <p className="text-xs text-blue-600 mt-1 font-mono">
                    Símbolos: {evaluation.simbolosConvertidos.p}
                  </p>
                )}
              </div>
            )}
            {statements.q && (
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <Badge variant="secondary" className="mb-2">
                  Q
                </Badge>
                <p className="text-sm text-gray-700">{statements.q}</p>
                {/* CONVERSIÓN A SÍMBOLOS: Muestra el resultado de convertirSimbolos() */}
                {evaluation?.simbolosConvertidos?.q && (
                  <p className="text-xs text-green-600 mt-1 font-mono">
                    Símbolos: {evaluation.simbolosConvertidos.q}
                  </p>
                )}
              </div>
            )}
            {statements.r && (
              <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <Badge variant="secondary" className="mb-2">
                  R
                </Badge>
                <p className="text-sm text-gray-700">{statements.r}</p>
                {/* SÍMBOLOS LÓGICOS: Resultado de la función del archivo original */}
                {evaluation?.simbolosConvertidos?.r && (
                  <p className="text-xs text-purple-600 mt-1 font-mono">
                    Símbolos: {evaluation.simbolosConvertidos.r}
                  </p>
                )}
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
          {/* DESCRIPCIÓN: Muestra cuántas filas hay (2^n combinaciones) */}
          <CardDescription>
            Todas las combinaciones posibles de valores de verdad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  {/* COLUMNA P: Solo si la proposición P tiene texto */}
                  {proposicionesActivas.includes('p') && (
                    <TableHead className="text-center font-bold bg-blue-100">P</TableHead>
                  )}
                  {/* COLUMNA Q: Solo si la proposición Q tiene texto */}
                  {proposicionesActivas.includes('q') && (
                    <TableHead className="text-center font-bold bg-green-100">Q</TableHead>
                  )}
                  {/* COLUMNA R: Solo si la proposición R tiene texto */}
                  {proposicionesActivas.includes('r') && (
                    <TableHead className="text-center font-bold bg-purple-100">R</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {truthTable.map((fila, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    {/* CELDA PARA P: Solo mostrar si P está activa */}
                    {proposicionesActivas.includes('p') && (
                      <TableCell className="text-center font-mono">
                        {/* INDICADOR VISUAL: Verde para Verdadero, Rojo para Falso */}
                        <span className={`px-2 py-1 rounded text-sm font-bold ${
                          fila.p ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {/* FORMATO V/F: Mostrar V para true, F para false */}
                          {fila.p ? 'V' : 'F'}
                        </span>
                      </TableCell>
                    )}

                    {/* CELDA PARA Q: Misma lógica que P */}
                    {proposicionesActivas.includes('q') && (
                      <TableCell className="text-center font-mono">
                        <span className={`px-2 py-1 rounded text-sm font-bold ${
                          fila.q ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {fila.q ? 'V' : 'F'}
                        </span>
                      </TableCell>
                    )}

                    {/* CELDA PARA R: Misma lógica que P y Q */}
                    {proposicionesActivas.includes('r') && (
                      <TableCell className="text-center font-mono">
                        <span className={`px-2 py-1 rounded text-sm font-bold ${
                          fila.r ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {fila.r ? 'V' : 'F'}
                        </span>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default TablaDeVerdad
