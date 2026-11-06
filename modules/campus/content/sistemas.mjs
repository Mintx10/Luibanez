import {pack,numberActivity,flowActivity,canvasActivity,casesActivity} from './pack.mjs';
export default pack('sistemas',[
['programacion-i','Convertí un problema en pasos explícitos y comprobables.',`
Estado~Variable~Una variable representa un valor que puede cambiar durante la ejecución.~Seguir el valor de un contador tras cada instrucción.
Tipos~Tipo de dato~Un tipo determina valores y operaciones admitidos.~Distinguir sumar números de concatenar texto.
Decisiones~Condicional~Un condicional ejecuta una rama según una expresión booleana.~Aplicar un descuento únicamente cuando se cumple una condición.
Repetición~Bucle~Un bucle repite instrucciones mientras se satisface su regla de control.~Recorrer una colección sin omitir su último elemento.
Abstracción~Función~Una función agrupa una operación con parámetros y resultado definido.~Separar el cálculo de un total de su presentación.
Verificación~Caso límite~Un caso límite prueba una frontera del dominio de entrada.~Comprobar una lista vacía antes de calcular su promedio.`,
`Acumulador~Se inicia total=0 y se suman 2, 4 y 3. ¿Qué queda?~Los estados sucesivos son 2, 6 y 9; el total final es 9.~Mostrar estados|No reiniciar dentro del bucle
Paridad~¿Cómo decidir si un entero n es par?~Evaluar n módulo 2 igual a cero; incluir cero y enteros negativos en las pruebas.~Condición correcta|Probar fronteras
Promedio vacío~Una función recibe cero notas. ¿Debe dividir por cero?~Validar primero la longitud y devolver un resultado explícito de ausencia de datos.~Evitar división inválida|Definir contrato`,
{type:'trace',title:'Seguí un acumulador',values:[2,4,3],initial:0,operation:'sum'}],
['programacion-ii','Diseñá objetos, contratos y errores que se puedan mantener.',`
Modelado~Encapsulación~La encapsulación protege invariantes detrás de una interfaz.~Impedir saldos negativos mediante operaciones de una cuenta.
Composición~Composición de objetos~La composición construye comportamiento colaborando con otros objetos.~Inyectar un repositorio en un servicio.
Sustitución~Polimorfismo~El polimorfismo permite usar implementaciones distintas mediante un contrato común.~Cambiar el medio de pago sin reescribir el pedido.
Fallos~Excepción~Una excepción comunica un fallo que necesita tratamiento explícito.~Informar un archivo ausente sin fingir una lectura exitosa.
Recursos~Ciclo de vida~El ciclo de vida delimita adquisición, uso y liberación de recursos.~Cerrar una conexión aunque falle una operación.
Pruebas~Prueba unitaria~Una prueba unitaria comprueba comportamiento aislado con entradas controladas.~Verificar que una transferencia inválida no cambia saldos.`,
`Cuenta~Un retiro dejaría el saldo en -10. ¿Dónde validar?~En la operación que modifica el saldo; rechazarla de forma atómica conservando el estado anterior.~Invariante explícita|Estado conservado
Notificaciones~Un pedido debe enviar correo o SMS. ¿Cómo evitar ramas repetidas?~Definir un contrato de notificación y proveer implementaciones intercambiables.~Contrato común|Separar responsabilidades
Archivo~La lectura falla después de abrir el archivo. ¿Qué debe ocurrir?~Propagar un error útil y liberar el recurso en un bloque de cierre garantizado.~Error observable|Recurso liberado`,canvasActivity('Diseñá una interfaz','Responsabilidad|Operaciones públicas|Invariantes|Errores esperados|Pruebas','Contrastá cada operación con una invariante y una prueba.')],
['algoritmos-y-estructuras-de-datos','Elegí estructuras a partir de las operaciones y su costo.',`
Costos~Complejidad asintótica~La complejidad describe cómo crece el costo con el tamaño de entrada.~Comparar un recorrido lineal con búsquedas logarítmicas.
Secuencias~Arreglo~Un arreglo permite acceso por índice y puede requerir desplazar elementos al insertar.~Seleccionar una estructura para lecturas frecuentes por posición.
Orden de salida~Pila~Una pila extrae primero el último elemento agregado.~Modelar deshacer operaciones.
Esperas~Cola~Una cola extrae primero el elemento que llegó antes.~Organizar solicitudes por llegada.
Búsqueda~Búsqueda binaria~La búsqueda binaria reduce a la mitad un intervalo ordenado.~Encontrar un código dentro de una lista previamente ordenada.
Relaciones~Grafo~Un grafo representa entidades conectadas por aristas.~Modelar rutas entre edificios universitarios.`,
`Deshacer~Se aplican A, B y C. ¿Qué sale primero al deshacer?~Una pila retira C, luego B y finalmente A.~Orden LIFO|Justificación
Buscar~¿Puede aplicarse búsqueda binaria a [7,2,9]?~No directamente: requiere orden y una comparación compatible; ordenar tiene un costo previo.~Precondición|Costo considerado
Recorridos~Un ciclo anidado recorre n por n posiciones. ¿Cómo crece?~Realiza aproximadamente n² visitas; duplicar n multiplica por cuatro ese componente.~Orden cuadrático|Interpretación`,{type:'trace',title:'Trazá una pila',values:[3,8,5],initial:0,operation:'stack'}],
['matematica-discreta','Razoná con proposiciones, conjuntos y estructuras finitas.',`
Lógica~Implicación~Una implicación solo es falsa cuando el antecedente es verdadero y el consecuente falso.~Buscar un contraejemplo para una regla.
Conjuntos~Intersección~La intersección contiene los elementos compartidos por dos conjuntos.~Identificar alumnos que cursan dos materias.
Relaciones~Equivalencia~Una relación de equivalencia es reflexiva, simétrica y transitiva.~Agrupar enteros por su resto módulo tres.
Conteo~Principio multiplicativo~Las etapas independientes se cuentan multiplicando sus posibilidades.~Contar combinaciones de tres letras y cuatro números.
Demostración~Inducción~La inducción prueba una base y un paso que preserva la afirmación.~Demostrar una fórmula de suma para enteros positivos.
Grafos~Grado~El grado de un vértice cuenta las aristas incidentes en un grafo simple.~Reconocer conectividad local en una red.`,
`Regla falsa~Si llueve llevo paraguas; llueve y no lo llevo. ¿Qué pasa?~Ese caso vuelve falsa la implicación, sin afirmar su recíproca.~Tabla lógica|No confundir recíproca
Combinaciones~Hay 3 opciones de entrada y 4 de plato. ¿Cuántos menús?~Si se elige una de cada categoría sin restricciones, hay 3×4=12.~Supuestos|Producto
Intersección~A={1,2,3}, B={2,3,4}. ¿Qué comparten?~A∩B={2,3}; la unión tendría cuatro elementos.~Elementos correctos|Distinguir unión`,numberActivity('Contá combinaciones','a*b',['Opciones de etapa 1','Opciones de etapa 2'],[3,4],'El producto supone que toda opción de la primera etapa admite cualquiera de la segunda.')],
['analisis-matematico','Interpretá cambios, acumulaciones y aproximaciones.',`
Funciones~Dominio~El dominio reúne las entradas para las que una función está definida.~Excluir cero del denominador de una función racional.
Límites~Límite~Un límite describe el comportamiento al aproximarse a una entrada.~Distinguir valor puntual de tendencia cercana.
Continuidad~Continuidad~Una función continua coincide localmente con su límite en el punto.~Comprobar si una función por tramos presenta un salto.
Derivadas~Derivada~La derivada mide la tasa instantánea de cambio.~Calcular la pendiente de una curva de costo.
Integrales~Integral definida~Una integral definida acumula una magnitud en un intervalo con signo.~Obtener desplazamiento a partir de velocidad.
Optimización~Punto crítico~Un punto crítico requiere analizar derivada nula o no definida dentro del dominio.~Comparar candidatos y extremos de un intervalo cerrado.`,
`Pendiente~Para f(x)=x², ¿cuál es la pendiente en x=3?~f'(x)=2x, de modo que la pendiente es 6.~Regla de potencia|Evaluación
Acumulación~La velocidad constante es 4 m/s durante 5 s. ¿Desplazamiento?~La integral es 4×5=20 metros.~Unidades|Área con signo
Dominio~¿Está definida 1/(x-2) en x=2?~No; el denominador se anula. La exclusión pertenece al dominio.~Identificar denominador|Excluir entrada`,numberActivity('Derivada de x² en un punto','2*a',['Valor de x'],[3],'La regla de potencia produce f′(x)=2x.')],
['algebra-y-geometria','Describí espacios, transformaciones y sistemas lineales.',`
Vectores~Vector~Un vector tiene componentes que representan dirección y magnitud en una base.~Describir un desplazamiento plano por dos coordenadas.
Producto escalar~Ortogonalidad~Dos vectores no nulos son ortogonales cuando su producto escalar es cero.~Comprobar perpendicularidad de direcciones.
Matrices~Producto matricial~El producto matricial compone transformaciones y exige dimensiones compatibles.~Aplicar dos transformaciones sucesivas a coordenadas.
Sistemas~Eliminación gaussiana~La eliminación gaussiana transforma ecuaciones mediante operaciones equivalentes.~Resolver un sistema sin alterar su conjunto solución.
Independencia~Rango~El rango cuenta direcciones linealmente independientes.~Detectar ecuaciones redundantes.
Geometría~Recta paramétrica~Una recta paramétrica combina un punto y un vector director.~Representar una trayectoria recta en el espacio.`,
`Perpendiculares~u=(1,2), v=(2,-1). ¿Son ortogonales?~Su producto es 1×2+2×(-1)=0; ambos son no nulos.~Producto correcto|Conclusión
Sistema~x+y=5 y x-y=1. Hallá x e y.~Sumar da 2x=6; x=3 e y=2. Ambas ecuaciones se verifican.~Operación equivalente|Verificación
Redundancia~x+y=2 y 2x+2y=4. ¿Solución única?~Son la misma restricción; hay infinitas soluciones en el plano.~Dependencia|Grados de libertad`,numberActivity('Producto escalar en dos dimensiones','a*b+c',['u₁','v₁','Producto u₂·v₂'],[1,2,-2],'Sumá los productos de componentes correspondientes.')],
['arquitectura-de-computadoras','Conectá representación binaria, procesador y memoria.',`
Representación~Bit~Un bit distingue dos estados y permite codificar información.~Contar patrones posibles en una palabra de ocho bits.
Instrucciones~Ciclo de instrucción~El procesador busca, decodifica y ejecuta instrucciones.~Seguir una carga desde memoria y su operación posterior.
Procesamiento~Registro~Un registro conserva un valor de acceso inmediato dentro del procesador.~Ubicar operandos antes de una suma.
Memoria~Localidad~La localidad temporal y espacial favorece la reutilización en caché.~Explicar por qué recorrer datos contiguos puede ser eficiente.
Entradas y salidas~Interrupción~Una interrupción permite atender un evento y luego retomar el trabajo.~Comunicar la finalización de una operación de dispositivo.
Rendimiento~Latencia~La latencia mide el tiempo hasta completar una operación.~Separar tiempo de respuesta de cantidad de operaciones por segundo.`,
`Patrones~¿Cuántos patrones tienen ocho bits?~Cada bit tiene dos estados; 2⁸=256 patrones distintos.~Potencia correcta|No confundir máximo con cantidad
Caché~Un programa recorre un arreglo contiguo. ¿Qué localidad aprovecha?~Principalmente espacial: elementos cercanos comparten líneas de caché.~Mecanismo|No garantizar velocidad absoluta
Tiempo~Una operación tarda 20 ms. ¿Qué magnitud describe?~Describe latencia de esa operación; no basta para inferir rendimiento agregado con concurrencia.~Unidad|Distinguir throughput`,numberActivity('Patrones binarios','2^a',['Cantidad de bits'],[8],'Hay dos posibilidades independientes por bit.','patrones')],
['sistemas-operativos','Coordiná procesos y recursos sin perder consistencia.',`
Ejecución~Proceso~Un proceso es una instancia de programa con recursos y estado propios.~Aislar dos aplicaciones en ejecución.
Concurrencia~Hilo~Un hilo es un flujo de ejecución que comparte recursos de su proceso.~Coordinar tareas que acceden a la misma memoria.
Sincronización~Exclusión mutua~La exclusión mutua limita el acceso simultáneo a una sección crítica.~Evitar actualizaciones perdidas de un contador compartido.
Bloqueos~Interbloqueo~Un interbloqueo ocurre cuando tareas esperan recursos retenidos entre sí sin progresar.~Revisar el orden de adquisición de dos cerrojos.
Memoria~Memoria virtual~La memoria virtual traduce direcciones y aísla espacios de los procesos.~Distinguir una dirección lógica de su ubicación física.
Archivos~Permiso mínimo~Cada proceso debería recibir solo los permisos necesarios para su tarea.~Restringir un lector de documentos a acceso de lectura.`,
`Contador~Dos hilos leen 4 y ambos escriben 5. ¿Qué pasó?~Se perdió una actualización; una operación atómica o sección crítica preservaría ambos incrementos.~Intercalado explicado|Solución de sincronización
Dos cerrojos~A tiene X y pide Y; B tiene Y y pide X. ¿Riesgo?~Hay espera circular. Un orden global de adquisición puede impedirla.~Ciclo de espera|Prevención concreta
Permisos~Un visor solo muestra archivos. ¿Debe escribirlos?~No requiere escritura; otorgar lectura reduce el impacto de errores.~Necesidad funcional|Menor privilegio`,flowActivity('Lectura coordinada','Solicitar recurso|Adquirir cerrojo|Leer estado|Actualizar estado|Liberar cerrojo','El recurso se libera aun si la operación falla; el ejemplo describe una sección crítica mínima.')],
['bases-de-datos','Modelá datos y verificá integridad, consultas y transacciones.',`
Modelo~Clave primaria~Una clave primaria identifica de forma única cada fila y no admite nulos.~Distinguir dos alumnos con el mismo nombre.
Relaciones~Clave foránea~Una clave foránea conserva referencias válidas entre tablas.~Impedir inscripciones que apuntan a una materia inexistente.
Consultas~JOIN~Un JOIN combina filas según una condición de relación.~Mostrar inscripciones con los nombres de sus materias.
Normalización~Dependencia funcional~Una dependencia funcional vincula un determinante con atributos determinados.~Evitar repetir el nombre de la carrera en cada inscripción.
Transacciones~Atomicidad~La atomicidad aplica todos los cambios de una transacción o ninguno.~Registrar débito y crédito de una transferencia juntos.
Índices~Índice~Un índice puede acelerar lecturas a cambio de espacio y costo de escritura.~Medir una búsqueda frecuente antes y después de indexar.`,
`Identidad~Dos alumnos se llaman Ana. ¿Sirve el nombre como clave?~No garantiza unicidad ni estabilidad; usar un identificador y conservar el nombre como atributo.~Unicidad|Estabilidad
Transferencia~Se debita una cuenta y falla el crédito. ¿Qué corresponde?~Revertir toda la transacción para mantener el total consistente.~Atomicidad|Invariante
Inscripción~Se elimina una materia todavía referenciada. ¿Qué revisar?~La política de clave foránea debe restringir, reasignar o borrar dependencias deliberadamente.~Integridad referencial|Política explícita`,canvasActivity('Modelá una inscripción','Entidades|Claves primarias|Relaciones y cardinalidad|Restricciones|Consulta requerida','Cada relación debe identificar su clave foránea y cada regla una restricción verificable.')],
['redes','Interpretá paquetes, direcciones y fronteras de confianza.',`
Capas~Encapsulación~La encapsulación agrega metadatos de cada capa al transportar datos.~Separar mensaje de aplicación y encabezados de red.
Direcciones~Subred~Una subred agrupa direcciones mediante un prefijo común.~Reconocer qué destinos se alcanzan sin un router intermedio.
Nombres~DNS~DNS resuelve nombres mediante registros y respuestas con tiempo de validez.~Distinguir un nombre de dominio de una dirección IP.
Transporte~TCP~TCP ofrece un flujo de bytes ordenado con control de entrega y congestión.~Elegir transporte fiable para transferir un archivo.
Protección~TLS~TLS protege integridad y confidencialidad del transporte con identidad validada.~Comprobar un certificado antes de enviar credenciales.
Diagnóstico~Pérdida de paquetes~La pérdida puede aumentar retransmisiones y tiempo de respuesta.~Separar problemas de resolución, conexión y aplicación.`,
`Nombre~Un sitio no abre por nombre pero sí por IP. ¿Qué investigar?~Comenzar por resolución DNS, sin concluir que el servicio completo funciona por una única prueba.~Hipótesis localizada|Prueba adicional
Prefijo~Una red IPv4 /24 tiene ¿cuántas direcciones totales?~Quedan ocho bits: 2⁸=256 direcciones; direcciones utilizables dependen del caso y reservadas.~Bits de host|Distinguir total y usable
Certificado~Una conexión cifra pero no valida identidad. ¿Es suficiente?~No autentica al destinatario previsto; debe validarse cadena y nombre del certificado.~Cifrado e identidad|Validación`,flowActivity('Recorrido de una solicitud HTTPS','Resolver nombre|Conectar transporte|Validar negociación TLS|Enviar solicitud HTTP|Recibir respuesta','Es una simplificación educativa; reutilización de conexiones y protocolos como HTTP/3 modifican el recorrido.')],
['ingenieria-de-software','Construí software alrededor de necesidades y evidencia.',`
Necesidades~Requisito verificable~Un requisito verificable expresa una conducta observable con criterio de aceptación.~Definir qué ocurre al enviar dos veces un formulario.
Diseño~Cohesión~La cohesión reúne responsabilidades relacionadas dentro de un módulo.~Separar facturación de presentación visual.
Dependencias~Acoplamiento~El acoplamiento describe cuánto depende un componente de detalles ajenos.~Preferir un contrato estable a modificar estado interno de otro módulo.
Calidad~Prueba de integración~Una prueba de integración verifica colaboración entre componentes reales.~Comprobar que guardar un formulario produce una fila consultable.
Cambio~Control de versiones~El control de versiones registra cambios y permite revisar su historia.~Proponer una modificación en una rama con diferencias revisables.
Entrega~Despliegue gradual~Un despliegue gradual permite verificar una versión antes de ampliarla.~Probar una versión de revisión antes de producción.`,
`Botón~Un requisito dice que el botón debe andar. ¿Cómo mejorarlo?~Precisar entrada, acción, resultado, errores y forma de comprobar la persistencia.~Resultado observable|Error definido
Contrato~Un módulo modifica directamente variables privadas de otro. ¿Riesgo?~Se acopla a su representación interna; introducir operaciones públicas con invariantes.~Dependencia identificada|Interfaz propuesta
Publicación~Una migración no fue probada. ¿Qué falta?~Ensayar con datos representativos, verificar compatibilidad y definir recuperación antes de promover.~Evidencia|Recuperación`,canvasActivity('Escribí un criterio de aceptación','Persona y necesidad|Estado inicial|Acción|Resultado observable|Fallo y recuperación|Evidencia de prueba','Un criterio permite decidir si el comportamiento existe sin interpretar intenciones.')],
['seguridad-informatica','Reducí riesgos con controles comprobables y prácticas defensivas.',`
Riesgo~Modelo de amenazas~Un modelo de amenazas relaciona activos, actores, límites de confianza y abusos posibles.~Revisar quién puede leer un documento privado.
Identidad~Autenticación~La autenticación comprueba una identidad mediante credenciales válidas.~Validar una sesión antes de aceptar una operación.
Permisos~Autorización~La autorización decide qué puede hacer una identidad sobre un recurso.~Verificar propiedad del documento en el servidor.
Entradas~Consulta parametrizada~Una consulta parametrizada separa datos de instrucciones SQL.~Tratar texto del usuario como valor y no como código.
Secretos~Clave privada~Una clave privada debe mantenerse fuera de recursos públicos y registros.~Leer la credencial del proveedor únicamente en el servidor.
Respuesta~Rotación~La rotación revoca una credencial comprometida y distribuye su reemplazo.~Invalidar una clave filtrada aunque se quite de un archivo.`,
`Documento ajeno~Cambiar un identificador permite leer otro usuario. ¿Qué falla?~Falta autorización por recurso; validar sesión y propiedad en la capa de datos.~Control servidor|Aislamiento entre usuarios
Clave publicada~Se borró una clave del último commit. ¿Alcanza?~Debe revocarse y rotarse, revisar historial y uso; borrarla no invalida copias existentes.~Revocación|Investigación
Texto hostil~Una entrada contiene etiquetas de script. ¿Cómo mostrarla?~Renderizar texto mediante nodos seguros; si se admite HTML, sanitizar con una política restrictiva.~Contexto de salida|Sin ejecución`,canvasActivity('Mapa defensivo de una aplicación','Activo|Entrada y actor|Límite de confianza|Abuso posible|Control servidor|Prueba negativa','Trabajá sobre sistemas propios o escenarios ficticios; cada control debe incluir una prueba de rechazo.')]
], [{title:'CS50: fundamentos de informática',url:'https://cs50.harvard.edu/x/'},{title:'PostgreSQL: tutorial oficial',url:'https://www.postgresql.org/docs/current/tutorial.html'},{title:'OWASP: controles de seguridad',url:'https://owasp.org/www-project-cheat-sheets/'}]);
