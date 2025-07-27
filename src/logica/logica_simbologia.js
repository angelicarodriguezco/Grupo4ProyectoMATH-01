/** 
* @param {string} input
* @param {Object} subjectMap
* @returns {string}
*/

const reemplazos = {
    'no': '¬',
    'y': '∧',
    'o': '∨',
    'implica': '→',
    'entonces': '→',
    'si y solo si': '↔',
    'equivale': '↔'
};

function convertirSimbolos(input, subjectMap) {
    // Reemplazar frases comunes por símbolos lógicos
    let output = input.toLowerCase();

    output = output.replace(/\bno\b/g, '¬'); // no → ¬
    output = output.replace(/\by\b/g, '∧'); // y → ∧
    output = output.replace(/\bo\b/g, '∨'); // o → ∨
    output = output.replace(/\bsi\s+(.+?)\s+entonces\b/g, '$1 →'); // si... entonces → →
    output = output.replace(/\bsi\b/g, '→'); // si → → (para casos sin "entonces")
    output = output.replace(/\bentonces\b/g, '→'); // entonces → → (para casos sin "si")

    // Reemplazar frases comunes
    Object.keys(reemplazos).forEach(key => {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        input = input.replace(regex, reemplazos[key]);
    });

    // Reemplazar sujetos por variables definidas
    Object.keys(subjectMap).forEach(subject => {
        const regex = new RegExp(`\\b${subject}\\b`, 'g');
        input = input.replace(regex, subjectMap[subject]);
    });

    return input;
}
// Ejemplo de uso
const subjectMap = {
    "ser un gigante": "G",
    "comprender matemáticas": "M"
};
const frase = "Si ser un gigante y comprender matemáticas entonces no comprender matemáticas";
console.log(convertirSimbolos(frase, subjectMap));

export { convertirSimbolos };


/* 
    Referencia:

    Implementar función/funciones para generar la tabla de verdad

    Reemplazar frases comunes por símbolos (no → ¬, y → ∧, o → ∨, si... entonces → →)

    Mapear sujetos a variables ya definidas en el frontend (ej. "ser un gigante" → G, "comprender matemáticas" → M)
    
*/