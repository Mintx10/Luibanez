import {pack,numberActivity,flowActivity,canvasActivity,casesActivity} from './pack.mjs';
export default pack('psicologia',[
['introduccion-a-la-psicologia','Estudiá conducta y procesos mentales con preguntas y evidencia.',`
Objeto~Conducta~La conducta comprende acciones observables situadas en un contexto.~Describir lo que una persona hace sin atribuirle intenciones no observadas.
Procesos~Proceso mental~Un proceso mental se estudia mediante indicadores y modelos contrastables.~Inferir atención a partir de un diseño controlado.
Evidencia~Hipótesis~Una hipótesis propone una relación que puede ponerse a prueba.~Predecir un cambio en recuerdo antes de recoger datos.
Método~Definición operacional~Una definición operacional especifica cómo se observará o medirá un concepto.~Definir atención como aciertos en una tarea determinada.
Contexto~Perspectiva biopsicosocial~La perspectiva biopsicosocial integra factores biológicos, psicológicos y sociales.~Evitar explicar el aprendizaje con una sola causa.
Ética~Consentimiento informado~El consentimiento informado requiere información comprensible y decisión voluntaria.~Explicar participación, riesgos y posibilidad de retirarse.`,
`Observación~Una estudiante mira el reloj cuatro veces. ¿Podemos afirmar ansiedad?~Solo se observó esa conducta; la emoción requiere indagación y otras evidencias.~Separar dato e inferencia|Evitar diagnóstico
Operacionalizar~Se quiere estudiar hábitos de estudio. ¿Qué registrar?~Definir frecuencia, duración y condiciones de sesiones en un período explícito.~Indicador observable|Período
Participación~Un participante quiere retirarse de un estudio. ¿Qué hacer?~Respetar el retiro sin coerción y aplicar el procedimiento de protección de sus datos informado previamente.~Voluntariedad|Protección de datos`,canvasActivity('De una idea a una pregunta','Fenómeno|Conducta observable|Hipótesis|Indicador|Contexto|Resguardo ético','No conviertas una interpretación en diagnóstico ni una correlación en causa.')],
['historia-de-la-psicologia','Compará problemas, métodos y contextos de las corrientes psicológicas.',`
Antecedentes~Problema mente-cuerpo~El problema mente-cuerpo pregunta cómo se relacionan experiencia y procesos físicos.~Comparar supuestos de dos explicaciones históricas.
Laboratorio~Psicología experimental~La psicología experimental estudia procesos con procedimientos controlados.~Reconocer el papel de medición y replicación.
Conductismo~Aprendizaje observable~El conductismo priorizó relaciones observables entre ambiente y conducta.~Analizar cómo consecuencias modifican una respuesta.
Gestalt~Organización perceptiva~La Gestalt destacó que la percepción organiza configuraciones y no solo elementos aislados.~Reconocer una figura según su contexto visual.
Psicoanálisis~Conflicto psíquico~Las tradiciones psicoanalíticas proponen modelos de conflicto y procesos no conscientes.~Distinguir una propuesta teórica de evidencia experimental.
Cognición~Procesamiento de información~El enfoque cognitivo modela operaciones como atención y memoria.~Comparar límites de capacidad en tareas de recuerdo.`,
`Comparación~Dos corrientes explican el aprendizaje de forma diferente. ¿Cómo compararlas?~Explicitar objeto, conceptos, método, contexto histórico y evidencia que cada una acepta.~Criterios comunes|Sin caricaturizar
Figura~Una melodía se reconoce aunque cambie su tono. ¿Qué idea ilustra?~La organización de relaciones puede conservarse pese al cambio de elementos particulares.~Relaciones|Organización
Historia~¿Una teoría posterior vuelve inútil toda teoría anterior?~No necesariamente; deben evaluarse alcance, supuestos y evidencia, evitando una historia lineal de triunfos.~Contexto|Evaluación crítica`,canvasActivity('Mapa de corrientes','Corriente|Problema central|Conceptos|Método|Contexto histórico|Límites de evidencia','Compará al menos dos perspectivas sin confundir sus objetivos.')],
['psicologia-del-desarrollo','Analizá cambios y continuidades durante el ciclo vital.',`
Trayectorias~Desarrollo~El desarrollo incluye cambios y continuidades que dependen de múltiples contextos.~Distinguir una trayectoria individual de un promedio grupal.
Diseños~Estudio longitudinal~Un estudio longitudinal sigue a las mismas personas a lo largo del tiempo.~Examinar cambios individuales sin confundir grupos de edad.
Infancia~Vínculo de apego~El apego describe sistemas de búsqueda de proximidad y seguridad en relaciones de cuidado.~Considerar historia y contexto sin etiquetar por una observación.
Cognición~Andamiaje~El andamiaje ajusta ayudas para que una persona realice tareas progresivamente con autonomía.~Reducir apoyo según una habilidad se consolida.
Adolescencia~Identidad~La construcción de identidad combina exploración, compromisos y contexto social.~Analizar oportunidades de elección en una trayectoria ficticia.
Adultez~Plasticidad~La plasticidad permite cambios ligados a experiencia a lo largo de la vida.~Planificar aprendizaje sin asumir incapacidad por edad.`,
`Edades~Se comparan dos grupos de distinta edad una sola vez. ¿Diseño?~Es transversal; diferencias pueden reflejar edad, cohorte y otros factores.~Diseño identificado|Límite causal
Apoyo~Un docente resuelve al principio y luego da pistas. ¿Qué ajustar?~Retirar ayuda gradualmente según desempeño, preservando desafío y autonomía.~Ajuste contingente|Autonomía
Trayectoria~Una persona aprende una habilidad en la adultez. ¿Contradice el desarrollo?~No; el desarrollo abarca todo el ciclo vital y admite plasticidad con condiciones y límites.~Ciclo vital|Contexto`,flowActivity('Diseñá un seguimiento','Definir pregunta de cambio|Seleccionar cohorte|Obtener consentimiento|Medir con criterio estable|Repetir seguimiento|Analizar pérdidas y cambios','Las pérdidas de participantes pueden sesgar la trayectoria observada.')],
['psicologia-cognitiva','Construí explicaciones de atención, memoria y decisión.',`
Atención~Atención selectiva~La atención selectiva prioriza parte de la información disponible.~Comparar desempeño con y sin distractores.
Memoria~Memoria de trabajo~La memoria de trabajo mantiene y manipula información durante una tarea.~Seguir instrucciones mientras se realiza un cálculo.
Aprendizaje~Recuperación~Practicar la recuperación requiere producir una respuesta desde la memoria.~Contrastar autoevaluación con relectura pasiva.
Representaciones~Esquema~Un esquema organiza conocimientos y expectativas sobre una situación.~Reconocer cómo el contexto guía interpretación.
Decisión~Heurística~Una heurística simplifica decisiones y puede generar sesgos sistemáticos.~Examinar un juicio basado solo en ejemplos recientes.
Metacognición~Calibración~La calibración compara confianza subjetiva con desempeño observado.~Revisar si sentirse seguro coincide con responder correctamente.`,
`Distractores~Un grupo trabaja con notificaciones y otro sin ellas. ¿Qué cuidar?~Asignación, equivalencia de tarea, medida de desempeño y control de diferencias previas.~Control|Medición
Recuerdo~Una alumna relee y cree dominar, pero no puede explicar. ¿Actividad útil?~Intentar recuperación sin mirar y contrastar con una explicación correcta.~Recuperación|Retroalimentación
Confianza~Se estima 90% de aciertos pero se logra 60%. ¿Qué evaluar?~La sobreconfianza y la calibración, sin inferir una capacidad fija por una tarea.~Diferencia confianza-desempeño|Límite`,numberActivity('Brecha de calibración','a-b',['Confianza estimada (%)','Aciertos observados (%)'],[90,60],'Una brecha positiva indica mayor confianza que acierto en esta tarea; no es una prueba clínica.','puntos porcentuales')],
['neurociencias','Relacioná mecanismos nerviosos con funciones sin reduccionismos.',`
Señal~Potencial de acción~El potencial de acción es un cambio regenerativo de voltaje de membrana.~Distinguir intensidad del estímulo y frecuencia de descarga.
Comunicación~Sinapsis~Una sinapsis transmite señales entre células mediante mecanismos químicos o eléctricos.~Ubicar recepción y transmisión de una señal.
Organización~Red neural~Las funciones dependen de redes distribuidas que interactúan.~Evitar asignar una conducta compleja a un único punto cerebral.
Cambio~Plasticidad sináptica~La plasticidad sináptica modifica eficacia de conexiones con actividad y experiencia.~Relacionar aprendizaje y cambios de comunicación.
Regulación~Sistema autónomo~El sistema autónomo participa en regulación visceral junto con otros mecanismos.~Distinguir respuesta corporal de interpretación subjetiva.
Métodos~Señal indirecta~Muchas técnicas de neuroimagen miden indicadores indirectos de actividad.~Interpretar una imagen sin confundir correlación con explicación completa.`,
`Imagen~Una región se activa durante una tarea. ¿Prueba que produce por sí sola esa función?~No; la asociación depende del diseño y no demuestra necesidad, suficiencia ni exclusividad.~Inferencia limitada|Red distribuida
Señales~Un estímulo más intenso aumenta necesariamente la amplitud de cada potencial. ¿Correcto?~En un modelo básico, la codificación puede aumentar frecuencia y reclutamiento; el potencial es regenerativo.~Todo o nada|Codificación
Aprendizaje~Una conexión cambia su eficacia tras práctica. ¿Concepto?~Plasticidad sináptica; no demuestra por sí sola un cambio conductual específico.~Mecanismo|Límite inferencial`,flowActivity('Comunicación sináptica química','Llega potencial presináptico|Entra calcio en terminal|Se libera neurotransmisor|Se activan receptores|Cambia respuesta postsináptica|Se retira o inactiva transmisor','Es un esquema introductorio; receptores y circuitos determinan respuestas diferentes.')],
['psicologia-social','Situá la conducta en relaciones, grupos e instituciones.',`
Atribuciones~Atribución~Una atribución propone causas de una conducta considerando persona y situación.~Revisar una explicación que ignora las condiciones de una tarea.
Actitudes~Actitud~Una actitud integra evaluaciones hacia un objeto y no predice siempre una conducta particular.~Examinar discrepancias entre declaración y acción.
Grupos~Norma social~Una norma social establece expectativas compartidas dentro de un grupo.~Distinguir una expectativa de una preferencia individual.
Influencia~Conformidad~La conformidad modifica respuestas frente a presión real o percibida del grupo.~Analizar condiciones que facilitan desacuerdo informado.
Prejuicio~Estereotipo~Un estereotipo generaliza características a integrantes de una categoría.~Distinguir clasificación de evidencia sobre una persona.
Cooperación~Interdependencia~La interdependencia vincula resultados de personas mediante metas y recursos compartidos.~Diseñar una tarea que premie colaboración.`,
`Entrega~Un estudiante llegó tarde. ¿Basta atribuirlo a irresponsabilidad?~No; hay que considerar información situacional y patrones antes de inferir rasgos.~Alternativas|Evidencia
Grupo~Nadie cuestiona una respuesta por temor a quedar aislado. ¿Qué revisar?~Normas, presión de conformidad y mecanismos para expresar disenso sin represalias.~Proceso grupal|Intervención concreta
Categorías~Se supone capacidad por pertenencia a un grupo. ¿Problema?~Se aplica un estereotipo a una persona sin evaluar evidencia individual.~Generalización|Consecuencias`,canvasActivity('Analizá una escena social','Conducta observable|Situación|Normas|Atribuciones posibles|Evidencia faltante|Alternativa cooperativa','Usá una escena ficticia y evitá adjudicar rasgos estables sin evidencia.')],
['metodologia-de-investigacion','Convertí preguntas en diseños transparentes y replicables.',`
Problema~Pregunta investigable~Una pregunta investigable delimita población, variables y relación observable.~Reformular una inquietud amplia en una comparación concreta.
Diseño~Asignación aleatoria~La asignación aleatoria distribuye participantes entre condiciones para reducir confusión.~Separar selección de muestra y asignación de grupos.
Validez~Variable de confusión~Una variable de confusión ofrece una explicación alternativa de una asociación.~Controlar experiencia previa al comparar métodos de estudio.
Muestra~Muestreo~El muestreo define cómo se seleccionan unidades de una población.~Evaluar límites de generalizar una muestra voluntaria.
Transparencia~Prerregistro~El prerregistro explicita hipótesis y análisis antes de conocer resultados.~Distinguir confirmación planificada de exploración posterior.
Ética~Minimización de datos~La minimización recoge solo datos necesarios para el objetivo declarado.~Eliminar identificadores innecesarios de una encuesta.`,
`Café~Quienes toman café aprueban más. ¿Prueba efecto causal?~No; horas de estudio, contexto y selección pueden explicar la asociación.~Confusión|Diseño alternativo
Grupos~Asignar por orden de llegada puede sesgar. ¿Qué mejora?~Asignar aleatoriamente con procedimiento reproducible y verificar implementación.~Aleatoriedad|Control
Encuesta~Se pregunta documento de identidad sin necesidad. ¿Qué hacer?~Omitirlo y justificar cada dato recogido, con resguardo y consentimiento adecuados.~Minimización|Finalidad`,canvasActivity('Protocolo breve','Pregunta|Hipótesis|Población y muestra|Variables operacionales|Diseño y controles|Análisis previsto|Resguardos éticos','El diseño debe permitir distinguir la hipótesis de explicaciones alternativas.')],
['estadistica-y-psicometria','Interpretá medidas con incertidumbre y límites de uso.',`
Resumen~Media~La media suma los valores y divide por la cantidad de observaciones.~Resumir puntajes reconociendo sensibilidad a extremos.
Dispersión~Desvío estándar~El desvío estándar describe dispersión alrededor de la media en unidades originales.~Comparar heterogeneidad de dos grupos.
Asociación~Correlación~La correlación resume asociación y no demuestra causalidad.~Evitar atribuir efecto a partir de dos variables relacionadas.
Consistencia~Confiabilidad~La confiabilidad se refiere a precisión o consistencia de mediciones bajo condiciones definidas.~Examinar estabilidad de puntajes sin confundirla con validez.
Interpretación~Validez~La validez reúne evidencia para una interpretación y un uso específico de puntajes.~Evaluar si una medida respalda la decisión propuesta.
Error~Error de medición~El error de medición impide tratar un puntaje observado como valor exacto e inmutable.~Informar incertidumbre al comparar puntajes.`,
`Promedio~Los datos educativos son 2, 4 y 9. ¿Media?~La suma es 15 y n=3; la media es 5. La mediana es 4.~Cálculo|Distinguir mediana
Instrumento~Una medida es consistente pero mide otra cosa. ¿Qué falta?~La consistencia no basta; se necesita evidencia de validez para el uso específico.~Confiabilidad versus validez|Uso
Relación~r positivo implica que X causa Y. ¿Correcto?~No; deben considerarse dirección inversa, confusión y diseño.~Límite causal|Alternativas`,numberActivity('Media de datos didácticos','(a+b+c)/3',['Observación 1','Observación 2','Observación 3'],[2,4,9],'Se utilizan datos inventados, sin baremos ni interpretación clínica.')],
['psicopatologia','Describí fenómenos y formulá hipótesis sin diagnosticar por listas.',`
Descripción~Signo y síntoma~Un signo se observa y un síntoma es una experiencia referida por la persona.~Registrar fuente de cada dato de una entrevista ficticia.
Temporalidad~Curso~El curso integra inicio, duración y evolución de manifestaciones.~Distinguir un episodio aislado de un patrón sostenido.
Contexto~Deterioro funcional~El deterioro funcional se evalúa en actividades y contexto de vida.~Indagar impacto sin reducir a una etiqueta.
Diferenciales~Diagnóstico diferencial~El diagnóstico diferencial compara hipótesis y causas alternativas.~Considerar condiciones médicas y sustancias en una evaluación profesional.
Cultura~Formulación cultural~La formulación cultural examina significados y condiciones socioculturales relevantes.~Evitar interpretar expresiones fuera de su contexto.
Evaluación~Hipótesis clínica~Una hipótesis clínica es provisional y requiere evidencia convergente.~Explicitar información faltante en vez de concluir por un síntoma.`,
`Caso ficticio~Alex refiere dormir mal tras un cambio de horario. ¿Alcanza para diagnosticar?~No; faltan duración, contexto, impacto y otras causas. Corresponde describir e indagar.~Datos faltantes|Sin diagnóstico automático
Fuente~Un familiar dice que la persona está distraída. ¿Cómo registrar?~Como información de tercero, distinguiéndola del relato propio y observación directa.~Fuente|Triangulación
Curso~Dos personas presentan igual manifestación hoy. ¿Son equivalentes?~No; inicio, persistencia, contexto e impacto pueden diferir sustancialmente.~Temporalidad|Contexto`,casesActivity('clinical','Formulación descriptiva sin etiquetas')],
['evaluacion-psicologica','Integrá fuentes y protegé a las personas durante la evaluación.',`
Encuadre~Motivo de consulta~El motivo de consulta delimita demanda, destinatario y objetivos de evaluación.~Aclarar quién solicita información y para qué.
Entrevista~Pregunta abierta~Una pregunta abierta permite elaborar una respuesta sin imponer alternativas iniciales.~Explorar experiencias antes de precisar detalles.
Observación~Registro conductual~Un registro conductual describe acciones y contexto con criterios explícitos.~Evitar adjetivos valorativos como único registro.
Instrumentos~Uso competente~Un instrumento requiere formación, autorización y evidencia para su población y finalidad.~No reproducir pruebas protegidas ni interpretar baremos fuera de contexto.
Integración~Convergencia de fuentes~Integrar fuentes requiere examinar acuerdos, discrepancias y calidad de la evidencia.~Contrastar entrevista y observación sin promediar acríticamente.
Devolución~Informe responsable~Un informe comunica alcance, hallazgos, límites y destinatarios autorizados.~Separar hechos, interpretaciones y recomendaciones justificadas.`,
`Pedido~Una institución pide toda la historia personal. ¿Qué revisar?~Finalidad, consentimiento y pertinencia; comunicar solo información necesaria y autorizada.~Finalidad|Confidencialidad
Discrepancia~Entrevista y observación difieren. ¿Qué hacer?~Examinar contextos, fuentes y limitaciones, buscar información adicional y declarar incertidumbre.~No forzar acuerdo|Indagación
Prueba~Se encuentra un test protegido en internet. ¿Puede usarse aquí?~No se reproduce ni administra; este campus trabaja con ejercicios didácticos originales sin valor diagnóstico.~Derechos|Competencia`,canvasActivity('Plan de evaluación ficticio','Demanda|Objetivo|Fuentes|Consentimiento|Datos necesarios|Límites|Devolución','No ingreses información identificable ni resultados de pacientes reales.')],
['psicologia-clinica','Comprendé formulación, objetivos y seguimiento de intervenciones.',`
Encuadre~Alianza de trabajo~La alianza de trabajo implica colaboración sobre objetivos y tareas.~Acordar metas comprensibles en una situación ficticia.
Formulación~Formulación de caso~Una formulación relaciona problemas, contexto, hipótesis y factores de mantenimiento.~Distinguir explicación provisional de etiqueta diagnóstica.
Objetivos~Meta observable~Una meta observable permite revisar cambios relevantes para la persona.~Especificar una conducta y un plazo de seguimiento.
Evidencia~Práctica basada en evidencia~La práctica integra investigación, competencia profesional y características de la persona.~Evaluar pertinencia y preferencias sin prometer resultados.
Seguimiento~Medición de resultados~El seguimiento compara indicadores acordados a lo largo del proceso.~Detectar ausencia de mejora y revisar hipótesis.
Límites~Derivación~La derivación reconoce necesidades que exceden competencia o recursos disponibles.~Identificar cuándo se requiere otro profesional o nivel de atención.`,
`Meta~El objetivo dice sentirse mejor. ¿Cómo concretarlo?~Acordar una conducta relevante, condiciones de observación y revisión, sin imponer una meta ajena.~Colaboración|Observabilidad
Sin cambios~Un indicador no mejora. ¿Qué corresponde?~Revisar calidad de medición, formulación, objetivos e intervención con supervisión pertinente.~Revisión|No prometer eficacia
Competencia~Un caso excede la formación del profesional. ¿Qué principio aplica?~Reconocer límites y gestionar consulta o derivación responsable, evitando abandono.~Competencia|Continuidad`,canvasActivity('Formulación educativa','Problema descrito|Contexto|Hipótesis provisional|Mantenedores|Recursos|Meta observable|Seguimiento','Caso ficticio para aprendizaje; no constituye indicación terapéutica.')],
['etica-profesional','Razoná decisiones profesionales desde derechos y responsabilidades.',`
Autonomía~Consentimiento~El consentimiento es un proceso informado y revisable, no solo una firma.~Comprobar comprensión y voluntariedad.
Confidencialidad~Secreto profesional~La confidencialidad protege información con límites establecidos por normas aplicables.~Explicar límites antes de recoger datos sensibles.
Competencia~Límite profesional~La competencia exige formación pertinente y reconocimiento de límites.~Rechazar una tarea para la que no se posee preparación.
Relaciones~Conflicto de intereses~Un conflicto de intereses puede comprometer el juicio o la confianza profesional.~Identificar beneficios personales en una decisión.
Registros~Custodia de información~La custodia requiere acceso restringido, finalidad y conservación justificada.~Evitar compartir historias en servicios públicos sin autorización.
Deliberación~Decisión fundada~Una decisión ética documenta hechos, normas pertinentes, alternativas y consecuencias.~Consultar supervisión ante un dilema sin revelar más datos de los necesarios.`,
`Consulta informal~Piden comentar un caso real en un grupo abierto. ¿Qué hacer?~No divulgar información identificable; usar canales autorizados y mínima información necesaria.~Confidencialidad|Canal adecuado
Doble interés~Una recomendación beneficia económicamente al profesional. ¿Qué revisar?~Identificar el conflicto, transparentarlo y evitar que determine la decisión.~Conflicto|Protección de autonomía
Normas~¿Un resumen del campus sustituye las reglas profesionales vigentes?~No; debe consultarse normativa de jurisdicción y código aplicable con asesoramiento competente.~Jurisdicción|Fuente vigente`,flowActivity('Deliberación de un caso ficticio','Precisar hechos|Identificar derechos y normas|Reconocer conflicto|Comparar alternativas|Consultar responsablemente|Documentar decisión y revisión','El esquema organiza razonamiento; no reemplaza normativa profesional aplicable.')]
], [{title:'OpenStax: Psychology 2e',url:'https://openstax.org/details/books/psychology-2e'},{title:'APA: ética en psicología',url:'https://www.apa.org/ethics/code'}]);
