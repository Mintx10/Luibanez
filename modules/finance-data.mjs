export const MATERIAS_FINANZAS = {
    filosofia: {
        id: "filosofia",
        nombre: "Filosofía y Ética",
        catedra: "Cátedra Filosofía y Ética - UADE",
        titular: "Profesor de Cátedra (Criterio: Carpio, Platón, Aristóteles, Presocráticos)",
        color: "#f59e0b",
        criterioDocente: `CRITERIO DE EVALUACIÓN DE CÁTEDRA:
- Rigor conceptual y fidelidad a las fuentes primarias (Carpio, Platón, Aristóteles, Presocráticos).
- Exigencia estricta en ortografía, tildes diacríticas, coherencia sintáctica y cohesión textual discursiva.
- En citas y fragmentos: detección precisa del autor y desarrollo exhaustivo de los conceptos ontológicos y gnoseológicos involucrados.
- En análisis de casos (ej: 'la mesa blanca'): distinguir estrictamente entre sustancia primera, sustancia segunda y accidente de cualidad.
- Escala oficial UADE: Menos de 60 pts = Desaprobado (1 a 3); 60-64 = 4; 65-69 = 5; 70-74 = 6; 75-84 = 7; 85-89 = 8; 90-94 = 9; 95-100 = 10.`,
        conceptosClave: ["Sócrates", "Mayéutica", "Areté", "Cuidado del alma", "Platón", "Alegoría de la Caverna", "Mundo Sensible", "Mundo Inteligible", "Doxa", "Episteme", "Línea Dividida", "Aristóteles", "Hilemorfismo", "Materia y Forma", "Acto y Potencia", "Sustancia", "Accidente", "Protágoras", "Relativismo", "Gorgias", "Heráclito", "Logos", "Discordia de los opuestos"],
        temarioPorModo: {
            "1er_parcial": {
                nombre: "1er Parcial",
                unidades: "Unidades 1, 2 y 3 (Filosofía Clásica y Antigua)",
                conceptos: ["Sócrates (Mayéutica, ironía, areté, cuidado del alma, Apología y Critón)", "Platón (Alegoría de la Caverna, Línea Dividida, Reminiscencia, Mundo Sensible vs Inteligible, Doxa vs Episteme, Mito del Carro Alado y República)", "Aristóteles (Metafísica del Ser, Sustancia Primera y Segunda, Accidente, Hilemorfismo, Acto y Potencia, Cuatro Causas, Ética a Nicómaco: Término Medio y Eudaimonía)", "Presocráticos (Heráclito: Devenir, Logos, Fuego Cósmico; Parménides: Vía de la Verdad y Ser inmutable; Milesios: Arjé)", "Sofistas (Protágoras: Homo mensura y relativismo; Gorgias: Tesis escépticas y retórica; Nomos vs Physis)"]
            },
            "2do_parcial": {
                nombre: "2do Parcial",
                unidades: "Unidades 4 y 5 (Filosofía Moderna, Gnoseología y Ética)",
                conceptos: ["René Descartes (Racionalismo moderno, duda metódica en 3 niveles: sentidos, sueño y genio maligno, Cogito ergo sum como primera certeza, Res Cogitans, Res Infinita y Res Extensa, ideas innatas)", "David Hume (Empirismo radical, distinción entre impresiones e ideas, crítica destructiva a la idea de causalidad y conexión necesaria, hábito, creencia y costumbre psicológica)", "Immanuel Kant (Idealismo Trascendental, giro copernicano, juicios analíticos, sintéticos a posteriori y sintéticos a priori, espacio y tiempo como formas puras a priori de la sensibilidad sensible)", "Ética Deontológica de Kant (La buena voluntad como bien en sí mismo, actuar por deber vs conforme al deber, las dos fórmulas del Imperativo Categórico: ley universal y el ser humano como fin en sí mismo)", "Utilitarismo (Jeremy Bentham y John Stuart Mill, principio de mayor utilidad o felicidad para el mayor número, cálculo hedonista de placeres cualitativos vs deontología)", "Ética Aplicada a las Finanzas (Dilemas morales contemporáneos, deber fiduciario, transparencia vs asimetría de información, responsabilidad moral en el asesoramiento financiero)"]
            },
            "final": {
                nombre: "Examen Final Integral",
                unidades: "Programa Completo Integrador (Antigua, Moderna y Ética Aplicada)",
                conceptos: ["Contraste ontológico: Platón (dualismo de dos mundos) vs Aristóteles (inmanencia de la sustancia)", "Problema del conocimiento: Racionalismo cartesiano vs Empirismo de Hume vs Síntesis kantiana", "Evolución moral: Ética de las virtudes y el término medio (Aristóteles) vs Deontología del imperativo categórico (Kant) vs Utilitarismo (Mill)", "Responsabilidad ética y transparencia en el ejercicio profesional de las finanzas y la economía"]
            }
        },
        examenes: {
            "1er_parcial": {
                tituloModalidad: "1er Examen Parcial - Filosofía y Ética",
                modelos: [
                    {
                        id: "filo_p1_m1",
                        nombre: "Modelo 1 (Oficial Cátedra)",
                        badge: "Examen Real",
                        titulo: "1er Parcial · Modelo 1 (Cátedra UADE)",
                        subtitulo: "Unidades 1, 2 y 3 (Presocráticos, Sofistas, Sócrates, Platón y Aristóteles)",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 25,
                                pregunta: `Identifique al filósofo referido en el siguiente fragmento y explique exhaustivamente los conceptos principales que contiene:

"No hago otra cosa que ir de un lado al otro persuadiéndolos a ustedes, sean jóvenes o ancianos, de no preocuparse por sus cuerpos ni por sus fortunas sin antes atender intensamente a su alma, de modo que llegue a ser perfecta; diciéndoles que no es de la fortuna la que nace la perfección, sino de la perfección que nace la fortuna y todos los demás bienes para los hombres".

• Identifique al autor y la obra de referencia.
• Desarrolle el concepto de cuidado del alma (psiché), virtud (areté) y la inversión de los valores tradicionales atenienses.
• Explique la relación de este fragmento con el método de indagación e interpelación (ironía y mayéutica).`,
                                placeholder: "Identifique al filósofo y desarrolle aquí su respuesta con adecuada coherencia, cohesión y ortografía..."
                            },
                            {
                                numero: 2,
                                puntos: 25,
                                pregunta: `Lea atentamente el siguiente fragmento de República (Libro VII) en que Platón expone la Alegoría de la Caverna:

"Si no me engaño, [el prisionero] necesitará acostumbrarse para ver los objetos de la región superior. Lo que más fácilmente distinguirá serán las sombras, luego las imágenes de los hombres y de los demás objetos que se reflejan en las aguas y, por último, los objetos mismos; después, elevando su mirada hacia la luz de los astros y de la luna, contemplará durante la noche las constelaciones y el firmamento más fácilmente que durante el día el sol y el resplandor del sol".

• Relacione este fragmento con los grados del ser y del conocer expuestos en la Alegoría de la Línea Dividida.
• Identifique qué elementos del pasaje corresponden al Mundo Sensible (opinión / doxa: eikasía y pístis) y cuáles al Mundo Inteligible (ciencia / episteme: diánoia y nóesis).
• Explique cuál es el problema gnoseológico y ontológico central que Platón plantea con la liberación del prisionero.`,
                                placeholder: "Desarrolle la correspondencia ontológica y gnoseológica de cada elemento del fragmento..."
                            },
                            {
                                numero: 3,
                                puntos: 20,
                                pregunta: `Aristóteles y la Metafísica del Lenguaje:
En un debate filosófico sobre la expresión cotidiana "la mesa blanca", uno de los interlocutores afirma que el término "blanca" constituye una sustancia.

• ¿Es correcta o incorrecta dicha afirmación según la teoría de las categorías y la metafísica aristotélica? Justifique rigurosamente.
• Explique la distinción ontológica fundamental entre Sustancia Primera (ousía), Sustancia Segunda y Accidente.
• Relacione esta distinción con la Teoría Hilemórfica (materia y forma) y la explicación del cambio dinámico (pasaje del acto a la potencia).`,
                                placeholder: "Justifique por qué 'blanca' no es una sustancia e integre los conceptos de accidente, hilemorfismo y acto/potencia..."
                            },
                            {
                                numero: 4,
                                puntos: 15,
                                pregunta: `Sofistas vs. Filosofía Socrático-Platónica:
Analice la célebre tesis de Protágoras: "El hombre es la medida de todas las cosas, de las que son en tanto que son, y de las que no son en tanto que no son".

• Explique qué concepción de la verdad, del conocimiento y de la retórica se desprende de esta posición relativista y gnoseológica.
• Confronte esta postura con la búsqueda socrática y platónica de definiciones universales, objetivas y esencias inmutables.
• Aplique brevemente esta contraposición a un debate contemporáneo sobre posverdad, desinformación o fake news.`,
                                placeholder: "Analice el homo mensura de Protágoras y confróntelo con la concepción socrático-platónica de la verdad..."
                            },
                            {
                                numero: 5,
                                puntos: 15,
                                pregunta: `Presocráticos - Heráclito de Éfeso:
El filósofo "censura al poeta que dice «que cese la discordia tanto entre dioses como entre hombres»; pues entonces no habría armonía, si no existieran lo agudo y lo grave; ni habría animales si no existieran hembra y macho, que son contrarios".

• ¿A qué filósofo presocrático alude esta frase y qué ideas centrales de su ontología y física revela este pasaje?
• Explique los conceptos de Devenir, Polemos (discordia/guerra como padre de todas las cosas), y el Logos como ley cósmica que rige la unidad de los opuestos.`,
                                placeholder: "Identifique a Heráclito y desarrolle los conceptos de polemos, devenir, logos y contrarios..."
                            }
                        ]
                    },
                    {
                        id: "filo_p1_m2",
                        nombre: "Modelo 2 (Variante Ética y Causas)",
                        badge: "Variante B",
                        titulo: "1er Parcial · Modelo 2 (Ética, Metafísica y Sofística)",
                        subtitulo: "Variante oficial complementaria: Aristóteles (Ética y Causas), Fedro y Parménides",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 25,
                                pregunta: `Aristóteles - Ética a Nicómaco y la Virtud Moral:
Analice la siguiente definición aristotélica: "La virtud es una disposición voluntaria adquirida, que consiste en un término medio relativo a nosotros, definido por la razón y de conformidad con la conducta de un hombre prudente".

• Explique la doctrina del Término Medio (mesótes) como cúspide entre dos extremos viciosos (exceso y defecto). Ejemplifique con el valor o la generosidad.
• Distinga entre virtudes éticas (del carácter y la costumbre) y virtudes dianoéticas (de la razón práctica y teórica, como la phrónesis y la sophía).
• ¿Por qué para Aristóteles la felicidad suprema (eudaimonía) no puede reducirse al placer sensual ni a la riqueza material?`,
                                placeholder: "Desarrolle la doctrina del justo medio, virtudes éticas y dianoéticas, y la eudaimonía..."
                            },
                            {
                                numero: 2,
                                puntos: 25,
                                pregunta: `Platón - El Mito del Carro Alado (Fedro) y el Alma Tripartita:
En el Fedro, Platón describe al alma humana como una cuadriga guiada por un auriga y dos corceles, uno blanco y dócil y otro negro y rebelde.

• Identifique qué representa cada uno de estos tres elementos en la psicología platónica (alma racional, irascible y concupiscible).
• Relacione esta estructura psíquica con la organización política ideal de la República (gobernantes filósofos, guerreros guardianes y productores artesanos).
• Explique qué es la Justicia para Platón tanto a nivel individual como en la polis.`,
                                placeholder: "Explique la alegoría de la cuadriga, las tres partes del alma y la justicia como armonía..."
                            },
                            {
                                numero: 3,
                                puntos: 20,
                                pregunta: `Las Cuatro Causas de Aristóteles:
Para explicar plenamente cualquier ente o proceso natural, Aristóteles formula la teoría de las cuatro causas:
• Defina y ejemplifique en una estatua de bronce y en un ser vivo: Causa Material, Causa Formal, Causa Eficiente (o Motriz) y Causa Final (Telos).
• ¿Por qué sostiene Aristóteles que la Causa Final es la causa rectora y principal de la naturaleza (teleología)?`,
                                placeholder: "Defina las 4 causas con ejemplos claros y justifique la primacía del Telos..."
                            },
                            {
                                numero: 4,
                                puntos: 15,
                                pregunta: `Gorgias de Leontinos y la Retórica:
En su Encomio de Helena y en Sobre el No-Ser, Gorgias postula tres tesis escépticas radicales: 1) Nada existe; 2) Si algo existiera, sería incognoscible; 3) Si fuera cognoscible, sería incomunicable.
• Explique el significado de estas tres afirmaciones.
• Analice por qué Gorgias concebía a la palabra y a la retórica como "un gran tirano que con un cuerpo pequeñísimo obra prodigios". Confronte con la mayéutica.`,
                                placeholder: "Analice las tres tesis de Gorgias y el poder seductor de la palabra frente al método socrático..."
                            },
                            {
                                numero: 5,
                                puntos: 15,
                                pregunta: `Parménides de Elea vs. Heráclito:
En su Poema en verso, la diosa revela a Parménides la Vía de la Verdad: "El Ser es y es imposible que no sea; el No-Ser no es y no puede ser pensado ni expresado".
• Detalle los cuatro atributos lógicos y ontológicos del Ser parmenídeo (inmóvil, eterno, indivisible y continuo).
• Confronte radicalmente esta visión estática del ser con la física del cambio perpetuo y la discordia de Heráclito.`,
                                placeholder: "Exponga la vía de la verdad parmenídea y confróntela con el devenir heraclíteo..."
                            }
                        ]
                    },
                    {
                        id: "filo_p1_m3",
                        nombre: "Modelo 3 (Simulacro Integral)",
                        badge: "Simulacro",
                        titulo: "1er Parcial · Modelo 3 (Simulacro de Cátedra)",
                        subtitulo: "Variante C: Sócrates (Critón), Banquete de Platón, Hilemorfismo y Presocráticos",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 25,
                                pregunta: `Sócrates en el diálogo "Critón": Obediencia a las Leyes de la Polis:
Cuando Critón le ofrece sobornar a los carceleros para huir de Atenas y salvar su vida, Sócrates se niega tajantemente personificando a las Leyes de Atenas.
• ¿Cuáles son los argumentos filosóficos y morales con los que Sócrates rechaza la fuga?
• Desarrolle el principio socrático de que "es mejor sufrir una injusticia antes que cometerla" y la noción de pacto tácito con la ciudad.`,
                                placeholder: "Analice la personificación de las leyes en el Critón y el imperativo socrático de no devolver mal por mal..."
                            },
                            {
                                numero: 2,
                                puntos: 25,
                                pregunta: `Platón - El Banquete y la Dialéctica del Amor (Eros):
A través del discurso de Diotima de Mantinea, Sócrates explica la naturaleza de Eros y el ascenso dialéctico hacia la Belleza en sí.
• ¿Por qué Eros es presentado como un dáimon (intermediario entre dioses y mortales, hijo de Poros y Penía)?
• Describa los peldaños del ascenso amoroso: desde la belleza de un cuerpo físico hasta la Idea suprema de la Belleza en sí misma.`,
                                placeholder: "Desarrolle el mito del nacimiento de Eros y la escala dialéctica del amor hacia la Idea suprema..."
                            },
                            {
                                numero: 3,
                                puntos: 20,
                                pregunta: `Aristóteles - El Primer Motor Inmóvil:
En el libro Lambda de la Metafísica, Aristóteles deduce la necesidad de un principio primero para explicar el movimiento continuo del cosmos.
• ¿Por qué el Motor Inmóvil debe ser Acto Puro (sin nada de potencia) y carente de materia?
• ¿De qué manera mueve al universo si él mismo no se mueve ni ejerce fuerza física (causa final / como el objeto amado mueve al amante)?`,
                                placeholder: "Explique la deducción del Acto Puro, su naturaleza de pensamiento del pensamiento y cómo mueve como causa final..."
                            },
                            {
                                numero: 4,
                                puntos: 15,
                                pregunta: `Los Sofistas y la distinción Nomos vs. Physis:
Los sofistas fueron los primeros en contraponer lo que existe por naturaleza (physis) y lo que existe por convención humana o ley positiva (nomos).
• Explique cómo fundamentaban que las normas morales y las leyes políticas son relativas y artificiales.
• ¿Cómo respondieron Sócrates y Platón a este desafío relativista?`,
                                placeholder: "Desarrolle la antítesis entre physis y nomos y la respuesta platónica..."
                            },
                            {
                                numero: 5,
                                puntos: 15,
                                pregunta: `Anaximandro y el Ápeiron:
"De donde las cosas tienen su origen, hacia allí tienen también su perecer, según la necesidad; pues se pagan mutua pena y retribución por su injusticia, según la disposición del tiempo".
• Explique por qué Anaximandro propone como arché al Ápeiron (lo indeterminado/ilimitado) en lugar de un elemento sensible como el agua de Tales.
• ¿Qué significa la 'injusticia' cósmica que se retribuyen los elementos contrarios?`,
                                placeholder: "Analice el fragmento de Anaximandro, el concepto de Ápeiron y el ciclo cósmico de compensación..."
                            }
                        ]
                    }
                ]
            },
            "2do_parcial": {
                tituloModalidad: "2do Examen Parcial - Filosofía y Ética",
                modelos: [
                    {
                        id: "filo_p2_m1",
                        nombre: "Modelo 1 (Descartes, Hume y Kant)",
                        badge: "Oficial",
                        titulo: "2do Parcial · Modelo 1 (Modernidad y Crítica)",
                        subtitulo: "Unidades 4 y 5: Racionalismo, Empirismo, Idealismo Trascendental y Ética Kantiana",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 25,
                                pregunta: "Descartes y la Duda Metódica: Analice los tres niveles de la duda (sensorial, vigilia/sueño y genio maligno). Explique por qué el 'Cogito, ergo sum' es la primera verdad inconmovible y deduzca las tres sustancias (res cogitans, res infinita y res extensa).",
                                placeholder: "Desarrolle el método cartesiano de la duda y el cogito..."
                            },
                            {
                                numero: 2,
                                puntos: 25,
                                pregunta: "David Hume y la Crítica a la Causalidad: Distinga entre impresiones e ideas. Explique por qué para Hume la idea de conexión necesaria no es un principio ontológico de la realidad sino una creencia psicológica nacida del hábito y la costumbre.",
                                placeholder: "Desarrolle la gnoseología humeana y la disolución empírica de la causalidad necesaria..."
                            },
                            {
                                numero: 3,
                                puntos: 25,
                                pregunta: "Immanuel Kant y los Juicios Sintéticos a Priori: Explique el Giro Copernicano kantiano. Defina juicios analíticos, sintéticos a posteriori y sintéticos a priori, y explique cómo el espacio y el tiempo son formas puras de la intuición sensible.",
                                placeholder: "Desarrolle la revolución copernicana de Kant y la fundamentación del conocimiento científico..."
                            },
                            {
                                numero: 4,
                                puntos: 25,
                                pregunta: "Ética Deontológica vs. Utilitarismo: Exponga la ética del deber de Kant, la buena voluntad y las dos formulaciones del Imperativo Categórico. Confróntela con el utilitarismo de John Stuart Mill y aplique a un dilema financiero contemporáneo.",
                                placeholder: "Confronte el imperativo categórico kantiano con el principio utilitarista de la mayor felicidad..."
                            }
                        ]
                    }
                ]
            },
            "final": {
                tituloModalidad: "Examen Final Integral - Filosofía y Ética",
                modelos: [
                    {
                        id: "filo_final_m1",
                        nombre: "Modelo 1 (Programa Completo Integrador)",
                        badge: "Final",
                        titulo: "Examen Final · Modelo 1 (Antigua, Moderna y Ética Aplicada)",
                        subtitulo: "Integración gnoseológica y moral desde los clásicos griegos hasta la modernidad",
                        duracion: "150 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 25,
                                pregunta: "Confronte la concepción ontológica de las Ideas en Platón (trascendencia y dos mundos) con la concepción aristotélica de la Sustancia Primera e Inmanencia formal.",
                                placeholder: "Desarrolle la confrontación ontológica entre Platón y Aristóteles..."
                            },
                            {
                                numero: 2,
                                puntos: 25,
                                pregunta: "El problema del origen del conocimiento: Compare detalladamente las respuestas del Racionalismo Cartesiano (ideas innatas), Empirismo de Hume (tabla rasa e impresiones) y el Idealismo Trascendental de Kant (síntesis a priori).",
                                placeholder: "Compare las posiciones gnoseológicas de Descartes, Hume y Kant..."
                            },
                            {
                                numero: 3,
                                puntos: 25,
                                pregunta: "Analice el paso de la Ética de las Virtudes (Aristóteles y la eudaimonía como término medio) a la Ética del Deber (Kant y el imperativo categórico).",
                                placeholder: "Desarrolle el tránsito de la virtud como hábito prudencial al deber por respeto a la ley moral..."
                            },
                            {
                                numero: 4,
                                puntos: 25,
                                pregunta: "Ética, Finanzas y Responsabilidad Social: Justifique desde la filosofía moral si un asesor financiero debe guiarse por la maximización del beneficio inmediato del cliente o por un código ético universal de transparencia y bienestar sistémico.",
                                placeholder: "Articule principios deontológicos y teleológicos aplicados a la intermediación financiera..."
                            }
                        ]
                    }
                ]
            }
        },
        conceptosJuegos: [
            {
                id: "filo_c1",
                nombre: "Sócrates y la Mayéutica",
                guia: "Método socrático de diálogo que busca dar a luz la verdad interior mediante preguntas, ironía y examen del alma.",
                preguntaBomba: "¿Cuál es el propósito central del método mayéutico practicado por Sócrates?",
                cables: [
                    { color: "azul", texto: "Ayudar al interlocutor a parir las verdades universales latentes en su propia alma", correcta: true },
                    { color: "rojo", texto: "Inculcar dogmáticamente doctrinas morales fijadas por las leyes de la polis", correcta: false },
                    { color: "verde", texto: "Cobrar honorarios por enseñar técnicas de persuasión política y retórica", correcta: false },
                    { color: "amarillo", texto: "Demostrar que no existe ninguna verdad y que todo es relativo a la cultura", correcta: false }
                ],
                impostorAfirmaciones: [
                    "Sócrates afirmaba que una vida sin examen no merece la pena ser vivida.",
                    "El método socrático comienza con la ironía reconociendo la propia ignorancia.",
                    "Sócrates cobraba elevadas sumas a los jóvenes atenienses por enseñarles retórica sofisticada.",
                    "Para Sócrates, la virtud es conocimiento: nadie obra mal voluntariamente sino por ignorancia."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Mayéutica Socrática", definicion: "Arte dialéctico de dialogar para que el interlocutor dé a luz la verdad de su alma." }
            },
            {
                id: "filo_c2",
                nombre: "Platón y la Alegoría de la Caverna",
                guia: "Representación de la condición humana encadenada al mundo sensible y su ascenso hacia el mundo inteligible del Sol/Bien.",
                preguntaBomba: "En la alegoría de la caverna, ¿qué representan los objetos reflejados en el exterior y el Sol?",
                cables: [
                    { color: "azul", texto: "Las Ideas o Formas inteligibles y la Idea suprema del Bien absoluto", correcta: true },
                    { color: "rojo", texto: "Las sombras pasajeras proyectadas por el fuego de las apariencias sensibles", correcta: false },
                    { color: "verde", texto: "Las leyes escritas por los tiranos para gobernar las ciudades", correcta: false },
                    { color: "amarillo", texto: "El mundo de la conjetura, la imaginación y la creencia vulgar", correcta: false }
                ],
                impostorAfirmaciones: [
                    "Los prisioneros encadenados en el fondo representan al ser humano común atrapado en la doxa.",
                    "La liberación del prisionero simboliza el arduo camino educativo de la dialéctica filosófica.",
                    "Para Platón, las cosas materiales y sensibles poseen mayor grado de realidad que las Ideas inmateriales.",
                    "El Sol exterior es el principio que otorga inteligibilidad, verdad y existencia a todas las esencias."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Mundo Inteligible", definicion: "Reino eterno e inmutable de las Ideas platónicas, accesible sólo por la nóesis." }
            },
            {
                id: "filo_c3",
                nombre: "Aristóteles: Sustancia y Accidente",
                guia: "La sustancia primera es el individuo concreto existente; el accidente es aquello que inhiere en la sustancia y no existe por sí mismo.",
                preguntaBomba: "En la frase 'la mesa de roble es blanca', ¿cómo clasifica Aristóteles al término 'blanca'?",
                cables: [
                    { color: "azul", texto: "Como un accidente de cualidad que no puede subsistir independientemente de la sustancia", correcta: true },
                    { color: "rojo", texto: "Como una sustancia primera que existe por derecho propio en el espacio", correcta: false },
                    { color: "verde", texto: "Como la causa final determinante de la esencia de la mesa", correcta: false },
                    { color: "amarillo", texto: "Como la materia prima informe e incognoscible", correcta: false }
                ],
                impostorAfirmaciones: [
                    "La sustancia primera es el ente individual concreto, por ejemplo este caballo o esta mesa.",
                    "Los accidentes son diez modos del ser que predican determinaciones de la sustancia.",
                    "Un accidente puede existir de forma autónoma en la realidad sin necesidad de ninguna sustancia.",
                    "La sustancia segunda refiere a las especies y géneros universales que definen la esencia."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Sustancia Primera (Ousía)", definicion: "El sujeto individual concreto que no se predica de ningún otro y subyace a los accidentes." }
            },
            {
                id: "filo_c4",
                nombre: "Aristóteles: Hilemorfismo y Cambio",
                guia: "Todo ente físico está compuesto de materia (hylé) y forma (morphé); el cambio es el pasaje dinámico de la potencia al acto.",
                preguntaBomba: "¿Cómo define Aristóteles el movimiento o cambio en su Física?",
                cables: [
                    { color: "azul", texto: "El acto de lo que está en potencia en tanto que está en potencia", correcta: true },
                    { color: "rojo", texto: "Una ilusión sensorial provocada por la discordia de los átomos en el vacío", correcta: false },
                    { color: "verde", texto: "La aniquilación total de la materia previa y la creación ex-nihilo", correcta: false },
                    { color: "amarillo", texto: "El reposo perpetuo del Primer Motor Inmóvil", correcta: false }
                ],
                impostorAfirmaciones: [
                    "La materia es el sustrato indeterminado receptor de determinaciones (lo que está en potencia).",
                    "La forma es la estructura configuradora y esencia que hace que una cosa sea lo que es (acto).",
                    "Una semilla es un árbol en acto y una semilla en potencia.",
                    "El cambio accidental modifica atributos sin alterar la identidad sustancial del ente."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Teoría Hilemórfica", definicion: "Postulado aristotélico de que toda sustancia material es un compuesto indisoluble de materia y forma." }
            },
            {
                id: "filo_c5",
                nombre: "Heráclito y el Logos de los Opuestos",
                guia: "El devenir constante de todas las cosas gobernado por el Logos y la tensión armónica de los contrarios (polemos).",
                preguntaBomba: "¿Qué sostiene Heráclito de Éfeso acerca de la lucha de contrarios en la naturaleza?",
                cables: [
                    { color: "azul", texto: "Que el conflicto (polemos) es el padre y rey de todas las cosas y engendra la armonía del cosmos", correcta: true },
                    { color: "rojo", texto: "Que debe suprimirse toda discordia para que impere un estatismo eterno sin cambio", correcta: false },
                    { color: "verde", texto: "Que el cosmos es un engaño y el ser es único, inmóvil e indivisible", correcta: false },
                    { color: "amarillo", texto: "Que los contrarios se anulan recíprocamente dejando el universo en el caos absoluto", correcta: false }
                ],
                impostorAfirmaciones: [
                    "Heráclito utilizó la metáfora del río para ilustrar que todo fluye y nada permanece idéntico.",
                    "El fuego es el símbolo y principio primordial de la transformación incesante en Heráclito.",
                    "Para Heráclito, la discordia debe eliminarse porque destruye la verdad y el orden del universo.",
                    "El Logos es la razón cósmica que gobierna y unifica las tensiones opuestas del devenir."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Logos Heraclíteo", definicion: "Ley universal y principio de inteligibilidad que unifica armónicamente los contrarios en el perpetuo devenir." }
            }
        ]
    },

    sfi: {
        id: "sfi",
        nombre: "Sistema Financiero Internacional",
        catedra: "Cátedra Karina Díaz · Fernández Matías - DEEFI",
        titular: "Prof. Karina Díaz",
        color: "#10b981",
        criterioDocente: `CRITERIO DE EVALUACIÓN DE CÁTEDRA (Prof. Karina Díaz):
- 4 Multiple Choice iniciales de alta precisión institucional (bonos soberanos, HME, ETTI, euromercados).
- Rigor técnico absoluto en la separación institucional entre el Departamento del Tesoro (emisor fiscal de deuda soberana cupón cero T-Bills) y la Reserva Federal (FED / FOMC, autoridad monetaria que opera sólo en mercado secundario mediante OMO).
- Dominio de las 4 tendencias de los 90 (desregulación, globalización de capitales, titulización/securitización, innovación financiera) y la transición de bancocéntrico a orientado a mercados de capitales.
- Precisión en clasificación de emisiones internacionales: Bonos domésticos, Bonos Extranjeros (Yankee, Samurai, Bulldog) y Eurobonos (moneda no doméstica, colocación sindicada extraterritorial).
- Dominio de la ETTI: Expectativas puras, prima por liquidez y mercados segmentados.`,
        conceptosClave: ["Departamento del Tesoro", "Reserva Federal (FED)", "FOMC", "T-Bills Cupón Cero", "Eurobonos", "Bonos Extranjeros", "Yankee", "ETTI", "Expectativas Puras", "Prima de Liquidez", "Segmentación de Mercados", "Mercado Eficiente (Fama)", "Forma Débil", "Forma Semifuerte", "Forma Fuerte", "Titulización", "Desregulación de los 90", "Bancocéntrico vs Mercados"],
        temarioPorModo: {
            "1er_parcial": {
                nombre: "1er Parcial",
                unidades: "Unidades 1 a 4 (Arquitectura Financiera Global, Fed, ETTI y Deuda)",
                conceptos: ["Arquitectura del Sistema Financiero Internacional e Instituciones (FMI, Banco Mundial, BIS de Basilea)", "Reserva Federal de EE.UU. (Fed, FOMC, balance, operaciones de mercado abierto OMO, Repos y Reverse Repos, tasa target Fed Funds, tasa SOFR)", "Estructura Temporal de Tasas de Interés (ETTI, curva de rendimientos, teorías: Expectativas Puras, Prima por Liquidez, Segmentación de Mercados, inversión de la curva 10Y-2Y y recesión)", "Mercado de Dinero y Deuda Internacional (Treasuries, Eurobonos, Bonos Extranjeros: Yankee, Samurai, Bulldog; Préstamos sindicados internacionales, Plan Brady)", "Riesgo Soberano y Spread EMBI+ (JP Morgan, agencias de calificación crediticia: Moody's, S&P, Fitch, riesgo país y diferenciales de crédito)"]
            },
            "2do_parcial": {
                nombre: "2do Parcial",
                unidades: "Unidades 5 a 7 (Renta Variable Global, Derivados, Divisas y Riesgo Sistémico)",
                conceptos: ["ADRs y GDRs (American Depositary Receipts niveles I, II, III, Rule 144A, ratio de conversión, arbitraje de precios y fondeo transfronterizo)", "Mercado de Divisas y Paridades Cambiarias (Forex, tipo de cambio Spot vs Forward, Paridad de Tasas de Interés Cubierta CIP y No Cubierta UIP, Carry Trade)", "Contratos de Derivados: Forwards vs Futuros (Estandarización, mercado OTC vs bolsas reguladas, márgenes de garantía inicial y de variación, Cámara Compensadora o Clearing House, mark-to-market)", "Opciones Financieras (Call y Put, compradores y lanzadores, valor intrínseco y valor tiempo, griegas: Delta y Vega, estrategias de cobertura: Protective Put, Covered Call, Straddle)", "Swaps Financieros (Swaps de Tasa de Interés IRS fijo por flotante contra SOFR, Currency Swaps de divisas)", "Volatilidad e Índice VIX (Cálculo del miedo de mercado sobre opciones del S&P 500)", "Regulación Bancaria Basilea III (Coeficiente de Cobertura de Liquidez LCR, Ratio de Fondeo Estable Neto NSFR, Capital Tier 1 y colchones anticíclicos)", "Crisis Financieras Internacionales (Crisis Subprime 2008, colapso de Lehman Brothers, crisis de deuda soberana europea 2010-2012 y contagio sistémico)"]
            },
            "final": {
                nombre: "Examen Final Integral",
                unidades: "Integración Total (Unidades 1 a 7)",
                conceptos: ["Interacción entre política monetaria de la Fed, tasas globales y mercados de divisas", "Estrategias de financiamiento internacional y cobertura con derivados (futuros, opciones y swaps)", "Estabilidad financiera global, Basilea III y gestión de crisis bancarias sistémicas"]
            }
        },
        examenes: {
            "1er_parcial": {
                tituloModalidad: "1er Examen Parcial - Sistema Financiero Internacional",
                modelos: [
                    {
                        id: "sfi_p1_m1",
                        nombre: "Modelo 1 (Oficial Karina Díaz)",
                        badge: "Examen Real",
                        titulo: "1er Parcial · Modelo 1 (Cátedra Karina Díaz)",
                        subtitulo: "Unidades 1 a 4: Instituciones, FED, ETTI y Renta Fija Internacional",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 20,
                                pregunta: `BLOQUE I: Cuestionario de Opción Múltiple Institucional (4 Ítems Conceptuales Clave):

1.1) ¿Qué entidad gubernamental emite los bonos soberanos a cupón cero (Treasury Bills) en el mercado estadounidense?
[A] El Comité Federal de Mercado Abierto (FOMC)
[B] El Departamento del Tesoro de los Estados Unidos (US Treasury)
[C] El Banco de la Reserva Federal de Nueva York
[D] La Comisión de Bolsa y Valores (SEC)

1.2) Según la Hipótesis del Mercado Eficiente (HME) de Eugene Fama, un mercado se encuentra en su FORMA SEMIFUERTE cuando los precios de los activos reflejan:
[A] Únicamente la serie histórica de precios y volúmenes pasados.
[B] Toda la información disponible públicamente, incluyendo balances, dividendos, noticias y análisis macroeconómico.
[C] Absolutamente toda la información, incluyendo la confidencial o privilegiada (insider trading).
[D] Ningún tipo de información porque los precios siguen un camino errático irracional.

1.3) Una empresa corporativa con sede central en Tailandia emite títulos de deuda denominados en dólares estadounidenses y los coloca entre inversores internacionales en Singapur y Londres. Este instrumento clasifica formalmente como:
[A] Bono Soberano Doméstico
[B] Eurobono (Eurodollar Bond)
[C] Bono Yankee
[D] Bono Samurai

1.4) La Teoría de las Expectativas Puras sobre la Estructura Temporal de Tasas de Interés (ETTI) postula que:
[A] Las tasas de largo plazo reflejan el promedio ponderado de las tasas cortas esperadas por el mercado sin requerir prima de liquidez.
[B] Los inversores siempre exigen un rendimiento adicional compensatorio por inmovilizar capital a largo plazo.
[C] Los mercados de corto y largo plazo están completamente desconectados por regulaciones bancarias.
[D] La curva de rendimientos siempre debe presentar pendiente negativa.`,
                                placeholder: "Indique sus respuestas justificadas para 1.1, 1.2, 1.3 y 1.4..."
                            },
                            {
                                numero: 2,
                                puntos: 25,
                                pregunta: `BLOQUE II: Transformación del Sistema Financiero Internacional
a) Desarrolle y analice en profundidad las cuatro grandes tendencias macrofinancieras que transformaron el sistema financiero global a partir de la década de 1990:
   1. Desregulación y liberalización financiera.
   2. Globalización e integración transfronteriza de flujos de capital.
   3. Titulización o securitización de activos.
   4. Innovación financiera, proliferación de derivados y banca en la sombra (shadow banking).

b) Explique la transformación estructural que experimentó el sistema financiero pasando del modelo tradicional 'bancocéntrico' al modelo moderno 'orientado al mercado de capitales'.`,
                                placeholder: "Desarrolle las 4 tendencias de los 90 y explique la transición de bancocéntrico a mercado de capitales..."
                            },
                            {
                                numero: 3,
                                puntos: 20,
                                pregunta: `BLOQUE III: Teoría de Mercados Eficientes (HME)
a) Defina el concepto de mercado financiero eficiente según Eugene Fama y explicite sus supuestos subyacentes.
b) Explique las tres formas de eficiencia del mercado (Débil, Semifuerte y Fuerte). Indique para cada forma qué tipo de análisis (Técnico o Fundamental) queda invalidado.
c) ¿Qué consecuencias prácticas tiene la validez de la forma semifuerte para los gestores de fondos de inversión (gestión activa vs. fondos indexados / gestión pasiva)?`,
                                placeholder: "Explique la HME, las tres formas débil/semifuerte/fuerte y sus implicancias en gestión activa vs pasiva..."
                            },
                            {
                                numero: 4,
                                puntos: 15,
                                pregunta: `BLOQUE IV: Relación Institucional FED y Departamento del Tesoro
Analice la siguiente cuestión institucional de política monetaria y fiscal:
¿Puede la Reserva Federal (FED) financiar de forma directa y primaria el déficit fiscal del Departamento del Tesoro de los Estados Unidos?

• Responda de manera categórica indicando el marco legal vigente.
• Explique la diferencia crucial entre el mercado primario de bonos y el mercado secundario.
• Detalle cómo la FED interviene e impacta sobre las tasas y la liquidez a través del FOMC mediante las Operaciones de Mercado Abierto (OMO).`,
                                placeholder: "Explique el marco legal que prohíbe el financiamiento directo de la FED al Tesoro y describa las operaciones de mercado abierto..."
                            },
                            {
                                numero: 5,
                                puntos: 20,
                                pregunta: `BLOQUE V: Caso Práctico de Emisión Internacional y ETTI
a) Caso de Emisión: Compare detalladamente la emisión de un Bono Extranjero (Foreign Bond) frente a un Eurobono. Considere moneda de denominación, país de colocación, jurisdicción legal, sindicato colocador y ventajas de costo regulatorio.
b) Curva de Rendimientos (Yield Curve): Explique la Teoría de Preferencia por la Liquidez y la Teoría de Segmentación de Mercados. ¿Qué factores pueden provocar que una curva de tasas de interés se invierta y qué señal macroeconómica emite históricamente dicha inversión?`,
                                placeholder: "Compare Eurobonos vs Bonos Extranjeros y desarrolle las teorías de la curva de tasas y su inversión..."
                            }
                        ]
                    },
                    {
                        id: "sfi_p1_m2",
                        nombre: "Modelo 2 (Repo, SOFR y Mercados de Deuda)",
                        badge: "Variante B",
                        titulo: "1er Parcial · Modelo 2 (Mercado de Dinero y Riesgo Soberano)",
                        subtitulo: "Variante oficial B: Repos, Tasa SOFR, EMBI+, Spreads y Eurodólares",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 20,
                                pregunta: `BLOQUE I: Multiple Choice Técnico Avanzado (4 Ítems):
1.1) En una operación de Reporto (Repo), el intermediario que vende un título con compromiso de recompra está efectuando económicamente:
[A] Una venta definitiva de acciones sin garantía.
[B] Un préstamo de dinero garantizado por títulos de deuda a una tasa implícita (repo rate).
[C] Una suscripción primaria de bonos soberanos cupón cero.
[D] Una cobertura con contratos de opciones put.

1.2) ¿Por qué la tasa SOFR (Secured Overnight Financing Rate) sustituyó a la histórica tasa LIBOR en los mercados financieros globales?
[A] Porque la LIBOR dependía de estimaciones subjetivas de bancos que sufrieron manipulación, mientras SOFR se basa en transacciones reales garantizadas con Treasuries.
[B] Porque la LIBOR era una tasa exclusivamente en euros y SOFR en libras esterlinas.
[C] Porque la Reserva Federal prohibió el uso de tasas de interés en préstamos interbancarios.
[D] Ninguna es correcta.

1.3) Un bono emitido en EE.UU. por una corporación británica nominado en dólares estadounidenses bajo regulación de la SEC es un:
[A] Eurobono
[B] Bono Yankee
[C] Bono Samurai
[D] Treasury Bond

1.4) La Duration Modificada de un bono mide fundamentalmente:
[A] El plazo en años que falta para el cobro del último cupón.
[B] La sensibilidad porcentual del precio del bono ante variaciones de 1% en la Tasa Interna de Retorno (TIR).
[C] La probabilidad matemática de quiebra del emisor.
[D] El porcentaje de inflación devengada durante el año.`,
                                placeholder: "Respuestas y justificación concisa para 1.1, 1.2, 1.3 y 1.4..."
                            },
                            {
                                numero: 2,
                                puntos: 25,
                                pregunta: `BLOQUE II: El Mercado de Eurodólares y la Desregulación
a) Explique el origen histórico del mercado de Eurodólares durante la Guerra Fría y por qué se concentró inicialmente en Londres y Zúrich.
b) Analice el impacto de la Regulación Q en Estados Unidos (que fijaba topes a las tasas pasivas de los bancos) y los encajes obligatorios en el crecimiento explosivo de los depósitos offshore en dólares.
c) ¿Cuáles son los riesgos de estabilidad financiera que genera un mercado internacional de dólares no regulado por la Reserva Federal?`,
                                placeholder: "Desarrolle el origen del mercado de eurodólares, impacto de la regulación Q y riesgos sistémicos..."
                            },
                            {
                                numero: 3,
                                puntos: 25,
                                pregunta: `BLOQUE III: Riesgo País y Spreads Soberanos (EMBI+)
a) Defina el indicador EMBI+ (Emerging Markets Bond Index Plus) elaborado por J.P. Morgan.
b) Explique qué es un 'Spread de Crédito' (diferencial de tasas) y por qué se toma como benchmark de referencia a la curva de rendimiento de los Bonos del Tesoro de EE.UU. (US Treasuries).
c) Si los Treasuries a 10 años rinden 4.2% anual y el bono argentino rinde 14.5%, ¿a cuántos puntos básicos (bps) equivale el riesgo país y qué factores macroeconómicos lo determinan?`,
                                placeholder: "Defina el EMBI+, cálculo del spread crediticio en bps y determinantes del riesgo país..."
                            },
                            {
                                numero: 4,
                                puntos: 15,
                                pregunta: `BLOQUE IV: Estructura del FOMC y Herramientas de Política Monetaria
• Explique la composición institucional del Comité Federal de Mercado Abierto (FOMC): los 7 Gobernadores de la Junta y los 5 Presidentes de Bancos de la Reserva Federal (con el rol permanente de Nueva York).
• Distinga entre la Tasa de Fondos Federales (Fed Funds Rate target), la Tasa de Descuento (Discount Window) y la Tasa de Interés sobre Reservas Bancarias (IORB).`,
                                placeholder: "Detalle la estructura del FOMC y las tres tasas operativas de la Reserva Federal..."
                            },
                            {
                                numero: 5,
                                puntos: 15,
                                pregunta: `BLOQUE V: Convexidad y Riesgo de Tasa de Interés
• Explique por qué la relación Precio-Rendimiento en un bono de renta fija no es lineal sino convexa.
• ¿Por qué ante grandes variaciones en la tasa de interés la Duration por sí sola es una aproximación insuficiente que debe complementarse con la Convexidad?`,
                                placeholder: "Explique la curvatura de convexidad y su rol protector para el tenedor del bono..."
                            }
                        ]
                    }
                ]
            },
            "2do_parcial": {
                tituloModalidad: "2do Examen Parcial - Sistema Financiero Internacional",
                modelos: [
                    {
                        id: "sfi_p2_m1",
                        nombre: "Modelo 1 (Renta Variable, ADRs y Derivados)",
                        badge: "Oficial",
                        titulo: "2do Parcial · Modelo 1 (Renta Variable y Derivados)",
                        subtitulo: "Unidades 5 a 7: ADRs, Futuros vs Forwards, Opciones Call/Put e Índice VIX",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 25,
                                pregunta: "Mercado de Renta Variable y ADRs: Explique el funcionamiento de los American Depositary Receipts (ADRs). Distinga los Niveles I, II y III, requisitos ante la SEC y la Ley Sarbanes-Oxley (SOX).",
                                placeholder: "Desarrolle el mecanismo de los ADRs, niveles y regulación SOX..."
                            },
                            {
                                numero: 2,
                                puntos: 25,
                                pregunta: "Contratos de Futuros vs. Forward: Analice las diferencias estructurales: negociación en mercados organizados vs OTC, estandarización, márgenes de garantía, mark-to-market y riesgo de contraparte con la Cámara Compensadora (Clearing House).",
                                placeholder: "Compare en detalle contratos Futuros y Forwards..."
                            },
                            {
                                numero: 3,
                                puntos: 25,
                                pregunta: "Mercado de Opciones Financieras: Defina contratos Call y Put. Explique las obligaciones y derechos del comprador (holder) y del vendedor (writer). Distinga entre valor intrínseco y valor tiempo, y entre opciones europeas y americanas.",
                                placeholder: "Desarrolle el funcionamiento técnico de las opciones Call y Put y sus determinantes de valor..."
                            },
                            {
                                numero: 4,
                                puntos: 25,
                                pregunta: "Indicadores de Mercado y Riesgo: Analice el índice VIX (indicador de volatilidad implícita del S&P 500). Explique cómo se calcula conceptualmente a partir de los precios de opciones y por qué es conocido como el 'índice del miedo'.",
                                placeholder: "Explique la interpretación y relevancia macrofinanciera del índice VIX..."
                            }
                        ]
                    }
                ]
            },
            "final": {
                tituloModalidad: "Examen Final Integrador - Sistema Financiero Internacional",
                modelos: [
                    {
                        id: "sfi_final_m1",
                        nombre: "Modelo 1 (Programa Completo de Cátedra)",
                        badge: "Final",
                        titulo: "Examen Final · Modelo 1 (Integrador Total)",
                        subtitulo: "Unidades 1 a 7: Arquitectura global, política monetaria, derivados y crisis sistémicas",
                        duracion: "150 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 25,
                                pregunta: "Políticas Monetarias Globales y Bonos Soberanos: Analice cómo el target de la tasa de Fondos Federales de la Reserva Federal impacta en el flujo internacional de capitales hacia mercados emergentes y en la valuación de los bonos corporativos.",
                                placeholder: "Desarrolle el mecanismo de transmisión de la tasa de la FED sobre la liquidez global..."
                            },
                            {
                                numero: 2,
                                puntos: 25,
                                pregunta: "Duration Modificada y Convexidad: Defina ambos conceptos para la gestión del riesgo de tasa de interés en carteras de renta fija. Explique por qué la duration subestima el aumento de precio ante bajas de tasas y sobreestima la caída ante subas.",
                                placeholder: "Explique la relación matemática y económica entre duration, convexidad y precio del bono..."
                            },
                            {
                                numero: 3,
                                puntos: 25,
                                pregunta: "Estrategias de Cobertura con Derivados: Diseñe una estrategia de cobertura para una empresa multinacional exportadora que tiene cuentas a cobrar en Euros dentro de 90 días, utilizando futuros o puts.",
                                placeholder: "Desarrolle la estrategia de hedging contra riesgo cambiario paso a paso..."
                            },
                            {
                                numero: 4,
                                puntos: 25,
                                pregunta: "Crisis Financiera Internacional de 2008: Analice las fallas de mercado que la originaron (hipotecas subprime, rol de las agencias calificadoras de riesgo, securitización opaca y apalancamiento bancario).",
                                placeholder: "Desarrolle las causas sistémicas y la transformación regulatoria posterior a 2008..."
                            }
                        ]
                    }
                ]
            }
        },
        conceptosJuegos: [
            {
                id: "sfi_c1",
                nombre: "Emisión de Bonos Cupón Cero (T-Bills)",
                guia: "Los Treasury Bills son emitidos por el Departamento del Tesoro de EE.UU. a descuento, no por la Reserva Federal.",
                preguntaBomba: "¿Qué entidad emite directamente los bonos soberanos cupón cero (T-Bills) en los Estados Unidos?",
                cables: [
                    { color: "azul", texto: "El Departamento del Tesoro de los Estados Unidos (US Treasury)", correcta: true },
                    { color: "rojo", texto: "La Junta de Gobernadores de la Reserva Federal (FED)", correcta: false },
                    { color: "verde", texto: "El Comité Federal de Mercado Abierto (FOMC)", correcta: false },
                    { color: "amarillo", texto: "El Banco Central Europeo en acuerdo bilateral", correcta: false }
                ],
                impostorAfirmaciones: [
                    "Los Treasury Bills son títulos de deuda pública emitidos a descuento con vencimiento inferior a un año.",
                    "El emisor oficial y responsable del pago es el Departamento del Tesoro de EE.UU.",
                    "La Reserva Federal emite T-Bills para financiar directamente el gasto corriente del Congreso.",
                    "En el vencimiento, el Tesoro abona el valor nominal o par completo al tenedor del bono."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Treasury Bills (T-Bills)", definicion: "Instrumento soberano cupón cero de corto plazo emitido por el Tesoro de EE.UU." }
            },
            {
                id: "sfi_c2",
                nombre: "Hipótesis de Mercado Eficiente (HME)",
                guia: "Eugene Fama postuló que los precios reflejan toda la información disponible en tres grados: débil, semifuerte y fuerte.",
                preguntaBomba: "Bajo la forma semifuerte de la HME, ¿qué información está ya incorporada en los precios de las acciones?",
                cables: [
                    { color: "azul", texto: "Toda la información disponible públicamente, incluyendo balances, reportes y noticias", correcta: true },
                    { color: "rojo", texto: "Únicamente la secuencia histórica de cotizaciones pasadas", correcta: false },
                    { color: "verde", texto: "Toda la información interna y privada que manejan los directivos de la empresa", correcta: false },
                    { color: "amarillo", texto: "Ninguna información objetiva porque los mercados son puramente emocionales", correcta: false }
                ],
                impostorAfirmaciones: [
                    "En la forma débil, el análisis técnico no puede generar rendimientos anormales consistentes.",
                    "En la forma semifuerte, los precios reaccionan casi instantáneamente a los anuncios públicos de resultados.",
                    "En la forma semifuerte, el análisis fundamental permite batir al mercado de manera sistemática.",
                    "En la forma fuerte, ni siquiera los inversores con información privilegiada obtienen ganancias extraordinarias."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Eficiencia Semifuerte", definicion: "Grado de mercado donde los precios descuentan de inmediato toda la información pública disponible." }
            },
            {
                id: "sfi_c3",
                nombre: "Clasificación de Eurobonos",
                guia: "Títulos de deuda colocados internacionalmente denominados en una moneda distinta a la del país donde se emite.",
                preguntaBomba: "Si una empresa argentina coloca bonos nominados en dólares en los mercados de Londres y Zúrich, ¿cómo se denomina dicho bono?",
                cables: [
                    { color: "azul", texto: "Eurobono (Eurodollar Bond)", correcta: true },
                    { color: "rojo", texto: "Bono Yankee registrado localmente en la SEC", correcta: false },
                    { color: "verde", texto: "Bono Samurai emitido en yenes japoneses", correcta: false },
                    { color: "amarillo", texto: "Bono Soberano Doméstico con oferta pública local", correcta: false }
                ],
                impostorAfirmaciones: [
                    "Los Eurobonos suelen emitirse al portador y con menores trabas regulatorias que las colocaciones domésticas.",
                    "Un Eurobono está nominado en una divisa distinta a la moneda del mercado local de colocación.",
                    "Un bono emitido en EE.UU. por una corporación extranjera nominado en dólares es un Eurobono.",
                    "El sindicato colocador internacional distribuye la emisión entre inversores de múltiples jurisdicciones."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Eurobono", definicion: "Bono internacional emitido en una moneda diferente a la del país o mercado de su colocación." }
            },
            {
                id: "sfi_c4",
                nombre: "ETTI: Curva de Rendimientos Invertida",
                guia: "La inversión de la curva de rendimientos (tasas cortas superiores a tasas largas) anticipa históricamente recesiones económicas.",
                preguntaBomba: "¿Qué fenómeno macroeconómico suele anticipar una curva de rendimientos de bonos soberanos invertida?",
                cables: [
                    { color: "azul", texto: "Una desaceleración económica severa o recesión esperada por el mercado", correcta: true },
                    { color: "rojo", texto: "Un auge hiperinflacionario sin precedentes con pleno empleo", correcta: false },
                    { color: "verde", texto: "Un aumento inmediato del superávit fiscal del gobierno central", correcta: false },
                    { color: "amarillo", texto: "La eliminación total del riesgo de crédito corporativo", correcta: false }
                ],
                impostorAfirmaciones: [
                    "La curva de rendimientos normal presenta pendiente positiva por exigencia de prima por liquidez a mayor plazo.",
                    "La Teoría de las Expectativas Puras asume que los bonos a distinto plazo son sustitutos perfectos.",
                    "Una curva invertida significa que el mercado anticipa que los bancos centrales subirán agresivamente las tasas a futuro.",
                    "La Teoría de Mercados Segmentados postula que la oferta y demanda fijan la tasa en cada tramo de madurez de forma aislada."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Curva Invertida (Yield Curve)", definicion: "Estructura de tasas donde los rendimientos de corto plazo superan a los de largo plazo, señal de recesión." }
            },
            {
                id: "sfi_c5",
                nombre: "Independencia de la FED y Operaciones OMO",
                guia: "La FED no financia directamente al Tesoro en mercado primario; interviene en mercado secundario mediante el FOMC para fijar liquidez.",
                preguntaBomba: "¿Cómo ejecuta el FOMC de la Reserva Federal la regulación del circulante y las tasas de corto plazo?",
                cables: [
                    { color: "azul", texto: "Comprando y vendiendo títulos del Tesoro en el mercado secundario mediante OMO", correcta: true },
                    { color: "rojo", texto: "Comprando directamente la emisión primaria de bonos al Tesoro sin intermediarios", correcta: false },
                    { color: "verde", texto: "Fijando por decreto legal los precios de las acciones en Wall Street", correcta: false },
                    { color: "amarillo", texto: "Confiscando los depósitos en dólares de los bancos extranjeros", correcta: false }
                ],
                impostorAfirmaciones: [
                    "El FOMC fija el rango objetivo para la tasa de Fondos Federales (Fed Funds Rate).",
                    "La FED tiene prohibido constitucional y legalmente financiar directamente el déficit del Tesoro en primario.",
                    "Cuando la FED compra títulos en el mercado secundario, absorbe liquidez y presiona las tasas al alza.",
                    "El Libro Beige recopila la evidencia anecdótica sobre la actividad económica en los 12 distritos de la FED."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Operaciones de Mercado Abierto (OMO)", definicion: "Compraventa de títulos soberanos por el banco central en el mercado secundario para regular la liquidez." }
            }
        ]
    },

    historia: {
        id: "historia",
        nombre: "Historia Económica Mundial",
        catedra: "Cátedra Prof. Andrea Picardi · DESOH",
        titular: "Prof. Andrea Picardi",
        color: "#3b82f6",
        criterioDocente: `CRITERIO DE EVALUACIÓN DE CÁTEDRA (Prof. Andrea Picardi):
- Estructura oficial del examen: 100 puntos totales distribuidos en dos bloques obligatorios:
  • PARTE I (40 puntos): Elegir 1 de 2 grandes temas históricos estructurales. Exige desarrollo EXTENSO, PROFUNDO y MULTIDIMENSIONAL (articulando dimensiones política, económica, agraria, tecnológica, demográfica, social e institucional).
  • PARTE II (60 puntos): 3 consignas de desarrollo analítico de 20 puntos cada una (total 100 pts).
- Se penaliza duramente el esquematismo, respuestas breves de 3 renglones o falta de contexto histórico.
- Dominio riguroso de autores y doctrinas de cátedra: Cameron, Marichal, David Ricardo (teoría del valor, Corn Laws, ventajas comparativas), Karl Marx (crítica de la economía política, plusvalía), Friedrich List (proteccionismo nacional de industrias nacientes), Patrón Oro clásico (ajuste de Hume) y crisis estructurales (1929, Bretton Woods, 1973).`,
        conceptosClave: ["Transición Feudalismo-Capitalismo", "Crisis del Siglo XIV", "Debate Dobb-Sweezy-Brenner", "Revolución Agrícola", "Cercamientos (Enclosures)", "Revolución Gloriosa 1688", "Revolución Industrial Británica", "Industria Textil Algodonera", "Máquina de Vapor (Watt)", "Segunda Revolución Industrial", "Taylorismo y Fordismo", "Mercantilismo", "Metalismo", "Balanza Comercial Favorable", "Patrón Oro Internacional", "Reglas del Juego", "Mecanismo Precio-Flujo de Hume", "David Ricardo y Ventajas Comparativas", "Debate Corn Laws y Librecambio", "Karl Marx y Plusvalía", "Friedrich List y Proteccionismo", "Imperialismo Decimonónico", "Tratado de Versalles e Hiperinflación 1923", "Gran Depresión de 1929", "New Deal y Glass-Steagall", "Acuerdos de Bretton Woods 1944", "Treinta Gloriosos", "Crisis del Petróleo 1973/79 y Estanflación", "Neoliberalismo y Consenso de Washington"],
        temarioPorModo: {
            "1er_parcial": {
                nombre: "1er Parcial",
                unidades: "Unidades 1 a 4 (Del Feudalismo a la Segunda Revolución Industrial)",
                conceptos: ["Régimen Feudal, Crisis del siglo XIV y Peste Negra de 1348 (escasez de mano de obra, suba de salarios reales y disolución de la servidumbre)", "Expansión Ultramarina y Mercantilismo (Colbertismo francés, Actas de Navegación británicas de 1651, Compañías de Indias Orientales VOC holandesa)", "Revolución de los Precios del siglo XVI (afluencia de metales preciosos americanos a España, inflación europea y teoría cuantitativa temprana)", "Primera Revolución Industrial Británica (1760-1830: Enclosures, mecanización textil algodonera, máquina de vapor de Watt, carbón mineral y sistema fabril)", "Ferrocarril e integración de mercados nacionales (industrias pesadas e inversiones de capital)", "Segunda Revolución Industrial (1870-1914: acero, química, electricidad, petróleo, gran empresa moderna de Chandler, taylorismo y fordismo, ascenso de EE.UU. y Alemania)", "Patrón Oro Clásico (1870-1914: paridades fijas, libre convertibilidad, mecanismo de flujo en especie de Hume y hegemonía de la libra esterlina)"]
            },
            "2do_parcial": {
                nombre: "2do Parcial",
                unidades: "Unidad II (Segunda Rev. Industrial, Doctrinas Económicas e Imperialismo) + Siglo XX (Guerras Mundiales, Gran Depresión, Bretton Woods, Treinta Gloriosos y Neoliberalismo)",
                conceptos: [
                    "Segunda Revolución Industrial (1850-1914): Avances tecnológicos (acero Bessemer/Siemens, química pesada, electricidad, petróleo, motor de combustión), profundización fabril, capitalismo monopólico-financiero (trusts, cárteles, banca mixta), inversiones y migraciones masivas",
                    "Consolidación de la División Internacional del Trabajo: Centro industrializado (Gran Bretaña, Alemania, EE.UU.) vs Periferia agroexportadora proveedora de alimentos y materias primas",
                    "Liberalismo Económico - David Ricardo: Teoría del valor, renta diferencial de la tierra, ley de rendimientos decrecientes, ventajas comparativas, debate y derogación de las Corn Laws de 1846 e instauración del librecambio británico",
                    "Socialismo Científico - Karl Marx: Crítica de la economía política, teoría del valor-trabajo, plusvalía absoluta y relativa, explotación laboral y contradicciones estructurales del modo de producción capitalista",
                    "Debate Librecambio vs Proteccionismo - Friedrich List: 'Sistema Nacional de Economía Política', crítica al cosmopolitismo ricardiano ('patear la escalera'), proteccionismo educador para industrias nacientes y Zollverein alemán",
                    "Vigencia del Patrón Oro Clásico (1870-1914): Libre convertibilidad, paridades fijas respaldadas en metal, mecanismo de ajuste precio-flujo de especie de David Hume, hegemonía de la libra esterlina y Banco de Inglaterra",
                    "El Imperialismo y camino a la Primera Guerra Mundial: Reparto colonial de África y Asia, búsqueda de materias primas y mercados cautivos, exportación de excedentes de capital (Hobson, Lenin) y tensiones interimperialistas",
                    "Primera Guerra Mundial y Consecuencias Económicas de la Paz: Tratado de Versalles, crítica de Keynes, reparaciones punitivas a Alemania, deuda interaliada e hiperinflación de 1923 (Rentenmark y Plan Dawes)",
                    "La Gran Depresión de 1929: Causas estructurales, crash bursátil de Wall Street, espiral deflacionaria, corridas bancarias en cadena, arancel proteccionista Smoot-Hawley (1930) y propagación mundial a la periferia",
                    "El New Deal de Roosevelt: Regulación financiera y bancaria (Ley Glass-Steagall, seguro de depósitos FDIC, supervisión de la SEC), obras públicas (TVA, WPA) y políticas de estímulo a la demanda agregada",
                    "Acuerdos de Bretton Woods (1944) y Posguerra: Conferencia monetaria (Plan Keynes vs Plan White), creación del FMI y Banco Mundial, patrón de cambio oro-dólar ($35 la onza) y Plan Marshall para la reconstrucción europea",
                    "Los 'Treinta Gloriosos' (1945-1973): Edad de Oro del Capitalismo, concertación social capital-trabajo, consolidación del Estado de Bienestar, productividad fordista y pleno empleo en economías occidentales",
                    "Crisis Petroleras de 1973 y 1979, Estanflación y Neoliberalismo: Ruptura unilateral de convertibilidad oro por Nixon en 1971, shocks de precios de la OPEP, crisis del paradigma keynesiano, estanflación y ascenso del Monetarismo y Neoliberalismo (Reagan, Thatcher y Consenso de Washington)"
                ]
            },
            "final": {
                nombre: "Examen Final Integral",
                unidades: "Integración Histórica Total (Feudalismo a Globalización)",
                conceptos: ["Comparación de regímenes monetarios: Patrón Oro clásico vs Bretton Woods vs Patrón fiduciario flotante", "Análisis estructural de grandes crisis: Peste Negra 1348, Gran Depresión 1929 y Crisis Petrolera 1973", "Transiciones tecnológicas e institucionales en el crecimiento económico moderno según Cameron y Chandler"]
            }
        },
        examenes: {
            "1er_parcial": {
                tituloModalidad: "1er Examen Parcial - Historia Económica Mundial",
                modelos: [
                    {
                        id: "hem_p1_m1",
                        nombre: "Modelo 1 (Oficial Andrea Picardi)",
                        badge: "Examen Real",
                        titulo: "1er Parcial · Modelo 1 (Cátedra Andrea Picardi)",
                        subtitulo: "100 Puntos Oficiales · Bloque I (40 pts) + Bloque II (3 de 4 de 20 pts)",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 40,
                                pregunta: `PARTE I (40 PUNTOS): TEMA ESTRUCTURAL A ELECCIÓN
Elige y desarrolla en profundidad UNA (1) de las siguientes dos opciones con enfoque multidimensional:

• OPCIÓN A: LA TRANSICIÓN DEL FEUDALISMO AL CAPITALISMO EN EUROPA OCCIDENTAL.
1) Las características del señorío feudal y la servidumbre.
2) El impacto demográfico y agrario de la Peste Negra y la crisis del siglo XIV.
3) El debate historiográfico sobre los motores de la transición (Sweezy vs. Dobb y Brenner).
4) Las monarquías absolutistas, la acumulación originaria y el trabajo libre asalariado.

• OPCIÓN B: FACTORES DETERMINANTES DE LA REVOLUCIÓN INDUSTRIAL EN INGLATERRA.
1) La Revolución Agrícola: enclosures, sistema Norfolk y liberación de mano de obra.
2) El marco institucional post-Revolución Gloriosa de 1688 y derechos de propiedad.
3) Ventajas geográficas: carbón de coque, hierro y canales navegables.
4) Comercio colonial ultramarino y mercado interno británico.`,
                                placeholder: "Indique la opción elegida (OPCIÓN A u OPCIÓN B) y desarrolle su respuesta ampliamente..."
                            },
                            {
                                numero: 2,
                                puntos: 20,
                                pregunta: "PARTE II - CONSIGNA 1: EL MERCANTILISMO Y EL COMERCIO COLONIAL. Defina metalismo/bullionismo, balanza comercial favorable, proteccionismo, manufacturas reales y monopolios coloniales, y las críticas de David Hume y Adam Smith.",
                                placeholder: "Desarrolle exhaustivamente los principios del mercantilismo..."
                            },
                            {
                                numero: 3,
                                puntos: 20,
                                pregunta: "PARTE II - CONSIGNA 2: LA PRIMERA FASE DE LA REVOLUCIÓN INDUSTRIAL (1760-1840). Textil algodonero, máquina de vapor de James Watt, surgimiento del sistema fabril (factory system) y disciplina de la clase obrera.",
                                placeholder: "Analice la primera fase de la industrialización británica..."
                            },
                            {
                                numero: 4,
                                puntos: 20,
                                pregunta: "PARTE II - CONSIGNA 3: LA SEGUNDA FASE DE LA REVOLUCIÓN INDUSTRIAL (1870-1914). Nuevas fuentes de energía (petróleo, electricidad), acero, ferrocarril, taylorismo/fordismo y concentración corporativa (trusts y cárteles).",
                                placeholder: "Desarrolle los sectores dinámicos, taylorismo y corporaciones..."
                            },
                            {
                                numero: 5,
                                puntos: 20,
                                pregunta: "PARTE II - CONSIGNA 4: EL PATRÓN ORO INTERNACIONAL (1870-1914). Reglas del juego, libre convertibilidad, mecanismo de ajuste precio-flujo de Hume y rol hegemónico de la libra esterlina británica.",
                                placeholder: "Desarrolle las reglas del patrón oro y el mecanismo de Hume..."
                            }
                        ]
                    },
                    {
                        id: "hem_p1_m2",
                        nombre: "Modelo 2 (Expansión Comercial y Gran Crecimiento)",
                        badge: "Variante B",
                        titulo: "1er Parcial · Modelo 2 (Comercio Colonial y Globalización)",
                        subtitulo: "Variante oficial B: Revolución de los precios, VOC, división del trabajo e industrialización tardía",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 40,
                                pregunta: `PARTE I (40 PUNTOS): TEMA ESTRUCTURAL A ELECCIÓN
Elige y desarrolla en profundidad UNA (1) de las siguientes opciones:

• OPCIÓN A: LA EXPANSIÓN ULTRA-MARINA EUROPEA DEL SIGLO XVI Y LA REVOLUCIÓN DE LOS PRECIOS.
Analice la teoría cuantitativa y la inflación provocada por la plata americana según Earl Hamilton. El traslado del eje económico del Mediterráneo al Atlántico (Amberes, Ámsterdam) y el nacimiento de las primeras Sociedades por Acciones (VOC holandesa y Compañía de las Indias Orientales inglesa).

• OPCIÓN B: EL GRAN CRECIMIENTO DE 1873 A 1914 Y LA DIVISIÓN INTERNACIONAL DEL TRABAJO.
Analice la relación asimétrica entre los países centrales industrializados (Gran Bretaña, Alemania, EE.UU.) y los países periféricos agroexportadores. El impacto del vapor, los ferrocarriles, la emigración masiva europea y las inversiones extranjeras directas.`,
                                placeholder: "Indique la opción elegida (OPCIÓN A u OPCIÓN B) y desarrolle su análisis multidimensional..."
                            },
                            {
                                numero: 2,
                                puntos: 20,
                                pregunta: "PARTE II - CONSIGNA 1: LA FISIOCRACIA FRENTE AL MERCANTILISMO. Explique la doctrina del 'Cuadro Económico' de François Quesnay, por qué consideraban a la agricultura como la única actividad productora de 'producto neto' y el principio del laissez-faire.",
                                placeholder: "Desarrolle los principios de la escuela fisiócrata..."
                            },
                            {
                                numero: 3,
                                puntos: 20,
                                pregunta: "PARTE II - CONSIGNA 2: LA INDUSTRIALIZACIÓN DE BÉLGICA Y FRANCIA. Compare el modelo belga (dotación de carbón y cercanía a Inglaterra) con la industrialización francesa (lenta transición agraria, predominio del campesinado propietario y manufacturas de lujo).",
                                placeholder: "Compare los senderos de industrialización en Bélgica y Francia..."
                            },
                            {
                                numero: 4,
                                puntos: 20,
                                pregunta: "PARTE II - CONSIGNA 3: LA INDUSTRIALIZACIÓN DE ALEMANIA Y EL ROL DE LA BANCA MIXTA. El impacto del Zollverein (unión aduanera de 1834), la unificación imperial de 1871 y la articulación entre grandes bancos de inversión (Grossbanken), cárteles y la industria química pesada.",
                                placeholder: "Analice el despegue industrial alemán y el rol del crédito bancario..."
                            },
                            {
                                numero: 5,
                                puntos: 20,
                                pregunta: "PARTE II - CONSIGNA 4: LA DEROGACIÓN DE LAS LEYES DE CEREALES (CORN LAWS) EN INGLATERRA (1846). Explique el triunfo de los industriales de Manchester frente a los terratenientes agrarios, la teoría de las ventajas comparativas de David Ricardo y el advenimiento del librecambio.",
                                placeholder: "Analice el debate de las Corn Laws y el librecambio ricardiano..."
                            }
                        ]
                    }
                ]
            },
            "2do_parcial": {
                tituloModalidad: "2do Examen Parcial - Historia Económica Mundial",
                modelos: [
                    {
                        id: "hem_p2_m1",
                        nombre: "Modelo 1 (Oficial Andrea Picardi: Unidad II + Siglo XX)",
                        badge: "Examen Real",
                        titulo: "2do Parcial · Modelo 1 (Cátedra Andrea Picardi)",
                        subtitulo: "100 Puntos Oficiales · Bloque I (40 pts) + Bloque II (3 consignas de 20 pts)",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 40,
                                pregunta: `PARTE I (40 PUNTOS): TEMA ESTRUCTURAL A ELECCIÓN
Elige y desarrolla en profundidad UNA (1) de las siguientes dos opciones con enfoque multidimensional (articulando dimensiones política, económica, agraria, tecnológica, demográfica, social e institucional):

• OPCIÓN A: LA SEGUNDA REVOLUCIÓN INDUSTRIAL (1850-1914), EL CAPITALISMO CORPORATIVO Y EL IMPERIALISMO.
1) Los sectores dinámicos y matrices energéticas (acero Bessemer/Siemens, química pesada, electricidad, petróleo y motor de combustión interna) frente a la Primera Revolución Industrial.
2) La gran empresa moderna y la concentración empresarial: cárteles en Alemania, trusts en EE.UU. y el rol articulador de la banca mixta de inversión (Grossbanken).
3) El afianzamiento de la División Internacional del Trabajo: flujos de capital británicos, migraciones masivas europeas y el rol de las economías periféricas proveedoras de materias primas.
4) Las teorías del Imperialismo (Hobson, Lenin) y el reparto colonial de África y Asia como válvula de escape a los excedentes de producción y capital, antesala de la Primera Guerra Mundial.

• OPCIÓN B: LA GRAN DEPRESIÓN DE 1929 Y LA RUPTURA DEL MODELO LIBERAL DE ENTREGUERRAS.
1) Las causas estructurales en la economía norteamericana: sobreproducción industrial y agrícola, endeudamiento, especulación bursátil a crédito y fragilidad bancaria.
2) La dinámica de la crisis: el Crack de Wall Street de octubre de 1929, la espiral deflacionaria, las quiebras bancarias en cadena y la contracción de la oferta monetaria.
3) Los mecanismos de propagación internacional: corte del crédito externo estadounidense, colapso del comercio mundial y el arancel proteccionista Smoot-Hawley de 1930.
4) La respuesta del New Deal de Roosevelt: regulación financiera (Ley Glass-Steagall, seguro FDIC, SEC), programas de empleo y obras públicas (TVA, WPA) y el cambio en la doctrina de intervención estatal.`,
                                placeholder: "Indique la opción elegida (OPCIÓN A u OPCIÓN B) y desarrolle su análisis multidimensional exhaustivo..."
                            },
                            {
                                numero: 2,
                                puntos: 20,
                                pregunta: "PARTE II - CONSIGNA 1: DEBATES DOCTRINARIOS DEL SIGLO XIX: LIBERALISMO RICARDIANO Y CRÍTICA MARXISTA. Confronte detalladamente: a) La teoría ricardiana de las ventajas comparativas, la renta diferencial de la tierra y la derogación de las Corn Laws de 1846 en Inglaterra; b) La crítica de Karl Marx a la economía política clásica: el concepto de plusvalía (absoluta y relativa), la explotación laboral y las contradicciones estructurales de la acumulación capitalista.",
                                placeholder: "Confronte a David Ricardo (Corn Laws, ventajas comparativas) y Karl Marx (plusvalía, contradicciones del capital)..."
                            },
                            {
                                numero: 3,
                                puntos: 20,
                                pregunta: "PARTE II - CONSIGNA 2: EL PATRÓN ORO CLÁSICO (1870-1914) Y EL COLAPSO MONETARIO DE ENTREGUERRAS. Explique los tres pilares del Patrón Oro Clásico (paridades fijas, convertibilidad y libre flujo de metal) y el mecanismo de ajuste precio-flujo de David Hume. Luego detalle por qué se quebró en 1914 con la Primera Guerra Mundial y cómo las reparaciones del Tratado de Versalles desembocaron en la hiperinflación alemana de 1923 (analice el papel del Rentenmark y el Plan Dawes).",
                                placeholder: "Desarrolle el funcionamiento del patrón oro, el mecanismo de Hume y la hiperinflación alemana de 1923..."
                            },
                            {
                                numero: 4,
                                puntos: 20,
                                pregunta: "PARTE II - CONSIGNA 3: LOS ACUERDOS DE BRETTON WOODS (1944) Y LA CRISIS DE LOS AÑOS SETENTA. Analice el orden monetario internacional acordado en Bretton Woods (FMI, Banco Mundial, patrón de cambio oro-dólar a USD 35 la onza) y el auge de los 'Treinta Gloriosos' (1945-1973). Luego explique las causas estructurales de su colapso: el fin unilateral de la convertibilidad oro por Richard Nixon en 1971, los shocks petroleros de la OPEP (1973/79) y el fenómeno inédito de la estanflación.",
                                placeholder: "Analice la arquitectura de Bretton Woods, los Treinta Gloriosos y la ruptura estanflacionaria de los 70..."
                            }
                        ]
                    },
                    {
                        id: "hem_p2_m2",
                        nombre: "Modelo 2 (Cátedra Andrea Picardi: Proteccionismo, Guerras y Posguerra)",
                        badge: "Variante B",
                        titulo: "2do Parcial · Modelo 2 (Cátedra Andrea Picardi)",
                        subtitulo: "100 Puntos Oficiales · Bloque I (40 pts) + Bloque II (3 consignas de 20 pts)",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 40,
                                pregunta: `PARTE I (40 PUNTOS): TEMA ESTRUCTURAL A ELECCIÓN
Elige y desarrolla en profundidad UNA (1) de las siguientes dos opciones con articulación multidimensional:

• OPCIÓN A: REGÍMENES MONETARIOS Y COMERCIO GLOBAL: DEL PATRÓN ORO CLÁSICO A BRETTON WOODS.
1) El Patrón Oro Internacional (1870-1914): el rol de la City de Londres y la libra esterlina como ancla, disciplina monetaria y mecanismo de Hume.
2) El desorden monetario de entreguerras: abandono de la convertibilidad en la Gran Guerra, hiperinflación alemana de 1923, devaluaciones competitivas y bloques comerciales cerrados.
3) Los acuerdos de Bretton Woods de 1944: el debate Keynes (Bancor) vs White (Dólar), paridades fijas ajustables con el dólar vinculado al oro ($35/oz), FMI y Banco Mundial.
4) La crisis y disolución del régimen en 1971: el Dilema de Triffin, la expansión de los eurodólares, la sangría de reservas estadounidenses y el fin de la convertibilidad decretado por Nixon.

• OPCIÓN B: EL ROL DEL ESTADO EN LA ECONOMÍA MUNDIAL: DE LA SEGUNDA INDUSTRIALIZACIÓN AL ESTADO DE BIENESTAR Y EL NEOLIBERALISMO.
1) El capitalismo corporativo y el estado en la Segunda Revolución Industrial: proteccionismo arancelario (Friedrich List en Alemania, aranceles en EE.UU.), compras estatales, ferrocarriles y leyes antimonopolio (Sherman Act de 1890).
2) El quiebre del liberalismo tras el Crack del 29: el intervencionismo estatal del New Deal (Roosevelt) y la justificación keynesiana del sostenimiento de la demanda efectiva.
3) La consolidación del Estado de Bienestar en los 'Treinta Gloriosos' (1945-1973): pacto social capital-trabajo, servicios públicos universales y pleno empleo.
4) La crisis fiscal y la ofensiva neoliberal (décadas de 1970 y 1980): estanflación, agotamiento del modelo fordista, desregulación financiera, privatizaciones y el Consenso de Washington.`,
                                placeholder: "Indique la opción elegida (OPCIÓN A u OPCIÓN B) y desarrolle su análisis multidimensional..."
                            },
                            {
                                numero: 2,
                                puntos: 20,
                                pregunta: "PARTE II - CONSIGNA 1: FRIEDRICH LIST Y EL PROTECCIONISMO DE INDUSTRIAS NACIENTES. Analice los postulados centrales de Friedrich List en su 'Sistema Nacional de Economía Política' (1841). Explique por qué criticaba el librecambio ricardiano acusándolo de 'patear la escalera', cuál era su doctrina sobre la protección arancelaria transitoria a las industrias nacientes y cómo influyeron sus ideas en el Zollverein y el despegue manufacturero de Alemania.",
                                placeholder: "Desarrolle la doctrina de Friedrich List, la crítica al librecambio y el Zollverein..."
                            },
                            {
                                numero: 3,
                                puntos: 20,
                                pregunta: "PARTE II - CONSIGNA 2: LA CRISIS DE 1929: TRANSMISIÓN INTERNACIONAL Y REPERCUSIONES EN AMÉRICA LATINA. Analice los canales de transmisión del colapso económico de 1929 hacia los países exportadores de materias primas y alimentos (periferia agroexportadora). Explique el desplome de los términos de intercambio, el cese de los flujos de crédito exterior, la cesación de pagos de la deuda soberana y el surgimiento del modelo de Industrialización por Sustitución de Importaciones (ISI).",
                                placeholder: "Analice la transmisión global de la crisis de 1929 y el surgimiento del modelo ISI en América Latina..."
                            },
                            {
                                numero: 4,
                                puntos: 20,
                                pregunta: "PARTE II - CONSIGNA 3: EL PLAN MARSHALL Y LA EDAD DE ORO DEL CAPITALISMO (1945-1973). Analice los objetivos geopolíticos y económicos del Plan Marshall (1948) para la reconstrucción de Europa Occidental y la contención en el marco de la Guerra Fría. Luego describa los pilares productivos e institucionales de los 'Treinta Gloriosos': organización científica del trabajo (taylorismo y fordismo masivo), aumentos salariales indexados a la productividad y expansión de los derechos sociales.",
                                placeholder: "Desarrolle el Plan Marshall, la reconstrucción europea y el modelo socio-productivo de los Treinta Gloriosos..."
                            }
                        ]
                    }
                ]
            },
            "final": {
                tituloModalidad: "Examen Final Integrador - Historia Económica Mundial",
                modelos: [
                    {
                        id: "hem_final_m1",
                        nombre: "Modelo 1 (Evolución Integral del Capitalismo)",
                        badge: "Final",
                        titulo: "Examen Final · Modelo 1 (Feudalismo a Crisis Globales)",
                        subtitulo: "Integración histórica total: regímenes monetarios, revoluciones y crisis según Cameron y Marichal",
                        duracion: "150 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 35,
                                pregunta: "Revoluciones Industriales Comparadas: Compare la Primera Revolución Industrial británica y la Segunda Revolución Industrial alemana/norteamericana.",
                                placeholder: "Compare tecnologías, energías, empresas y sociedad..."
                            },
                            {
                                numero: 2,
                                puntos: 35,
                                pregunta: "Sistemas Monetarios en Perspectiva Histórica: Patrón Oro Clásico (1870-1914), Entreguerras y Patrón Bretton Woods (1944-1971).",
                                placeholder: "Trace la evolución de los regímenes monetarios globales..."
                            },
                            {
                                numero: 3,
                                puntos: 30,
                                pregunta: "Las Grandes Crisis Financieras según Carlos Marichal: Confronte el Crack del 29 y la Crisis Subprime de 2008 en sus regularidades estructurales.",
                                placeholder: "Analice los patrones comunes de las crisis financieras según Marichal..."
                            }
                        ]
                    }
                ]
            }
        },
        conceptosJuegos: [
            {
                id: "hem_c1",
                nombre: "Mercantilismo y Bullionismo",
                guia: "Doctrina económica que identificaba la riqueza de una nación con la acumulación de metales preciosos (oro y plata).",
                preguntaBomba: "¿Cuál era la meta principal de la política comercial mercantilista de los siglos XVII y XVIII?",
                cables: [
                    { color: "azul", texto: "Lograr una balanza comercial favorable maximizando exportaciones y restringiendo importaciones", correcta: true },
                    { color: "rojo", texto: "Establecer el libre comercio internacional eliminando todo arancel y monopolio", correcta: false },
                    { color: "verde", texto: "Promover la desindustrialización para volver exclusivamente a la producción agraria", correcta: false },
                    { color: "amarillo", texto: "Distribuir equitativamente los metales preciosos entre todas las naciones europeas", correcta: false }
                ],
                impostorAfirmaciones: [
                    "El metalismo o bullionismo consideraba al oro y la plata como la forma suprema de riqueza estatal.",
                    "Las Actas de Navegación inglesas fueron un ejemplo paradigmático de legislación proteccionista mercantilista.",
                    "El mercantilismo defendía la libre competencia irrestricta y el cese de los monopolios coloniales reales.",
                    "Fisiócratas como François Quesnay criticaron al mercantilismo señalando que sólo la tierra genera producto neto."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Balanza Comercial Favorable", definicion: "Principio mercantilista de exportar bienes de alto valor e importar lo mínimo para acumular metales." }
            },
            {
                id: "hem_c2",
                nombre: "Revolución Agrícola y Enclosures",
                guia: "Proceso de cercamiento de tierras comunales en Inglaterra que privatizó el agro y expulsó campesinos hacia las fábricas urbanas.",
                preguntaBomba: "¿Qué consecuencia social y demográfica decisiva tuvieron las Leyes de Cercamiento (Enclosure Acts) en Inglaterra?",
                cables: [
                    { color: "azul", texto: "Expulsaron a campesinos desposeídos creando la mano de obra proletaria urbana para las fábricas", correcta: true },
                    { color: "rojo", texto: "Restablecieron los lazos feudales y la servidumbre perpetua de la gleba", correcta: false },
                    { color: "verde", texto: "Provocaron la desaparición absoluta de la propiedad privada de la tierra", correcta: false },
                    { color: "amarillo", texto: "Frenaron la introducción de innovaciones técnicas como el sistema Norfolk", correcta: false }
                ],
                impostorAfirmaciones: [
                    "El sistema Norfolk eliminó el barbecho mediante la rotación cuatrienal de cultivos.",
                    "Los cercamientos permitieron aplicar inversiones de capital y mejorar los rindes agrícolas.",
                    "Las leyes de cercamiento beneficiaron principalmente a los pequeños campesinos comuneros sin títulos formales.",
                    "El aumento de la productividad agrícola permitió alimentar a una población urbana creciente no dedicada al campo."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Leyes de Cercamiento (Enclosures)", definicion: "Privatización de tierras comunales que convirtió al campesinado en proletariado fabril asalariado." }
            },
            {
                id: "hem_c3",
                nombre: "Primera Revolución Industrial: Textil y Vapor",
                guia: "La industria textil algodonera en Lancashire y la máquina de vapor de James Watt lideraron la primera ola industrializadora.",
                preguntaBomba: "¿Cuál fue el sector industrial líder (de punta) durante la Primera Revolución Industrial británica?",
                cables: [
                    { color: "azul", texto: "La industria textil manufacturera del algodón", correcta: true },
                    { color: "rojo", texto: "La industria petroquímica y de refinación de plásticos", correcta: false },
                    { color: "verde", texto: "La fabricación masiva de automóviles a combustión interna", correcta: false },
                    { color: "amarillo", texto: "La industria aeroespacial y de telecomunicaciones satelitales", correcta: false }
                ],
                impostorAfirmaciones: [
                    "La máquina de vapor perfeccionada por James Watt independizó a las fábricas de los ríos.",
                    "El carbón mineral (coque) reemplazó a la leña vegetal como combustible clave de la fundición de hierro.",
                    "La primera revolución industrial se caracterizó por la robótica automatizada y la electricidad.",
                    "El factory system impuso una rígida disciplina laboral basada en el control del tiempo por reloj."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Sector Algodonero de Punta", definicion: "Primer rubro industrial mecanizado a gran escala que motorizó las exportaciones británicas." }
            },
            {
                id: "hem_c4",
                nombre: "Segunda Revolución Industrial y Taylorismo",
                guia: "Nuevas energías (petróleo y electricidad), acero, química y organización científica del trabajo con cronómetro y línea de montaje.",
                preguntaBomba: "¿Cuál es el núcleo central del sistema de organización del trabajo formulado por Frederick Taylor?",
                cables: [
                    { color: "azul", texto: "La descomposición de tareas en movimientos mínimos cronometrados eliminando tiempos muertos", correcta: true },
                    { color: "rojo", texto: "Permitir que cada obrero decida libremente su propio ritmo y herramientas de producción", correcta: false },
                    { color: "verde", texto: "El retorno a los gremios artesanales medievales con aprendizaje prolongado", correcta: false },
                    { color: "amarillo", texto: "La prohibición absoluta de la maquinaria en los talleres siderúrgicos", correcta: false }
                ],
                impostorAfirmaciones: [
                    "Henry Ford añadió al taylorismo la cinta transportadora mecánica móvil en la producción del Modelo T.",
                    "En la segunda revolución industrial, el acero sustituyó al hierro dulce en rieles y estructuras.",
                    "El taylorismo promovía que los obreros organizaran colectivamente la dirección técnica de la empresa.",
                    "Alemania y los Estados Unidos superaron a Gran Bretaña en los sectores químicos y eléctricos modernos."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Taylorismo", definicion: "Estudio científico de tiempos y movimientos para maximizar la productividad y disciplina obrera." }
            },
            {
                id: "hem_c5",
                nombre: "Patrón Oro y Ajuste de Hume",
                guia: "Mecanismo automático precio-flujo de oro donde el déficit de pagos drenaba metal, bajaba precios y restablecía el equilibrio.",
                preguntaBomba: "Según el mecanismo de ajuste precio-flujo de David Hume, ¿qué ocurría cuando un país sufría déficit comercial?",
                cables: [
                    { color: "azul", texto: "Salía oro del país, reduciendo la masa monetaria y haciendo bajar los precios internos hasta volverlos competitivos", correcta: true },
                    { color: "rojo", texto: "El Banco de Inglaterra le regalaba libras esterlinas a fondo perdido para tapar el déficit", correcta: false },
                    { color: "verde", texto: "El gobierno devaluaba su moneda por decreto rompiendo la paridad fija con el oro", correcta: false },
                    { color: "amarillo", texto: "Se prohibía la venta de bienes al exterior por cinco años consecutivos", correcta: false }
                ],
                impostorAfirmaciones: [
                    "Bajo el Patrón Oro, cada unidad monetaria nacional tenía una paridad legal fija e inmutable en peso de oro.",
                    "Los bancos centrales debían asegurar la libre convertibilidad de sus billetes en monedas o barras de oro.",
                    "En el Patrón Oro, los bancos centrales aplicaban libremente controles de cambios y cepos monetarios.",
                    "La libra esterlina británica actuaba como la principal moneda de liquidación y reserva internacional."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Ajuste Precio-Flujo en Especie", definicion: "Teoría de David Hume que explica cómo el flujo de oro reequilibra automáticamente la balanza de pagos." }
            }
        ]
    },

    estadistica: {
        id: "estadistica",
        nombre: "Estadística 1",
        catedra: "Cátedra Estadística 1 - UADE",
        titular: "Cátedra de Métodos Cuantitativos UADE",
        color: "#8b5cf6",
        criterioDocente: `CRITERIO DE EVALUACIÓN DE CÁTEDRA (UADE Estadística 1):
- EXIGENCIA METODOLÓGICA ABSOLUTA: Todo resultado numérico debe estar respaldado por su fórmula explícita y desarrollo paso a paso. Cálculos sin procedimiento o respuestas sueltas se anulan con 0 puntos.
- Problema 1: Probabilidad en tablas de contingencia 2x2. Distinguir rigurosamente entre:
  • Probabilidad conjunta P(A ∩ B)
  • Probabilidad condicional P(A | B) = P(A ∩ B) / P(B)
  • Verificación FORMAL de Independencia Estadística: P(A | B) = P(A) o P(A ∩ B) = P(A) * P(B).
  • Regla de la adición P(A ∪ B) = P(A) + P(B) - P(A ∩ B).
  • Muestreo sin reposición (hipergeométrico).
- Problema 2: Datos agrupados en intervalos: Media x̄, S², S, Coeficiente de Variación CV = S / x̄ (homogeneidad ≤ 25%), Percentiles por interpolación y Moda modal.
- Escala oficial UADE: Menos de 60 = 1 a 3; 60 = 4; 70 = 5; 80 = 6; 85 = 7; 90 = 8; 95 = 9; 100 = 10.`,
        conceptosClave: ["Tabla de Contingencia 2x2", "Probabilidad Conjunta", "Probabilidad Condicional", "Independencia Estadística", "Regla de Adición", "Muestreo Sin Reposición", "Datos Agrupados en Intervalos", "Marca de Clase (xi)", "Media Aritmética", "Varianza Muestral", "Desvío Estándar", "Coeficiente de Variación (CV)", "Homogeneidad", "Percentil 85", "Moda Modal"],
        temarioPorModo: {
            "1er_parcial": {
                nombre: "1er Parcial",
                unidades: "Unidades 1 a 3 (Estadística Descriptiva y Probabilidad Básica)",
                conceptos: ["Distribución de frecuencias para datos agrupados en intervalos (amplitud, marca de clase, frecuencias relativas y acumuladas)", "Medidas de posición central (Media aritmética muestral y ponderada, Mediana por interpolación de clases, Moda)", "Medidas de dispersión y forma (Varianza muestral s² y poblacional σ², Desvío estándar, Coeficiente de variación CV)", "Espacio muestral, eventos y axiomas de probabilidad de Kolmogorov", "Regla de la Adición de probabilidades: P(A ∪ B) = P(A) + P(B) - P(A ∩ B)", "Probabilidad Condicional: P(A | B) = P(A ∩ B) / P(B)", "Regla de la Multiplicación y Tablas de contingencia 2x2", "Prueba formal de Independencia Estadística de sucesos (P(A ∩ B) = P(A)·P(B) o P(A|B) = P(A))"]
            },
            "2do_parcial": {
                nombre: "2do Parcial",
                unidades: "Unidades 4 a 6 (Teorema de Bayes, Variables Aleatorias y Distribuciones Teóricas)",
                conceptos: ["Teorema de la Probabilidad Total y Teorema de Bayes (Cálculo de probabilidades a posteriori ante pruebas diagnósticas, auditorías o tests de crédito)", "Variable Aleatoria Discreta (Función de cuantía p(x), función de distribución acumulada F(x), Esperanza Matemática E(X) = μ y Varianza Var(X) = σ²)", "Distribución Binomial (Proceso de Bernoulli, parámetros n y p, supuestos de independencia, cálculo de probabilidades P(X=k), media n·p y varianza n·p·(1-p))", "Distribución de Poisson (Tasa media de ocurrencia λ en intervalos de tiempo o espacio, cálculo de probabilidades P(X=k) = (e^-λ · λ^k) / k!, media y varianza λ)", "Aproximación de Poisson a la Binomial (condiciones: n grande, p pequeño)", "Variable Aleatoria Continua (Función de densidad f(x) y función de distribución F(x))", "Distribución Normal o Gaussiana (Parámetros μ y σ, propiedades de simetría, campana de Gauss)", "Estandarización de la variable Normal (Z = (X - μ) / σ) y lectura de tabla normal estándar para áreas acumuladas", "Problemas de percentiles y cálculo inverso en distribución normal (hallar el valor crítico X para una probabilidad acumulada)"]
            },
            "final": {
                nombre: "Examen Final Integral",
                unidades: "Integración Metodológica Total",
                conceptos: ["Articulación completa de estadística descriptiva de datos con inferencia y probabilidad", "Aplicación de Teorema de Bayes a árboles de decisión financiera", "Distribución Normal, aproximación de distribuciones y Teorema Central del Límite (comportamiento de la media muestral X̄)"]
            }
        },
        examenes: {
            "1er_parcial": {
                tituloModalidad: "1er Examen Parcial - Estadística 1",
                modelos: [
                    {
                        id: "estad_p1_m1",
                        nombre: "Modelo 1 (Oficial UADE Retail)",
                        badge: "Examen Real",
                        titulo: "1er Parcial · Modelo 1 (Retail & Call Center)",
                        subtitulo: "Examen real de cátedra: Probabilidades 2x2 y 400 llamadas en intervalos",
                        duracion: "120 min · Procedimiento paso a paso obligatorio",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 50,
                                pregunta: `PROBLEMA 1: ANÁLISIS DE VENTAS EN RETAIL Y PROBABILIDADES (50 Puntos)
Un hipermercado realizó un estudio cuantitativo sobre una muestra de 500 clientes según su forma de pago y el volumen de compra:
• 200 clientes pagaron con Tarjeta de Crédito (TC) y 300 con Débito/Efectivo (DE).
• Del total de 500 clientes, 150 realizaron compras mayores a $50.000 (M).
• De los 200 clientes que pagaron con Tarjeta de Crédito, 90 realizaron compras mayores a $50.000.

Construya mentalmente la tabla 2x2 y responda desarrollando fórmula y cálculo exacto:
a) (10 pts) Calcule la probabilidad conjunta: P(M ∩ TC).
b) (10 pts) Calcule la probabilidad condicional: P(M | TC).
c) (10 pts) Demuestre formalmente si los sucesos M y TC son INDEPENDIENTES verificando P(M | TC) = P(M).
d) (10 pts) Calcule la probabilidad de la unión: P(M ∪ TC).
e) (10 pts) Si se eligen al azar 3 clientes SIN REPOSICIÓN, calcule la probabilidad de que los 3 hayan pagado con Tarjeta de Crédito.`,
                                placeholder: "Detalle paso a paso: a) P(M ∩ TC), b) P(M | TC), c) Prueba formal, d) P(M ∪ TC), e) Sin reposición..."
                            },
                            {
                                numero: 2,
                                puntos: 50,
                                pregunta: `PROBLEMA 2: CALL CENTER Y DATOS AGRUPADOS EN INTERVALOS (50 Puntos)
Muestra de n = 400 llamadas en un centro de reclamos financieros:

| Intervalo de Duración (min) | Frecuencia (fi) |
| :--- | :--- |
| [0 - 4) | 60 |
| [4 - 8) | 140 |
| [8 - 12) | 120 |
| [12 - 16) | 60 |
| [16 - 20] | 20 |
| **Total (n)** | **400** |

Desarrolle con fórmulas de cátedra:
a) (10 pts) Media Aritmética (x̄) indicando marcas de clase (xi).
b) (10 pts) Varianza (S²), Desvío Estándar (S) y Coeficiente de Variación (CV = S / x̄). Diagnostique si la muestra es HOMOGÉNEA (CV ≤ 25%).
c) (10 pts) Percentil 85 (P85) indicando intervalo, Fi-1 y fórmula de interpolación. Interprete el resultado en minutos.
d) (10 pts) Moda (Mo) mediante la fórmula modal para datos agrupados.
e) (10 pts) ¿Qué porcentaje exacto de llamadas superó los 12 minutos de duración?`,
                                placeholder: "Detalle fórmulas y desarrollos: a) x̄, b) S y CV (homogeneidad), c) P85 con interpolación, d) Moda, e) % > 12 min..."
                            }
                        ]
                    },
                    {
                        id: "estad_p1_m2",
                        nombre: "Modelo 2 (Variante Créditos Bancarios)",
                        badge: "Variante B",
                        titulo: "1er Parcial · Modelo 2 (Créditos & Montos de Préstamos)",
                        subtitulo: "Variante complementaria: Probabilidades crediticias y datos agrupados de préstamos",
                        duracion: "120 min · Procedimiento obligatorio",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 50,
                                pregunta: `PROBLEMA 1: SOLICITUDES DE CRÉDITO Y PROBABILIDADES (50 Puntos)
Un banco digital analizó 600 solicitudes crediticias recibidas en el mes:
• 240 solicitudes fueron de Monotributistas (M) y 360 de empleados en Relación de Dependencia (RD).
• Del total de 600 solicitudes, 420 fueron Aprobadas (A) y 180 fueron Rechazadas (R).
• De los 240 Monotributistas, 120 resultaron Aprobados.

Desarrolle con procedimiento completo:
a) (10 pts) P(A ∩ M) - Probabilidad conjunta de ser Monotributista Y ser Aprobado.
b) (10 pts) P(A | M) - Probabilidad de aprobación DADO que el solicitante es Monotributista.
c) (10 pts) Verifique FORMALMENTE si la aprobación crediticia (A) es INDEPENDIENTE de la condición laboral de Monotributista (M).
d) (10 pts) P(A ∪ M) - Probabilidad de que una solicitud sea Aprobada O pertenezca a un Monotributista.
e) (10 pts) Si se toman 3 solicitudes al azar SIN REPOSICIÓN, calcule la probabilidad de que las 3 pertenezcan a empleados en Relación de Dependencia (RD).`,
                                placeholder: "Desarrolle cálculos paso a paso: a) Conjunta, b) Condicional, c) Independencia formal, d) Unión, e) Sin reposición..."
                            },
                            {
                                numero: 2,
                                puntos: 50,
                                pregunta: `PROBLEMA 2: MONTOS DE PRÉSTAMOS EN INTERVALOS (50 Puntos)
Muestra de n = 300 préstamos otorgados (en miles de pesos):

| Intervalo de Monto ($k) | Clientes (fi) |
| :--- | :--- |
| [100 - 200) | 45 |
| [200 - 300) | 105 |
| [300 - 400) | 90 |
| [400 - 500) | 45 |
| [500 - 600] | 15 |
| **Total (n)** | **300** |

Calcule con fórmulas y justifique:
a) (10 pts) Media aritmética (x̄) de los préstamos en miles de pesos.
b) (10 pts) Desvío estándar (S) y Coeficiente de Variación (CV). ¿Es la media un valor representativo del conjunto de préstamos? Fundamente con el criterio del 25%.
c) (10 pts) Percentil 75 (P75 o Tercer Cuartil Q3): Calcule por interpolación e interprete en dinero.
d) (10 pts) Moda (Mo) de los préstamos.
e) (10 pts) ¿Qué porcentaje de préstamos fue de al menos $400.000?`,
                                placeholder: "Desarrolle cálculos con fórmulas: a) x̄, b) CV y representatividad, c) P75 con interpolación, d) Mo, e) % ≥ $400k..."
                            }
                        ]
                    }
                ]
            },
            "2do_parcial": {
                tituloModalidad: "2do Examen Parcial - Estadística 1",
                modelos: [
                    {
                        id: "estad_p2_m1",
                        nombre: "Modelo 1 (Modelos Teóricos Discretos y Continuos)",
                        badge: "Oficial",
                        titulo: "2do Parcial · Modelo 1 (Binomial, Poisson y Normal)",
                        subtitulo: "Variables aleatorias y distribuciones teóricas de probabilidad",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 35,
                                pregunta: "Distribución Binomial: En una entidad bancaria, la probabilidad de que una solicitud online sea rechazada es p = 0.15. Si se reciben 12 solicitudes independientes, calcule: a) P(X = 2), b) P(X ≥ 1), c) Esperanza matemática y desvío estándar.",
                                placeholder: "Desarrolle aplicando la fórmula binomial P(X = k)..."
                            },
                            {
                                numero: 2,
                                puntos: 35,
                                pregunta: "Distribución de Poisson: En una mesa de dinero ingresan órdenes a razón de λ = 4 órdenes por minuto. Calcule: a) P(X = 0) en un minuto, b) Probabilidad de más de 8 órdenes en un lapso de 3 minutos (ajuste de parámetro), c) Varianza del proceso.",
                                placeholder: "Desarrolle aplicando la distribución de Poisson..."
                            },
                            {
                                numero: 3,
                                puntos: 30,
                                pregunta: "Distribución Normal: El rendimiento diario de un fondo común sigue una distribución normal con μ = 0.08% y σ = 0.25%. Tipifique mediante Z y calcule: a) Probabilidad de rendimiento negativo P(X < 0), b) Rendimiento superado sólo por el 5% de los mejores días (P95).",
                                placeholder: "Desarrolle la estandarización Z y uso de tabla normal..."
                            }
                        ]
                    }
                ]
            },
            "final": {
                tituloModalidad: "Examen Final Integrador - Estadística 1",
                modelos: [
                    {
                        id: "estad_final_m1",
                        nombre: "Modelo 1 (Programa Completo de Métodos Cuantitativos)",
                        badge: "Final",
                        titulo: "Examen Final · Modelo 1 (Bayes, TCL y Descriptiva)",
                        subtitulo: "Integración metodológica: Teorema de Bayes, Teorema Central del Límite y Análisis de Dispersión",
                        duracion: "150 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 35,
                                pregunta: "Teorema de Bayes y Calificación Crediticia: En una cartera corporativa, el 70% de las empresas son de Bajo Riesgo (B) y el 30% de Alto Riesgo (A). P(D|A) = 0.20 y P(D|B) = 0.02. Si una empresa cae en default, calcule por Bayes la probabilidad de que perteneciera al grupo de Bajo Riesgo: P(B|D).",
                                placeholder: "Desarrolle probabilidad total y teorema de Bayes..."
                            },
                            {
                                numero: 2,
                                puntos: 35,
                                pregunta: "Teorema Central del Límite (TCL): El monto gastado por cliente tiene μ = $25.000 y σ = $8.000 (distribución desconocida). Si se toma una muestra aleatoria de n = 64 clientes, calcule la probabilidad de que la media muestral X̄ supere los $27.000. Justifique la validez del TCL.",
                                placeholder: "Aplique el TCL con error estándar σ/√n..."
                            },
                            {
                                numero: 3,
                                puntos: 30,
                                pregunta: "Comparación de Medidas de Dispersión: Explique por qué el desvío estándar no debe utilizarse directamente para comparar la dispersión de dos acciones que cotizan a precios muy dispares ($100 vs $50.000), y fundamente el uso del Coeficiente de Variación (CV).",
                                placeholder: "Fundamente el coeficiente de variación y la dispersión relativa..."
                            }
                        ]
                    }
                ]
            }
        },
        conceptosJuegos: [
            {
                id: "estad_c1",
                nombre: "Probabilidad Condicional y Bayes",
                guia: "La probabilidad condicional P(A|B) evalúa la ocurrencia de A habiendo ocurrido B: P(A ∩ B) / P(B).",
                preguntaBomba: "¿Cuál es la fórmula matemática formal para calcular la probabilidad condicional de A dado B?",
                cables: [
                    { color: "azul", texto: "P(A | B) = P(A ∩ B) / P(B)", correcta: true },
                    { color: "rojo", texto: "P(A | B) = P(A) * P(B) + P(A ∪ B)", correcta: false },
                    { color: "verde", texto: "P(A | B) = P(A) / P(A ∩ B)", correcta: false },
                    { color: "amarillo", texto: "P(A | B) = 1 - P(A ∪ B)", correcta: false }
                ],
                impostorAfirmaciones: [
                    "Si dos sucesos son independientes, se cumple estrictamente que P(A | B) = P(A).",
                    "La regla de adición general establece que P(A ∪ B) = P(A) + P(B) - P(A ∩ B).",
                    "Dos sucesos mutuamente excluyentes con probabilidad positiva son siempre independientes.",
                    "El Teorema de Bayes permite calcular probabilidades a posteriori actualizando las previas."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Independencia Estadística", definicion: "Condición matemática donde la ocurrencia de B no altera la probabilidad de A: P(A|B) = P(A)." }
            },
            {
                id: "estad_c2",
                nombre: "Coeficiente de Variación (CV) y Homogeneidad",
                guia: "CV = (S / x̄) * 100%. Medida relativa de dispersión adimensional. Si CV ≤ 25%, la muestra es homogénea y la media es representativa.",
                preguntaBomba: "¿Cuándo se considera que una media aritmética es representativa según el criterio oficial de homogeneidad de cátedra UADE?",
                cables: [
                    { color: "azul", texto: "Cuando el Coeficiente de Variación (CV) es menor o igual al 25%", correcta: true },
                    { color: "rojo", texto: "Cuando el desvío estándar es exactamente el doble que la varianza", correcta: false },
                    { color: "verde", texto: "Únicamente si la mediana coincide con el percentil 99", correcta: false },
                    { color: "amarillo", texto: "Cuando la muestra tiene menos de 10 observaciones", correcta: false }
                ],
                impostorAfirmaciones: [
                    "El Coeficiente de Variación es una medida adimensional que permite comparar dispersiones de distintas unidades.",
                    "Se calcula como el cociente entre el desvío estándar y el valor absoluto de la media aritmética.",
                    "Un CV del 60% indica una distribución sumamente homogénea y altamente concentrada en el promedio.",
                    "La varianza tiene las unidades de la variable elevadas al cuadrado."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Coeficiente de Variación (CV)", definicion: "Cociente S / x̄ que mide la dispersión relativa y valida si la media es representativa (≤ 25%)." }
            },
            {
                id: "estad_c3",
                nombre: "Percentil 85 en Datos Agrupados",
                guia: "Cuantil que deja por debajo al 85% de las observaciones y por encima al 15% restante mediante interpolación lineal de frecuencias acumuladas.",
                preguntaBomba: "¿Qué representa conceptualmente el Percentil 85 (P85) en una distribución de datos?",
                cables: [
                    { color: "azul", texto: "El valor de la variable que no es superado por el 85% de las observaciones de la muestra", correcta: true },
                    { color: "rojo", texto: "El promedio entre el valor mínimo y el 85% del valor máximo", correcta: false },
                    { color: "verde", texto: "El intervalo que concentra a las 85 observaciones con mayor frecuencia", correcta: false },
                    { color: "amarillo", texto: "La probabilidad fija de cometer un error tipo I del 85%", correcta: false }
                ],
                impostorAfirmaciones: [
                    "Para ubicar el intervalo del P85 se busca el primer intervalo cuya frecuencia acumulada Fi cubra 0.85 * n.",
                    "La fórmula de interpolación utiliza el límite inferior del intervalo y su amplitud c.",
                    "El percentil 50 de una distribución es exactamente igual al promedio ponderado en cualquier distribución asimétrica.",
                    "El percentil 85 es superado únicamente por el 15% de las observaciones superiores."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Percentil 85 (P85)", definicion: "Medida de posición que divide la distribución dejando el 85% de observaciones por debajo." }
            },
            {
                id: "estad_c4",
                nombre: "Distribución Normal Estándar Z",
                guia: "Curva simétrica en forma de campana con media 0 y varianza 1 tipificada por la fórmula Z = (X - μ) / σ.",
                preguntaBomba: "¿Cuál es la transformación requerida para estandarizar una variable continua X ~ N(μ, σ)?",
                cables: [
                    { color: "azul", texto: "Z = (X - μ) / σ", correcta: true },
                    { color: "rojo", texto: "Z = (X * μ) / σ²", correcta: false },
                    { color: "verde", texto: "Z = (X - σ) / μ", correcta: false },
                    { color: "amarillo", texto: "Z = √(X² + μ²)", correcta: false }
                ],
                impostorAfirmaciones: [
                    "El área total bajo la curva de densidad normal estandarizada es estrictamente igual a 1.",
                    "Aproximadamente el 68.2% de los datos se ubican en el intervalo [μ - σ, μ + σ].",
                    "La distribución normal es asimétrica hacia la derecha con media superior a la mediana.",
                    "En Z = 0 la distribución normal alcanza su valor máximo de densidad."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Tipificación Z", definicion: "Transformación (X - μ) / σ que convierte cualquier variable normal en Normal Estándar N(0, 1)." }
            },
            {
                id: "estad_c5",
                nombre: "Muestreo Sin Reposición (Hipergeométrica)",
                guia: "Cuando los elementos no vuelven a la población, los ensayos sucesivos son dependientes y la probabilidad cambia en cada extracción.",
                preguntaBomba: "Si de 500 clientes (200 con tarjeta) extraemos 3 al azar sin reposición, ¿cómo se calcula la probabilidad de que los 3 usen tarjeta?",
                cables: [
                    { color: "azul", texto: "(200/500) * (199/499) * (198/498)", correcta: true },
                    { color: "rojo", texto: "(200/500)³ sin modificar el denominador", correcta: false },
                    { color: "verde", texto: "3 * (200/500) / 300", correcta: false },
                    { color: "amarillo", texto: "(200/500) + (199/500) + (198/500)", correcta: false }
                ],
                impostorAfirmaciones: [
                    "En el muestreo sin reposición la composición de la población se modifica tras cada extracción.",
                    "Los sucesos sucesivos de extracción son dependientes entre sí.",
                    "En extracciones sin reposición, la probabilidad del segundo elemento siempre es idéntica a la del primero.",
                    "Si la población fuera infinita o con reposición, el modelo aplicable sería el Binomial."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Muestreo Sin Reposición", definicion: "Proceso donde cada extracción reduce el espacio muestral y genera probabilidades condicionales sucesivas." }
            }
        ]
    },

    contabilidad: {
        id: "contabilidad",
        nombre: "Contabilidad 1",
        catedra: "Cátedra Cdra. Alicia Landini - UADE",
        titular: "Cdra. Alicia Landini",
        color: "#ec4899",
        criterioDocente: `CRITERIO DE EVALUACIÓN DE CÁTEDRA (Cdra. Alicia Landini):
- Estructura dual estricta del parcial oficial:
  • 30% TEÓRICO: 13 preguntas Multiple Choice de 6 opciones (A, B, C, D, Todas son correctas, Ninguna es correcta).
    REGLA DE ORO OBLIGATORIA: El alumno debe justificar OBLIGATORIAMENTE en el campo de texto las opciones que NO marcó (descartadas) para que el ítem sume puntos.
  • 70% PRÁCTICO: Caso integral de 4 meses con Libro Diario:
    1) Asientos de suscripción e integración de capital social.
    2) Variación patrimonial obligatoria al lado de cada cuenta (A+, A-, P+, P-, PN+, R+, R-).
    3) Partida doble perfecta: Debe = Haber.
    4) Leyenda documental respaldatoria obligatoria: S/ Acta Constitutiva, S/ Factura Original, S/ Minuta Contable, S/ Recibo.
    5) Mayorización y Balance de Sumas y Saldos / Situación Patrimonial.
- Escala oficial UADE: Menos de 60 pts = Desaprobado (1 a 3); 60 = 4; hasta 100 = 10.`,
        conceptosClave: ["Ecuación Patrimonial Fundamental", "Variaciones Permutativas", "Variaciones Modificativas", "Principio de Devengado", "Valuación al Costo", "Prudencia", "Suscripción de Capital", "Integración de Capital", "Libro Diario", "Debe y Haber", "Leyenda Documental Respaldatoria", "Balance de Sumas y Saldos", "CMV (Costo de Mercaderías Vendidas)", "Intereses Positivos y Negativos a Devengar"],
        temarioPorModo: {
            "1er_parcial": {
                nombre: "1er Parcial",
                unidades: "Unidades 1 a 4 (Ecuación Patrimonial, Partida Doble, Asientos y Comprobantes)",
                conceptos: ["Ecuación Patrimonial Fundamental Estática (A = P + PN) y Dinámica (A = P + Capital + Resultados Acumulados + Ingresos - Gastos)", "Cuentas contables: Naturaleza, débitos, créditos y saldos normales", "Variaciones Patrimoniales Permutativas (sectoriales y entre sectores) y Modificativas (positivas y negativas)", "Documentación de respaldo comercial: Facturas A/B/C, Recibos, Remitos, Notas de Débito y Crédito comerciales y bancarias", "Registración en Libro Diario (Criterio Cátedra Landini: Debe, Haber, cuentas normalizadas y comprobante de respaldo)", "Mayorización de cuentas y confección del Balance de Comprobación de Sumas y Saldos (8 columnas)"]
            },
            "2do_parcial": {
                nombre: "2do Parcial",
                unidades: "Unidades 5 a 8 (Rubros Específicos: Caja y Bancos, Créditos, Inventarios y Bienes de Uso)",
                conceptos: ["Caja y Bancos: Arqueo de caja chica y fondos fijos (faltantes y sobrantes de caja), Conciliación Bancaria completa (libro banco vs extracto, partidas transitorias vs permanentes, asientos de ajuste obligatorios)", "Créditos por Ventas: Ventas a plazo con componentes financieros explícitos e implícitos (intereses positivos a devengar), Devengamiento periódico, Estimación y registro de la Previsión para Deudores Incobrables, reclasificación de deudores morosos y en gestión judicial", "Bienes de Cambio e Inventarios: Métodos de costeo PEPS (FIFO), UEPS (LIFO) y PPP (Precio Promedio Ponderado), Ficha de stock en unidades y valores monetarios, Determinación del Costo de Mercaderías Vendidas (CMV = Existencia Inicial + Compras - Existencia Final) y asientos de compra/venta", "Bienes de Uso: Criterio de incorporación al activo (precio de compra + gastos inherentes necesarios activables: fletes, seguros de traslado, instalación), Gastos de mantenimiento y reparaciones vs mejoras activables, Métodos de Depreciación/Amortización (línea recta según vida útil, unidades producidas, valor residual y valor recuperable), Asientos de depreciación del ejercicio acumulada, Venta y reemplazo de bienes de uso con determinación de Resultado por Venta"]
            },
            "final": {
                nombre: "Examen Final Integral",
                unidades: "Ciclo Contable Completo y Estados Contables Básicos (RT)",
                conceptos: ["Balance de saldos ajustado tras auditoría de rubros", "Asientos de refundición de cuentas de resultado (R+ y R-) determinando el Resultado del Ejercicio", "Asiento de cierre formal y reapertura de libros de cuentas patrimoniales", "Presentación de Estados Contables Básicos según Resoluciones Técnicas (RT 8 y 9): Estado de Situación Patrimonial y Estado de Resultados clasificado"]
            }
        },
        examenes: {
            "1er_parcial": {
                tituloModalidad: "1er Examen Parcial - Contabilidad 1",
                modelos: [
                    {
                        id: "cont_p1_m1",
                        nombre: "Modelo 1 (Oficial Alicia Landini)",
                        badge: "Examen Real",
                        titulo: "1er Parcial · Modelo 1 (Fintech Austral S.A.)",
                        subtitulo: "30% Teórico con Justificación de Descarte + 70% Práctico con Asientos y Balance",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 15,
                                pregunta: `BLOQUE I (PARTE TEÓRICA - 30% DEL PARCIAL): PREGUNTAS MULTIPLE CHOICE CON JUSTIFICACIÓN DE DESCARTE
(Para validar sus puntos teóricos, seleccione la/s opción/es correcta/s y JUSTIFIQUE OBLIGATORIAMENTE en el campo inferior por qué descartó las restantes opciones).

Pregunta T1: Principio de Devengado y Ejercicio Contable
Respecto al principio contable de DEVENGADO, determine la proposición correcta:
[A] Los resultados positivos (ganancias) se reconocen únicamente en el momento en que se cobra el dinero en efectivo.
[B] Los efectos patrimoniales de las operaciones se reconocen contablemente en los períodos en que se generan los hechos sustanciales, con total independencia de si se cobraron o pagaron.
[C] Los gastos devengados impagos no deben registrarse en el Libro Diario hasta su efectiva cancelación en el banco.
[D] El devengado sólo se aplica a los entes que no persiguen fines de lucro.
[E] Todas son correctas.
[F] Ninguna es correcta.

Pregunta T2: Variaciones Patrimoniales
Una compra de mercaderías financiada en cuenta corriente comercial a 30 días genera una variación patrimonial:
[A] Modificativa Negativa, porque aumenta la deuda con los proveedores.
[B] Permutativa Exclusiva del Activo.
[C] Permutativa Intersectorial o Mixta (aumenta un Activo y aumenta en igual medida un Pasivo, sin alterar el Patrimonio Neto).
[D] Modificativa Positiva, porque la empresa tiene más bienes de cambio en su inventario.
[E] Todas son correctas.
[F] Ninguna es correcta.`,
                                placeholder: "Indique la opción elegida para T1 y T2 Y JUSTIFIQUE DETALLADAMENTE por qué descartó cada una de las opciones no marcadas..."
                            },
                            {
                                numero: 2,
                                puntos: 15,
                                pregunta: `BLOQUE I (CONTINUACIÓN TEÓRICA):
Pregunta T3: Documentación Respaldatoria y Minuta Contable
¿Qué función contable cumple la Minuta Contable como comprobante de respaldo?
[A] Es un documento comercial externo emitido por la AFIP/ARCA para validar créditos fiscales.
[B] Es un comprobante interno emitido por el sector contable para respaldar registraciones que no poseen comprobante comercial externo directo (como determinación del CMV, devengamientos periódicos o refundición de cuentas).
[C] Sustituye formalmente a la factura de venta en transacciones con consumidores finales.
[D] Se utiliza exclusivamente para justificar el pago de sueldos en efectivo.
[E] Todas son correctas.
[F] Ninguna es correcta.

Pregunta T4: Medición de Bienes de Uso y Principio de Prudencia
Al ingresar una maquinaria al patrimonio, el costo de incorporación contable está integrado por:
[A] Únicamente el precio de contado facturado por el proveedor, excluyendo fletes e instalación.
[B] El precio de compra neto de contado más todos los gastos necesarios hasta poner el bien en condiciones de ser utilizado económicamente (flete, seguro de traslado, instalación y puesta a punto).
[C] El valor que la gerencia estime que valdrá la máquina dentro de diez años.
[D] El precio de lista financiado incluyendo intereses explícitos futuros.
[E] Todas son correctas.
[F] Ninguna es correcta.`,
                                placeholder: "Indique las respuestas a T3 y T4 Y JUSTIFIQUE OBLIGATORIAMENTE por qué descartó las opciones no seleccionadas..."
                            },
                            {
                                numero: 3,
                                puntos: 70,
                                pregunta: `BLOQUE II (PARTE PRÁCTICA - 70% DEL PARCIAL): CASO INTEGRAL DE 4 MESES "FINTECH AUSTRAL S.A."
Enunciado cronológico de operaciones:

1. 01/03 - Constitución: Se funda "Fintech Austral S.A.". Los socios suscriben $1.000.000 (10.000 acciones de $100 V/N). S/ Contrato Constitutivo.
2. 01/03 - Integración: Se integra:
   • $400.000 en efectivo que se deposita en cuenta corriente Banco Macro. S/ Boleta depósito.
   • $350.000 en Mercaderías de reventa. S/ Remito e inventario.
   • Saldo de $250.000 se integrará en 60 días.
3. 15/03 - Adquisición de Rodado: Se compra utilitario en $500.000. Se paga $200.000 vía transferencia Banco Macro y saldo con pagaré a 90 días con $30.000 de intereses a vencer (Total pagaré $330.000). S/ Factura original y pagaré.
4. 02/04 - Venta de Mercaderías: Se venden mercaderías por $600.000 (50% cheque al día y 50% c/c comercial a 30 días). S/ Factura duplicada.
   El CMV es de $250.000. S/ Minuta contable.
5. 30/04 - Devengamientos:
   • Se devengan intereses del pagaré correspondientes a 45 días ($15.000). S/ Minuta contable.
   • Factura de alquiler del local del mes por $80.000 recibida e impaga. S/ Factura recibida.

CONSIGNAS A CONFECCIONAR:
a) Asientos en el LIBRO DIARIO con cuentas, variación patrimonial (A+, A-, P+, P-, PN+, R+, R-), importes Debe/Haber y leyendas S/ (...).
b) Comprobación de Partida Doble (Total Debe = Total Haber).
c) Ecuación Patrimonial Final al 30/04: Activo = Pasivo + PN.`,
                                placeholder: `Confeccione aquí los asientos en formato de Libro Diario:
-------------------------------------------------------------
1/03: [Cuenta Debe] (Variación) $Importe  a  [Cuenta Haber] (Variación) $Importe | S/ (...)
...
Total Debe = $________ | Total Haber = $________
Balance al 30/04: Activo = Pasivo + PN`
                            }
                        ]
                    },
                    {
                        id: "cont_p1_m2",
                        nombre: "Modelo 2 (Variante Inversora del Plata S.A.)",
                        badge: "Variante B",
                        titulo: "1er Parcial · Modelo 2 (Inversora del Plata S.A.)",
                        subtitulo: "Variante oficial B: Bienes de uso, venta financiada con interés explícito y sueldos",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 15,
                                pregunta: `BLOQUE I: PARTE TEÓRICA CON JUSTIFICACIÓN DE DESCARTE (Preguntas T1 y T2):
Pregunta T1: Valuación al Costo vs. Valor Neto de Realización (VNR)
Para bienes de cambio de fácil comercialización con mercado transparente (ej: cereales o metales preciosos), las normas contables permiten valuar al:
[A] Costo histórico original reexpresado sin límite.
[B] Valor Neto de Realización (precio de venta de contado menos gastos directos de venta).
[C] Cero pesos para aplicar máxima prudencia.
[D] Valor nominal del capital suscripto.
[E] Todas son correctas.
[F] Ninguna es correcta.

Pregunta T2: Conciliación Bancaria y Tipología de Diferencias
Una nota de débito bancaria por comisiones de mantenimiento que aún no fue registrada por la empresa representa una:
[A] Diferencia temporaria o transitoria que se corrige sola el mes próximo.
[B] Diferencia permanente que exige obligatoriamente un asiento de ajuste en el Libro Diario.
[C] Variación modificativa positiva del patrimonio.
[D] Falsedad ideológica en los estados contables.
[E] Todas son correctas.
[F] Ninguna es correcta.`,
                                placeholder: "Indique opciones elegidas y JUSTIFIQUE OBLIGATORIAMENTE las opciones descartadas..."
                            },
                            {
                                numero: 2,
                                puntos: 15,
                                pregunta: `BLOQUE I: PARTE TEÓRICA (Preguntas T3 y T4):
Pregunta T3: Cuentas Regularizadoras del Activo
La cuenta 'Previsión para Deudores Incobrables' o 'Intereses Negativos a Devengar' tienen saldo:
[A] Deudor y aumentan el valor de los activos.
[B] Acreedor y restan o regularizan el valor de la cuenta principal en el Activo.
[C] Cero y no figuran en el Estado de Situación Patrimonial.
[D] De Patrimonio Neto como reserva legal.
[E] Todas son correctas.
[F] Ninguna es correcta.

Pregunta T4: Ecuación Contable Dinámica
La ecuación contable dinámica se formula matemáticamente como:
[A] Activo + Pasivo = Patrimonio Neto + Resultados.
[B] Activo + Gastos / Pérdidas = Pasivo + Capital + Ingresos / Ganancias.
[C] Activo = Resultados Acumulados / Ventas.
[D] Caja = Proveedores + Capital Social.
[E] Todas son correctas.
[F] Ninguna es correcta.`,
                                placeholder: "Indique respuestas y justifique detalladamente el descarte de las demás opciones..."
                            },
                            {
                                numero: 3,
                                puntos: 70,
                                pregunta: `BLOQUE II: CASO INTEGRAL "INVERSORA DEL PLATA S.A." (Marzo - Junio):
1. 05/03: Constitución e Integración: Se constituye la sociedad. Suscripción por $1.500.000. Los socios integran en el acto $800.000 con depósito en Banco Santander c/c, $500.000 en Mercaderías y el saldo a 30 días. S/ Acta y comprobantes.
2. 20/03: Se compran Instalaciones comerciales por $300.000 con cheque propio de Banco Santander. S/ Factura original.
3. 10/04: Venta de mercaderías por $700.000 en cuenta corriente a 60 días con un interés comercial del 10% financiado a vencer ($70.000). Total facturado: $770.000. Costo de la mercadería: $320.000. S/ Factura duplicada y minuta.
4. 30/04: Devengamiento de intereses de la venta correspondiente al primer mes ($35.000). S/ Minuta contable.
5. 31/05: Liquidación y devengamiento de los sueldos del personal del mes por $150.000, los cuales se abonarán el cuarto día hábil del mes siguiente. S/ Minuta de sueldos.

CONSIGNAS:
a) Libro Diario con cuentas, variaciones patrimoniales y leyendas.
b) Comprobación de partida doble (Debe = Haber).
c) Ecuación Patrimonial al 31/05.`,
                                placeholder: `Libro Diario:
-------------------------------------------------------------
5/03: ...
Total Debe = $________ | Total Haber = $________
Balance al 31/05: Activo = Pasivo + PN`
                            }
                        ]
                    }
                ]
            },
            "2do_parcial": {
                tituloModalidad: "2do Examen Parcial - Contabilidad 1",
                modelos: [
                    {
                        id: "cont_p2_m1",
                        nombre: "Modelo 1 (Rubros Patrimoniales y Valuación)",
                        badge: "Oficial",
                        titulo: "2do Parcial · Modelo 1 (Inventarios, Créditos y Arqueos)",
                        subtitulo: "Rubros específicos: Conciliación bancaria, PEPS/UEPS/PPP y Previsión incobrables",
                        duracion: "120 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 30,
                                pregunta: "Conciliación Bancaria y Arqueo de Caja: Diferencias permanentes vs temporarias. Registración de ajustes contables por notas de débito bancarias y faltante/sobrante de caja.",
                                placeholder: "Desarrolle conciliación bancaria y arqueo..."
                            },
                            {
                                numero: 2,
                                puntos: 35,
                                pregunta: "Valuación de Bienes de Cambio: Compare los métodos PEPS, UEPS y PPP en un escenario de inflación sostenida. Analice el impacto en el CMV y en el inventario final.",
                                placeholder: "Compare PEPS, UEPS y PPP..."
                            },
                            {
                                numero: 3,
                                puntos: 35,
                                pregunta: "Rubro Créditos: Previsión para Deudores Incobrables. Constitución al cierre, uso por incobrabilidad efectiva y recupero de previsión en exceso.",
                                placeholder: "Explique la mecánica de la previsión de incobrables..."
                            }
                        ]
                    }
                ]
            },
            "final": {
                tituloModalidad: "Examen Final Integrador - Contabilidad 1",
                modelos: [
                    {
                        id: "cont_final_m1",
                        nombre: "Modelo 1 (Ciclo Contable y Estados Contables Básicos)",
                        badge: "Final",
                        titulo: "Examen Final · Modelo 1 (Ciclo y Balances Finales)",
                        subtitulo: "Estados contables básicos (RT), refundición de resultados y balance general",
                        duracion: "150 min · 60 pts para aprobar",
                        consignas: [
                            {
                                numero: 1,
                                puntos: 35,
                                pregunta: "Los Cuatro Estados Contables Básicos: Estado de Situación Patrimonial, Estado de Resultados, Estado de Evolución del Patrimonio Neto y Estado de Flujo de Efectivo. Objetivos e interrelación.",
                                placeholder: "Desarrolle los 4 estados contables..."
                            },
                            {
                                numero: 2,
                                puntos: 35,
                                pregunta: "Cierre de Ejercicio: Asiento de refundición de cuentas de resultado y asiento de cierre de cuentas patrimoniales en los libros Diario y Mayor.",
                                placeholder: "Explique los asientos de cierre de ejercicio..."
                            },
                            {
                                numero: 3,
                                puntos: 30,
                                pregunta: "Criterios de Medición al Cierre: Regla de costo o mercado el menor, y concepto de Valor Recuperable (mayor entre VNR y VUE).",
                                placeholder: "Desarrolle el valor límite de los activos..."
                            }
                        ]
                    }
                ]
            }
        },
        conceptosJuegos: [
            {
                id: "cont_c1",
                nombre: "Principio de Devengado",
                guia: "Los resultados económicos deben registrarse en el período en que suceden los hechos económicos, sin importar su cobro o pago.",
                preguntaBomba: "¿Cuándo debe registrarse una pérdida o gasto según el principio contable de devengado?",
                cables: [
                    { color: "azul", texto: "En el período en que se genera el hecho económico, independientemente de cuándo se pague", correcta: true },
                    { color: "rojo", texto: "Únicamente en el momento en que se emite el cheque o se transfiere el dinero bancario", correcta: false },
                    { color: "verde", texto: "Al año siguiente cuando el contador general firma los estados contables", correcta: false },
                    { color: "amarillo", texto: "Sólo si el gasto genera una factura electrónica con CAE de la AFIP", correcta: false }
                ],
                impostorAfirmaciones: [
                    "El devengado asigna los ingresos y egresos al ejercicio económico al cual corresponden.",
                    "Los alquileres devengados del mes no pagados generan una deuda (Alquileres a Pagar) y un resultado negativo.",
                    "Bajo el principio de devengado, una venta no se registra si el cliente no la pagó de contado en el mostrador.",
                    "El criterio de lo percibido sólo atiende a los flujos efectivos de entrada y salida monetaria."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Principio de Devengado", definicion: "Reconocimiento patrimonial de hechos económicos cuando se generan, no cuando se cobran o pagan." }
            },
            {
                id: "cont_c2",
                nombre: "Variación Patrimonial Permutativa vs Modificativa",
                guia: "Permutativa: no altera la cuantía del Patrimonio Neto; Modificativa: altera el PN mediante ingresos, gastos, ganancias o pérdidas.",
                preguntaBomba: "El depósito de $100.000 en efectivo en la cuenta corriente bancaria de la empresa genera una variación:",
                cables: [
                    { color: "azul", texto: "Permutativa exclusiva del Activo (aumenta Banco y disminuye Caja en igual valor)", correcta: true },
                    { color: "rojo", texto: "Modificativa Positiva porque el dinero está seguro en un banco", correcta: false },
                    { color: "verde", texto: "Modificativa Negativa por las comisiones que cobrará el banco", correcta: false },
                    { color: "amarillo", texto: "Permutativa del Pasivo porque el banco contrae una deuda con nosotros", correcta: false }
                ],
                impostorAfirmaciones: [
                    "Una variación permutativa cambia la composición cualitativa del patrimonio sin modificar el total del PN.",
                    "Una variación modificativa involucra necesariamente al menos una cuenta de Resultado Positivo o Negativo.",
                    "El cobro en efectivo de una venta con ganancia genera una variación puramente permutativa.",
                    "El pago de un pasivo con efectivo es una variación permutativa intersectorial (A- y P-)."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Variación Modificativa", definicion: "Operación que altera la cuantía del Patrimonio Neto por generación de resultados económicos." }
            },
            {
                id: "cont_c3",
                nombre: "Suscripción e Integración de Capital",
                guia: "Suscripción es el compromiso jurídico de aportar; Integración es la entrega real y efectiva de los bienes o fondos aportados.",
                preguntaBomba: "¿Qué asiento contable registra la suscripción de capital de una Sociedad Anónima?",
                cables: [
                    { color: "azul", texto: "Accionistas (A+) al Debe contra Capital Social (PN+) al Haber", correcta: true },
                    { color: "rojo", texto: "Caja (A+) al Debe contra Ventas (R+) al Haber", correcta: false },
                    { color: "verde", texto: "Banco Cuenta Corriente (A+) al Debe contra Proveedores (P+) al Haber", correcta: false },
                    { color: "amarillo", texto: "Capital Social (PN-) al Debe contra Gastos Generales (R-) al Haber", correcta: false }
                ],
                impostorAfirmaciones: [
                    "La suscripción genera un derecho de cobro para la sociedad contra los socios (cuenta deudora del Activo).",
                    "El Capital Social es una cuenta representativa del Patrimonio Neto que se acredita al constituirse.",
                    "La integración de capital ocurre automáticamente sin necesidad de que los socios entreguen ningún bien.",
                    "La cuenta 'Accionistas' o 'Socios Cta. Aporte' se acredita cuando los socios integran sus aportes."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Suscripción de Capital", definicion: "Compromiso legal inicial asumido por los socios de aportar fondos a la sociedad constituida." }
            },
            {
                id: "cont_c4",
                nombre: "Minuta Contable y Determinación del CMV",
                guia: "Comprobante interno que respalda asientos sin documento comercial externo directo, como el devengamiento o la registración del CMV.",
                preguntaBomba: "¿Qué documentación respaldatoria respalda formalmente el asiento de Costo de Mercaderías Vendidas (CMV)?",
                cables: [
                    { color: "azul", texto: "Minuta contable interna de determinación del costo de venta", correcta: true },
                    { color: "rojo", texto: "Factura de venta original emitida por el proveedor de luz", correcta: false },
                    { color: "verde", texto: "Pagaré comercial firmado por el cliente moroso", correcta: false },
                    { color: "amarillo", texto: "Contrato de alquiler timbrado ante escribano", correcta: false }
                ],
                impostorAfirmaciones: [
                    "El asiento del CMV debita la cuenta de resultado negativo 'CMV' y acredita la cuenta de activo 'Mercaderías'.",
                    "La minuta contable es un comprobante de uso y emisión estrictamente interna.",
                    "El CMV debe coincidir exactamente con el precio total cobrado por la venta facturada al cliente.",
                    "La fórmula de inventario periódico para CMV es: Existencia Inicial + Compras Netas - Existencia Final."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Minuta Contable", definicion: "Documento respaldatorio interno para asientos no originados en comprobantes comerciales externos." }
            },
            {
                id: "cont_c5",
                nombre: "Balance de Sumas y Saldos",
                guia: "Instrumento de control contable que verifica que la suma de débitos sea igual a la de créditos y que los saldos deudores igualen a los acreedores.",
                preguntaBomba: "¿Cuál es la función primordial del Balance de Sumas y Saldos en el ciclo contable?",
                cables: [
                    { color: "azul", texto: "Comprobar la igualdad numérica de la partida doble en los mayores antes de los estados contables", correcta: true },
                    { color: "rojo", texto: "Liquidar el impuesto a las ganancias que se debe abonar a la entidad fiscal", correcta: false },
                    { color: "verde", texto: "Distribuir dividendos extraordinarios en efectivo a los directores", correcta: false },
                    { color: "amarillo", texto: "Anular todos los asientos registrados en el Libro Diario durante el año", correcta: false }
                ],
                impostorAfirmaciones: [
                    "En el balance de comprobación, el total de Sumas del Debe debe ser idéntico al total de Sumas del Haber.",
                    "El total de Saldos Deudores debe igualar al total de Saldos Acreedores.",
                    "Si el Balance de Sumas y Saldos balancea, garantiza con 100% de certeza que no se omitió ningún asiento.",
                    "Sirve de base fundamental para confeccionar los asientos de ajuste y los Estados Contables."
                ],
                impostorCorrecta: 2,
                memotestPar: { concepto: "Balance de Sumas y Saldos", definicion: "Planilla de comprobación aritmética de la partida doble de todos los mayores contables." }
            }
        ]
    }
};
