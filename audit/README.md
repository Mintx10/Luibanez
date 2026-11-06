# Auditoría de Luibañez · 5 de noviembre de 2026

## Estado

Auditoría local completada inicialmente el 5 de noviembre. El 6 de noviembre se publicó v30 y se aplicaron las tres migraciones al entorno remoto. El [informe de despliegue](deployment.md) actualiza el estado y distingue las verificaciones reales de las pruebas locales descritas aquí.

La auditoría combina inspección de código, análisis de referencias, inventario de controles, pruebas de PostgreSQL y recorridos en navegador. **Un evento registrado demuestra que el control tiene una acción conectada; no certifica por sí solo todos sus resultados posibles ni la disponibilidad de un servicio externo.**

## Hallazgos y correcciones

| Área | Problema comprobado | Corrección |
| --- | --- | --- |
| Identidad | PIN de cuatro dígitos en almacenamiento local, cuentas predeterminadas y recuperación que revelaba el PIN | Supabase Auth con correo verificado, recuperación por enlace y sesión comprobada en servidor |
| Permisos | Carrera y acceso ligados al nombre de Lucas o Iván | Carrera elegida por la cuenta; documentos e identidad vinculados al UUID autenticado |
| Perfiles | Rutina que borraba perfiles y recreaba cuentas de ejemplo | Eliminada; las migraciones preservan los registros anteriores |
| Documentos | Escrituras y borrados basados en IDs locales, fallos ocultos y cambios offline no encolados | RLS, RPC por propietario, cola en IndexedDB, errores visibles y marcadores de borrado |
| Sincronización | Un documento reemplazado podía recibir otro ID y reaparecer como duplicado; snapshots antiguos podían sobrescribir o resucitar datos | ID estable al reemplazar, comparación de fechas de edición, descarga sin reenvío automático y borrados con cuerpo eliminado |
| IA | Endpoint sin sesión, limitador por instancia y aceptación de JSON sin contrato por actividad | Autenticación remota, cuota persistente por usuario/IP, límites de entrada y validadores de las once actividades |
| Calidad de IA | Se recortaban respuestas y se les agregaba texto para igualar su longitud | Se preserva el contenido; las respuestas inválidas tienen un reintento acotado |
| Evaluación clínica | La interfaz buscaba `puntaje` fuera del objeto `data` devuelto por la API | Cliente central para todas las consultas; origen IA/local explícito |
| OCR | Si la IA fallaba, se mostraban fórmulas de otra parte del laboratorio como si se hubiera reconocido la escritura | Solo se muestran fórmulas reconocidas; error o ausencia de contenido permiten reintentar |
| Salas | Broker público y contraseña verificada en el navegador anfitrión | Supabase, contraseña con hash, membresía y transacciones para acciones, turnos y resultados |
| Juegos online | Impostor, Memotest y Triatlón terminaban iniciando el bolillero | Arena para cada tipo, respuestas privadas en servidor, control de versión y puntuación derivada de acciones |
| Juegos de Finanzas | Datos de preguntas en un formato que los juegos no interpretaban; selección de lista usando una propiedad inexistente | Catálogo adaptado al contrato real de Bomba, Impostor y Memotest; selección persistente y navegación al bolillero |
| Botones médicos | Faltaba `cargarMateriaMedicinaEnBolillero` | Implementada para las tres materias |
| Libro Mayor | Botón que llamaba a `renderizarLibroMayorUI`, inexistente | Conectado al renderizador real |
| Navegación | Recarga que volvía al inicio; historial que ignoraba Medicina, Finanzas y juegos; modal tardío que interceptaba clics | Registro único de vistas, restauración de hash, control de navegación pendiente y configuración abierta por acción del usuario |
| HTML y cálculos | Inserciones HTML sin protección uniforme y dos usos de `Function(...)` incompatibles con CSP | DOMPurify, acciones delegadas sin `eval` y analizador de expresiones con precedencia y funciones matemáticas |
| Archivos | Sin límite de tamaño ni protección previa contra expansión de archivos Office | Límites de archivo/texto y comprobación del directorio ZIP antes de extraer |
| Rendimiento | Bibliotecas externas y grandes bancos académicos dentro del archivo inicial | Dependencias locales fijadas; lectura PDF y datos/generadores de materias cargados cuando se necesitan |
| PWA | Precaché parcial, borrado de cachés ajenas y posibles mezclas de recursos | Instalación completa, recursos versionados por contenido, conservación de una versión anterior y exclusión de API/datos privados |

## Evidencia y pruebas

- [Inventario de controles](controls.json): 610 botones/enlaces de la estructura HTML actual, con acción, requisitos, resultado y retorno. La cantidad difiere de los 611 botones iniciales porque se retiró el guardado de claves del cliente y el inventario también incluye enlaces.
- [Registro en navegador](browser-controls.json): 13 combinaciones de vista/perfil, incluidos Medicina y Finanzas; cero botones sin evento directo, formulario o delegación reconocible. También incluye los controles dinámicos presentes en esas vistas.
- [CSS](css.json): cero errores de análisis y cero reglas idénticas redundantes entre hermanos. Se retiraron seis reglas del bloqueo de desarrollador eliminado. Se conservaron las demás reglas porque la ausencia de un selector estático no prueba que no se use dinámicamente.
- [Ayudantes retirados](removed-helpers.json): trece funciones privadas sin referencias de lectura, comprobadas mediante análisis de ámbitos. No se eliminaron generadores ni contenido académico por no aparecer en un recorrido particular.
- `npm test`: 16 pruebas automatizadas de API, PostgreSQL/RLS, documentos, catálogo, matemáticas, archivos, datos e inventario; algunas incluyen múltiples escenarios y usuarios.
- `npm audit --omit=dev --json`: cero vulnerabilidades conocidas reportadas por npm en las dependencias de producción en esta revisión; no reemplaza la revisión del código propio ni cubre bibliotecas antiguas fuera del árbol de npm.
- `npm run test:e2e`: 30 recorridos de navegador, divididos entre escritorio y móvil. Incluyen registro/recuperación/carrera con autenticación simulada; dos sesiones contra PostgreSQL local; reconexión; juegos locales; carga y borrado de PDF, texto, Word y PowerPoint; cola offline; importación repetible; sanitización; límites visuales; y compilación de producción sin conexión.
- `npm run check`, compilación estática y análisis de referencias: sin errores en la verificación local. El JavaScript inicial pasó de aproximadamente 1,7 MB a 1,16 MB; los bancos de materias se conservaron en módulos separados. Esta medida no es un benchmark de tiempo de carga ni del peso total offline.

## Límites de la verificación

Las sesiones de estos recorridos locales son de prueba. La base de las pruebas automatizadas es PostgreSQL mediante PGlite; sus funciones criptográficas sustituidas no certifican `pgcrypto` real. No se enviaron correos reales, no se consumió Gemini ni se probó la entrega Realtime por la red de Supabase. Las salas tienen recuperación por consulta periódica además de Realtime, y esa ruta sí se ejercitó con dos sesiones. La publicación posterior y las comprobaciones en PostgreSQL remoto, incluido bcrypt real, se registran por separado en el [informe de despliegue](deployment.md).

Las pruebas de navegador se ejecutaron en Edge con tamaños de escritorio y móvil. No constituyen una comprobación en un iPhone físico, otros motores de navegador o todos los permisos de audio y archivos del sistema. No se afirma que se hayan ejecutado todas las combinaciones de los cientos de controles.

La [guía de activación](../README.md#activación-en-supabase-y-vercel) es necesaria antes de considerar operativo el backend de producción. Las migraciones revocan el acceso público a las tablas antiguas y deben aplicarse junto con el despliegue de v30, después de respaldar y probar el cambio.
