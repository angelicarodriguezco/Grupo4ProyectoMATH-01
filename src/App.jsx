"use client"

import { useState } from "react"
import InputExpresion from "./componentes/InputExpresion"
import BotonEvaluar from "./componentes/BotonEvaluar"
import TablaDeVerdad from "./componentes/TablaDeVerdad"

function App() {
  const [afirmaciones, setAfirmaciones] = useState({
    p: "",
    q: "",
    r: "",
  })
  const [tablaDeVerdad, setTablaDeVerdad] = useState(null)
  const [evaluacion, setEvaluacion] = useState(null)
  const [mostrarResultados, setMostrarResultados] = useState(false)

  const cambiarAfirmaciones = (nuevasAfirmaciones) => {
    setAfirmaciones(nuevasAfirmaciones)
  }

  const evaluarCamposVacios = () => {
    const afirmacionesActivas = Object.values(afirmaciones).filter((afirm) => afirm.trim() !== "")

    if (afirmacionesActivas.length === 0) {
      alert("Por favor ingresa al menos una afirmación")
      return
    }

    const tabla = generarTablaDeVerdad(afirmaciones)
    setTablaDeVerdad(tabla)

    const resultado = evaluarExpresion(tabla, afirmaciones)
    setEvaluacion(resultado)

    setMostrarResultados(true)
  }

  const reiniciar = () => {
    setAfirmaciones({ p: "", q: "", r: "" })
    setTablaDeVerdad(null)
    setEvaluacion(null)
    setMostrarResultados(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Generador de Tablas de Verdad</h1>
          <p className="text-lg text-gray-600">Ingresa hasta tres afirmaciones y genera su tabla de verdad completa</p>
        </div>

        <InputExpresion statements={afirmaciones} onStatementsChange={cambiarAfirmaciones} />

        <BotonEvaluar onEvaluate={evaluarCamposVacios} onReset={reiniciar} showReset={mostrarResultados} />

        {mostrarResultados && (
          <>
            <TablaDeVerdad statements={afirmaciones} truthTable={tablaDeVerdad} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
