import {pack,numberActivity,flowActivity,canvasActivity,casesActivity} from './pack.mjs';
export default pack('veterinaria',[
['anatomia-animal','Compará estructuras por especie y relacioná forma con función.',`
Orientación~Plano mediano~El plano mediano divide el cuerpo en mitades derecha e izquierda.~Ubicar una estructura sin confundir lateralidad.
Movimiento~Articulación sinovial~Una articulación sinovial combina superficies articulares, cápsula y cavidad con líquido.~Relacionar estructura articular y movilidad.
Digestión~Rumen~El rumen permite fermentación microbiana del alimento en rumiantes.~Comparar digestión de bovino con la de un carnívoro.
Tórax~Diafragma~El diafragma separa tórax y abdomen y participa en ventilación.~Relacionar contracción con cambios de volumen torácico.
Circulación~Válvula cardíaca~Las válvulas favorecen flujo unidireccional según gradientes de presión.~Seguir el recorrido de sangre por cavidades.
Comparación~Adaptación anatómica~Las diferencias anatómicas entre especies se interpretan según función y contexto.~Comparar miembros de equino y canino sin asumir equivalencia completa.`,
`Orientación~Una lesión ficticia se describe en el lado derecho del animal. ¿De quién es la derecha?~La referencia es el propio animal, con terminología anatómica consistente.~Referencia correcta|Lateralidad
Digestión~¿Por qué no trasladar un esquema digestivo canino a bovinos?~El bovino presenta compartimentos y fermentación previa que cambian función y tránsito.~Especie|Estructura-función
Ventilación~Al contraerse el diafragma, ¿qué cambia?~Aumenta el volumen torácico y contribuye a generar un gradiente para entrada de aire.~Volumen|Gradiente`,casesActivity('map','Comparador de anatomía por especie')],
['histologia-y-embriologia','Interpretá tejidos y desarrollo evitando equivalencias entre especies.',`
Epitelio~Polaridad epitelial~Las células epiteliales presentan dominios apicales y basales relacionados con su función.~Orientar una superficie de absorción.
Sostén~Matriz extracelular~La matriz extracelular aporta soporte y señales a los tejidos.~Distinguir tejido conectivo de un epitelio compacto.
Músculo~Sarcómero~El sarcómero organiza proteínas contráctiles del músculo estriado.~Relacionar disposición y acortamiento.
Desarrollo~Gastrulación~La gastrulación establece capas germinales y organización corporal inicial.~Ordenar eventos tempranos sin aplicar calendarios humanos a animales.
Intercambio~Placenta~La placenta permite intercambio maternofetal y varía entre especies.~Comparar interfaces sin asumir anatomía universal.
Muestreo~Artefacto histológico~Un artefacto proviene de preparación y puede confundirse con una alteración del tejido.~Revisar técnica y contexto antes de interpretar una imagen.`,
`Muestra~Un corte tiene pliegues y espacios de retracción. ¿Conclusión inmediata?~Pueden ser artefactos; revisar preparación y otros campos antes de inferir lesión.~Técnica|Verificación
Capas~¿Qué proceso establece las capas germinales?~La gastrulación; su cronología y detalles deben contextualizarse por especie.~Proceso|Comparación
Placenta~¿Una descripción humana vale sin cambios en bovinos?~No; la organización placentaria presenta diferencias relevantes entre especies.~Especie|Límite de extrapolación`,flowActivity('Del tejido a una interpretación','Verificar especie y muestra|Revisar calidad del corte|Reconocer organización|Describir células y matriz|Comparar con referencia|Declarar límites','Una descripción ordenada precede a cualquier hipótesis patológica.')],
['fisiologia-animal','Explicá regulación y adaptación fisiológica por especie.',`
Regulación~Homeostasis~La homeostasis conserva variables dentro de rangos mediante regulación dinámica.~Identificar sensor, integración y respuesta de un circuito.
Circulación~Gasto cardíaco~El gasto cardíaco resulta del volumen sistólico por la frecuencia cardíaca.~Calcular flujo con unidades consistentes en un ejemplo.
Respiración~Ventilación alveolar~La ventilación alveolar excluye el espacio muerto del volumen ventilado.~Distinguir respiración rápida de intercambio eficaz.
Riñón~Filtración glomerular~La filtración glomerular produce ultrafiltrado a partir del plasma.~Separar filtración, reabsorción y excreción.
Digestión~Fermentación ruminal~Los microorganismos ruminales transforman sustratos y generan ácidos grasos volátiles.~Relacionar alimentación y ambiente ruminal.
Temperatura~Termorregulación~La termorregulación equilibra producción y pérdida de calor con diferencias entre especies.~Comparar estrategias térmicas de canino y equino.`,
`Flujo~Un ejemplo tiene 70 latidos/min y 60 mL/latido. ¿Gasto?~70×60=4200 mL/min, equivalentes a 4,2 L/min; no define normalidad de una especie.~Cálculo|Unidades
Calor~¿Todos los animales pierden calor por sudor de la misma manera?~No; las vías y su importancia relativa varían según especie y ambiente.~Comparación|Contexto
Riñón~Una sustancia filtrada puede reabsorberse. ¿Filtración equivale a excreción?~No; la excreción depende además de reabsorción y secreción.~Procesos distintos|Balance`,numberActivity('Flujo cardíaco didáctico','a*b/1000',['Frecuencia por minuto','Volumen por latido (mL)'],[70,60],'Valores ficticios para practicar unidades; no son rangos diagnósticos.','L/min')],
['bioquimica','Relacioná metabolismo, nutrición y variaciones interespecie.',`
Catálisis~Enzima~Una enzima acelera una reacción sin cambiar su equilibrio final.~Distinguir velocidad de equilibrio.
Energía~ATP~El ATP participa en acoplamiento entre reacciones y trabajo celular.~Relacionar hidrólisis y transporte activo.
Glucosa~Glucólisis~La glucólisis transforma glucosa en piruvato y produce ATP y equivalentes reducidos.~Ubicar una ruta citosólica básica.
Lípidos~Beta oxidación~La beta oxidación degrada ácidos grasos en unidades de acetil-CoA.~Relacionar reservas lipídicas y disponibilidad energética.
Nitrógeno~Catabolismo de aminoácidos~El catabolismo de aminoácidos requiere manejar grupos nitrogenados.~Distinguir esqueletos carbonados y nitrógeno.
Comparación~Especialización metabólica~Las capacidades y demandas metabólicas varían entre especies y etapas vitales.~Evitar trasladar necesidades nutricionales de perro a gato.`,
`Enzima~Se agrega un catalizador. ¿Cambia el equilibrio final?~No cambia el equilibrio termodinámico; acelera la llegada al mismo.~Cinética|Equilibrio
Nutrición~¿Una dieta canina es intercambiable con una felina?~No; las necesidades y capacidades metabólicas difieren, por lo que se requiere formulación específica.~Especie|No extrapolar
Energía~¿Qué diferencia hay entre glucólisis y beta oxidación?~Procesan principalmente glucosa y ácidos grasos respectivamente, con localización y productos propios.~Sustrato|Ruta`,flowActivity('Destino energético simplificado','Identificar nutriente|Reconocer ruta inicial|Formar intermediarios|Transferir electrones|Acoplar producción de ATP|Regular según demanda','Es un esquema de integración, no una secuencia única para todos los nutrientes.')],
['microbiologia-y-parasitologia','Interpretá agentes, huéspedes y transmisión de manera integrada.',`
Agentes~Bacteria~Una bacteria es un organismo celular procariota con biología distinta de los virus.~Evitar tratar toda infección como bacteriana.
Virus~Dependencia celular~Los virus dependen de células para replicarse.~Relacionar hospedador y tropismo.
Parásitos~Ciclo biológico~El ciclo biológico describe etapas y huéspedes necesarios para un parásito.~Identificar dónde puede interrumpirse una transmisión.
Diagnóstico~Sensibilidad diagnóstica~La sensibilidad es la proporción de positivos entre quienes tienen la condición según referencia.~Distinguir falso negativo de falso positivo.
Transmisión~Reservorio~Un reservorio mantiene un agente y puede contribuir a su transmisión.~Diferenciar reservorio, vector y huésped accidental.
Control~Bioseguridad~La bioseguridad combina barreras y procedimientos para reducir exposición y propagación.~Separar flujos limpios y contaminados.`,
`Ciclo~Un parásito necesita un hospedador intermediario. ¿Qué analizar?~Las etapas, contactos y oportunidades de control, sin suponer transmisión directa universal.~Ciclo|Punto de interrupción
Prueba~Entre 100 casos de referencia, una prueba detecta 80. ¿Sensibilidad?~80/100=80%; esto no informa por sí solo valor predictivo.~Denominador|Límite
Antibiótico~¿Un agente viral justifica antibiótico automáticamente?~No; deben diferenciarse agente y contexto mediante evaluación veterinaria.~Agente|Uso prudente`,numberActivity('Sensibilidad de una prueba ficticia','a/b*100',['Verdaderos positivos','Total de casos de referencia'],[80,100],'El denominador son los casos definidos por referencia, no todos los resultados positivos.','%')],
['farmacologia-veterinaria','Estudiá mecanismos, destino de fármacos y seguridad por especie.',`
Mecanismo~Receptor~Un receptor participa en la respuesta a un ligando mediante mecanismos específicos.~Separar afinidad y efecto funcional.
Destino~Biodisponibilidad~La biodisponibilidad es la fracción de una administración que alcanza circulación sistémica sin cambios.~Comparar vías sin convertir el ejemplo en prescripción.
Eliminación~Vida media~La vida media expresa el tiempo para reducir a la mitad una cantidad bajo un modelo dado.~Seguir un decaimiento ideal de primer orden.
Especies~Variabilidad interespecie~Diferencias metabólicas y fisiológicas modifican exposición y riesgo entre especies.~No trasladar una pauta canina a felinos.
Seguridad~Margen terapéutico~El margen terapéutico compara exposiciones eficaces y tóxicas según contexto.~Reconocer que mayor margen no implica ausencia de riesgo.
Producción~Período de retiro~El período de retiro busca que productos de animales tratados cumplan límites regulatorios de residuos.~Consultar producto, especie y normativa vigente.`,
`Decaimiento~Una cantidad ficticia de 100 unidades atraviesa dos vidas medias. ¿Cuánto queda?~100×(1/2)²=25 unidades bajo el modelo ideal.~Potencia|Supuestos
Extrapolar~¿Puede usarse una pauta humana en un gato por ajustar peso?~No; especie, metabolismo, formulación y riesgo impiden esa extrapolación simple.~Interespecie|Evaluación profesional
Residuos~¿Un período de retiro es universal para cualquier especie?~No; depende de producto autorizado, especie, uso y normativa aplicable.~Especificidad|Fuente vigente`,numberActivity('Decaimiento ideal sin dosis','a*(0.5^b)',['Cantidad inicial ficticia','Vidas medias transcurridas'],[100,2],'Modelo educativo de primer orden; no calcula dosis ni intervalos terapéuticos.','unidades ficticias')],
['patologia-veterinaria','Describí lesiones y mecanismos con contexto y evidencia.',`
Adaptación~Hipertrofia~La hipertrofia aumenta tamaño celular sin equivaler necesariamente a proliferación.~Distinguir aumento de tamaño de aumento de número.
Daño~Necrosis~La necrosis implica muerte celular asociada a pérdida de integridad y respuesta tisular.~Relacionar lesión y mecanismo sin inferir etiología única.
Inflamación~Inflamación aguda~La inflamación aguda combina cambios vasculares y reclutamiento celular.~Interpretar signos como respuesta y no como agente causal.
Circulación~Edema~El edema es acumulación de líquido en el intersticio o cavidades.~Comparar mecanismos hidrostáticos, oncóticos y de permeabilidad.
Neoplasia~Invasión~La invasión describe crecimiento que infiltra tejidos vecinos.~Distinguir descripción morfológica de confirmación diagnóstica.
Muestras~Representatividad~Una muestra debe representar la lesión y acompañarse de contexto.~Evitar concluir sobre todo un órgano desde un fragmento inadecuado.`,
`Descripción~Se observa un tejido aumentado de tamaño. ¿Es neoplasia?~No se deduce solo por tamaño; deben describirse patrón, células y contexto con estudio adecuado.~Descripción|Diferenciales
Edema~¿Todo edema prueba insuficiencia cardíaca?~No; existen múltiples mecanismos y se requieren datos para diferenciarlos.~Mecanismos|No causalidad única
Muestra~El fragmento está degradado. ¿Qué informar?~La limitación de calidad y su impacto interpretativo, considerando nueva toma profesional.~Calidad|Límite`,casesActivity('clinical','Mecanismos de lesión en casos ficticios')],
['semiologia-veterinaria','Ordená observación, anamnesis y examen según especie.',`
Historia~Anamnesis~La anamnesis recoge antecedentes, evolución y contexto con fuente identificada.~Distinguir relato del cuidador y hallazgo del examen.
Observación~Examen a distancia~La observación previa permite valorar postura y conducta sin alterar inicialmente al animal.~Registrar contexto y signos visibles.
Manejo~Bienestar~El manejo debe reducir dolor, miedo y riesgo para animal y personas.~Adaptar aproximación a especie y situación.
Descripción~Signo clínico~Un signo clínico es un hallazgo observado y no un diagnóstico por sí solo.~Describir una alteración sin asignar causa prematura.
Comparación~Referencia por especie~La interpretación requiere referencias apropiadas a especie, edad y contexto.~Evitar comparar parámetros de equino con canino.
Integración~Lista de problemas~Una lista de problemas organiza hallazgos para formular hipótesis y próximos pasos.~Separar datos positivos, negativos e información faltante.`,
`Fuente~El cuidador dice que el animal no come. ¿Cómo registrar?~Como dato referido, precisando duración, cantidad, cambios y observaciones del examen.~Fuente|Cronología
Manejo~El animal muestra miedo al acercarse. ¿Qué priorizar?~Seguridad y bienestar mediante manejo profesional adaptado, evitando forzar sin valoración.~Bienestar|Riesgo
Hallazgo~Una temperatura aislada está fuera de una tabla genérica. ¿Conclusión?~Verificar especie, edad, técnica y contexto antes de interpretar.~Referencia|Técnica`,flowActivity('Organizá una evaluación ficticia','Verificar especie e historia|Observar a distancia|Planificar manejo seguro|Realizar examen pertinente|Registrar hallazgos|Integrar lista de problemas','El orden puede adaptarse por seguridad y urgencia bajo criterio veterinario.')],
['clinica-de-pequenos-animales','Razoná casos ficticios de caninos y felinos sin extrapolar tratamientos.',`
Problemas~Representación del caso~Una representación del caso sintetiza especie, temporalidad y problemas centrales.~Resumir sin omitir datos que cambian hipótesis.
Hidratación~Balance hídrico~El balance hídrico relaciona ingresos, pérdidas y distribución de agua.~Reconocer que una observación aislada no cuantifica todo el déficit.
Digestivo~Diferencial digestivo~Una manifestación digestiva admite causas locales y sistémicas.~Construir hipótesis sin tratar un síntoma como enfermedad única.
Urinario~Producción y eliminación~La producción de orina y su eliminación son procesos distintos.~Distinguir ausencia observada de micción de una causa confirmada.
Respiratorio~Esfuerzo respiratorio~El esfuerzo respiratorio alterado requiere valoración profesional y manejo que reduzca estrés.~Priorizar evaluación sin retrasarla con ejercicios caseros.
Seguimiento~Reevaluación~La reevaluación contrasta evolución con hipótesis y plan profesional.~Registrar cambios y criterios explícitos de revisión.`,
`Canino ficticio~Un perro tiene vómitos según su cuidador. ¿Diagnóstico inmediato?~No; precisar curso, exposición, examen y problemas asociados antes de hipótesis.~Anamnesis|Diferenciales
Felino ficticio~Un cuidador no vio orinar al gato. ¿Qué distinguir?~Observación incompleta, producción y eliminación; requiere valoración veterinaria, no una conclusión remota.~Procesos|Necesidad de evaluación
Seguimiento~Un caso no evoluciona como se esperaba. ¿Qué hacer?~Revisar datos, hipótesis y plan con el profesional; documentar cambio sin repetir automáticamente una intervención.~Reevaluación|Registro`,casesActivity('clinical','Razonamiento canino y felino')],
['clinica-de-grandes-animales','Integrá individuo, rodeo, producción y bienestar.',`
Escalas~Unidad epidemiológica~La unidad epidemiológica define el grupo relevante por contactos y manejo.~Relacionar un caso individual con su rodeo.
Rumiantes~Función ruminal~La función ruminal depende de dieta, microbiota y condiciones del medio.~Indagar cambios alimentarios antes de inferir causa.
Equinos~Síndrome~Un síndrome reúne manifestaciones con diversas causas posibles.~Entender cólico como conjunto de signos y no una etiología única.
Locomoción~Claudicación~La claudicación altera la marcha y requiere localizar origen mediante evaluación.~Distinguir manifestación de lesión confirmada.
Producción~Indicador de rodeo~Un indicador poblacional debe tener denominador, período y definición consistentes.~Comparar frecuencia de problemas entre lotes.
Bienestar~Manejo preventivo~El manejo preventivo integra ambiente, alimentación, bioseguridad y observación.~Evaluar condiciones que afectan a varios animales.`,
`Rodeo ficticio~Hay 5 casos nuevos en 100 animales durante un período. ¿Proporción?~5/100=5% bajo esas definiciones; comparar exige igual período y población en riesgo.~Denominador|Período
Equino ficticio~¿La palabra cólico identifica una única causa?~No; es un síndrome que necesita evaluación veterinaria para establecer causa y gravedad.~Síndrome|Evaluación
Alimento~Varios animales cambian tras una nueva ración. ¿Prueba causal?~Es una hipótesis temporal; revisar exposición, comparación y otras causas.~Asociación|Investigación`,numberActivity('Proporción de casos en un lote ficticio','a/b*100',['Casos','Animales en riesgo'],[5,100],'Compará solo con períodos y definiciones equivalentes.','%')],
['cirugia-veterinaria','Comprendé principios de asepsia, planificación y reparación tisular.',`
Planificación~Evaluación preoperatoria~La evaluación preoperatoria identifica condiciones y riesgos relevantes antes de una intervención.~Integrar especie, estado y objetivo bajo equipo profesional.
Asepsia~Asepsia~La asepsia reúne medidas para evitar contaminación del campo y materiales.~Distinguir preparación limpia de esterilidad validada.
Materiales~Esterilización~La esterilización elimina formas viables de microorganismos según proceso validado.~Revisar indicadores y trazabilidad del material.
Tejidos~Hemostasia~La hemostasia controla pérdida de sangre mediante mecanismos fisiológicos y técnicas profesionales.~Relacionar lesión vascular y control sin practicar maniobras fuera de formación.
Reparación~Cicatrización~La cicatrización incluye fases superpuestas de inflamación, proliferación y remodelación.~Distinguir cierre visible de recuperación completa.
Seguimiento~Vigilancia posoperatoria~La vigilancia registra evolución, dolor y posibles complicaciones según plan profesional.~Definir qué observar y cómo comunicar cambios.`,
`Material~Un paquete estéril está abierto y húmedo. ¿Puede asumirse esterilidad?~No; la integridad y condiciones del empaque forman parte del control del proceso.~Integridad|Protocolo
Herida ficticia~La superficie está cerrada. ¿Recuperó resistencia completa?~No; la remodelación y recuperación mecánica continúan más allá del cierre visible.~Fases|Tiempo
Registro~Faltan datos del proceso de esterilización. ¿Qué revisar?~Trazabilidad, controles e integridad según protocolo; no declarar seguridad sin evidencia.~Evidencia|Trazabilidad`,flowActivity('Planificación segura de un procedimiento','Evaluar paciente y objetivo|Revisar consentimiento y riesgos|Verificar equipo y esterilidad|Confirmar identidad y procedimiento|Documentar intervención|Planificar seguimiento','Actividad conceptual; no enseña técnicas quirúrgicas para realizar sobre animales.')],
['salud-publica-y-zoonosis','Conectá salud humana, animal y ambiental desde la prevención.',`
Integración~Una Salud~Una Salud integra salud humana, animal y de ecosistemas.~Analizar riesgos que atraviesan especies y ambientes.
Transmisión~Zoonosis~Una zoonosis puede transmitirse naturalmente entre animales vertebrados y seres humanos.~Identificar rutas sin atribuir riesgo uniforme a toda especie.
Vigilancia~Definición de caso~Una definición de caso permite clasificar observaciones con criterios consistentes.~Comparar registros de distintos establecimientos.
Frecuencia~Incidencia acumulada~La incidencia acumulada relaciona casos nuevos con población en riesgo durante un período.~Calcular frecuencia con denominador explícito.
Prevención~Cadena de transmisión~La cadena de transmisión conecta agente, reservorio, salida, vía, entrada y huésped.~Elegir barreras pertinentes al mecanismo.
Comunicación~Comunicación de riesgo~La comunicación de riesgo informa incertidumbre y acciones proporcionadas sin estigmatizar.~Explicar medidas con fuentes y responsables identificados.`,
`Brote ficticio~Aparecen casos en animales y personas vinculados a un lugar. ¿Enfoque?~Coordinar vigilancia y evaluación humana, animal y ambiental con autoridades competentes.~Una Salud|Coordinación
Frecuencia~Se observan 4 casos nuevos en 200 individuos en riesgo. ¿Proporción?~4/200=2% durante el período definido; no representa prevalencia histórica.~Cálculo|Definición
Mensaje~Un comunicado culpa a toda una especie sin evidencia. ¿Cómo corregir?~Describir exposición y mecanismo conocidos, incertidumbre y medidas proporcionadas con fuente.~No estigmatizar|Evidencia`,canvasActivity('Mapa Una Salud','Agente o peligro|Animales implicados|Personas expuestas|Ambiente|Ruta posible|Barreras|Información faltante','Escenario ficticio; las medidas reales requieren evaluación y normas locales.')]
], [{title:'MSD Veterinary Manual: fundamentos y referencia profesional',url:'https://www.msdvetmanual.com/'},{title:'OMS: enfoque Una Salud',url:'https://www.who.int/health-topics/one-health'},{title:'WOAH: salud y bienestar animal',url:'https://www.woah.org/en/what-we-do/animal-health-and-welfare/'}]);
