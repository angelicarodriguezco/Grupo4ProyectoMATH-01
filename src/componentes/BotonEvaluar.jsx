"use client"

import { Button } from "@/components/ui/button"

function BotonEvaluar({ onEvaluate, onReset, showReset }) {
  return (
    <div className="flex gap-3 justify-center pt-4">
      <Button onClick={onEvaluate} size="lg" className="bg-blue-600 hover:bg-blue-700">
        Evaluar Expresiones
      </Button>

      {showReset && (
        <Button onClick={onReset} variant="outline" size="lg">
          Limpiar
        </Button>
      )}
    </div>
  )
}

export default BotonEvaluar
