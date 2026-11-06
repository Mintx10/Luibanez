export function crearModeloIneditoProcedural(matId, modo, num, variantIndex = 0) {
    const timestamp = Date.now();
    const v = variantIndex % 4;
    const bankData = {
    "filosofia": {
        "1er_parcial": [
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Análisis de Fragmento Socrático: Confronte la postura de Calicles en el Gorgias ('el poder del más fuerte como ley natural') con la afirmación socrática de que la justicia consiste en gobernar las pasiones del alma. Explique el método dialéctico y la areté.",
                    "placeholder": "Desarrolle la confrontación entre Sócrates y Calicles..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Platón y la Teoría de la Reminiscencia (Menón): ¿Por qué para Platón 'aprender es recordar' (anámnesis)? Relacione la inmortalidad del alma con la visión previa de las Ideas en el Topos Uranos.",
                    "placeholder": "Explique la anámnesis y el conocimiento como recuerdo..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Aristóteles y la Metafísica del Ser: 'El Ser se dice de muchas maneras'. Explique esta célebre fórmula aristotélica, distinga la analogía del ser frente al unívoco parmenídeo y defina qué es la Ousía o sustancia.",
                    "placeholder": "Explique la polisemia del ser y la primacía de la sustancia..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "Heráclito y el Fuego Cósmico: ¿Por qué Heráclito eligió al Fuego como símbolo primordial del Logos y del cosmos eterno 'que ningún dios ni hombre hizo'? Relacione con la medida de los opuestos.",
                    "placeholder": "Desarrolle el significado del fuego como principio del devenir..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "Ética Aplicada a la Actividad Financiera: ¿Es legítimo desde la ética aristotélica perseguir el lucro financiero por sí mismo (crematística antinatural) o debe subordinarse a la economía doméstica y al bien común de la polis?",
                    "placeholder": "Confronte crematística natural vs antinatural en Aristóteles..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "La Alegoría de la Caverna (República VII): Explique detalladamente los cuatro grados del ser y del conocer (conjetura, creencia, pensamiento discursivo e intelección pura) y el ascenso del prisionero hacia la Idea del Bien.",
                    "placeholder": "Desarrolle la alegoría y los grados ontológicos y gnoseológicos..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Las Cuatro Causas de Aristóteles: Explique y ejemplifique la causa material, formal, eficiente y final. ¿Por qué la causa final posee primacía ontológica en la física y metafísica aristotélica (teleología)?",
                    "placeholder": "Desarrolle la teoría de las cuatro causas y la teleología..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Sócrates frente a los Sofistas: Compare la concepción sofística de la verdad (Protágoras: 'el hombre es la medida de todas las cosas') frente a la búsqueda socrática de definiciones universales y el examen moral de la vida.",
                    "placeholder": "Confronte relativismo sofístico vs universalismo socrático..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "Parménides y la Vía de la Verdad: Explique la tesis de que 'el ser es y el no-ser no es'. ¿Por qué para Parménides el cambio, el movimiento y la multiplicidad son meras ilusiones engañosas de los sentidos?",
                    "placeholder": "Explique el poema de Parménides y las propiedades del Ser inmutable..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "Ética a Nicómaco y la Felicidad: ¿Qué entiende Aristóteles por Eudaimonía? Explique por qué la virtud ética consiste en el 'justo medio' entre dos extremos viciosos (exceso y defecto).",
                    "placeholder": "Desarrolle la doctrina del término medio y la vida contemplativa..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Juicio y Muerte de Sócrates en la Apología: ¿Por qué Sócrates sostiene que 'una vida sin examen no merece ser vivida' y rehúsa renunciar a su misión filosófica a cambio de conservar la vida? Analice el papel de las leyes atenienses en el Critón.",
                    "placeholder": "Analice el juicio de Sócrates, la piedad y el deber hacia la polis..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "La Estructura Tripartita del Alma en Platón (Fedro): Analice el mito del carro alado. Describa las tres partes del alma (racional, irascible y apetitiva) y qué virtud cardinal corresponde a cada una para lograr la justicia.",
                    "placeholder": "Explique el mito del carro alado y la correspondencia con las virtudes..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Sustancia Primera y Sustancia Segunda en Aristóteles: A partir de las Categorías, diferencie la sustancia primera (individuo concreto, 'este hombre') de la sustancia segunda (género y especie). ¿Cómo resuelve Aristóteles la crítica al mundo de las ideas platónico?",
                    "placeholder": "Diferencie sustancia primera y segunda con ejemplos..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "El Problema del Arjé en los Filósofos Milesios: Compare las propuestas de Tales (Agua), Anaximandro (Ápeiron) y Anaxímenes (Aire). ¿Por qué representan el paso fundamental del Mito al Logos racional?",
                    "placeholder": "Analice la búsqueda del principio material primordial en Mileto..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "La Polis Ideal y la Justicia Platónica: ¿Cómo organiza Platón las tres clases sociales de la República y por qué fundamenta que solo los filósofos deben gobernar para garantizar una sociedad virtuosa?",
                    "placeholder": "Desarrolle la teoría del rey-filósofo y la justicia en la ciudad..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Mayéutica e Ironía Socrática: Analice cómo Sócrates destruye las falsas certezas de sus interlocutores para dar a luz la verdad latente en el alma. Confronte el saber moral con la mera técnica profesional.",
                    "placeholder": "Explique la función de la ironía y el alumbramiento mayéutico..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "El Banquete de Platón y la Escala de Eros: A partir del discurso de Diotima, analice el origen de Eros (hijo de Poros y Penía) y cómo el deseo de lo bello asciende desde los cuerpos individuales hasta la Belleza en sí.",
                    "placeholder": "Desarrolle la naturaleza de Eros y el ascenso dialéctico hacia la Belleza..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Hilemorfismo y Teoría del Cambio en Aristóteles: Explique los conceptos de Materia (hylé), Forma (morphé), Acto (enérgeia) y Potencia (dýnamis). ¿Cómo resuelve Aristóteles la aporía eleática del no-ser?",
                    "placeholder": "Explique la composición hilemórfica y el pasaje de la potencia al acto..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "Sofística y Nihilismo en Gorgias: Analice las tres tesis de Gorgias en 'Sobre el No-Ser' (nada existe; si existiera no sería cognoscible; si fuera cognoscible no sería comunicable) y el poder persuasivo de la retórica.",
                    "placeholder": "Desarrolle las tres tesis escépticas y la retórica sofística..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "El Primer Motor Inmóvil de Aristóteles: Explique por qué en el libro Lambda de la Metafísica se deduce la existencia de un principio supremo inmaterial, Acto Puro, que mueve como causa final al universo entero.",
                    "placeholder": "Analice la naturaleza del Motor Inmóvil y su forma de atracción..."
                }
            ]
        ],
        "2do_parcial": [
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "René Descartes y la Duda Metódica: Analice detalladamente los tres niveles sucesivos de la duda cartesiana (engaño de los sentidos, argumento del sueño e hipótesis del genio maligno). Explique por qué el 'Cogito ergo sum' resiste la duda hiperbólica y se convierte en la primera certeza indudable.",
                    "placeholder": "Desarrolle los 3 niveles de duda y el descubrimiento del Cogito..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "David Hume y la Crítica al Principio de Causalidad: A partir de la distinción entre impresiones e ideas, explique por qué para Hume no existe ninguna impresión que respalde la 'conexión necesaria' entre causa y efecto. ¿Qué rol juegan el hábito y la costumbre psicológica en nuestras expectativas?",
                    "placeholder": "Explique la crítica de Hume a la causalidad y el hábito..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Immanuel Kant y el Giro Copernicano: ¿Qué sostiene Kant al afirmar que los objetos deben regirse por nuestro conocimiento y no nuestro conocimiento por los objetos? Explique qué es un juicio sintético a priori y por qué es la base de la ciencia moderna.",
                    "placeholder": "Desarrolle la revolución copernicana kantiana y los juicios a priori..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "Ética Deontológica de Kant: La Buena Voluntad y el Imperativo Categórico: ¿Por qué para Kant nada es bueno sin restricción excepto la buena voluntad? Confronte el actuar 'por deber' con el actuar 'conforme al deber' y enuncie las dos fórmulas del Imperativo Categórico.",
                    "placeholder": "Desarrolle la buena voluntad, el deber y el imperativo categórico..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "Utilitarismo y Ética en Mercados Financieros: Compare el principio utilitarista de la mayor felicidad para el mayor número (Bentham y Mill) con la exigencia deontológica kantiana de transparencia irrestricta. ¿Es ético ocultar riesgos a inversores para evitar un pánico bancario?",
                    "placeholder": "Confronte utilitarismo vs deontología aplicado a la banca y finanzas..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Descartes y la Demostración de Dios: Explique la prueba cartesiana de la existencia de Dios por la idea de lo perfecto e infinito en la mente finita. ¿Por qué la veracidad divina es la pieza clave para derribar la hipótesis del genio maligno y validar la matemática y el mundo exterior?",
                    "placeholder": "Desarrolle la prueba de Dios y su función epistemológica de garantía..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Hume y la Disolución del 'Yo' o Sustancia Pensante: ¿Por qué sostiene Hume que al mirar en nuestro interior sólo hallamos impresiones pasajeras de frío, calor o dolor, pero nunca un 'yo' sustancial permanente? Explique la teoría del yo como 'haz o colección de percepciones'.",
                    "placeholder": "Analice la crítica empirista a la noción de alma sustancial..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Kant y la Estética Trascendental: Explique por qué el Espacio y el Tiempo no son propiedades de las cosas en sí (noúmenos) sino 'formas puras a priori de la sensibilidad humana'. Distinga entre Fenómeno y Noúmeno.",
                    "placeholder": "Desarrolle el espacio y tiempo como intuiciones puras y fenómeno vs noúmeno..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "Autonomía vs Heteronomía en la Moral Kantiana: Explique por qué Kant rechaza las éticas heterónomas basadas en premios celestiales o castigos terrenales. ¿Qué significa que el ser humano es un fin en sí mismo y legislador en el reino de los fines?",
                    "placeholder": "Explique la autonomía moral y la dignidad humana en Kant..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "Uso de Información Privilegiada (Insider Trading): Analice desde la ética del deber de Kant por qué operar en bolsa con información confidencial viola la fórmula de la ley universal y la dignidad de los demás participantes del mercado.",
                    "placeholder": "Aplique el imperativo categórico a la práctica de insider trading..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "La Segunda Meditación de Descartes y el Ejemplo del Trozo de Cera: ¿Cómo demuestra Descartes que los atributos sensibles de la cera (color, olor, figura, dureza) cambian al acercarse al fuego pero la cera permanece? ¿Por qué esta inspección es del entendimiento y no de los sentidos?",
                    "placeholder": "Analice el análisis de la cera y la primacía del intelecto..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "El Problema de la Inducción en David Hume: ¿Por qué ninguna cantidad de observaciones empíricas pasadas garantiza lógicamente que 'el sol saldrá mañana'? Explique por qué las ciencias de la naturaleza descansan sobre la creencia psicológica y no sobre la demostración matemática.",
                    "placeholder": "Desarrolle el problema de la inducción y la justificación del conocimiento empírico..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Kant y la Analítica Trascendental: 'Los pensamientos sin contenido son vacíos; las intuiciones sin conceptos son ciegas'. Explique esta célebre frase kantiana y cómo cooperan la Sensibilidad y el Entendimiento mediante las Categorías.",
                    "placeholder": "Explique la articulación entre intuiciones sensibles y conceptos puros..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "John Stuart Mill y la Calidad de los Placeres: ¿Cómo responde Mill a la crítica de que el utilitarismo es una 'filosofía de puercos'? Explique la distinción cualitativa entre placeres intelectuales y corporales ('es mejor ser un Sócrates insatisfecho que un cerdo satisfecho').",
                    "placeholder": "Desarrolle la doctrina de los placeres superiores en John Stuart Mill..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "Deber Fiduciario del Asesor Financiero: Analice el conflicto de interés cuando un asesor cobra comisiones encubiertas por colocar fondos de alto riesgo. Confronte la ética de la virtud profesional con el cálculo económico egoísta.",
                    "placeholder": "Desarrolle el deber fiduciario y la responsabilidad ética del profesional..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Confrontación Epistemológica: Racionalismo vs Empirismo: Compare rigurosamente la postura de Descartes (ideas innatas, criterio de claridad y distinción) frente a la de David Hume (tabla rasa, principio de copia y relaciones de ideas vs cuestiones de hecho).",
                    "placeholder": "Confronte racionalismo cartesiano vs empirismo de Hume..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Kant y la Dialéctica Trascendental: ¿Por qué para Kant la Metafísica tradicional no puede ser una ciencia? Explique las tres Ideas Trascendentales de la razón pura (Alma, Mundo, Dios) y su función regulativa en la búsqueda del saber.",
                    "placeholder": "Analice los límites del conocimiento y las ideas regulativas de la razón..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "El Dilema del Tranvía en la Filosofía Moral: Confronte la respuesta utilitarista (desviar el tranvía para sacrificar a 1 persona y salvar a 5) con la objeción deontológica kantiana (prohibición categórica de utilizar activamente a un ser humano como medio para un fin).",
                    "placeholder": "Analice el dilema del tranvía desde Kant y el consecuencialismo..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "Ética en la Gestión Corporativa: Análisis del Fraude Contable: Evalúe el maquillaje de balances financieros (ej. Enron o Lehman Brothers) a la luz del imperativo de veracidad kantiano y el daño colectivo a la confianza pública de mercado.",
                    "placeholder": "Analice la mentira y el falseamiento contable desde la deontología kantiana..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "El Ejemplo Kantiano del Comerciante: ¿Por qué para Kant el comerciante que cobra precios justos a niños y clientes novatos únicamente por temor a perder clientes 'obra conforme al deber pero sin mérito moral'? Explique el valor moral intrínseco.",
                    "placeholder": "Explique el mérito moral del acto por puro respeto a la ley moral..."
                }
            ]
        ],
        "final": [
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Ontología Comparada: Dualismo Platónico vs Fenómeno y Noúmeno Kantiano: Confronte el mundo de las Ideas de Platón con la distinción fenómeno/noúmeno en Kant. ¿Dónde reside la realidad objetiva y cómo se accede a ella en cada pensador?",
                    "placeholder": "Confronte la metafísica platónica con el idealismo trascendental kantiano..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Causalidad y Ciencia: De Aristóteles a David Hume: Compare la concepción teleológica de las cuatro causas aristotélicas con la crítica destructiva de Hume a la conexión necesaria. ¿Cómo fundamenta cada uno el orden del cosmos?",
                    "placeholder": "Compare la teleología aristotélica con el escepticismo de Hume sobre la causalidad..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Evolución de los Modelos Éticos: Cuadro comparativo entre: 1) Ética de las virtudes y el término medio (Aristóteles); 2) Deontología del imperativo categórico (Kant); 3) Utilitarismo consecuencialista (Mill). Analice sus fundamentos y diferencias.",
                    "placeholder": "Desarrolle el cuadro comparativo de los tres grandes paradigmas éticos..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "Sócrates y la Obligación Moral hacia las Leyes: A partir del Critón, analice por qué Sócrates prefiere acatar una sentencia de muerte injusta antes que desobedecer las leyes de Atenas y destruir la polis.",
                    "placeholder": "Analice el deber ciudadano y la justicia en el Critón..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "Deontología Profesional en Finanzas: Elabore una reflexión crítica sobre el rol social y ético del Licenciado en Finanzas de UADE ante dilemas de optimización de beneficios versus responsabilidad con la comunidad.",
                    "placeholder": "Desarrolle la ética profesional aplicada al sector financiero..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Evolución de la Epistemología: Trace el camino gnoseológico desde la mayéutica socrática y la anámnesis platónica, pasando por la duda metódica cartesiana, hasta la revolución copernicana de Kant.",
                    "placeholder": "Trace la evolución histórica de la teoría del conocimiento..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "El Problema de la Sustancia en la Historia: Compare cómo conciben la sustancia: 1) Parménides (Ser único); 2) Aristóteles (Ousía primera); 3) Descartes (Res cogitans, extensa e infinita); 4) Hume (rechazo de la sustancia).",
                    "placeholder": "Analice el concepto de sustancia a través de los autores clásicos y modernos..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Teorías de la Justicia: Platón vs Utilitarismo: Confronte la justicia como armonía jerárquica de las partes en la República de Platón frente a la justicia como maximización de la utilidad colectiva en Bentham y Mill.",
                    "placeholder": "Confronte la justicia platónica con la justicia utilitarista..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "Libertad y Autonomía Moral: Compare el concepto aristotélico de acto voluntario y deliberación con la autonomía de la voluntad kantiana. ¿Cuándo es un sujeto plenamente responsable de sus actos?",
                    "placeholder": "Desarrolle la libertad moral en Aristóteles y Kant..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "Asimetría Informativa y Ética de Mercados: Analice las implicancias éticas de la venta de derivados financieros complejos a clientes minoristas no capacitados. ¿Qué deber moral impone la buena fe contractual?",
                    "placeholder": "Evalúe la asimetría informativa y la protección del inversor..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Racionalismo vs Empirismo y la Síntesis Kantiana: Analice cómo Kant resuelve la disputa entre las ideas innatas de Descartes y la experiencia sensible de Hume, estableciendo los límites legítimos de la razón teórica.",
                    "placeholder": "Explique cómo Kant sintetiza racionalismo y empirismo..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "El Concepto de Felicidad en la Filosofía: Contraste la Eudaimonía aristotélica (vida según la virtud contemplativa) con la felicidad del utilitarismo (balance de placer sobre dolor). ¿Cuál ofrece una mejor guía para la vida humana?",
                    "placeholder": "Confronte la felicidad aristotélica vs la felicidad utilitarista..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "El Devenir y la Permanencia: Heráclito y Parménides: Analice el debate presocrático sobre el cambio. ¿Cómo reconcilia Aristóteles ambas posturas mediante su teoría del acto y la potencia?",
                    "placeholder": "Explique el debate del cambio en Heráclito, Parménides y la solución aristotélica..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "El Método Filosófico Comparado: Describa las características de: 1) Diálogo elenjos socrático; 2) Silogismo demostrativo aristotélico; 3) Método de la duda cartesiana; 4) Método crítico trascendental kantiano.",
                    "placeholder": "Compare los métodos filosóficos fundamentales..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "Códigos de Conducta y Transparencia Financiera: Explique por qué los estándares éticos (CFA Institute, CNV) exigen anteponer el interés del cliente sobre el interés propio o de la firma colocadora.",
                    "placeholder": "Fundamente los principios deontológicos de conducta fiduciaria..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Concepciones Antropológicas del Ser Humano: Analice la naturaleza del alma humana en Platón (carro alado y dualismo), Aristóteles (forma sustancial del cuerpo orgánico), Descartes (sustancia pensante separada del cuerpo mecánico) y Kant (sujeto moral autónomo).",
                    "placeholder": "Desarrolle la concepción del hombre en los cuatro grandes pensadores..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Doxa vs Episteme: Verdad y Apariencia: Desde el mito de la caverna platónico hasta el escepticismo moderado de Hume, analice qué distingue a la opinión subjetiva del conocimiento verdadero fundamentado.",
                    "placeholder": "Analice la distinción entre opinión y ciencia en Platón y la modernidad..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Medios y Fines en la Sociedad Contemporánea: Analice la segunda formulación del imperativo categórico kantiano ('obra de tal modo que uses a la humanidad siempre como fin y nunca como mero medio') frente al utilitarismo de costos/beneficios empresariales.",
                    "placeholder": "Desarrolle el principio de la humanidad como fin en sí mismo..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "El Tránsito del Mito al Logos en Grecia Antigua: Explique qué condiciones históricas, políticas y geográficas favorecieron el nacimiento de la filosofía en las colonias jonias frente a las explicaciones mítico-religiosas tradicionales.",
                    "placeholder": "Explique las causas del nacimiento del pensamiento racional en Grecia..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "Inteligencia Artificial y Ética Financiera: Reflexione sobre la delegación de decisiones de inversión y otorgamiento de créditos a algoritmos opacos. ¿Quién asume la responsabilidad moral ante fallas sistémicas?",
                    "placeholder": "Analice la responsabilidad moral y la IA en la toma de decisiones financieras..."
                }
            ]
        ]
    },
    "sfi": {
        "1er_parcial": [
            [
                {
                    "numero": 1,
                    "puntos": 20,
                    "pregunta": "BLOQUE I: Operaciones de la Fed: Distinga entre compras definitivas (Outright) y operaciones de Repos y Reverse Repos. Explique su efecto en la masa monetaria y en la tasa target.",
                    "placeholder": "Desarrolle la política monetaria y las OMO de la Fed..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Teorías de la Curva de Rendimientos (ETTI): Compare la Teoría de Expectativas Puras con la de Prima por Liquidez y Segmentación de Mercados.",
                    "placeholder": "Analice supuestos e implicancias de las tres teorías de la ETTI..."
                },
                {
                    "numero": 3,
                    "puntos": 25,
                    "pregunta": "Clasificación de Deuda Internacional: Eurobonos vs Bonos Extranjeros (Yankee, Samurai, Bulldog). Explique monedas, agentes colocadores y ventajas de emitir en euromercados.",
                    "placeholder": "Distinga emisiones internacionales con ejemplos prácticos..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "Hipótesis de Mercado Eficiente (Fama): Distinga las formas Débil, Semifuerte y Fuerte. ¿Por qué el análisis técnico no genera retornos extraordinarios según la forma débil?",
                    "placeholder": "Explique los tres niveles de eficiencia informacional de Eugene Fama..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "Impacto del Carry Trade y Subas de Tasas en Mercados Emergentes: Analice la fuga de capitales, depreciación cambiaria y riesgo soberano cuando la Fed endurece su política monetaria.",
                    "placeholder": "Desarrolle el canal de transmisión de la Fed a emergentes..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Mercado de Euromonedas y Préstamos Sindicados: ¿Cómo se originaron los eurodólares en Londres? Explique la estructura de un crédito bancario sindicado internacional (Lead Manager, Facility Agent y Bancos participantes).",
                    "placeholder": "Explique el funcionamiento de los préstamos sindicados y los euromercados..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Inversión de la Curva de Rendimientos de los Treasuries: Explique por qué el diferencial entre las tasas a 10 años y 2 años (10Y-2Y) se vuelve negativo y por qué históricamente anticipa recesiones económicas en EE.UU.",
                    "placeholder": "Analice las causas macroeconómicas de la inversión de la curva de rendimientos..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Swaps de Tasa de Interés (IRS): Un banco cambia flujos de tasa fija por tasa flotante (SOFR). Explique el funcionamiento del contrato, el nocional, los pagos netos y para qué se utiliza en cobertura de balances corporativos.",
                    "placeholder": "Desarrolle la mecánica de un IRS de tasa fija a flotante..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "Bonos Brady y Crisis de Deuda Emergente: Explique la reestructuración de deudas bancarias de los años 80/90 a través de bonos respaldados con Bonos cupón cero del Tesoro estadounidense.",
                    "placeholder": "Analice el Plan Brady y el nacimiento del mercado de bonos emergentes..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "Régimen de Tipo de Cambio Flotante vs Fijo: Compare ambos sistemas a la luz del Trilema Monetario de Mundell-Fleming. ¿Por qué un país no puede tener simultáneamente tipo de cambio fijo, libre movilidad de capitales y política monetaria independiente?",
                    "placeholder": "Explique el Trilema de la Trinidad Imposible de Mundell-Fleming..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Emisión Primaria vs Mercado Secundario en Treasuries: Distinga rigurosamente el rol del Departamento del Tesoro (subastas primarias a descuento de T-Bills) frente al rol de la Reserva Federal (intervenciones en secundario vía FOMC).",
                    "placeholder": "Explique la separación institucional entre Tesoro y FED..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Las Cuatro Grandes Tendencias de los Años 90: Analice la desregulación financiera, la globalización de capitales, la titulización de activos y la innovación con derivados. ¿Cómo impulsaron el paso del modelo bancocéntrico al modelo de mercado?",
                    "placeholder": "Desarrolle las 4 tendencias de los 90 y el cambio de modelo..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Gestión Activa vs Gestión Pasiva Indexada: A partir de la forma semifuerte de la Hipótesis de Mercado Eficiente, ¿por qué los fondos cotizados (ETFs) indexados han ganado terreno frente a los fondos mutuos de gestión activa?",
                    "placeholder": "Analice el debate entre gestión pasiva y activa según la HME..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "Tasa SOFR vs Antigua Tasa LIBOR: Explique por qué los reguladores globales reemplazaron la tasa Libor por la tasa SOFR (Secured Overnight Financing Rate) respaldada por operaciones de Repo con Treasuries.",
                    "placeholder": "Explique la transición de LIBOR a SOFR y el riesgo de manipulación..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "Ataques Especulativos y Crisis de Balanza de Pagos: Explique el modelo de primera generación de Paul Krugman sobre crisis cambiarias en países que intentan defender paridades fijas con déficit fiscal.",
                    "placeholder": "Desarrolle los modelos de crisis cambiaria y agotamiento de reservas..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Regulación Financiera Internacional de Basilea III: Explique los pilares de Basilea, el ratio de capital común Tier 1, el Coeficiente de Cobertura de Liquidez (LCR) y el Ratio de Fondeo Estable Neto (NSFR).",
                    "placeholder": "Desarrolle los estándares de solvencia y liquidez de Basilea III..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Mercados Forwards vs Futuros Financieros: Compare ambos instrumentos en cuanto a estandarización, mercado over-the-counter vs cámara compensadora (clearing house), margen inicial, margen de variación y riesgo de incumplimiento.",
                    "placeholder": "Compare contratos forwards vs futuros con cuadro comparativo..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Quantitative Easing (QE) y Expansión Cuantitativa: ¿En qué circunstancias los bancos centrales aplican QE? Explique cómo la compra de bonos de largo plazo aplana la curva de tasas y estimula la inversión privada.",
                    "placeholder": "Analice el QE como herramienta no convencional de política monetaria..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "Riesgo Soberano y Spread EMBI+: Explique cómo calcula JP Morgan el diferencial de rendimiento entre bonos de un país emergente y los Bonos del Tesoro de EE.UU. ¿Qué factores determinan la prima de riesgo país?",
                    "placeholder": "Explique la construcción del EMBI+ y los determinantes del riesgo país..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "El Euro y la Unión Económica y Monetaria: ¿Qué implicó la adopción de una moneda única sin una unión fiscal común? Analice los desequilibrios generados en la crisis de deuda soberana europea de 2010-2012.",
                    "placeholder": "Analice las tensiones de la unión monetaria europea sin unión fiscal..."
                }
            ]
        ],
        "2do_parcial": [
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "ADRs (American Depositary Receipts) y Acceso a Wall Street: Explique la estructura de emisión de ADRs, el rol del Banco Depositario y del Banco Custodio local. Distinga minuciosamente entre ADRs Nivel I (OTC), Nivel II (Bolsas reguladas) y Nivel III (Oferta pública con aumento de capital). ¿Qué exige la SEC y la Ley Sarbanes-Oxley (SOX)?",
                    "placeholder": "Desarrolle los niveles de ADRs, registro SEC y ley SOX..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Paridad de Tasas de Interés Cubierta (CIP) y No Cubierta (UIP): Formule matemáticamente la condición de arbitraje CIP: F = S * (1 + rd) / (1 + rf). Demuestre paso a paso cómo un operador financiero obtiene ganancias de arbitraje sin riesgo si el tipo de cambio forward de mercado difiere del teórico.",
                    "placeholder": "Desarrolle la fórmula CIP, arbitraje cubierto y paridad no cubierta..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Contratos de Opciones Financieras (Call y Put): Defina derechos y obligaciones del comprador (holder) y vendedor/lanzador (writer) de un Call y de un Put. Explique los conceptos de 'In the Money' (ITM), 'At the Money' (ATM) y 'Out of the Money' (OTM), y distinga entre valor intrínseco y valor tiempo.",
                    "placeholder": "Explique los 4 perfiles de opciones y los determinantes de la prima..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "Swaps de Tasa de Interés (IRS): Flujo Fijo vs Flotante contra SOFR: Diseñe un contrato IRS donde una empresa con deuda a tasa flotante intercambia flujos con un banco a tasa fija del 4.5% anual sobre un nocional de USD 50 millones. Calcule el flujo neto si la tasa SOFR semestral resulta ser 5.2%.",
                    "placeholder": "Desarrolle la liquidación neta y la cobertura del IRS..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "El Índice de Volatilidad VIX y Cobertura de Cola: Explique conceptualmente cómo se calcula el VIX a partir de los precios de las opciones fuera del dinero sobre el S&P 500. ¿Por qué se denomina el 'índice del miedo' y cómo se utiliza para coberturas de eventos de cisne negro?",
                    "placeholder": "Analice el índice VIX y su utilización en carteras de inversión..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Mecánica Institucional de los Futuros Financieros: Explique con precisión técnica el rol de la Cámara de Compensación (Clearing House), el mecanismo de novación contractual, el depósito de Margen Inicial, el cálculo del Margen de Variación diario (Mark-to-Market) y la llamada de margen (Margin Call).",
                    "placeholder": "Desarrolle la cámara compensadora y la liquidación mark-to-market..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Estrategia de Cobertura Cambiaria Corporativa: Una empresa exportadora argentina cobrará USD 2.000.000 dentro de 90 días. Compare dos alternativas de hedging: a) Venta de contratos forward de divisas; b) Compra de opciones Put sobre dólares. Analice ventajas, desventajas, costo inicial y perfil de riesgo de cada alternativa.",
                    "placeholder": "Compare forward vs put de cobertura para la exportadora..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Regulación Bancaria Basilea III en Liquidez y Solvencia: Analice en profundidad el Ratio de Cobertura de Liquidez (LCR a 30 días bajo estrés severo) y el Ratio de Fondeo Estable Neto (NSFR a 1 año). ¿Cómo evitan que los bancos colapsen por corridas de liquidez mayorista?",
                    "placeholder": "Desarrolle los ratios LCR y NSFR y su importancia regulatoria..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "La Crisis Financiera Global de 2008 y los Productos Estructurados: Explique el proceso de originación y securitización de hipotecas subprime en Bonos Respaldados por Hipotecas (MBS) y Obligaciones de Deuda Colateralizada (CDO). ¿Qué falló en las agencias de calificación crediticia y en el modelo 'originar para distribuir'?",
                    "placeholder": "Analice el colapso de las hipotecas subprime y los derivados estructurados..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "Cross-Currency Swaps (Swaps de Divisas): Explique la diferencia estructural entre un IRS tradicional y un Cross-Currency Swap. ¿Por qué en este último se produce un intercambio real del principal al inicio y al vencimiento, además de los pagos de cupones periódicos?",
                    "placeholder": "Desarrolle la estructura de pagos de un swap de divisas..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Estrategias con Opciones: Straddle y Protective Put: Diseñe y grafique cualitativamente el perfil de pérdidas y ganancias de: a) Un 'Protective Put' (acción comprada + put comprado) para proteger una cartera contra caídas; b) Un 'Long Straddle' (call comprado + put comprado al mismo precio de ejercicio) para apostar a un salto brusco de volatilidad.",
                    "placeholder": "Analice las estrategias protective put y straddle con sus zonas de ganancias..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Arbitraje Transfronterizo con ADRs y Tipo de Cambio Implícito: Una acción argentina cotiza en ByMA a $4.500 y su ADR cotiza en el NYSE a USD 15. Si el ratio de conversión es de 3 acciones locales por 1 ADR, calcule el Contado con Liquidación (CCL) implícito y explique la operativa de arbitraje si el dólar financiero sube a $1.000.",
                    "placeholder": "Cálculo matemático de paridad ADR y mecanismo de arbitraje..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Griegas de las Opciones Financieras (Delta y Vega): Defina qué mide el Delta de una opción (sensibilidad del precio de la opción ante variaciones del activo subyacente) y cómo se utiliza para construir una cobertura 'Delta Neutral'. Explique el significado de Vega ante shocks de volatilidad implícita.",
                    "placeholder": "Explique Delta, cobertura delta-neutral y sensibilidad Vega..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "Basilea III y los Colchones de Capital (Buffers): Explique el Colchón de Conservación de Capital (2.5%) y el Colchón Anticíclico (0% a 2.5%). ¿Por qué se exige a los Bancos de Importancia Sistémica Global (G-SIBs) un recargo adicional de capital Tier 1?",
                    "placeholder": "Desarrolle los colchones anticíclicos y la regulación para G-SIBs..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "La Crisis de Deuda Soberana Europea de 2010-2012: Analice los problemas estructurales de Grecia, Portugal, Irlanda y España (PIIGS), la disparidad en los rendimientos soberanos frente al Bund alemán y la trascendencia del discurso de Mario Draghi ('whatever it takes') del BCE.",
                    "placeholder": "Analice la crisis del euro y la intervención del BCE..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Perfil de Riesgo Asimétrico: Venta de Opciones Descubiertas (Naked Call): Explique por qué el lanzador de un Call descubierto asume un riesgo de pérdida potencialmente ilimitado a cambio de una ganancia máxima acotada al cobro de la prima. Confronte con el lanzamiento cubierto (Covered Call).",
                    "placeholder": "Analice el riesgo de la venta descubierta vs lanzamiento cubierto..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Forwards de Liquidación Financiera (NDF - Non-Deliverable Forwards): ¿En qué consisten los contratos NDF en monedas no convertibles o con control de cambios (cepos cambiarios)? Explique cómo se liquida la diferencia neta en dólares al vencimiento sin entrega física de la moneda local.",
                    "placeholder": "Explique el funcionamiento y liquidación de los contratos NDF..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "Banca en la Sombra (Shadow Banking) y Corridas de Repos: Analice el rol de las instituciones financieras no bancarias (fondos monetarios, vehículos de inversión estructurada SIVs). ¿Cómo provocó la pérdida de confianza en el colateral de repos el congelamiento del crédito interbancario en 2008?",
                    "placeholder": "Desarrolle el concepto de shadow banking y la corrida de liquidez en repos..."
                },
                {
                    "numero": 4,
                    "puntos": 15,
                    "pregunta": "ADRs Regla 144A y Regulación S: Distinga las colocaciones públicas registradas en la SEC de las emisiones privadas bajo la Regla 144A dirigidas a Compradores Institucionales Calificados (QIBs). ¿Qué ventajas de costo y rapidez ofrece a los emisores corporativos?",
                    "placeholder": "Compare ofertas públicas de ADRs con colocaciones privadas 144A..."
                },
                {
                    "numero": 5,
                    "puntos": 15,
                    "pregunta": "Gestión Integral de Riesgo de Mercado y Tasa de Interés: Proponga una combinación de derivados financieros (swaps de tasa y opciones de divisas) para inmunizar el balance de un banco comercial ante una suba simultánea de tasas de interés y una devaluación abrupta.",
                    "placeholder": "Diseñe la estrategia integral de inmunización de balance..."
                }
            ]
        ],
        "final": [
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Transmisión de Política Monetaria Global y Curva de Tasas: Analice cómo un ciclo restrictivo de la Reserva Federal (suba de Fed Funds y Quantitative Tightening) altera la pendiente de la curva de rendimientos (ETTI), eleva el costo de fondeo internacional y desata presiones devaluatorias y salidas de capitales en mercados emergentes.",
                    "placeholder": "Desarrolle la transmisión macrofinanciera de la Fed a nivel global..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Duration Modificada, Convexidad y Riesgo de Renta Fija: Formule e interprete la aproximación del cambio porcentual en el precio de un bono soberano: ΔP/P ≈ -D_mod * Δy + 0.5 * Convexidad * (Δy)². Explique por qué la convexidad es una propiedad sumamente deseable para el inversor.",
                    "placeholder": "Desarrolle duration, convexidad y sensibilidad de precios de bonos..."
                },
                {
                    "numero": 3,
                    "puntos": 25,
                    "pregunta": "Estrategias Corporativas Integradas con Derivados: Una corporación multinacional emitió bonos a tasa fija en euros a 5 años pero sus ingresos operativos provienen en dólares a tasa flotante. Diseñe la estructura de derivados (Cross-Currency IRS) para sincronizar flujos de caja y neutralizar el riesgo.",
                    "placeholder": "Diseñe la cobertura completa de moneda y tasa con derivados..."
                },
                {
                    "numero": 4,
                    "puntos": 25,
                    "pregunta": "Evolución de la Regulación Bancaria Global: Basilea I, II y III: Compare los tres acuerdos de Basilea. ¿Por qué Basilea I y II fracasaron en prever la crisis de 2008 y cómo transformó Basilea III la exigencia de capital común Tier 1, los colchones anticíclicos y el riesgo de liquidez sistémica?",
                    "placeholder": "Analice la evolución de Basilea y las reformas post-crisis de 2008..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Arquitectura Financiera Multilateral y el Rol del FMI: Analice el funcionamiento de los préstamos de ajuste del FMI, las condicionalidades macroeconómicas, la creación de Derechos Especiales de Giro (DEG) y su efectividad para contener crisis de balanza de pagos.",
                    "placeholder": "Desarrolle las funciones y críticas al FMI en crisis soberanas..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Mercado Cambiario y Eficiencia: Contraste la Paridad del Poder Adquisitivo (PPP) en el largo plazo con la Paridad de Tasas de Interés (CIP/UIP) en el corto plazo. ¿Por qué el Carry Trade desafía empíricamente la hipótesis de paridad no cubierta?",
                    "placeholder": "Confronte PPP, CIP, UIP y el funcionamiento del Carry Trade..."
                },
                {
                    "numero": 3,
                    "puntos": 25,
                    "pregunta": "Renta Variable Internacional y Gobierno Corporativo: Analice los beneficios para una empresa de listar ADRs Nivel III en Wall Street en términos de menor costo de capital, mayor liquidez de acciones y exigencias de transparencia bajo la Ley Sarbanes-Oxley.",
                    "placeholder": "Analice los determinantes del listado de ADRs y gobierno corporativo..."
                },
                {
                    "numero": 4,
                    "puntos": 25,
                    "pregunta": "Riesgo de Contraparte y Cámaras Compensadoras Centrales (CCP): A partir de la reforma del G20 tras 2008, analice por qué se obligó a liquidar los contratos de derivados OTC estandarizados a través de CCPs y cómo se gestiona el riesgo de colapso de una cámara.",
                    "placeholder": "Explique el rol de las CCPs en la estabilidad de los derivados globales..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "Deuda Soberana y Cláusulas de Acción Colectiva (CACs): Explique cómo operan las CACs en los contratos de bonos soberanos internacionales bajo ley extranjera (Nueva York/Londres) para evitar el bloqueo de acreedores 'holdouts' o fondos buitre durante una reestructuración.",
                    "placeholder": "Desarrolle el funcionamiento de las CACs en reestructuraciones de deuda..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Estructuras de Titulización (Securitización) y Credit Default Swaps (CDS): Explique la mecánica de un CDS como seguro de impago crediticio. ¿Cómo amplificó el mercado de CDS sintéticos el contagio financiero durante la caída de AIG y Lehman Brothers?",
                    "placeholder": "Explique la función de los CDS y su impacto multiplicador en crisis..."
                },
                {
                    "numero": 3,
                    "puntos": 25,
                    "pregunta": "Modelos de Eficiencia de Mercado y Finanzas Conductuales: Confronte la Hipótesis del Mercado Eficiente de Eugene Fama con las objeciones de las Finanzas Conductuales (Behavioral Finance de Shiller y Thaler): euforia irracional, aversión a la pérdida y efecto manada.",
                    "placeholder": "Compare la HME con los sesgos cognitivos de Behavioral Finance..."
                },
                {
                    "numero": 4,
                    "puntos": 25,
                    "pregunta": "Crisis Bancarias Comparadas: Confronte las causas estructurales de la Crisis Asiática de 1997 (descalce de moneda y vencimientos, tipo de cambio fijo) con la Crisis Financiera de 2008 (apalancamiento, titulización opaca y banca en la sombra).",
                    "placeholder": "Compare la crisis asiática del 97 y la crisis subprime del 2008..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 25,
                    "pregunta": "El Trilema Monetario de Mundell-Fleming en la Práctica Global: Compare las elecciones macroeconómicas de: a) Estados Unidos (política monetaria autónoma y libre movilidad de capitales con flotación cambiaria); b) Zona Euro (tipo de cambio fijo irrevocable con libre movilidad y política monetaria centralizada); c) China (tipo de cambio administrado con controles de cuenta capital).",
                    "placeholder": "Analice el Trilema de Mundell-Fleming en las principales economías mundiales..."
                },
                {
                    "numero": 2,
                    "puntos": 25,
                    "pregunta": "Riesgo de Tasa de Interés en el Balance Bancario: Analice el descalce entre activos bancarios a tasa fija de largo plazo (bonos soberanos y créditos hipotecarios) y pasivos a corto plazo (depósitos a la vista). Confronte con la quiebra de Silicon Valley Bank (SVB) en 2023.",
                    "placeholder": "Analice el riesgo de tasa de interés en balances y el colapso de SVB..."
                },
                {
                    "numero": 3,
                    "puntos": 25,
                    "pregunta": "Mercado de Dinero Internacional y Financiación en Eurodólares: Explique el funcionamiento de los papeles comerciales internacionales (Euro-CP) y los certificados de depósito negociables (Euro-CDs) como fuentes de liquidez mayorista para corporaciones globales.",
                    "placeholder": "Explique las fuentes de fondeo corporativo en el mercado de dinero..."
                },
                {
                    "numero": 4,
                    "puntos": 25,
                    "pregunta": "Estabilidad Financiera y Futuro del Sistema Monetario Internacional: Analice los debates en torno a la desdolarización del comercio internacional, el avance de monedas digitales de bancos centrales (CBDC) y los desafíos de gobernanza del sistema financiero mundial.",
                    "placeholder": "Evalúe el papel futuro del dólar, CBDCs y estabilidad financiera global..."
                }
            ]
        ]
    },
    "historia": {
        "1er_parcial": [
            [
                {
                    "numero": 1,
                    "puntos": 40,
                    "pregunta": "PARTE I (40 PUNTOS): LA SEGUNDA REVOLUCIÓN INDUSTRIAL Y EL ASCENSO DE EE.UU. Y ALEMANIA (1870-1914). Analice las innovaciones tecnológicas (acero, química, electricidad, petróleo), la gran empresa moderna con gerencia profesional (Chandler), el fordismo y la pérdida del liderazgo británico.",
                    "placeholder": "Desarrolle la Segunda Revolución Industrial y el nuevo liderazgo..."
                },
                {
                    "numero": 2,
                    "puntos": 20,
                    "pregunta": "PARTE II: LA PESTE NEGRA DE 1348. Analice el colapso demográfico, la escasez de siervos y la suba de salarios reales en la disolución del régimen feudal en Europa Occidental.",
                    "placeholder": "Desarrolle las consecuencias económicas de la Peste Negra..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "PARTE II: LA MÁQUINA DE VAPOR Y LA MINERÍA DEL CARBÓN. Explique el salto de la energía orgánica a la mineral y cómo la máquina de Watt transformó el transporte y la manufactura.",
                    "placeholder": "Analice la transición energética al carbón mineral..."
                },
                {
                    "numero": 4,
                    "puntos": 20,
                    "pregunta": "PARTE II: EL COLBERTISMO MERCANTILISTA. Describa la política industrial francesa, manufacturas reales, control de calidad y aduanas proteccionistas.",
                    "placeholder": "Desarrolle el mercantilismo colbertiano en Francia..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 40,
                    "pregunta": "PARTE I (40 PUNTOS): LA GRAN DEPRESIÓN DE 1873 A 1896 Y LA DIVISIÓN INTERNACIONAL DEL TRABAJO. Analice la caída sostenida de precios de materias primas y manufacturas, el avance de ferrocarriles y barcos a vapor, la oleada migratoria transatlántica y la especialización entre países centrales industrializados y periferias agroexportadoras.",
                    "placeholder": "Desarrolle la crisis de 1873 y la división internacional del trabajo..."
                },
                {
                    "numero": 2,
                    "puntos": 20,
                    "pregunta": "PARTE II: LA PRIMERA REVOLUCIÓN INDUSTRIAL BRITÁNICA (1760-1830). Explique las Leyes de Cercamiento (Enclosures), el despegue del sector textil algodonero en Lancashire y el nacimiento del sistema fabril (factory system).",
                    "placeholder": "Desarrolle los factores del despegue fabril británico..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "PARTE II: LA REVOLUCIÓN DE LOS PRECIOS EN EL SIGLO XVI. Analice el impacto de la llegada masiva de metales preciosos americanos a España y su difusión inflacionaria por el continente europeo según la teoría de Earl Hamilton.",
                    "placeholder": "Explique la teoría cuantitativa y la inflación del siglo XVI..."
                },
                {
                    "numero": 4,
                    "puntos": 20,
                    "pregunta": "PARTE II: LAS ACTAS DE NAVEGACIÓN Y EL MERCANTILISMO INGLÉS. Describa cómo las leyes marítimas de 1651 garantizaron el monopolio colonial de fletes a la flota británica y debilitaron a Holanda.",
                    "placeholder": "Desarrolle las Actas de Navegación y la hegemonía comercial británica..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 40,
                    "pregunta": "PARTE I (40 PUNTOS): LA TRANSICIÓN DEL FEUDALISMO AL CAPITALISMO EN EUROPA OCCIDENTAL. Analice las relaciones feudovasalláticas, el señorío feudal y la servidumbre. Explique el debate historiográfico entre Maurice Dobb, Paul Sweezy y Robert Brenner sobre los factores determinantes del cambio.",
                    "placeholder": "Desarrolle el debate historiográfico de la transición al capitalismo..."
                },
                {
                    "numero": 2,
                    "puntos": 20,
                    "pregunta": "PARTE II: EL FERROCARRIL Y LA UNIFICACIÓN DE MERCADOS. Explique el papel de la red ferroviaria como impulsora de las industrias pesadas (hierro, carbón) y articuladora del comercio interregional en el siglo XIX.",
                    "placeholder": "Analice el impacto integrador y económico del ferrocarril..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "PARTE II: LA FISIOCRACIA FRENTE AL MERCANTILISMO. Explique la doctrina del 'Cuadro Económico' de François Quesnay, por qué consideraban a la agricultura como la única actividad productora de 'producto neto' y el principio del laissez-faire.",
                    "placeholder": "Desarrolle los principios de la escuela fisiócrata..."
                },
                {
                    "numero": 4,
                    "puntos": 20,
                    "pregunta": "PARTE II: EL PATRÓN ORO INTERNACIONAL (1870-1914). Reglas del juego, libre convertibilidad, mecanismo de ajuste precio-flujo de Hume y rol hegemónico de la libra esterlina británica.",
                    "placeholder": "Desarrolle las reglas del patrón oro y el mecanismo de Hume..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 40,
                    "pregunta": "PARTE I (40 PUNTOS): FACTORES DETERMINANTES DE LA REVOLUCIÓN INDUSTRIAL EN INGLATERRA. Analice: 1) La Revolución Agrícola (enclosures y sistema Norfolk); 2) El marco institucional post-Revolución Gloriosa de 1688 y derechos de propiedad; 3) Dotación de carbón y canales navegables; 4) Comercio colonial ultramarino.",
                    "placeholder": "Desarrolle exhaustivamente las condiciones británicas de la industrialización..."
                },
                {
                    "numero": 2,
                    "puntos": 20,
                    "pregunta": "PARTE II: EL MERCANTILISMO Y EL BULLIONISMO. Defina metalismo, balanza comercial favorable, manufacturas reales y monopolios comerciales como la Compañía Holandesa de Indias Orientales (VOC).",
                    "placeholder": "Desarrolle los principios del mercantilismo y la VOC..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "PARTE II: LA INDUSTRIALIZACIÓN DE ALEMANIA Y LA BANCA MIXTA. El impacto del Zollverein (1834), la unificación de 1871 y la articulación entre grandes bancos de inversión (Grossbanken), cárteles y la industria química pesada.",
                    "placeholder": "Analice el modelo de industrialización alemán y el crédito..."
                },
                {
                    "numero": 4,
                    "puntos": 20,
                    "pregunta": "PARTE II: LA DEROGACIÓN DE LAS CORN LAWS EN INGLATERRA (1846). Explique el triunfo de los industriales de Manchester frente a los terratenientes agrarios, la teoría de las ventajas comparativas de David Ricardo y el advenimiento del librecambio.",
                    "placeholder": "Analice el debate de las leyes de cereales y el librecambio..."
                }
            ]
        ],
        "2do_parcial": [
            [
                {
                    "numero": 1,
                    "puntos": 40,
                    "pregunta": "PARTE I (40 PUNTOS): TEMA ESTRUCTURAL A ELECCIÓN\nElige y desarrolla en profundidad UNA (1) de las siguientes dos opciones con enfoque multidimensional:\n\n• OPCIÓN A: LA SEGUNDA REVOLUCIÓN INDUSTRIAL (1850-1914), EL CAPITALISMO CORPORATIVO Y EL IMPERIALISMO.\n1) Nuevos sectores dinámicos y fuentes de energía: acero Bessemer/Siemens, electricidad, química pesada y motores de combustión interna vs la Primera Revolución Industrial.\n2) Concentración empresarial y financiamiento: cárteles en Alemania, trusts en EE.UU. y el rol articulador de la banca mixta de inversión (Grossbanken).\n3) Afianzamiento de la División Internacional del Trabajo: flujos de capital británicos, migraciones masivas europeas y economías primario-exportadoras periféricas.\n4) Las teorías del Imperialismo (Hobson, Lenin) y el reparto colonial de África y Asia como válvula de escape a excedentes de capital, antesala de la Primera Guerra Mundial.\n\n• OPCIÓN B: LA GRAN DEPRESIÓN DE 1929 Y LA CRISIS DEL CAPITALISMO LIBERAL.\n1) Causas estructurales en EE.UU.: sobreproducción agrícola e industrial, burbuja especulativa bursátil y fragilidad del sistema bancario fraccionario.\n2) La dinámica de la crisis: el Crack de Wall Street de 1929, la espiral deflacionaria, las corridas bancarias en cadena y la contracción de la oferta monetaria.\n3) Transmisión global: corte de préstamos externos, colapso del comercio y el arancel proteccionista Smoot-Hawley (1930).\n4) Las reformas del New Deal: Ley Glass-Steagall, seguro de depósitos FDIC, supervisión de la SEC y gasto público reactivador (TVA, WPA).",
                    "placeholder": "Indique la opción elegida (OPCIÓN A u OPCIÓN B) y desarrolle su análisis multidimensional exhaustivo..."
                },
                {
                    "numero": 2,
                    "puntos": 20,
                    "pregunta": "PARTE II - CONSIGNA 1: DEBATES DOCTRINARIOS DEL SIGLO XIX: DAVID RICARDO Y KARL MARX. Confronte la teoría de las ventajas comparativas y la renta diferencial de la tierra de David Ricardo (en el marco del debate y derogación de las Corn Laws de 1846 en Inglaterra) con la crítica de la economía política de Karl Marx (el concepto de plusvalía absoluta y relativa, la explotación laboral y las contradicciones intrínsecas de la acumulación capitalista).",
                    "placeholder": "Confronte a David Ricardo (Corn Laws, ventajas comparativas) y Karl Marx (plusvalía, contradicciones del capital)..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "PARTE II - CONSIGNA 2: EL PATRÓN ORO CLÁSICO (1870-1914) Y EL DESORDEN MONETARIO DE ENTREGUERRAS. Explique el funcionamiento del Patrón Oro Clásico (paridades fijas, convertibilidad y el mecanismo de ajuste precio-flujo de David Hume). Explique por qué colapsó en 1914 con la Primera Guerra Mundial y cómo las reparaciones de Versalles desembocaron en la hiperinflación alemana de 1923.",
                    "placeholder": "Desarrolle el funcionamiento del patrón oro clásico, el ajuste de Hume y la crisis de posguerra..."
                },
                {
                    "numero": 4,
                    "puntos": 20,
                    "pregunta": "PARTE II - CONSIGNA 3: LOS ACUERDOS DE BRETTON WOODS (1944) Y LOS TREINTA GLORIOSOS. Analice la arquitectura monetaria acordada en Bretton Woods (FMI, Banco Mundial, patrón de cambio oro-dólar a USD 35 la onza) y el Plan Marshall. Explique los factores que sostuvieron la 'Edad de Oro del Capitalismo' (1945-1973): productividad fordista, estado de bienestar keynesiano y pleno empleo.",
                    "placeholder": "Desarrolle la arquitectura de Bretton Woods, el Plan Marshall y los Treinta Gloriosos..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 40,
                    "pregunta": "PARTE I (40 PUNTOS): TEMA ESTRUCTURAL A ELECCIÓN\nElige y desarrolla en profundidad UNA (1) de las siguientes dos opciones con articulación multidimensional:\n\n• OPCIÓN A: REGÍMENES MONETARIOS INTERNACIONALES: DEL PATRÓN ORO A LA CAÍDA DE BRETTON WOODS.\n1) El Patrón Oro Clásico (1870-1914): el rol de la City de Londres y la libra esterlina como moneda vehicular, disciplina monetaria y ajuste de Hume.\n2) La Primera Guerra Mundial, el abandono de la paridad oro, el Tratado de Versalles y la hiperinflación de Weimar en 1923.\n3) El sistema de Bretton Woods (1944): el debate Keynes (Bancor) vs White (Dólar), paridades fijas ajustables y el Fondo Monetario Internacional.\n4) La crisis del sistema en 1971: el Dilema de Triffin, los eurodólares, la sangría de oro de la Reserva Federal y la inconvertibilidad decretada por Richard Nixon.\n\n• OPCIÓN B: EL ROL DEL ESTADO EN LA ECONOMÍA: DEL PROTECCIONISMO A LOS TREINTA GLORIOSOS Y LA OFENSIVA NEOLIBERAL.\n1) El debate librecambio vs proteccionismo en el siglo XIX: la postura de Friedrich List para el desarrollo de industrias nacientes en Alemania y EE.UU. frente al libre comercio británico.\n2) El intervencionismo estatal tras la crisis de 1929: el New Deal rooseveltiano y el quiebre de la ortodoxia neoclásica.\n3) El Estado de Bienestar en la posguerra (1945-1973): pacto social capital-trabajo, servicios públicos universales y pleno empleo.\n4) La crisis del estado keynesiano en los 70: los shocks petroleros de 1973/79, la estanflación y el ascenso del neoliberalismo (Reagan y Thatcher).",
                    "placeholder": "Indique la opción elegida (OPCIÓN A u OPCIÓN B) y desarrolle su análisis multidimensional..."
                },
                {
                    "numero": 2,
                    "puntos": 20,
                    "pregunta": "PARTE II - CONSIGNA 1: FRIEDRICH LIST Y EL PROTECCIONISMO DE INDUSTRIAS NACIENTES. Analice los postulados de Friedrich List en su 'Sistema Nacional de Economía Política'. Explique por qué cuestionaba el libre comercio propugnado por David Ricardo calificándolo de 'retirar la escalera' y cómo influyeron sus ideas en el Zollverein y el despegue manufacturero de Alemania.",
                    "placeholder": "Desarrolle la doctrina de Friedrich List, la crítica al librecambio y el Zollverein..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "PARTE II - CONSIGNA 2: LA HIPERINFLACIÓN ALEMANA DE 1923 Y EL PLAN DAWES. Analice las causas de la hiperinflación en la República de Weimar: el peso insostenible de las reparaciones de Versalles, la ocupación militar franco-belga del Ruhr y la monetización del déficit por el Reichsbank. Explique cómo se detuvo el colapso mediante el Rentenmark (1923) y la renegociación del Plan Dawes (1924).",
                    "placeholder": "Analice la hiperinflación de 1923 y el plan de estabilización del Rentenmark..."
                },
                {
                    "numero": 4,
                    "puntos": 20,
                    "pregunta": "PARTE II - CONSIGNA 3: LAS CRISIS PETROLERAS (1973 Y 1979) Y LA ESTANFLACIÓN. Explique el accionar del cártel de la OPEP, el shock de oferta energética y por qué la combinación de inflación acelerada con estancamiento y desempleo (estanflación) invalidó los preceptos de la Curva de Phillips keynesiana, abriendo paso a las políticas monetaristas de Milton Friedman y Paul Volcker.",
                    "placeholder": "Analice el shock de oferta, la estanflación y el shock de tasas de Volcker..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 40,
                    "pregunta": "PARTE I (40 PUNTOS): TEMA ESTRUCTURAL A ELECCIÓN\nElige y desarrolla en profundidad UNA (1) de las siguientes dos opciones:\n\n• OPCIÓN A: LA SEGUNDA MITAD DEL SIGLO XIX: CAPITALISMO MONOPÓLICO, DOCTRINAS Y DIVISIÓN DEL TRABAJO.\n1) La conformación de grandes conglomerados corporativos: cárteles en Alemania y trusts en EE.UU., y el tránsito hacia el capitalismo financiero según Rudolf Hilferding.\n2) El avance del liberalismo económico en Gran Bretaña: David Ricardo, la ventaja comparativa y la derogación de las Corn Laws en 1846.\n3) La crítica de Karl Marx al modo de producción capitalista: plusvalía, pauperización proletaria y contradicciones de clase.\n4) La integración del mercado mundial: migraciones masivas desde Europa, inversiones de capital en transporte (ferrocarril y vapores) y el patrón oro.\n\n• OPCIÓN B: EL IMPACTO GLOBAL DE LA CRISIS DE 1929 Y LA RESPUESTA INSTITUCIONAL.\n1) Causas estructurales y desencadenamiento del Crack de Wall Street de 1929: exceso de especulación a crédito y saturación de la demanda de durables.\n2) El colapso del sistema bancario estadounidense: corridas, falta de liquidez y contracción de la masa monetaria según Friedman y Schwartz.\n3) El impacto demoledor sobre la periferia agroexportadora (especialmente América Latina) y el inicio de la Industrialización por Sustitución de Importaciones (ISI).\n4) La regulación financiera del New Deal: separación de banca comercial y de inversión (Glass-Steagall) y supervisión del mercado de capitales.",
                    "placeholder": "Indique la opción elegida (OPCIÓN A u OPCIÓN B) y desarrolle su desarrollo multidimensional..."
                },
                {
                    "numero": 2,
                    "puntos": 20,
                    "pregunta": "PARTE II - CONSIGNA 1: DAVID RICARDO: TEORÍA DE LA RENTA Y DEROGACIÓN DE LAS CORN LAWS (1846). Explique la teoría ricardiana de la renta diferencial de la tierra: por qué el avance sobre tierras menos fértiles elevaba el precio del trigo, encarecía los alimentos de subsistencia, obligaba a subir los salarios nominales y estrangulaba la tasa media de ganancia de los industriales. ¿Por qué la derogación de las Corn Laws selló el triunfo del librecambio británico?",
                    "placeholder": "Analice el debate de las leyes de cereales y el librecambio ricardiano..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "PARTE II - CONSIGNA 2: TEORÍAS DEL IMPERIALISMO Y EL CAMINO A LA PRIMERA GUERRA MUNDIAL. Analice las teorías económicas del imperialismo formuladas a fines del siglo XIX y principios del XX (John A. Hobson, Rudolf Hilferding, Vladimir Lenin). Explique la exportación de capitales, la pugna por mercados coloniales cerrados y su papel decisivo en el estallido de la Primera Guerra Mundial en 1914.",
                    "placeholder": "Desarrolle las teorías del imperialismo y el conflicto interimperialista..."
                },
                {
                    "numero": 4,
                    "puntos": 20,
                    "pregunta": "PARTE II - CONSIGNA 3: EL PLAN MARSHALL Y LA EDAD DE ORO DEL CAPITALISMO (1945-1973). Explique las motivaciones geopolíticas y económicas del Plan Marshall en Europa Occidental. Describa los pilares productivos e institucionales de los 'Treinta Gloriosos': organización científica del trabajo (taylorismo/fordismo), pacto salarial vinculado a la productividad y expansión de la seguridad social.",
                    "placeholder": "Desarrolle el Plan Marshall, la reconstrucción europea y el modelo de los Treinta Gloriosos..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 40,
                    "pregunta": "PARTE I (40 PUNTOS): TEMA ESTRUCTURAL A ELECCIÓN\nElige y desarrolla en profundidad UNA (1) de las siguientes dos opciones:\n\n• OPCIÓN A: DISPUTAS DOCTRINARIAS Y ORGANIZACIÓN DEL TRABAJO: DEL LIBERALISMO CLÁSICO AL TAYLORISMO Y FORDISMO.\n1) Las doctrinas del siglo XIX: confrontación entre el librecambio ricardiano, el proteccionismo pedagógico de Friedrich List y la crítica de la economía política de Karl Marx (plusvalía).\n2) La Segunda Revolución Industrial y la transformación del proceso de trabajo: del oficio artesanal a la división minuciosa de tareas con el taylorismo y la cadena de montaje fordista.\n3) El surgimiento de la gran corporación moderna (Chandler): separación de propiedad y gestión, jerarquías gerenciales y economías de escala y alcance.\n4) El Patrón Oro Clásico (1870-1914): libre movilidad del metal, paridad cambiaria fija y hegemonía financiera británica.\n\n• OPCIÓN B: EL COLAPSO DEL ORDEN LIBERAL DE ENTREGUERRAS Y LA EDIFICACIÓN DE BRETTON WOODS.\n1) Los tratados de paz post-1918: consecuencias económicas de la paz según Keynes, desarticulación monetaria y la catástrofe inflacionaria de Alemania en 1923.\n2) La Gran Depresión de 1929: deflación, quiebras masivas de bancos comerciales y el fin del patrón oro de entreguerras.\n3) El diseño del orden de posguerra en Bretton Woods (1944): debate Keynes vs White, el dólar convertible en oro y los roles del FMI y Banco Mundial.\n4) Los límites del sistema: el Dilema de Triffin, la pérdida de reservas de EE.UU. por la Guerra de Vietnam, la decisión de Nixon de 1971 y los shocks de la OPEP de 1973/79.",
                    "placeholder": "Indique la opción elegida (OPCIÓN A u OPCIÓN B) y desarrolle su análisis multidimensional..."
                },
                {
                    "numero": 2,
                    "puntos": 20,
                    "pregunta": "PARTE II - CONSIGNA 1: KARL MARX: PLUSVALÍA ABSOLUTA, PLUSVALÍA RELATIVA Y TASA DE GANANCIA. Explique detalladamente la distinción en la teoría marxista entre plusvalía absoluta (prolongación de la jornada laboral) y plusvalía relativa (aumento de la productividad social que abarata los medios de subsistencia del obrero). Explique por qué Marx postula la ley de la tendencia decreciente de la tasa media de ganancia.",
                    "placeholder": "Explique la plusvalía absoluta y relativa y las contradicciones del capitalismo en Marx..."
                },
                {
                    "numero": 3,
                    "puntos": 20,
                    "pregunta": "PARTE II - CONSIGNA 2: EL AJUSTE DE HUME Y LAS REGLAS DEL JUEGO DEL PATRÓN ORO CLÁSICO. Detalle conceptualmente y con su lógica económica el mecanismo precio-flujo de especie formulado por David Hume para corregir desequilibrios en la balanza de pagos. Explique las 'reglas del juego' que debían acatar los bancos centrales para no esterilizar los flujos de oro y preservar la convertibilidad.",
                    "placeholder": "Desarrolle las reglas del patrón oro y el mecanismo de Hume..."
                },
                {
                    "numero": 4,
                    "puntos": 20,
                    "pregunta": "PARTE II - CONSIGNA 3: EL NEW DEAL DE ROOSEVELT: REFORMA BANCARIA Y RECUPERACIÓN ECONÓMICA. Analice el 'Primer New Deal' (1933-1934): el feriado bancario (Bank Holiday), la Ley Glass-Steagall (separación entre banca de depósitos y de inversión), la creación de la FDIC y los planes de obras públicas. Evalúe cómo estas medidas buscaron restaurar la confianza y cortar la espiral deflacionaria.",
                    "placeholder": "Desarrolle el New Deal y la arquitectura monetaria y social..."
                }
            ]
        ],
        "final": [
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "Evolución Histórica de los Regímenes Monetarios Internacionales: Trace y compare los cuatro grandes regímenes monetarios: 1) Patrón Oro Clásico (1870-1914); 2) Caos monetario y devaluaciones competitivas de entreguerras; 3) Régimen de Bretton Woods (1944-1971); 4) Patrón fiduciario y flotación cambiaria contemporánea.",
                    "placeholder": "Trace la evolución comparativa de los sistemas monetarios mundiales..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "Revoluciones Industriales Comparadas: Confronte la Primera Revolución Industrial británica (energía de vapor, carbón, sector textil algodonero, empresas familiares) con la Segunda Revolución Industrial alemana y estadounidense (electricidad, química, petróleo, gran corporación gerencial de Chandler).",
                    "placeholder": "Compare en detalle la Primera y Segunda Revolución Industrial..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "Grandes Crisis Financieras en Perspectiva Histórica (Carlos Marichal): Analice los patrones comunes y disparidades entre el Pánico de 1873, el Crack de 1929 y la Crisis Subprime de 2008 en términos de burbujas crediticias, apalancamiento y contagio transfronterizo.",
                    "placeholder": "Desarrolle el análisis comparativo de las grandes crisis según Marichal..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "Hegemonías Económicas Globales: Gran Bretaña en el Siglo XIX vs Estados Unidos en el Siglo XX: Analice los fundamentos de cada hegemonía: liderazgo productivo, supremacía naval/militar, control de los centros financieros globales (Londres vs Wall Street) y provisión de moneda de reserva internacional.",
                    "placeholder": "Compare la hegemonía británica y estadounidense..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "El Rol del Estado en la Economía Mundial: Del Mercantilismo al Neoliberalismo: Analice cómo mutó la intervención estatal: del proteccionismo colbertiano del siglo XVII al librecambio británico del XIX, el estado benefactor keynesiano de posguerra y la desregulación de fines del siglo XX.",
                    "placeholder": "Trace la transformación histórica del rol económico del estado..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "Evolución de la Organización del Trabajo Fabril: Del trabajo a domicilio (putting-out system) al factory system disciplinado de la revolución industrial, el taylorismo cronometrado, la cadena de montaje fordista y el toyotismo flexible japonés.",
                    "placeholder": "Desarrolle la evolución histórica de los sistemas de trabajo..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "Olas de Globalización e Integración de Mercados: Compare la Primera Ola de Globalización (1870-1914) con la Segunda Ola iniciada tras la Segunda Guerra Mundial. Analice los flujos de comercio, capitales y mano de obra en ambos períodos.",
                    "placeholder": "Confronte la primera y segunda ola de globalización económica..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "Crisis de Deuda Externa en América Latina: Confronte las crisis de deuda soberana de los años 1820/1870 con la gran crisis de la deuda de los años 80 ('década perdida') a partir de shocks de tasas de interés internacionales y caída de términos de intercambio.",
                    "placeholder": "Analice las crisis de deuda latinoamericana en perspectiva histórica..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "Instituciones y Crecimiento Económico según Rondo Cameron: Analice la interacción entre derechos de propiedad, marco legal, sistema financiero y educación en el despegue económico de las naciones modernas.",
                    "placeholder": "Desarrolle el papel de las instituciones en el desarrollo económico según Cameron..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "Sistemas Bancarios y Financiamiento del Despegue Industrial: Confronte el modelo bancario británico (bancos comerciales de depósito a corto plazo) con el modelo de banca mixta alemana (Grossbanken con participación accionaria industrial) y el mercado bursátil de Wall Street.",
                    "placeholder": "Compare los sistemas financieros de financiamiento del desarrollo..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "El Fenómeno Inflacionario a través de los Siglos: Analice: 1) La Revolución de los Precios del siglo XVI; 2) La hiperinflación alemana de 1923; 3) La estanflación de los años 70. Identifique causas monetarias, fiscales y de oferta en cada episodio.",
                    "placeholder": "Analice los grandes episodios inflacionarios de la historia..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "Balance Histórico del Capitalismo Global: Evalúe las tensiones contemporáneas de la economía internacional: tensiones comerciales entre potencias, reconfiguración de cadenas globales de valor (nearshoring) y transición energética.",
                    "placeholder": "Reflexione sobre los desafíos del capitalismo global contemporáneo..."
                }
            ]
        ]
    },
    "estadistica": {
        "1er_parcial": [
            [
                {
                    "numero": 1,
                    "puntos": 50,
                    "pregunta": "PROBLEMA 1: CONTROL DE CALIDAD Y PROBABILIDADES EN LÍNEAS DE PRODUCCIÓN (50 Puntos)\\n800 componentes electrónicos inspeccionados en dos turnos:\\n• 320 producidos en Turno Mañana (TM) y 480 en Turno Tarde (TT).\\n• 120 presentaron Defectos (D), de los cuales 48 pertenecían al Turno Mañana.\\nCalcule paso a paso con fórmulas:\\na) (10 pts) P(D ∩ TM) - Probabilidad conjunta.\\nb) (10 pts) P(D | TM) - Probabilidad condicional.\\nc) (10 pts) Prueba formal de independencia: ¿P(D | TM) = P(D)?\\nd) (10 pts) P(D ∪ TM) - Regla de la adición.\\ne) (10 pts) Probabilidad de extraer 3 componentes al azar del TM SIN reposición.",
                    "placeholder": "Desarrolle cálculos paso a paso: a) P(D∩TM), b) P(D|TM), c) Prueba formal, d) Unión, e) Sin reposición..."
                },
                {
                    "numero": 2,
                    "puntos": 50,
                    "pregunta": "PROBLEMA 2: TIEMPOS DE ENTREGA LOGÍSTICA EN INTERVALOS (50 Puntos)\\nMuestra de n = 500 envíos según horas de entrega:\\n[12 - 24): 50 | [24 - 36): 150 | [36 - 48): 200 | [48 - 60): 75 | [60 - 72]: 25\\nCalcule con desarrollo explícito:\\na) (10 pts) Media aritmética (x̄) de los tiempos de entrega.\\nb) (10 pts) Varianza (S²), Desvío estándar (S) y Coeficiente de Variación (CV). ¿Es representativa la media?\\nc) (10 pts) Percentil 90 (P90) con fórmula de interpolación.\\nd) (10 pts) Moda (Mo) del tiempo de entrega.\\ne) (10 pts) Porcentaje de entregas que tardó más de 48 horas.",
                    "placeholder": "Fórmulas y cálculos: a) Media, b) Varianza y CV, c) P90 con interpolación, d) Moda, e) % > 48..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 50,
                    "pregunta": "PROBLEMA 1: TEST DIAGNÓSTICO CLÍNICO Y TEOREMA DE BAYES (50 Puntos)\\nEn un programa de control sanitario para una condición con prevalencia del 2% (P(E) = 0.02):\\n• Sensibilidad del test: P(+ | E) = 0.95 (detecta al 95% de los afectados).\\n• Especificidad del test: P(- | Sano) = 0.90 (el 90% de los sanos da negativo, 10% falsos positivos).\\nCalcule con rigurosidad:\\na) (15 pts) Tabla de contingencia 2x2 para una población teórica de 10.000 individuos.\\nb) (15 pts) Probabilidad total de que un individuo dé positivo al test: P(+).\\nc) (20 pts) Teorema de Bayes: Si un individuo dio positivo, ¿cuál es la probabilidad real de que esté afectado: P(E | +)? Interprete la paradoja del falso positivo.",
                    "placeholder": "Desarrolle: a) Matriz 2x2 con 10.000 casos, b) P(+) total, c) Teorema de Bayes e interpretación..."
                },
                {
                    "numero": 2,
                    "puntos": 50,
                    "pregunta": "PROBLEMA 2: RENDIMIENTOS SEMANALES Y MEDIDAS DE POSICIÓN (50 Puntos)\\nDistribución de frecuencias de n = 400 carteras de inversión según rendimiento porcentual:\\n[-4% a 0%): 40 | [0% a 4%): 120 | [4% a 8%): 160 | [8% a 12%): 60 | [12% a 16%]: 20\\nDetermine paso a paso:\\na) (10 pts) Media aritmética ponderada (x̄) del rendimiento.\\nb) (15 pts) Mediana (Me) con fórmula de interpolación sobre el intervalo mediano.\\nc) (15 pts) Cuartil 1 (Q1) y Cuartil 3 (Q3) y Rango Intercuartil (RIC = Q3 - Q1).\\nd) (10 pts) Coeficiente de variación (CV) y evaluación de homogeneidad de la muestra.",
                    "placeholder": "Desarrolle: a) Media ponderada, b) Mediana con interpolación, c) Q1, Q3 y RIC, d) CV..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 50,
                    "pregunta": "PROBLEMA 1: SOLICITUDES DE CRÉDITO Y PROBABILIDADES (50 Puntos)\\nUn banco digital analizó 600 solicitudes crediticias recibidas en el mes:\\n• 240 solicitudes fueron de Monotributistas (M) y 360 de empleados en Relación de Dependencia (RD).\\n• Del total de 600 solicitudes, 420 fueron Aprobadas (A) y 180 fueron Rechazadas (R).\\n• De los 240 Monotributistas, 120 resultaron Aprobados.\\nDesarrolle con procedimiento completo:\\na) (10 pts) P(A ∩ M) - Probabilidad conjunta de ser Monotributista Y ser Aprobado.\\nb) (10 pts) P(A | M) - Probabilidad de aprobación DADO que el solicitante es Monotributista.\\nc) (10 pts) Verifique FORMALMENTE si la aprobación crediticia (A) es INDEPENDIENTE de la condición de Monotributista (M).\\nd) (10 pts) P(A ∪ M) - Probabilidad de que una solicitud sea Aprobada O pertenezca a un Monotributista.\\ne) (10 pts) Si se toman 3 solicitudes al azar SIN REPOSICIÓN, probabilidad de que las 3 pertenezcan a empleados en Relación de Dependencia.",
                    "placeholder": "Desarrolle cálculos paso a paso: a) Conjunta, b) Condicional, c) Independencia formal, d) Unión, e) Sin reposición..."
                },
                {
                    "numero": 2,
                    "puntos": 50,
                    "pregunta": "PROBLEMA 2: MONTOS DE PRÉSTAMOS EN INTERVALOS (50 Puntos)\\nMuestra de n = 300 préstamos otorgados (en miles de pesos):\\n[100 - 200): 45 | [200 - 300): 105 | [300 - 400): 90 | [400 - 500): 45 | [500 - 600]: 15\\nCalcule con fórmulas y justifique:\\na) (10 pts) Media aritmética (x̄) de los préstamos en miles de pesos.\\nb) (10 pts) Desvío estándar (S) y Coeficiente de Variación (CV). ¿Es la media un valor representativo del conjunto de préstamos? Fundamente con el criterio del 25%.\\nc) (10 pts) Percentil 75 (P75 o Tercer Cuartil Q3): Calcule por interpolación e interprete en dinero.\\nd) (10 pts) Moda (Mo) de los préstamos.\\ne) (10 pts) ¿Qué porcentaje de préstamos fue de al menos $400.000?",
                    "placeholder": "Desarrolle cálculos con fórmulas: a) x̄, b) CV y representatividad, c) P75 con interpolación, d) Mo, e) % ≥ $400k..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 50,
                    "pregunta": "PROBLEMA 1: ANÁLISIS DE VENTAS EN RETAIL Y PROBABILIDADES (50 Puntos)\\nUn hipermercado realizó un estudio cuantitativo sobre 500 clientes:\\n• 200 clientes pagaron con Tarjeta de Crédito (TC) y 300 con Débito/Efectivo (DE).\\n• Del total de 500 clientes, 150 realizaron compras mayores a $50.000 (M).\\n• De los 200 clientes que pagaron con Tarjeta de Crédito, 90 realizaron compras mayores a $50.000.\\nResponda desarrollando fórmula y cálculo exacto:\\na) (10 pts) Calcule la probabilidad conjunta: P(M ∩ TC).\\nb) (10 pts) Calcule la probabilidad condicional: P(M | TC).\\nc) (10 pts) Demuestre formalmente si los sucesos M y TC son INDEPENDIENTES verificando P(M | TC) = P(M).\\nd) (10 pts) Calcule la probabilidad de la unión: P(M ∪ TC).\\ne) (10 pts) Si se eligen al azar 3 clientes SIN REPOSICIÓN, calcule la probabilidad de que los 3 hayan pagado con Tarjeta de Crédito.",
                    "placeholder": "Detalle paso a paso: a) P(M ∩ TC), b) P(M | TC), c) Prueba formal, d) P(M ∪ TC), e) Sin reposición..."
                },
                {
                    "numero": 2,
                    "puntos": 50,
                    "pregunta": "PROBLEMA 2: CALL CENTER Y DATOS AGRUPADOS EN INTERVALOS (50 Puntos)\\nMuestra de n = 400 llamadas en un centro de reclamos financieros:\\n[0 - 4): 60 | [4 - 8): 140 | [8 - 12): 120 | [12 - 16): 60 | [16 - 20]: 20\\nDesarrolle con fórmulas de cátedra:\\na) (10 pts) Media Aritmética (x̄) indicando marcas de clase (xi).\\nb) (10 pts) Varianza (S²), Desvío Estándar (S) y Coeficiente de Variación (CV = S / x̄). Diagnostique si la muestra es HOMOGÉNEA (CV ≤ 25%).\\nc) (10 pts) Percentil 85 (P85) indicando intervalo, Fi-1 y fórmula de interpolación. Interprete el resultado en minutos.\\nd) (10 pts) Moda (Mo) mediante la fórmula modal para datos agrupados.\\ne) (10 pts) ¿Qué porcentaje exacto de llamadas superó los 12 minutos de duración?",
                    "placeholder": "Detalle fórmulas y desarrollos: a) x̄, b) S y CV (homogeneidad), c) P85 con interpolación, d) Moda, e) % > 12 min..."
                }
            ]
        ],
        "2do_parcial": [
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "PROBLEMA 1: TEOREMA DE BAYES Y DETECCIÓN DE FRAUDE FINANCIERO (35 Puntos)\\nEn una pasarela de pagos fintech, la probabilidad a priori de que una transacción sea Fraudulenta (F) es del 1% (P(F) = 0.01). Las transacciones Legítimas (L) representan el 99%.\\nUn sistema de Inteligencia Artificial detecta transacciones sospechosas y genera una Alerta (+):\\n• Sensibilidad: Si la transacción es fraudulenta, el sistema alerta con probabilidad P(+ | F) = 0.98.\\n• Tasa de falsos positivos: Si la transacción es legítima, el sistema genera alerta errónea con probabilidad P(+ | L) = 0.05.\\nCalcule con procedimiento riguroso:\\na) (15 pts) Probabilidad total de que se genere una alerta en una transacción tomada al azar: P(+).\\nb) (20 pts) Teorema de Bayes: Si el sistema emite una alerta (+), ¿cuál es la probabilidad real de que la transacción sea efectivamente un Fraude: P(F | +)? Interprete el resultado y comente la paradoja del falso positivo en auditorías financieras.",
                    "placeholder": "Desarrolle: a) Probabilidad total P(+), b) Fórmula de Bayes e interpretación cuantitativa..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "PROBLEMA 2: DISTRIBUCIÓN BINOMIAL EN EVALUACIÓN DE SCORING CREDITICIO (35 Puntos)\\nUn analista de riesgo crediticio sabe que la probabilidad de que un cliente con calificación C entre en mora durante el primer año es p = 0.20.\\nSe toma una muestra aleatoria de n = 8 clientes independientes calificados con C:\\na) (10 pts) Indique la variable aleatoria X, sus parámetros y los supuestos de independencia del proceso de Bernoulli.\\nb) (10 pts) Calcule la probabilidad de que exactamente 2 clientes incurran en mora: P(X = 2).\\nc) (10 pts) Calcule la probabilidad de que a lo sumo 1 cliente incurra en mora: P(X ≤ 1).\\nd) (5 pts) Determine la esperanza matemática E(X) y el desvío estándar σ de clientes morosos.",
                    "placeholder": "Fórmula binomial P(X = k), cálculos paso a paso y parámetros de la distribución..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "PROBLEMA 3: DISTRIBUCIÓN NORMAL EN RENTABILIDAD BURSÁTIL (30 Puntos)\\nEl rendimiento mensual porcentual de un fondo de inversión sigue una distribución Normal con media μ = 2.5% y desvío estándar σ = 4.0%: X ~ N(2.5, 4.0).\\nUtilizando la tipificación Z = (X - μ) / σ y lectura de tabla normal estándar:\\na) (10 pts) Calcule la probabilidad de que en un mes elegido al azar el fondo obtenga un rendimiento negativo: P(X < 0).\\nb) (10 pts) Calcule la probabilidad de que el rendimiento mensual se ubique entre 0% y 6.5%: P(0 ≤ X ≤ 6.5).\\nc) (10 pts) ¿Cuál es el rendimiento mensual mínimo que debe obtener el fondo para ubicarse en el 10% de los meses más rentables (Percentil 90)?",
                    "placeholder": "Desarrolle la tipificación Z, áreas bajo la curva normal y cálculo de percentiles inversos..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "PROBLEMA 1: PROCESO DE POISSON EN MESA DE OPERACIONES FINANCIERAS (35 Puntos)\\nA una mesa de dinero institucional ingresan órdenes de compra a razón de una tasa media de λ = 5 órdenes por minuto durante el horario de mayor volumen:\\na) (10 pts) Calcule la probabilidad de que en un minuto determinado ingresen exactamente 3 órdenes: P(X = 3).\\nb) (10 pts) Calcule la probabilidad de que no ingrese ninguna orden en un minuto: P(X = 0).\\nc) (15 pts) En un lapso de 2 minutos (ajustando la tasa a λ' = 10 órdenes en 2 min), calcule la probabilidad de registrar al menos 2 órdenes: P(X ≥ 2) aplicando la propiedad del suceso complemento.",
                    "placeholder": "Fórmulas de Poisson paso a paso: a) P(X=3), b) P(X=0), c) P(X≥2) con complemento..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "PROBLEMA 2: DISTRIBUCIÓN BINOMIAL EN CONTROL DE PLÁSTICOS BANCARIOS (35 Puntos)\\nUna máquina troqueladora de tarjetas de crédito tiene una tasa de falla histórica de p = 0.05 por unidad producida.\\nSi se extrae un lote de control de calidad de n = 15 tarjetas al azar:\\na) (10 pts) Calcule la probabilidad de que exactamente 1 tarjeta resulte defectuosa: P(X = 1).\\nb) (15 pts) Calcule la probabilidad de que al menos 2 tarjetas presenten fallas: P(X ≥ 2).\\nc) (10 pts) Si en un día se emiten 1.000 tarjetas, ¿cuál es el número promedio esperado de tarjetas defectuosas y su varianza muestral?",
                    "placeholder": "Desarrolle fórmulas binomiales: a) P(X=1), b) P(X≥2), c) Esperanza y varianza para 1.000 unidades..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "PROBLEMA 3: DISTRIBUCIÓN NORMAL EN TIEMPOS DE COMPENSACIÓN BANCARIA (30 Puntos)\\nEl tiempo que demora la compensación electrónica de valores interbancarios se distribuye normalmente con media μ = 36 horas y desvío estándar σ = 6 horas: X ~ N(36, 6).\\na) (10 pts) Calcule la probabilidad de que un cheque se liquide en menos de 24 horas: P(X < 24).\\nb) (10 pts) Determine el porcentaje de cheques cuya compensación tarda entre 30 y 45 horas.\\nc) (10 pts) El banco desea establecer un plazo garantizado T tal que el 95% de los cheques se compensen antes de dicho plazo (Percentil 95 con Z = 1.645). Calcule el valor exacto de T en horas.",
                    "placeholder": "Tipificación Z, búsqueda en tabla normal y resolución de tiempo garantizado T..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "PROBLEMA 1: TEOREMA DE BAYES EN CARTERA CORPORATIVA Y DEFAULT (35 Puntos)\\nUna entidad financiera clasifica a sus clientes corporativos en tres categorías:\\n• Corporaciones AAA (C1): representan el 50% de la cartera. P(Default | C1) = 0.01.\\n• Medianas Empresas (C2): representan el 35% de la cartera. P(Default | C2) = 0.04.\\n• Pequeños Comercios (C3): representan el 15% de la cartera. P(Default | C3) = 0.10.\\na) (15 pts) Calcule la probabilidad total de que un cliente elegido al azar entre en cesación de pagos: P(Default).\\nb) (20 pts) Si se registra un default, calcule por Teorema de Bayes la probabilidad de que el deudor pertenezca a la categoría Medianas Empresas: P(C2 | Default). Confronte con la probabilidad a priori del 35%.",
                    "placeholder": "Desarrolle probabilidad total y teorema de Bayes paso a paso..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "PROBLEMA 2: DISTRIBUCIÓN DE POISSON EN AUTENTICACIÓN DIGITAL (35 Puntos)\\nUn servidor de home banking recibe solicitudes de inicio de sesión a razón de un promedio de λ = 8 solicitudes por segundo:\\na) (10 pts) Calcule la probabilidad de recibir exactamente 6 solicitudes en un segundo: P(X = 6).\\nb) (15 pts) En un intervalo de medio segundo (tasa proporcional λ' = 4), calcule la probabilidad de recibir más de 2 solicitudes: P(X > 2).\\nc) (10 pts) ¿Cuál es la varianza y el desvío estándar del número de solicitudes por segundo?",
                    "placeholder": "Fórmulas de Poisson: a) P(X=6), b) Ajuste a medio segundo y P(X>2), c) Varianza y desvío..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "PROBLEMA 3: DISTRIBUCIÓN NORMAL EN ESCALA SALARIAL BANCARIA (30 Puntos)\\nLos salarios mensuales de los analistas financieros junior en el microcentro financiero siguen una distribución Normal con media μ = $950.000 y desvío estándar σ = $150.000.\\na) (10 pts) ¿Qué proporción de analistas percibe un salario entre $800.000 y $1.200.000?\\nb) (10 pts) ¿Cuál es la probabilidad de que un analista seleccionado al azar gane más de $1.300.000 mensuales?\\nc) (10 pts) ¿A partir de qué salario mensual un analista se ubica en el 5% superior mejor remunerado (P95 con Z = 1.645)?",
                    "placeholder": "Estandarización Z, cálculo de probabilidades acumuladas y determinación de salario percentil 95..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "PROBLEMA 1: VARIABLE ALEATORIA DISCRETA Y BONO ESTRUCTURADO (35 Puntos)\\nUn inversor analiza un bono estructurado cuyo pago final X (en miles de pesos) depende del escenario macroeconómico:\\n• Escenario 1 (Recesión): X = $50k con probabilidad p1 = 0.20.\\n• Escenario 2 (Estabilidad): X = $80k con probabilidad p2 = 0.50.\\n• Escenario 3 (Crecimiento): X = $120k con probabilidad p3 = 0.25.\\n• Escenario 4 (Auge): X = $150k con probabilidad p4 = 0.05.\\nCalcule paso a paso:\\na) (5 pts) Verifique que es una función de cuantía legítima.\\nb) (10 pts) Esperanza matemática E(X) del rendimiento del bono.\\nc) (10 pts) Varianza Var(X) y desvío estándar σ.\\nd) (10 pts) Si el bono cotiza a $85k en el mercado secundario, justifique si es financieramente conveniente comprarlo comparando el precio con su valor esperado.",
                    "placeholder": "Desarrolle función de cuantía, esperanza matemática, varianza y análisis de conveniencia..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "PROBLEMA 2: DISTRIBUCIÓN BINOMIAL Y APROXIMACIÓN A POISSON (35 Puntos)\\nEn una campaña de venta telefónica de seguros de desempleo, la tasa histórica de suscripción exitosa es p = 0.08.\\nUn operador efectúa n = 10 llamadas a clientes independientes:\\na) (10 pts) Calcule la probabilidad de concretar exactamente 2 ventas: P(X = 2).\\nb) (10 pts) Calcule la probabilidad de lograr al menos 1 venta: P(X ≥ 1).\\nc) (15 pts) Si el operador realiza n = 100 llamadas y la probabilidad de éxito de un producto premium fuera p = 0.02, justifique por qué se cumplen las condiciones para aproximar por Poisson y calcule P(X = 2) utilizando λ = n * p = 2.",
                    "placeholder": "Fórmula binomial, suceso complementario y aproximación de Poisson con λ = 2..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "PROBLEMA 3: DISTRIBUCIÓN NORMAL Y VALOR EN RIESGO (VaR) (30 Puntos)\\nEl valor diario de una cartera de activos financieros se distribuye normalmente con valor medio μ = $10.000.000 y desvío estándar σ = $400.000.\\na) (10 pts) Calcule la probabilidad de que al cierre de la rueda el valor de la cartera resulte inferior a $9.300.000.\\nb) (10 pts) Si la gerencia de riesgos define el límite de pérdida máxima tolerable bajo un nivel de confianza del 99% (Z = -2.33), determine el valor crítico mínimo que preservará la cartera.\\nc) (10 pts) Explique cómo se relaciona la simetría de la distribución normal con la coincidencia entre Media, Mediana y Moda.",
                    "placeholder": "Tipificación Z, cálculo del Valor en Riesgo (VaR) al 99% y análisis de simetría de Gauss..."
                }
            ]
        ],
        "final": [
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "Teorema de Bayes y Calificación Crediticia: En una cartera corporativa, el 70% de las empresas son de Bajo Riesgo (B) y el 30% de Alto Riesgo (A). P(D|A) = 0.20 y P(D|B) = 0.02. Si una empresa cae en default, calcule por Bayes la probabilidad de que perteneciera al grupo de Bajo Riesgo: P(B|D).",
                    "placeholder": "Desarrolle probabilidad total y teorema de Bayes..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "Teorema Central del Límite (TCL): El monto gastado por cliente tiene μ = $25.000 y σ = $8.000 (distribución poblacional desconocida). Si se toma una muestra aleatoria de n = 64 clientes, calcule la probabilidad de que la media muestral X̄ supere los $27.000. Justifique la validez del TCL.",
                    "placeholder": "Aplique el TCL con error estándar σ/√n..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "Comparación de Medidas de Dispersión: Explique por qué el desvío estándar no debe utilizarse directamente para comparar la dispersión de dos acciones que cotizan a precios muy dispares ($100 vs $50.000), y fundamente el uso del Coeficiente de Variación (CV).",
                    "placeholder": "Fundamente el coeficiente de variación y la dispersión relativa..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "Probabilidad Total y Bayes en Evaluación de Riesgo de Crédito: Una entidad clasifica operaciones en Comerciales (60%), Personales (30%) e Hipotecarias (10%) con tasas de morosidad del 2%, 6% y 1% respectivamente. Si una operación resulta morosa, calcule la probabilidad de que sea un crédito personal.",
                    "placeholder": "Desarrolle matriz de probabilidades y Bayes..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "Distribución de la Media Muestral X̄ bajo el TCL: El salario en una industria tiene μ = $800.000 y σ = $120.000. Para una muestra de n = 100 empleados, determine el intervalo simétrico alrededor de la media que concentra el 95% de las medias muestrales posibles.",
                    "placeholder": "Aplique el TCL para intervalo de medias muestrales..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "Análisis de Asimetría y Medidas de Posición: En distribuciones de ingresos con fuerte asimetría positiva a la derecha, explique la relación de orden entre Moda, Mediana y Media aritmética. ¿Cuál de ellas representa mejor el salario típico?",
                    "placeholder": "Confronte media, mediana y moda en distribuciones asimétricas..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "Teorema de Bayes en Auditoría de Facturación: Una empresa procesa facturas por 3 sucursales A (40%), B (35%) y C (25%). Las tasas de error contable son 1%, 2% y 3%. Al auditar una factura con error, determine la probabilidad de que provenga de la sucursal C.",
                    "placeholder": "Calcule probabilidad total de error y Bayes para la sucursal C..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "Teorema Central del Límite en Estimación de Ingresos: Una cadena de retail tiene ventas diarias por local con media $500.000 y desvío $80.000. Si se auditan n = 36 locales al azar, calcule la probabilidad de que el promedio muestral esté entre $480.000 y $520.000.",
                    "placeholder": "Aplique tipificación Z de la media muestral..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "Distribución Normal Estándar y Regla Empírica: Explique por qué en cualquier distribución normal el 68.3% de los datos cae a ±1 desvío estándar, el 95.4% a ±2 desvíos y el 99.7% a ±3 desvíos. Relacione con el control estadístico de procesos.",
                    "placeholder": "Desarrolle las propiedades de las áreas normales y límites de control..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "Independencia Estadística y Tablas de Contingencia: Explique la diferencia conceptual entre dos sucesos mutuamente excluyentes y dos sucesos estadísticamente independientes. ¿Pueden dos sucesos con probabilidad positiva ser simultáneamente ambas cosas? Demuestre formalmente.",
                    "placeholder": "Demostración matemática formal de exclusión mutua vs independencia..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "Aplicación del TCL en Gestión de Riesgo de Carteras: Una cartera contiene 100 activos independientes con rendimientos esperados μ = 1% y σ = 2%. Utilice el Teorema Central del Límite para calcular la probabilidad de que el rendimiento medio de la cartera sea inferior a cero.",
                    "placeholder": "Desarrolle el cálculo con error estándar de la cartera σ/√n..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "Coeficiente de Variación y Diagnóstico de Homogeneidad: Explique el fundamento estadístico de la regla práctica que considera que una muestra es homogénea si CV ≤ 25%. ¿Qué problemas interpretativos acarrea una muestra con CV = 70%?",
                    "placeholder": "Fundamente el análisis de homogeneidad y representatividad de la media..."
                }
            ]
        ]
    },
    "contabilidad": {
        "1er_parcial": [
            [
                {
                    "numero": 1,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: TEORÍA CON JUSTIFICACIÓN DE DESCARTE (T1 y T2):\\nT1: Principio de Valuación al Costo: Los bienes se incorporan por el sacrificio económico necesario para su puesta en marcha o venta. Justifique por qué se descartan las restantes opciones.\\nT2: Variación Modificativa Negativa: Identifique el hecho económico y justifique minuciosamente por qué descartó las demás alternativas.",
                    "placeholder": "Respuestas y justificación exhaustiva de opciones descartadas para T1 y T2..."
                },
                {
                    "numero": 2,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: TEORÍA (T3 y T4):\\nT3: Fondo Fijo y Arqueo: Tratamiento contable de la rendición y reposición con cheque.\\nT4: Imputación de Ventas y CMV: ¿Por qué no se acredita Mercaderías al precio facturado de venta?",
                    "placeholder": "Respuestas y justificaciones de descarte para T3 y T4..."
                },
                {
                    "numero": 3,
                    "puntos": 70,
                    "pregunta": "BLOQUE II: CASO INTEGRAL 'DISTRIBUIDORA DEL CENTRO S.A.':\\n1. 01/04: Constitución: Suscripción por $1.200.000. Integran $600.000 en Banco Nación c/c, $400.000 en Mercaderías y el resto a 60 días. S/ Contrato social y boleta.\\n2. 12/04: Compra de Muebles y Útiles por $250.000. 40% con cheque Banco y 60% con pagaré a 60 días con $15.000 de interés a vencer. S/ Factura original y pagaré.\\n3. 05/05: Venta de mercaderías por $800.000. 50% con cheque al día y 50% en c/c a 30 días. CMV: $380.000. S/ Factura duplicada y minuta.\\n4. 31/05: Devengamiento de intereses del primer mes ($7.500) y luz del local por $45.000 impaga. S/ Minuta y factura de luz.\\nRegistre en Libro Diario con partida doble, leyenda documental y verifique el balance patrimonial.",
                    "placeholder": "Libro Diario con cuentas, Debe, Haber, leyendas S/ y comprobación de partida doble..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: TEORÍA CON JUSTIFICACIÓN DE DESCARTE:\\nT1: Principio de lo Devengado: Los resultados económicos se reconocen en el período en que se originan, con independencia del cobro o pago. Analice su aplicación práctica en alquileres e intereses.\\nT2: Cuentas Regularizadoras del Activo: Función, saldo habitual (acreedor) y exposición en el estado de situación patrimonial (ej: Previsión Incobrables, Depreciación Acumulada).",
                    "placeholder": "Desarrolle T1 y T2 fundamentando con normas contables..."
                },
                {
                    "numero": 2,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: TEORÍA (Conciliación Bancaria):\\nDistinga entre diferencias transitorias o temporarias (cheques pendientes de cobro, depósitos no acreditados) y permanentes (débitos por comisiones, errores de registro). ¿Cuáles exigen asiento de ajuste en el Libro Diario?",
                    "placeholder": "Explique diferencias bancarias y asientos de ajuste..."
                },
                {
                    "numero": 3,
                    "puntos": 70,
                    "pregunta": "BLOQUE II: CASO PRÁCTICO 'NORTE SUR COMERCIAL S.A.':\\n1. 02/06: Apertura: Caja $500.000, Banco Galicia c/c $800.000 y Mercaderías $600.000 (3.000 unidades a $200 c/u). Deuda Proveedores: $200.000. Capital: $1.700.000.\\n2. 08/06: Compra de 1.500 unidades a $220 c/u ($330.000). Se obtiene una bonificación comercial de $30.000 por volumen. Se abona 50% con transferencia bancaria y 50% en c/c con Proveedores. S/ Factura original.\\n3. 18/06: Venta de 2.000 unidades a $500 c/u ($1.000.000). Se cobra 40% al contado y por el 60% se recibe un pagaré a 60 días con $40.000 de interés incluido ($640.000). CMV registrado por inventario permanente. S/ Factura duplicada y minuta.\\n4. 30/06: Devengamiento del primer mes de intereses del pagaré a cobrar ($20.000) y devengamiento del sueldo del vendedor por $180.000 impago. S/ Minuta contable.\\nPautas: Asientos en Libro Diario con cuenta, tipo de variación patrimonial y verificación de igualdad A = P + PN.",
                    "placeholder": "Libro Diario, asientos 1 a 4, cuentas T de mayor y comprobación final..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: TEORÍA CONTABLE:\\nT1: Bienes de Uso y Depreciaciones: Concepto de valor de incorporación, vida útil estimada, valor de rezago y método de amortización lineal. ¿Qué cuentas intervienen al cierre del ejercicio?\\nT2: Variación Patrimonial Permutativa Exclusiva del Activo: Defina y brinde 3 ejemplos de la vida comercial donde el Activo cambie cualitativamente sin modificar el monto total del Patrimonio Neto.",
                    "placeholder": "Respuestas teóricas justificadas para T1 y T2..."
                },
                {
                    "numero": 2,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: COMPROBANTES Y CONTROL INTERNO:\\nIdentifique qué comprobante respalda legal y contablemente cada operación:\\na) Compra al contado.\\nb) Venta en cuenta corriente comercial.\\nc) Devolución de mercaderías defectuosas por parte de un cliente.\\nd) Depósito de cheques en cuenta corriente bancaria.",
                    "placeholder": "Identifique comprobantes respaldatorios y efectos contables..."
                },
                {
                    "numero": 3,
                    "puntos": 70,
                    "pregunta": "BLOQUE II: CASO INTEGRAL 'OMEGA LOGÍSTICA S.A.':\\n1. 01/08: Constitución: Aporte de socios de $2.000.000 integrado en efectivo y depositado en Banco Nación c/c.\\n2. 05/08: Compra de un Utilitario de reparto por $1.500.000. Se paga $500.000 con cheque bancario y el saldo ($1.000.000) mediante préstamo prendario en 10 cuotas con $100.000 de intereses adelantados a devengar. S/ Factura y contrato prendario.\\n3. 10/08: Pago de póliza de seguro contra todo riesgo por 6 meses por $120.000 con cheque Banco Nación. S/ Póliza y recibo.\\n4. 20/08: Venta de servicios logísticos por $600.000 cobrados con cheques al día de terceros (Valores a Depositar). S/ Factura duplicado.\\n5. 31/08: Devengamiento del primer mes del seguro ($20.000) y primer mes del interés del préstamo ($10.000). S/ Minutas de devengamiento.\\nRegistre en Libro Diario con partida doble, clasifique variaciones patrimoniales y demuestre la ecuación patrimonial al 31/08.",
                    "placeholder": "Asientos en Libro Diario, Debe, Haber, análisis patrimonial y saldos..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: TEORÍA CON JUSTIFICACIÓN DE DESCARTE:\\nT1: Ecuación Patrimonial Dinámica: A = P + Capital + Resultados Acumulados + Ingresos - Gastos. Explique cómo impacta un cobro de un crédito en cuenta corriente en la ecuación.\\nT2: Principio de Prudencia Contable: 'Contabilizar las pérdidas cuando se conocen y las ganancias sólo cuando se realizan'. Justifique su aplicación práctica.",
                    "placeholder": "Justifique conceptualmente T1 y T2 con normas profesionales..."
                },
                {
                    "numero": 2,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: PARTIDA DOBLE Y SALDOS:\\nExplique por qué las cuentas de Activo y de Pérdida tienen saldo habitual deudor, mientras que las de Pasivo, Patrimonio Neto y Ganancia tienen saldo acreedor. ¿Qué ocurre si una cuenta de Activo arroja saldo acreedor?",
                    "placeholder": "Fundamente la mecánica de partida doble y saldos deudor/acreedor..."
                },
                {
                    "numero": 3,
                    "puntos": 70,
                    "pregunta": "BLOQUE II: CASO PRÁCTICO 'HORIZONTE DIGITAL S.A.':\\n1. 01/10: Suscripción e integración: Capital suscripto por $1.500.000. Integran $1.000.000 en Banco Provincia c/c y $500.000 en Equipos de Computación. S/ Acta y comprobantes.\\n2. 07/10: Compra de mercaderías por $400.000. El flete hasta el depósito de la empresa cuesta $20.000 y se paga en efectivo. El resto se abona 50% con cheque y 50% en c/c con Proveedores. S/ Facturas.\\n3. 15/10: Venta al contado con cheque por $600.000, otorgando un descuento comercial del 5% ($30.000), cobrando $570.000 netos. CMV: $280.000. S/ Factura duplicada y recibo.\\n4. 31/10: Devengamiento de alquiler del local por $70.000 que se pagará el 5 del mes siguiente. S/ Minuta contable y contrato de locación.\\nRegistre en Libro Diario, clasifique las variaciones patrimoniales e indique el balance patrimonial resultante.",
                    "placeholder": "Libro Diario, asientos 1 a 4, leyendas documentales y comprobación patrimonial..."
                }
            ]
        ],
        "2do_parcial": [
            [
                {
                    "numero": 1,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: TEORÍA DE RUBROS ESPECÍFICOS CON JUSTIFICACIÓN DE DESCARTE (30 Puntos totales):\\nT1: Conciliación Bancaria y Ajustes: Distinga entre diferencias temporarias (cheques pendientes de cobro por terceros, depósitos en 48h no acreditados) y permanentes (débitos bancarios por comisiones de mantenimiento, gastos de chequera, errores contables). ¿Cuáles exigen registración obligatoria de ajuste en el Libro Diario? Justifique el descarte de las restantes opciones.\\nT2: Valuación de Inventarios (PEPS vs PPP): En un escenario de precios de compra crecientes (inflación), compare el impacto de ambos métodos sobre el valor de la Existencia Final en el Activo y sobre el Costo de Mercaderías Vendidas (CMV) en los Resultados. Justifique el descarte de las demás alternativas.",
                    "placeholder": "Respuestas justificadas y descarte riguroso para T1 y T2..."
                },
                {
                    "numero": 2,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: TEORÍA (Bienes de Uso y Depreciaciones):\\nT3: Costo de Incorporación de Bienes de Uso: ¿Qué erogaciones forman parte del valor de activación de una maquinaria? Distinga entre erogaciones necesarias activables (precio de factura neto de descuentos + fletes de traslado + seguros en tránsito + gastos de montaje y pruebas piloto) y gastos de mantenimiento o reparaciones ordinarias del ejercicio. Justifique el descarte.",
                    "placeholder": "Desarrolle T3 y la justificación de descarte de alternativas..."
                },
                {
                    "numero": 3,
                    "puntos": 70,
                    "pregunta": "BLOQUE II: CASO INTEGRAL DE RUBROS ESPECÍFICOS 'VANGUARDIA INDUSTRIAL S.A.' (70 Puntos):\\n1. 02/09: Caja y Bancos (Conciliación Bancaria y Ajustes): El saldo del Mayor de Banco Galicia c/c es $1.450.000 y el Extracto Bancario muestra $1.320.000. Se detectan: a) Cheque propio N° 101 entregado a proveedores pendiente de cobro por $250.000; b) Débito bancario por comisión de cuenta de $40.000 no contabilizado; c) Depósito de 48hs de $80.000 no acreditado en el extracto. Realice el cuadro de conciliación y el asiento de ajuste contable que corresponda s/ Minuta y extracto.\\n2. 10/09: Créditos por Ventas e Intereses a Devengar: Se venden mercaderías por $1.200.000 recibiendo un pagaré a 60 días por $1.320.000 que incluye $120.000 de intereses explícitos. CMV de la operación: $650.000. Registre la venta y el CMV indicando las variaciones patrimoniales y la cuenta regularizadora Intereses Positivos a Devengar. S/ Factura duplicada y pagaré.\\n3. 18/09: Bienes de Cambio (Ficha de Stock por PEPS): La empresa tenía 500 u. a $1.000 c/u ($500.000). Compra 800 u. a $1.200 c/u abonando con transferencia bancaria s/ Factura original. Luego vende 900 u. Registre la compra y la determinación y asiento del CMV por método PEPS (FIFO) con su respectiva minuta contable.\\n4. 25/09: Bienes de Uso y Depreciación: Se adquiere una Máquina industrial en $2.000.000. Se abona flete e instalación por $200.000 en efectivo. Vida útil estimada: 10 años (10% anual) con método lineal año de alta completo y sin valor de rezago. Registre la incorporación activando los gastos inherentes y registre la cuota de depreciación anual del ejercicio en la cuenta Depreciación Acumulada Maquinarias.\\n5. 30/09: Devengamiento de Intereses y Previsión para Incobrables: Devengue el primer mes de intereses del pagaré del día 10/09 ($60.000) y constituya una Previsión para Deudores Incobrables por $50.000 estimada por el departamento de créditos sobre la cartera morosa. S/ Minuta contable.\\nPautas de evaluación Cátedra Landini: Asientos completos en Libro Diario con cuentas normalizadas, Debe, Haber, variación patrimonial al lado de cada cuenta y leyendas documentales respaldatorias.",
                    "placeholder": "Libro Diario, asientos 1 a 5, cuadro de conciliación bancaria y partida doble verificada..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: TEORÍA CON JUSTIFICACIÓN DE DESCARTE:\\nT1: Fondo Fijo y Arqueo de Caja Chica: Procedimiento de creación, rendición de gastos menores con comprobantes y reposición. Tratamiento contable de un Faltante de Caja (cuenta de pérdida) y Sobrante de Caja (cuenta de ganancia). Justifique por qué descartó las otras opciones.\\nT2: Componentes Financieros Implícitos en Ventas a Plazo: Cuando una empresa vende a 30 días sin cobrar interés explícito pero cobra un sobreprecio respecto al precio de contado, ¿cómo debe segregarse el resultado financiero del ingreso por ventas? Justifique.",
                    "placeholder": "Desarrolle T1 y T2 justificando opciones descartadas..."
                },
                {
                    "numero": 2,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: TEORÍA (Sistemas de Depreciación de Bienes de Uso):\\nCompare el método de amortización lineal constante frente al método de unidades producidas o kilómetros recorridos. ¿En qué tipo de activos (rodados, maquinarias pesadas) resulta técnicamente más preciso este último para reflejar el desgaste económico real? Justifique el descarte.",
                    "placeholder": "Compare métodos de amortización y justifique el descarte..."
                },
                {
                    "numero": 3,
                    "puntos": 70,
                    "pregunta": "BLOQUE II: CASO INTEGRAL 'ALIMENTOS PAMPEANOS S.A.':\\n1. 03/11: Creación y Arqueo de Fondo Fijo: Se crea un Fondo Fijo por $100.000 emitiendo cheque Banco Nación. Al rendir se presentan comprobantes de fotocopias por $25.000, artículos de limpieza por $35.000 y viáticos por $20.000, existiendo $18.000 en efectivo (Faltante de $2.000). Se repone el fondo emitiendo nuevo cheque. Registre la creación, rendición con faltante y reposición.\\n2. 12/11: Créditos y Descuento de Documentos: La empresa posee un pagaré a cobrar de clientes por $500.000 y lo descuenta en el Banco Galicia. El banco acredita $460.000 en la cuenta corriente y retiene $40.000 por intereses bancarios adelantados a devengar. S/ Liquidación bancaria y pagaré.\\n3. 20/11: Bienes de Cambio por Precio Promedio Ponderado (PPP): Existencia inicial: 1.000 unidades a $500 c/u ($500.000). Compra: 2.000 unidades a $560 c/u ($1.120.000) con pagaré sin interés a 30 días. Calcule el nuevo costo unitario ponderado PPP y registre el CMV de una venta de 1.800 unidades efectuada a $1.000 c/u al contado. S/ Factura y minuta.\\n4. 28/11: Venta y Reemplazo de Bien de Uso: Se vende un Utilitario en $1.800.000 cobrando con cheque al día. Su Valor de Origen era de $2.500.000 y tenía una Depreciación Acumulada de $1.000.000 (Valor Residual Contable: $1.500.000). Registre la baja del rodado y la cuenta Resultado por Venta de Bienes de Uso (R+ de $300.000). S/ Boleto de compraventa y recibo.\\n5. 30/11: Devengamiento de los intereses bancarios del pagaré descontado el 12/11 por $20.000. S/ Minuta contable.",
                    "placeholder": "Libro Diario, asientos 1 a 5 con Debe, Haber, leyendas y variaciones patrimoniales..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: TEORÍA CON JUSTIFICACIÓN DE DESCARTE:\\nT1: Previsión para Deudores Incobrables: Análisis de la naturaleza de la cuenta (regularizadora de activo), cálculo del quebranto estimado al cierre del ejercicio y registración de un incobrable real producido en el ejercicio siguiente (uso de la previsión vs quebranto por incobrabilidad). Justifique el descarte.\\nT2: Conciliación Bancaria: Cheque emitido y vencido: ¿Qué asiento de ajuste corresponde realizar cuando un cheque emitido a un proveedor supera los 30 días corridos sin haber sido presentado al cobro? Justifique.",
                    "placeholder": "Desarrolle T1 y T2 fundamentando opciones descartadas..."
                },
                {
                    "numero": 2,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: TEORÍA (Mejoras vs Mantenimiento en Bienes de Uso):\\nDefina 'Mejora' en un bien de uso (erogación que aumenta la capacidad de servicio, alarga la vida útil o reduce costos futuros de operación) y fundamente por qué se activa en la cuenta del bien en lugar de imputarse a cuentas de resultado negativo. Justifique el descarte.",
                    "placeholder": "Distinga mejoras activables de gastos de mantenimiento..."
                },
                {
                    "numero": 3,
                    "puntos": 70,
                    "pregunta": "BLOQUE II: CASO INTEGRAL 'TECNOLOGÍA SUR S.A.':\\n1. 05/12: Conciliación Bancaria con Error de Registro: El extracto bancario de Banco Francés c/c muestra que un débito por luz de $85.000 fue registrado erróneamente en el libro banco de la empresa por $58.000. Además, el banco cobró comisiones por transferencias por $15.000 + IVA $3.150 ($18.150). Realice el cuadro conciliatorio y el asiento de ajuste contable correspondiente.\\n2. 14/12: Ventas con Tarjetas de Crédito: Venta de productos tecnológicos por $1.500.000 abonada con Tarjeta de Crédito en 1 pago. El cupón de la tarjeta cobra un 3% de comisión ($45.000) y retiene $15.000 de impuestos, acreditándose el neto en la cuenta Cupones de Tarjeta a Cobrar. CMV de la venta: $780.000. S/ Cupón y factura duplicada.\\n3. 22/12: Inventarios PEPS con Devolución de Compras: La empresa adquiere 600 u. a $800 c/u abonando con cheque. Al recibir el lote se detectan 100 unidades defectuosas que se devuelven al proveedor recibiendo Nota de Crédito original. Registre la compra original y la devolución con su impacto en la ficha de stock.\\n4. 28/12: Activación y Puesta a Punto de Servidor: Compra de Servidor informático por $3.000.000 con cheque a 30 días con $150.000 de intereses a devengar. Se abonan $300.000 en efectivo por configuración de software de red y licencias obligatorias para su puesta en marcha. Registre la activación integral del servidor.\\n5. 31/12: Amortización anual del servidor (vida útil 3 años lineal) y reclasificación de deudores morosos por $120.000 pasados a gestión judicial. S/ Minuta contable.",
                    "placeholder": "Libro Diario, asientos 1 a 5, ajustes bancarios, variaciones y saldos mayorizados..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: TEORÍA DE RUBROS CON JUSTIFICACIÓN DE DESCARTE:\\nT1: Valuación al Valor Neto de Realización (VNR): Defina Precio de venta de contado menos gastos directos de venta. ¿En qué bienes de cambio con mercado transparente y cotización pública (commodities, granos, moneda extranjera) se aplica este criterio de valuación al cierre? Justifique el descarte.\\nT2: Cuentas de Orden y Contingencias: Distinga entre contingencias probables y cuantificables (que exigen asiento de previsión en el Libro Diario) y contingencias remotas o no cuantificables (que sólo se revelan en Notas a los Estados Contables). Justifique.",
                    "placeholder": "Desarrolle T1 y T2 justificando descarte de alternativas..."
                },
                {
                    "numero": 2,
                    "puntos": 15,
                    "pregunta": "BLOQUE I: TEORÍA (Activos Intangibles y Gastos de Organización):\\n¿Qué condiciones deben cumplirse para poder activar los Gastos de Organización y Preoperativos de una sociedad? ¿Cuál es el plazo máximo de amortización admitido por las Resoluciones Técnicas profesionales? Justifique el descarte.",
                    "placeholder": "Explique tratamiento de activos intangibles y justifique descarte..."
                },
                {
                    "numero": 3,
                    "puntos": 70,
                    "pregunta": "BLOQUE II: CASO INTEGRAL 'DISTRIBUIDORA RÍO DE LA PLATA S.A.':\\n1. 02/01: Arqueo y Diferencia de Cotización en Moneda Extranjera: La empresa posee en caja USD 10.000 registrados a un costo histórico de $800 por dólar ($8.000.000). Al cierre, la cotización oficial tipo comprador es de $920 por dólar ($9.200.000). Registre el asiento de ajuste por Diferencia de Cotización Positiva s/ Minuta de arqueo.\\n2. 11/01: Créditos con Intereses Punitorios: Un deudor en mora que debía una factura de $400.000 cancela su deuda en efectivo abonando $40.000 adicionales en concepto de intereses punitorios por mora. Registre la cobranza y la ganancia financiera s/ Recibo duplicado.\\n3. 18/01: Bienes de Cambio por PPP con Bonificación: Se compran 1.000 u. a $600 c/u. El proveedor otorga una bonificación comercial en factura del 10% por cantidad ($60.000), facturando $540.000 netos. Se abona 50% con transferencia y 50% en c/c. Calcule el costo unitario de incorporación ($540 por unidad) y registre la compra s/ Factura original.\\n4. 26/01: Adquisición de Inmueble con Segregación Terreno/Edificio: Se compra un Inmueble comercial en $10.000.000 pagando 40% con cheque y 60% con hipoteca a 5 años. La valuación técnica asigna 20% al Terreno ($2.000.000) y 80% al Edificio construido ($8.000.000). Registre la compra segregando ambas cuentas patrimoniales.\\n5. 31/01: Depreciación anual del Edificio (2% anual lineal sobre $8.000.000 = $160.000, recordando que el terreno no se amortiza) y devengamiento del primer mes de intereses hipotecarios por $100.000 impagos. S/ Minuta contable.",
                    "placeholder": "Libro Diario, asientos 1 a 5, Debe, Haber, leyendas documentales y partida doble..."
                }
            ]
        ],
        "final": [
            [
                {
                    "numero": 1,
                    "puntos": 30,
                    "pregunta": "BLOQUE I: AUDITORÍA DE RUBROS Y BALANCE DE SALDOS AJUSTADO (30 Puntos):\\nRealice los asientos de ajuste de cierre al 31/12:\\na) Conciliación bancaria: Débito bancario por comisiones de mantenimiento por $30.000 no contabilizado.\\nb) Inventarios: Faltante de mercaderías detectado en el inventario físico por $45.000.\\nc) Bienes de uso: Cuota de depreciación anual del ejercicio de Rodados (Valor de origen $4.000.000, vida útil 5 años lineal: $800.000).\\nd) Créditos: Estimación de la Previsión para Deudores Incobrables del ejercicio por $60.000.\\ne) Devengamientos: Intereses pasivos a devengar vencidos del mes por $25.000.",
                    "placeholder": "Libro Diario con los 5 asientos de ajuste de cierre..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "BLOQUE II: REFUNDICIÓN DE CUENTAS DE RESULTADO (35 Puntos):\\nA partir de las cuentas de resultado ajustadas: Ventas ($6.500.000), Intereses Ganados ($200.000), CMV ($3.200.000), Sueldos y Cargas Sociales ($1.400.000), Luz y Servicios ($180.000), Depreciaciones ($800.000) e Intereses Perdidos ($120.000):\\na) Confeccione el Asiento de Refundición de Cuentas de Resultado en el Libro Diario debitando las ganancias y acreditando las pérdidas.\\nb) Determine el Resultado del Ejercicio (Ganancia o Pérdida neta) y regístrelo en la cuenta patrimonial de Resultados No Asignados.",
                    "placeholder": "Asiento de refundición de cuentas de resultado y determinación de la ganancia/pérdida neta..."
                },
                {
                    "numero": 3,
                    "puntos": 35,
                    "pregunta": "BLOQUE III: CIERRE FORMAL Y ESTADOS CONTABLES BÁSICOS (RT 8 y 9) (35 Puntos):\\na) Realice el Asiento de Cierre Formal de Libros de las Cuentas Patrimoniales (invirtiendo débitos y créditos del Activo, Pasivo y Patrimonio Neto).\\nb) Presente la estructura sintética clasificada del Estado de Situación Patrimonial (Activo Corriente, Activo No Corriente, Pasivo Corriente, Pasivo No Corriente y Patrimonio Neto) y verifique la igualdad fundamental contable.",
                    "placeholder": "Asiento de cierre patrimonial formal y esquema de presentación RT 8 y 9..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "Ciclo Contable Completo y Hoja de Trabajo de 8 Columnas: Explique el funcionamiento de la hoja de trabajo previa al balance general (Sumas Debe/Haber, Saldos Deudor/Acreedor, Ajustes, Saldos Ajustados y Clasificación Patrimonial / Resultados). ¿Cuál es la función de la columna de resultados para verificar el beneficio neto?",
                    "placeholder": "Desarrolle la mecánica de la hoja de trabajo de balance..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "Asientos de Cierre y Reapertura: Compare el propósito del asiento de refundición de pérdidas y ganancias frente al asiento de cierre de cuentas patrimoniales. Registre el asiento de reapertura al inicio del ejercicio siguiente.",
                    "placeholder": "Explique el cierre de libros y asiento de reapertura..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "Exposición según Resoluciones Técnicas (RT 8 y RT 9): Explique las pautas de clasificación de activos y pasivos en corrientes y no corrientes (criterio del plazo de 12 meses desde la fecha de cierre). Defina qué información se expone en Notas y Anexos a los estados contables.",
                    "placeholder": "Desarrolle los criterios de clasificación corriente/no corriente según RT 8 y 9..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "Auditoría de Rubros y Ajustes de Ejercicios Anteriores (AREA): ¿En qué circunstancias una corrección de saldos no debe imputarse a cuentas de resultado del ejercicio actual sino a la cuenta AREA del Patrimonio Neto? Ejemplifique con un error en la depreciación de bienes de uso de ejercicios cerrados.",
                    "placeholder": "Desarrolle el concepto y registración de AREA..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "Determinación del Impuesto a las Ganancias y Asiento de Cierre: Si una sociedad anónima obtiene una ganancia contable antes de impuestos de $2.000.000 y la alícuota fiscal es del 30% ($600.000), registre el asiento del impuesto devengado contra Provisión Impuesto a las Ganancias a Pagar y el traslado del resultado neto a Resultados del Ejercicio.",
                    "placeholder": "Asiento contable del impuesto a las ganancias y refundición neta..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "El Estado de Resultados Clasificado: Describa las secciones obligatorias del Estado de Resultados según RT 9: Ventas Netas, Costo de Ventas, Ganancia Bruta, Gastos de Comercialización, Gastos de Administración, Resultados Financieros y por Tenencia, y Resultado Neto.",
                    "placeholder": "Estructura analítica del Estado de Resultados según RT 9..."
                }
            ],
            [
                {
                    "numero": 1,
                    "puntos": 35,
                    "pregunta": "Tratamiento Integral de Resultados Acumulados y Dividendos: A partir de la cuenta Resultados No Asignados con saldo acreedor de $1.500.000, la Asamblea de Accionistas aprueba: a) 5% a Reserva Legal ($75.000); b) Distribución de Dividendos en efectivo por $500.000; c) Distribución de Dividendos en acciones por $400.000. Registre en Libro Diario indicando variaciones patrimoniales.",
                    "placeholder": "Asiento de distribución de dividendos y constitución de reservas..."
                },
                {
                    "numero": 2,
                    "puntos": 35,
                    "pregunta": "Valuación y Exposición de Bienes de Uso (Anexo de Bienes de Uso): Explique cómo se construye el Anexo de Bienes de Uso obligatorio según RT 9 (Valores de Origen al inicio, altas, bajas, valores al cierre; Depreciaciones acumuladas al inicio, del ejercicio, de bajas y al cierre; y Valor Residual Neto).",
                    "placeholder": "Desarrolle la estructura del Anexo de Bienes de Uso..."
                },
                {
                    "numero": 3,
                    "puntos": 30,
                    "pregunta": "Principios Fundamentales de Contabilidad y Normas Profesionales: Analice cómo interactúan los principios de Devengado, Valuación al Costo, Prudencia y Uniformidad para asegurar que los Estados Contables reflejen la 'imagen fiel' del patrimonio de la empresa.",
                    "placeholder": "Confronte los principios contables y la fidelidad de la información financiera..."
                }
            ]
        ]
    }
};

    const matData = bankData[matId] || bankData["filosofia"];
    const modoData = matData[modo] || matData["1er_parcial"];
    const variantList = (Array.isArray(modoData) && modoData.length > 0) ? modoData : matData["1er_parcial"];
    const consignasBase = variantList[v] || variantList[0];

    const nombresMaterias = {
        filosofia: "Filosofía y Ética",
        sfi: "Sistema Financiero Internacional",
        historia: "Historia Económica Mundial",
        estadistica: "Estadística 1",
        contabilidad: "Contabilidad 1"
    };
    const nombreMat = nombresMaterias[matId] || "Licenciatura en Finanzas";

    const nombresModos = {
        "1er_parcial": "1er Parcial",
        "2do_parcial": "2do Parcial",
        "final": "Examen Final"
    };
    const tituloModo = nombresModos[modo] || "Examen Académico";

    // Subtítulos pedagógicos contextualizados por materia y modo
    let subtitulo = `Variante académica ${v + 1} · Programa oficial cátedra UADE`;
    if (modo === "2do_parcial") {
        subtitulo = `Variante académica ${v + 1} (Secuencia ${variantIndex + 1}) · Temario exclusivo de 2do Parcial`;
    } else if (modo === "1er_parcial") {
        subtitulo = `Variante académica ${v + 1} (Secuencia ${variantIndex + 1}) · Temario exclusivo de 1er Parcial`;
    } else if (modo === "final") {
        subtitulo = `Variante académica ${v + 1} (Secuencia ${variantIndex + 1}) · Integración total de la materia`;
    }

    return {
        id: `${matId}_ia_${modo}_${timestamp}_${variantIndex}`,
        nombre: `Modelo ${num} (IA Inédito)`,
        badge: "IA",
        titulo: `${tituloModo} · Modelo ${num} Inédito · ${nombreMat}`,
        subtitulo: subtitulo,
        duracion: modo === "final" ? "150 min · 60 pts para aprobar" : "120 min · 60 pts para aprobar",
        consignas: JSON.parse(JSON.stringify(consignasBase))
    };
}
