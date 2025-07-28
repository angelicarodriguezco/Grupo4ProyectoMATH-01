"use client"

import { useState } from "react"
import InputExpresion from "./componentes/InputExpresion"
import BotonEvaluar from "./componentes/BotonEvaluar"
import TablaDeVerdad from "./componentes/TablaDeVerdad"
// IMPORTACIÓN DEL ARCHIVO ORIGINAL: Usamos la función convertirSimbolos tal como está
import { convertirSimbolos } from "./logica/logica_simbologia"

function App() {
  // ESTADOS DEL COMPONENTE: Manejo del estado de la aplicación
  const [afirmaciones, setAfirmaciones] = useState({
    p: "",  // Proposición P
    q: "",  // Proposición Q  
    r: "",  // Proposición R
  })
  const [tablaDeVerdad, setTablaDeVerdad] = useState(null)  // Almacena la tabla generada
  const [evaluacion, setEvaluacion] = useState(null)        // Almacena los símbolos convertidos
  const [mostrarResultados, setMostrarResultados] = useState(false)  // Controla si mostrar resultados

  // FUNCIÓN PARA GENERAR TABLA DE VERDAD
  // Propósito: Crear todas las combinaciones posibles de valores de verdad (V/F)
  // para las proposiciones que tienen texto
  const generarTablaDeVerdad = (afirmaciones) => {
    const proposiciones = [];
    
    // Identificar qué proposiciones están activas (tienen texto)
    if (afirmaciones.p && afirmaciones.p.trim()) proposiciones.push('p');
    if (afirmaciones.q && afirmaciones.q.trim()) proposiciones.push('q');
    if (afirmaciones.r && afirmaciones.r.trim()) proposiciones.push('r');

    const numProposiciones = proposiciones.length;
    const numFilas = Math.pow(2, numProposiciones);  // 2^n combinaciones
    const tabla = [];

    // Generar todas las combinaciones usando operaciones binarias
    for (let i = 0; i < numFilas; i++) {
      const fila = {};
      
      for (let j = 0; j < numProposiciones; j++) {
        const prop = proposiciones[j];
        // Usar bit shifting para generar patrones V/F: 
        // i=0: FFF, i=1: FFV, i=2: FVF, etc.
        fila[prop] = Boolean((i >> (numProposiciones - 1 - j)) & 1);
      }
      
      tabla.push(fila);
    }

    return tabla;
  };

  // FUNCIÓN PARA EVALUAR Y CONVERTIR SÍMBOLOS
  // Propósito: Usar la función del archivo original para convertir texto a símbolos lógicos
  const evaluarExpresion = (tabla, afirmaciones) => {
    const resultado = {
      tabla: tabla,                    // La tabla de verdad generada
      proposiciones: afirmaciones,     // Las proposiciones originales
      valida: true,                    // Indicador de validez
      simbolosConvertidos: {}          // Aquí se guardan las conversiones
    };

    // MAPEO DE SUJETOS: Usar el mismo subjectMap del ejemplo del archivo original
    // Esto permite convertir frases completas a variables lógicas
    const subjectMap = {
      "ser un gigante": "G",
      "comprender matemáticas": "M"
    };
    
    // CONVERSIÓN A SÍMBOLOS: Para cada proposición con texto,
    // usar la función del archivo original para convertir a símbolos lógicos
    Object.keys(afirmaciones).forEach(key => {
      if (afirmaciones[key] && afirmaciones[key].trim()) {
        // AQUÍ SE USA EL ARCHIVO ORIGINAL: convertirSimbolos del archivo logica_simbologia.js
        resultado.simbolosConvertidos[key] = convertirSimbolos(afirmaciones[key], subjectMap);
      }
    });

    return resultado;
  };

  // MANEJADORES DE EVENTOS: Funciones para interactuar con la UI

  const cambiarAfirmaciones = (nuevasAfirmaciones) => {
    setAfirmaciones(nuevasAfirmaciones)
  }

  // Función para detectar oraciones condicionales “si … entonces …”
  
  // Lista de patrones para distintos tipos de condicionales
const patronesCondicionales = [
  /\bsi\b.*\bentonces\b/i,            // si ... entonces
  /\bsi\s+y\s+solo\s+si\b/i,          // si y solo si
  /\bsi\s+y\s+sólo\s+si\b/i,          // si y sólo si (con tilde)
  /\bsolo\s+si\b/i,                   // solo si
  /\ba\s+menos\s+que\b/i,             // a menos que (unless)
  /\ben\s+caso\s+de\s+que\b/i,        // en caso de que
  /\bimplica\b/i,                     // implica / implica que
  /->|=>|→|↔/                         // flechas lógicas
]

const esCondicional = (texto) =>
  patronesCondicionales.some((regex) => regex.test(texto))


  const evaluarCamposVacios = () => {
    const afirmacionesActivas = Object.values(afirmaciones).filter((afirm) => afirm.trim() !== "")

    if (afirmacionesActivas.length === 0) {
      alert("Por favor ingresa al menos una afirmación")
      return
    }

    // ELIMINAMOS LA RESTRICCIÓN DE CONDICIONALES OBLIGATORIAS
    // Ahora el programa funciona con cualquier tipo de proposición lógica
    const textoCompleto = `${afirmaciones.p} ${afirmaciones.q} ${afirmaciones.r}`;
    
    // Opcional: Mostrar información sobre si se detectaron condicionales
    const tieneCondicionales = esCondicional(textoCompleto);
    if (tieneCondicionales) {
      console.log("Se detectaron oraciones condicionales en las proposiciones");
    } else {
      console.log("No se detectaron condicionales - procesando como proposiciones simples");
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
          <p className="text-lg text-gray-600">Ingresa hasta tres proposiciones lógicas (simples, condicionales, o con conectores) y genera su tabla de verdad completa</p>
        </div>

        <InputExpresion statements={afirmaciones} onStatementsChange={cambiarAfirmaciones} />

        <BotonEvaluar onEvaluate={evaluarCamposVacios} onReset={reiniciar} showReset={mostrarResultados} />

        {mostrarResultados && (
          <>
            <TablaDeVerdad 
              statements={afirmaciones}      // Proposiciones originales
              truthTable={tablaDeVerdad}     // Tabla de verdad generada
              evaluation={evaluacion}        // Símbolos convertidos usando archivo original
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App
