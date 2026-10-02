/**
 * Serverless Function para Google Gemini API en Vercel
 * Endpoint: POST /api/gemini
 *
 * Protege la API Key de Gemini del lado del servidor y adapta las respuestas
 * al formato estricto JSON requerido por cada juego de Luibañez:
 * - bolillero: Pregunta de examen oral + 4 opciones + respuesta correcta + explicación.
 * - bomba: Desafío 100% conceptual en 3 fases: fundamento, análisis y clave maestra de síntesis.
 * - impostor: 3 afirmaciones verdaderas del apunte + 1 afirmación impostora sutil.
 * - memotest: 6 pares de Concepto <-> Definición o Ecuación tomados del apunte.
 */

function equilibrarOpcionesArray(opcionesArray) {
    if (!Array.isArray(opcionesArray) || opcionesArray.length <= 1) return opcionesArray;

    const dangles = ['de', 'del', 'la', 'el', 'los', 'las', 'que', 'en', 'y', 'e', 'a', 'con', 'por', 'para', 'su', 'sus', 'un', 'una', 'al', 'o', 'u', 'como', 'sobre', 'sin'];
    
    function cleanDangling(str) {
        let words = str.trim().split(/\s+/).filter(Boolean);
        while (words.length > 0 && dangles.includes(words[words.length - 1].toLowerCase())) {
            words.pop();
        }
        return words.join(' ');
    }

    // 1. Limpieza inicial de paréntesis y signos finales
    let cleaned = opcionesArray.map(txt => {
        let s = String(txt || '').trim();
        s = s.replace(/\s*\([^)]*\)/g, '');
        return s.replace(/[.;:]$/, '').trim();
    });

    // 2. Conectores subordinados que suelen inflar la respuesta correcta
    const conectores = [
        ', lo que significa que', ', lo que significa', ', lo cual implica que', ', lo cual implica',
        ', es decir que', ', debido a que', ', ya que', ', garantizando que',
        ', resultando en', '; por ende', ', permitiendo que', ', permitiendo',
        ', de modo que', ', de manera que', ', estableciendo que', ', puesto que',
        ', dando lugar a', ', de forma que', ', actuando como', ', hasta alcanzar',
        ', con el objetivo de', ', a efectos de', ', en tanto que', ', mientras que'
    ];

    cleaned = cleaned.map(s => {
        for (const c of conectores) {
            const idx = s.toLowerCase().indexOf(c);
            if (idx !== -1) {
                const parte = s.slice(0, idx).trim();
                if (parte.split(/\s+/).filter(Boolean).length >= 7) {
                    s = parte;
                    break;
                }
            }
        }
        // Si aún tiene coma y supera 11 palabras, cortar en la primera coma si quedan >= 7 palabras
        if (s.split(/\s+/).filter(Boolean).length > 11 && s.includes(',')) {
            const antesComa = s.split(',')[0].trim();
            if (antesComa.split(/\s+/).filter(Boolean).length >= 7) {
                s = antesComa;
            }
        }
        return cleanDangling(s);
    });

    // 3. Recortar cualquier opción que supere 12 palabras para que no delate la respuesta
    cleaned = cleaned.map(s => {
        const words = s.split(/\s+/).filter(Boolean);
        if (words.length > 12) {
            return cleanDangling(words.slice(0, 11).join(' '));
        }
        return s;
    });

    // 4. Si algunos distractores quedaron demasiado cortos (<= 6 palabras), expandir con marco académico
    const wordCounts = cleaned.map(s => s.split(/\s+/).filter(Boolean).length);
    const maxWords = Math.max(...wordCounts);

    cleaned = cleaned.map(s => {
        const words = s.split(/\s+/).filter(Boolean);
        if (words.length < maxWords - 3 && words.length <= 6) {
            if (/^[A-ZÁÉÍÓÚÑ]/i.test(s)) {
                if (!s.toLowerCase().startsWith('se ') && !s.toLowerCase().startsWith('el ') && !s.toLowerCase().startsWith('la ') && !s.toLowerCase().startsWith('los ') && !s.toLowerCase().startsWith('las ')) {
                    s = 'Se observa ' + s.charAt(0).toLowerCase() + s.slice(1) + ' en el sistema';
                } else {
                    s = s + ' en las condiciones del sistema';
                }
            }
        }
        return s.trim();
    });

    return cleaned;
}

module.exports = async function handler(req, res) {
    // 1. Encabezados CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-gemini-key'
    );

    // Responder a preflight OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Health-check y listado de modelos en GET
    if (req.method === 'GET') {
        const apiKey = process.env.GEMINI_API_KEY;
        const hasKey = Boolean(apiKey);
        let availableModels = [];
        let listError = null;

        if (apiKey) {
            try {
                const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
                const listData = await listRes.json();
                if (listData.models) {
                    availableModels = listData.models
                        .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
                        .map(m => m.name.replace('models/', ''));
                } else {
                    listError = listData;
                }
            } catch (err) {
                listError = err.message;
            }
        }

        return res.status(200).json({
            status: 'ok',
            service: 'Luibañez Gemini API Gateway',
            hasServerKey: hasKey,
            availableModels,
            listError,
            endpoints: ['POST /api/gemini']
        });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido. Utilizá POST.' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
        const {
            materia = 'General',
            tema = 'Conceptos Generales',
            tipoJuego = 'bolillero',
            contextoPDF = '',
            dificultad = 'universitario',
            preguntasPrevias = [],
            instruccionUsuario = ''
        } = body;

        // Clave de API: prioridad a variable de entorno de Vercel, o fallback desde cabecera del cliente
        const apiKey = process.env.GEMINI_API_KEY || req.headers['x-gemini-key'] || body.apiKey;

        if (!apiKey) {
            return res.status(400).json({
                error: 'No se encontró GEMINI_API_KEY configurada en Vercel ni en los encabezados.',
                code: 'MISSING_API_KEY',
                hint: 'Configurá GEMINI_API_KEY en Vercel Environment Variables o ingresá tu clave personal en los ajustes de Luibañez.'
            });
        }

        // 2. Construir el System Prompt según las reglas del juego
        let systemPrompt = `Eres un docente universitario experto y evaluador académico riguroso para la materia "${materia}".
Tu tarea es generar desafíos pedagógicos de alta calidad en formato JSON estrictamente válido para estudiantes universitarios.

REGLAS PEDAGÓGICAS DE ORO CONTRA PATRONES PREDECIBLES:
1. EQUILIBRIO Y HOMOGENEIDAD TOTAL DE LONGITUD: En cualquier pregunta o caso de opción múltiple, TODAS las 4 opciones (tanto la correcta como los 3 distractores/falsas) DEBEN TENER CASI EXACTAMENTE LA MISMA CANTIDAD DE PALABRAS (margen máximo de ±1 a 2 palabras entre sí).
2. NUNCA hagas la respuesta correcta más larga, explicativa o detallada que las demás. Los estudiantes descubren la respuesta correcta si es la más larga.
3. Los distractores y afirmaciones falsas deben estar redactados con idéntico nivel de sofisticación académica, tecnicismo y longitud que la respuesta correcta.
4. ALEATORIEDAD DE POSICIÓN: No concentres las respuestas correctas en los primeros índices. Repartí el índice de respuestaCorrecta de forma variada e impredecible entre 0, 1, 2 y 3.`;

        let promptInstrucciones = "";

        if (tipoJuego === 'bomba') {
            const enfoqueRonda = Math.random() > 0.5 ? "aspectos metodológicos y deducciones formales" : "condiciones críticas, consecuencias y propiedades analíticas";
            promptInstrucciones = `
JUEGO: "DESACTIVÁ LA BOMBA (DESAFÍO 100% TEÓRICO EN 3 FASES)"
TEMA: "${tema}"
NIVEL: ${dificultad}
ENFOQUE INÉDITO PARA ESTA PARTIDA: Priorizá ${enfoqueRonda} del material provisto. Formulá preguntas completamente NUEVAS, frescas e inéditas.

Generá un desafío de desactivación puramente TEÓRICO y conceptual (SIN cálculos numéricos ni uso de calculadora).
El estudiante debe cortar 3 cables en secuencia respondiendo 3 preguntas teóricas encadenadas:
1. Cable 1 (Rojo - Fundamento Teórico): Pregunta sobre la definición o principio fundamental del tema. 4 opciones conceptuales (1 correcta, 3 distractores verosímiles).
2. Cable 2 (Azul - Análisis & Propiedades): Pregunta sobre una propiedad, relación de causa-efecto o consecuencia teórica directa. 4 opciones conceptuales (1 correcta, 3 distractores).
3. Cable 3 (Verde - Clave Maestra de Desactivación): Pregunta sobre la regla de oro, condición límite o síntesis conceptual que neutraliza el detonador. 4 opciones conceptuales (1 correcta, 3 distractores).

REGLA INQUEBRANTABLE DE LONGITUD DE RESPUESTAS (ANTI-PATRÓN):
- En CADA fase, las 4 opciones DEBEN TENER EXACTAMENTE LA MISMA LONGITUD (entre 9 y 12 palabras cada una).
- LA RESPUESTA CORRECTA NO DEBE SER MÁS LARGA NI MÁS DETALLADA QUE LOS DISTRACTORES. Si la correcta tiene 10 palabras, cada distractor DEBE tener exactamente 10 palabras.
- PROHIBIDO redactar respuestas correctas con oraciones subordinadas largas (ej: '...lo que implica que...', '...permitiendo de esta manera...').
- PROHIBIDO redactar distractores cortos o telegráficos. Todos los distractores deben ser oraciones académicas completas y rigurosas con idéntica sintaxis que la correcta.
- Elegí aleatoriamente la posición de "respuestaCorrecta" para cada fase (ej: fase1 en 2, fase2 en 0, fase3 en 3).

Debes responder ÚNICAMENTE un objeto JSON con esta estructura exacta:
{
  "fase1": {
    "pregunta": "¿Pregunta sobre el principio o definición fundamental de ${tema}?",
    "opciones": [
      "La energía total del sistema permanece constante durante todo el proceso analítico",
      "La energía total del sistema disminuye exponencialmente con la fricción del entorno",
      "La energía total del sistema se transforma espontáneamente en calor sin conservación",
      "La energía total del sistema fluctúa aleatoriamente sin responder a leyes físicas"
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Explicación teórica de la fase 1."
  },
  "fase2": {
    "pregunta": "¿Pregunta sobre la propiedad o relación causa-efecto de ${tema}?",
    "opciones": [
      "El incremento de la variable principal produce una respuesta proporcional en el equilibrio",
      "El incremento de la variable principal anula de forma instantánea cualquier equilibrio previo",
      "El incremento de la variable principal carece de impacto directo en las propiedades generales",
      "El incremento de la variable principal invierte espontáneamente todos los postulados teóricos conocidos"
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Explicación teórica de la fase 2."
  },
  "fase3": {
    "pregunta": "¿Pregunta clave de síntesis o condición límite teórica para desactivar el detonador?",
    "opciones": [
      "La integración metodológica unifica el modelo conceptual con la deducción rigurosa aplicable",
      "La integración metodológica descarta los axiomas fundamentales validados en las fases previas",
      "La integración metodológica demuestra la inexistencia de leyes científicas aplicables al sistema",
      "La integración metodológica opera únicamente descartando cualquier marco formal de análisis"
    ],
    "respuestaCorrecta": 0,
    "explicacion": "Explicación teórica de la fase 3."
  }
} `;
        } else if (tipoJuego === 'impostor') {
            const cantidadCasos = Math.min(10, Math.max(3, parseInt(body.cantidadCasos || body.cantidadRondas || 5, 10)));
            promptInstrucciones = `
JUEGO: "CAZA AL IMPOSTOR"
TEMA: "${tema}"
NIVEL: ${dificultad}
CANTIDAD EXACTA REQUERIDA: Generá un expediente completo de exactamente ${cantidadCasos} CASOS progresivos y distintos sobre el tema y el material provisto.
Para CADA uno de los ${cantidadCasos} casos:
- Formular 4 afirmaciones académicas: exactamente 3 VERDADERAS (rigurosas y correctas) y exactamente 1 FALSA (el IMPOSTOR, con un error conceptual sutil o contradicción teórica).
- "opciones": array con las 4 afirmaciones.
- "respuestaCorrecta": índice (0, 1, 2 o 3) de la afirmación FALSA.
- "explicacion": explicación académica clara de por qué esa opción es el impostor y cuál es la verdad conceptual.

REGLA CRÍTICA DE LONGITUD DE RESPUESTAS (ANTI-PATRÓN):
- En CADA caso, las 4 afirmaciones (las 3 verdaderas y la falsa) DEBEN TENER CASI EXACTAMENTE LA MISMA CANTIDAD DE PALABRAS (entre 10 y 15 palabras cada una).
- LA AFIRMACIÓN FALSA (EL IMPOSTOR) DEBE TENER LA MISMA EXTENSIÓN Y APARIENCIA QUE LAS 3 VERDADERAS. NUNCA la hagas más larga, ni más corta.
- El error del impostor debe ser sutil y conceptual (por ejemplo: invertir una consecuencia, cambiar un término técnico análogo, negar una condición necesaria), pero manteniendo idéntico estilo formal y longitud que las verdaderas para que sea IMPOSIBLE adivinarla solo por el largo del texto.
- Asigná la posición de "respuestaCorrecta" de manera variada e impredecible entre los casos (distribuida entre 0, 1, 2 y 3).

Debes responder ÚNICAMENTE un objeto JSON con esta estructura exacta:
{
  "casos": [
    {
      "subtema": "Subtema o Aspecto 1",
      "pregunta": "Identificá la afirmación FALSA (el impostor) sobre Subtema 1:",
      "opciones": ["Afirmación 1 de longitud balanceada", "Afirmación 2 de longitud balanceada", "Afirmación 3 de longitud balanceada", "Afirmación 4 de longitud balanceada"],
      "respuestaCorrecta": 2,
      "explicacion": "La opción X es el impostor porque..."
    }
  ]
} `;
        } else if (tipoJuego === 'memotest') {
            promptInstrucciones = `
JUEGO: "MEMOTEST CONECTADO"
TEMA: "${tema}"
NIVEL: ${dificultad}

Generá 6 pares de Concepto <-> Definición o Ecuación matemática clave para un tablero de memoria académica.
Cada "concepto" debe ser corto (1 a 4 palabras).
Cada "definicion" debe ser concisa pero precisa (máximo 80 caracteres).

Debes responder ÚNICAMENTE un objeto JSON con esta estructura exacta:
{
  "pares": [
    { "concepto": "Concepto 1", "definicion": "Definición o fórmula 1" },
    { "concepto": "Concepto 2", "definicion": "Definición o fórmula 2" },
    { "concepto": "Concepto 3", "definicion": "Definición o fórmula 3" },
    { "concepto": "Concepto 4", "definicion": "Definición o fórmula 4" },
    { "concepto": "Concepto 5", "definicion": "Definición o fórmula 5" },
    { "concepto": "Concepto 6", "definicion": "Definición o fórmula 6" }
  ]
}`;
        } else if (tipoJuego === 'temas_bolillero' || tipoJuego === 'palabras_bolillero') {
            const cantidad = Math.min(50, Math.max(3, parseInt(body.cantidadTemas || 10, 10)));
            promptInstrucciones = `
JUEGO: "EXTRACCIÓN DE CONCEPTOS Y TEMAS PARA BOLILLERO"
CANTIDAD EXACTA REQUERIDA: ${cantidad} conceptos o temas clave.
NIVEL: ${dificultad}

REGLA CRÍTICA DE COBERTURA INTEGRAL (100% DEL DOCUMENTO):
1. BARRIDO TOTAL: Es OBLIGATORIO que recorras y analices TODO el documento provisto, desde la PÁGINA 1 hasta la ÚLTIMA PÁGINA.
2. DISTRIBUCIÓN EQUITATIVA Y PROPORCIONAL: Repartí la selección de los ${cantidad} conceptos de manera uniforme a lo largo de todo el apunte:
   - Extraé conceptos representativos del INICIO del documento (introducción, axiomas y bases teóricas).
   - Extraé conceptos del MEDIO del documento (desarrollo conceptual, propiedades y modelos de análisis).
   - Extraé conceptos del FINAL del documento (conclusiones, casos especiales y aplicaciones avanzadas).
3. PROHIBICIÓN DE CONCENTRACIÓN: Queda terminantemente PROHIBIDO concentrar la selección de palabras únicamente en las primeras páginas y omitir el resto. Cada capítulo, unidad o sección del material debe estar representado en el listado.
4. FORMATO DE CADA CONCEPTO: Frase o término corto, nítido y representativo (1 a 4 palabras, por ejemplo: "Primera Ley de Newton", "Equilibrio Químico", "Árboles Binarios").

Debes responder ÚNICAMENTE un objeto JSON con esta estructura exacta:
{
  "palabras": [
    "Concepto del inicio",
    "Concepto intermedio",
    "Concepto del final"
  ]
}`;
        } else if (tipoJuego === 'laboratorio') {
            let ordenEspecifica = "";
            if (instruccionUsuario && typeof instruccionUsuario === 'string' && instruccionUsuario.trim().length > 0) {
                ordenEspecifica = `
ORDEN O PREFERENCIA EXPLÍCITA DEL ESTUDIANTE:
"${instruccionUsuario.trim()}"
DEBES PRIORIZAR Y CUMPLIR ESTA ORDEN Y GENERAR UN EJERCICIO EXACTAMENTE ENFOCADO EN LO QUE PIDE EL ESTUDIANTE (por ejemplo: si pide un ejercicio similar a un punto de la guía, o de una distribución particular, replicalo con datos numéricos realistas).`;
            }

            promptInstrucciones = `
JUEGO: "LABORATORIO DE PRÁCTICAS NUMÉRICAS Y ANÁLISIS DE CASOS"
TEMA DE ESTUDIO: "${tema}"
NIVEL ACADÉMICO: ${dificultad}
${ordenEspecifica}

Tu misión es crear un ejercicio práctico y analítico completo con datos numéricos realistas y consistentes para que el estudiante resuelva deduciendo la tabla de frecuencias o utilizando las fórmulas de probabilidad.
El ejercicio debe incluir:
1. "titulo": Título claro y contextualizado del caso.
2. "dificultad": "Inicial", "Intermedia" o "Avanzada".
3. "narrativa": Enunciado detallado con contexto real (industria, medicina, logística, telecomunicaciones, finanzas, etc.) con TODOS los datos numéricos iniciales necesarios para resolver.
4. "preguntas": Un array de exactamente 4 o 5 incisos consecutivos (letras "a", "b", "c", "d" y opcionalmente "e").
   Para CADA inciso:
   - "letra": "a", "b", "c", "d" o "e".
   - "texto": Pregunta concisa del inciso (ej: "¿Cuál es la media aritmética (x̄)?", "¿Probabilidad de que fallen a lo sumo 2 solicitudes: P(X ≤ 2)?", etc.).
   - "esperado": El valor numérico exacto de la respuesta correcta (tipo number, ej: 14.5, 0.2304, 35). NO incluyas letras ni unidades acá, solo el número.
   - "tolerancia": Margen de error aceptable para redondeo (ej: 0.1 para valores grandes, 0.01 para probabilidades).
   - "pista": Fórmula, sugerencia o paso clave para orientar si el estudiante se traba.
   - "explicacion": Justificación y resolución paso a paso del resultado.

Debes responder ÚNICAMENTE un objeto JSON con esta estructura exacta:
{
  "titulo": "Título del Caso",
  "dificultad": "Intermedia",
  "narrativa": "Enunciado del problema con todos los valores numéricos necesarios...",
  "preguntas": [
    {
      "letra": "a",
      "texto": "Pregunta del inciso a",
      "esperado": 25.5,
      "tolerancia": 0.1,
      "pista": "Fórmula clave...",
      "explicacion": "Paso a paso..."
    }
  ]
}`;
        } else {
            // Bolillero / Examen Oral / Trivia general
            const angulosPedagogicos = [
                "Aplicación práctica a un problema, caso de estudio o escenario concreto de la disciplina",
                "Condiciones de validez teórica, limitaciones y casos límite de la regla o fórmula",
                "Relación de causa y efecto directa ante la variación o perturbación de sus variables",
                "Diferenciación crítica frente a conceptos afines o errores conceptuales frecuentes en exámenes",
                "Axiomas fundamentales, postulados de partida y deducción metodológica rigurosa",
                "Impacto del concepto en el comportamiento global del sistema y conclusiones operativas"
            ];
            const prevCount = Array.isArray(preguntasPrevias) ? preguntasPrevias.length : 0;
            const anguloElegido = angulosPedagogicos[prevCount % angulosPedagogicos.length];

            let seccionPrevias = "";
            if (Array.isArray(preguntasPrevias) && preguntasPrevias.length > 0) {
                seccionPrevias = `
REGLA INQUEBRANTABLE DE NOVEDAD Y DIVERSIDAD (PROHIBIDO REPETIR O PARAFRASEAR):
El estudiante YA respondió las siguientes preguntas sobre este mismo tema ("${tema}"):
${preguntasPrevias.map((p, idx) => `   ${idx + 1}. "${p}"`).join("\n")}

CRÍTICO:
- ESTÁ TERMINANTEMENTE PROHIBIDO formular nuevamente alguna de esas preguntas o hacer preguntas sinónimas o muy similares.
- Esta nueva pregunta DEBE explorar un ángulo, propiedad, caso o problema COMPLETAMENTE NUEVO que no haya sido tocado en las preguntas anteriores.
`;
            }

            promptInstrucciones = `
JUEGO: "BOLILLERO DE EXAMEN ORAL"
TEMA: "${tema}"
NIVEL: ${dificultad}
ENFOQUE PEDAGÓGICO ESPECÍFICO PARA ESTA PREGUNTA: ${anguloElegido}.
${seccionPrevias}
Generá una pregunta de examen oral universitaria profunda, fresca y analítica sobre el tema bajo el enfoque indicado, con 4 opciones de respuesta (1 correcta y 3 distractores verosímiles pero erróneos).

REGLA ESTRICTA DE LONGITUD DE RESPUESTAS (ANTI-PATRÓN):
- Las 4 opciones (correcta y distractores) DEBEN TENER CASI LA MISMA CANTIDAD DE PALABRAS (entre 8 y 14 palabras cada una).
- La respuesta correcta NUNCA debe ser más larga ni más descriptiva que los distractores.
- La opción correcta debe ubicarse en una posición aleatoria (0, 1, 2 o 3).

Debes responder ÚNICAMENTE un objeto JSON con esta estructura exacta:
{
  "pregunta": "¿Pregunta analítica inédita sobre ${tema}?",
  "opciones": ["Opción A (misma longitud)", "Opción B (misma longitud)", "Opción C (misma longitud)", "Opción D (misma longitud)"],
  "respuestaCorrecta": 1,
  "explicacion": "Explicación académica detallada de por qué esa opción es correcta y qué error tienen las demás."
}`;
        }

        // Si se enviaron apuntes de PDF, inyectar el contexto con máxima prioridad
        let promptContextoPDF = "";
        if (contextoPDF && typeof contextoPDF === 'string' && contextoPDF.trim().length > 0) {
            let cleanText = contextoPDF.trim();
            const MAX_CONTEXT_CHARS = 120000; // ~60-80 páginas completas de lectura

            // Si el documento excede el límite máximo de contexto, aplicar muestreo estratificado
            // para que contenga inicio, medio y final de todas las páginas sin cortar solo el final
            if (cleanText.length > MAX_CONTEXT_CHARS) {
                const tercio = Math.floor(MAX_CONTEXT_CHARS / 3);
                const inicio = cleanText.slice(0, tercio);
                const medioInicio = Math.floor(cleanText.length / 2) - Math.floor(tercio / 2);
                const medio = cleanText.slice(medioInicio, medioInicio + tercio);
                const fin = cleanText.slice(cleanText.length - tercio);
                cleanText = `${inicio}\n\n[... CONTENIDO CONTINÚA A LO LARGO DEL DOCUMENTO ...]\n\n${medio}\n\n[... CONTENIDO CONTINÚA HACIA LAS ÚLTIMAS PÁGINAS ...]\n\n${fin}`;
            }

            promptContextoPDF = `
=====================================================
MATERIAL DE ESTUDIO / APUNTES PROVISTOS POR EL ESTUDIANTE:
=====================================================
${cleanText}
=====================================================
IMPORTANTE: Basá tus preguntas, fórmulas, afirmaciones, bolillas y explicaciones ESTRICTAMENTE en los conceptos, teoremas y definiciones del material de estudio provisto arriba. Respetá la notación y terminología del autor.`;
        }

        const promptFinal = `${systemPrompt}\n\n${promptContextoPDF}\n\n${promptInstrucciones}`;

        // 3. Llamar a la API de Google Gemini con rotación de modelos ante alta demanda o 503
        const candidateModels = [
            'gemini-2.5-flash-lite',
            'gemini-flash-lite-latest',
            'gemini-2.5-flash',
            'gemini-flash-latest'
        ];

        let geminiRes = null;
        let lastErrorText = "";
        let usedModel = "";

        for (const model of candidateModels) {
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            try {
                const resp = await fetch(geminiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: promptFinal }] }],
                        generationConfig: {
                            responseMimeType: "application/json",
                            temperature: tipoJuego === 'bolillero' ? 0.85 : 0.6
                        }
                    })
                });

                if (resp.ok) {
                    geminiRes = resp;
                    usedModel = model;
                    break;
                } else {
                    lastErrorText = await resp.text();
                    console.warn(`Modelo ${model} no respondió OK (${resp.status}): ${lastErrorText}`);
                }
            } catch (fetchErr) {
                lastErrorText = fetchErr.message;
            }
        }

        if (!geminiRes) {
            console.error('All Gemini candidate models failed:', lastErrorText);
            return res.status(502).json({
                error: `No se pudo obtener respuesta de Gemini en este momento.`,
                details: lastErrorText
            });
        }

        const geminiData = await geminiRes.json();

        // Extraer texto de la respuesta
        const candidate = geminiData.candidates && geminiData.candidates[0];
        const rawJsonText = candidate?.content?.parts?.[0]?.text;

        if (!rawJsonText) {
            return res.status(502).json({
                error: 'Gemini no devolvió contenido de texto en la respuesta.',
                raw: geminiData
            });
        }

        // 4. Parsear y validar el JSON generado
        let parsedData;
        try {
            parsedData = JSON.parse(rawJsonText);
        } catch (parseErr) {
            // Limpieza por si quedaron bloques markdown accidentales
            const sanitized = rawJsonText
                .replace(/^```json\s*/i, '')
                .replace(/^```\s*/i, '')
                .replace(/```$/i, '')
                .trim();
            parsedData = JSON.parse(sanitized);
        }

        // 5. Equilibrar estrictamente las opciones para evitar patrones delatadores por longitud
        if (parsedData) {
            if (parsedData.fase1 && Array.isArray(parsedData.fase1.opciones)) {
                parsedData.fase1.opciones = equilibrarOpcionesArray(parsedData.fase1.opciones);
            }
            if (parsedData.fase2 && Array.isArray(parsedData.fase2.opciones)) {
                parsedData.fase2.opciones = equilibrarOpcionesArray(parsedData.fase2.opciones);
            }
            if (parsedData.fase3 && Array.isArray(parsedData.fase3.opciones)) {
                parsedData.fase3.opciones = equilibrarOpcionesArray(parsedData.fase3.opciones);
            }
            if (Array.isArray(parsedData.casos)) {
                parsedData.casos.forEach(c => {
                    if (Array.isArray(c.opciones)) {
                        c.opciones = equilibrarOpcionesArray(c.opciones);
                    }
                });
            }
            if (Array.isArray(parsedData.opciones)) {
                parsedData.opciones = equilibrarOpcionesArray(parsedData.opciones);
            }
        }

        // Agregar metadatos de respuesta
        return res.status(200).json({
            ok: true,
            tipoJuego,
            materia,
            tema,
            tienePDF: Boolean(contextoPDF && contextoPDF.length > 0),
            data: parsedData
        });

    } catch (error) {
        console.error('Unhandled serverless error:', error);
        return res.status(500).json({
            error: 'Error interno en la función serverless de Gemini.',
            message: error.message
        });
    }
};
