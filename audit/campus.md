## Actualización vigente · cuentas sin correo v31.1.0

El propietario reemplazó el requisito de correo por usuario, contraseña y clave privada de recuperación. **SMTP ya no es requisito de activación.** El [informe actualizado](username-accounts.md) contiene la implementación, las pruebas y los pendientes actuales de Turnstile, migraciones y variables del Preview. Los apartados de v31.0.1 siguientes describen la revisión anterior; cualquier exigencia de SMTP o confirmación por correo queda sustituida por esa decisión.

# Luibañez 31 · campus en revisión

## Corrección del registro · v31.0.1

El último paso podía parecer inactivo: los errores quedaban debajo del formulario y no recibían foco. Ahora los errores aparecen dentro del formulario, junto al botón, se anuncian y se enfocan; los controles se recuperan tras un fallo y se impiden envíos repetidos. Los campos inválidos muestran una explicación explícita.

Cuando falta la configuración pública de Turnstile, el paso de cuenta muestra el motivo del bloqueo antes de solicitar credenciales y permite volver a las materias o abrir el laboratorio. Esto no habilita el registro ni sustituye SMTP, Turnstile o las migraciones pendientes. Se aprobaron 18 comprobaciones de regresión en escritorio/móvil, incluidos error del servidor, reintento, validación y conservación de elecciones, además de las 27 pruebas de lógica/API/base de datos. La versión de la PWA se incrementa para identificar la corrección.

Versión de revisión publicada en [Vercel Preview](https://luibanez-git-codex-campus-seis-carreras-salmar10.vercel.app), desde la [rama de GitHub](https://github.com/Mintx10/Luibanez/tree/codex/campus-seis-carreras). El acceso de revisión puede requerir iniciar sesión en Vercel. Producción conserva v30.1.0.

La comprobación en el navegador de la Preview confirmó el inicio, las seis carreras, las doce materias de Sistemas y ejercicios locales del laboratorio. Se corrigieron el aviso de sesión anticipado al entrar como visitante y los mensajes que atribuían a Gemini un ejercicio generado localmente. Se volvieron a comprobar laboratorio, salas y PWA en ambos tamaños.

## Alcance implementado

- Visitante: Laboratorio, Crear mi perfil de alumno y Estudiar juntos. Los destinos reservados conservan su ruta para después del acceso.
- Alumno: campus, catálogo con búsqueda y nivel, materias actuales, actividad real, cambio de carrera y materias personales sin contenido inventado.
- Seis carreras y 72 identificadores estables en `catalog.json`. Los seis paquetes públicos se cargan por demanda: 432 unidades con objetivos y referencias, 864 preguntas con explicación, 216 casos resueltos con criterios y 72 talleres. El material anterior y las referencias particulares de UADE permanecen accesibles desde las materias equivalentes.
- Talleres de cálculos, secuencias, mapas de conceptos, trazas y documentos de trabajo. Los borradores y casos no reciben notas ficticias. La lectura registrada es una declaración del alumno, no una acreditación.
- Cuatro juegos por materia con las unidades y respuestas de su propio paquete. Práctica libre como acceso secundario.
- Registro en tres pasos, confirmación obligatoria, elecciones conservadas, foto posterior en perfil privado. Tema claro por defecto y preferencia existente respetada.
- Identidad temporal creada solo al intentar ingresar a una sala. No se convierte ni importa automáticamente al crear un alumno.

## Datos y seguridad

La migración nueva es `supabase/migrations/20261107083349_student_campus.sql`; las migraciones anteriores no se modifican. Crea catálogo, selecciones, materias personales, progreso y asociaciones de documentos. Las tablas privadas del alumno admiten lectura propia con RLS y escritura mediante operaciones que validan `auth.uid()`, propiedad y pertenencia de materia a carrera.

`private.is_student()` consulta `auth.users`, correo confirmado e identidad no anónima. No utiliza nombres ni metadatos editables para conceder privilegios. Los RPC anteriores de documentos quedan protegidos sin cambiar sus contratos. Los invitados conservan puntuaciones de sala, pero un trigger impide resultados permanentes para identidades anónimas. La limpieza bloquea la identidad, vuelve a comprobar participación activa y conserva invitados de salas vigentes.

La API mantiene `/api/gemini` y sus tipos de actividad. Valida carrera y materia; para una materia personal consulta con el JWT del propietario y exige sus apuntes. Las claves privadas permanecen en servidor. CAPTCHA se verifica mediante Supabase; la aplicación no incluye un modo de omitirlo. CSP admite exclusivamente el origen oficial de Turnstile para script y frame. Los mocks existen solo en las pruebas.

La PWA versiona también los JSON del catálogo y configuración pública. Precarga la estructura, descarga contenido académico por carrera a demanda y comprueba su presencia antes de anunciar disponibilidad offline. Los datos privados continúan en almacenamiento local por usuario y solicitudes HTTP sin caché. No borra cachés de otras aplicaciones.

## Verificación

Resultado local: **27 pruebas de lógica/API/PostgreSQL aprobadas**. **54 pruebas distintas de navegador aprobadas** entre el recorrido completo de las 72 materias en escritorio/móvil y la ejecución final de 40 comprobaciones de regresión. La matriz inspeccionó **95 combinaciones de ruta/perfil y 3640 registros de botones visibles**, sin botones sin evento registrado. El inventario HTML contiene 610 controles, sin IDs duplicados ni referencias sin resolver. Ambos CSS se analizaron sin errores de sintaxis. Estos números no certifican proveedores externos ni reemplazan una revisión docente.

Ejecutar `npm ci`, `npm test`, `npm run check`, `npm run build` y `npm run test:e2e`. Playwright utiliza Edge/Chromium en escritorio y viewport móvil; no certifica Safari ni un dispositivo físico. Las pruebas PostgreSQL usan PGlite con sustitutos de pgcrypto solo en pruebas: validan SQL, permisos y recorridos, no el proveedor de correo ni la implementación criptográfica de producción.

`tests/browser/campus.spec.cjs` recorre las 72 materias en cada tamaño: unidades, cuestionario, caso, taller y los cuatro juegos. Las otras suites conservan comprobaciones de documentos, CSP, módulos anteriores, autenticación simulada, dos sesiones y actualización/caché offline. La matriz de controles registrados detecta handlers, pero por sí sola no acredita resultados ni servicios externos.

## Configuración y activación pendiente

Esta versión se publica **en una rama y Preview**. No reemplaza producción ni habilita identidades anónimas sobre las políticas anteriores. La migración y el planificador nuevos deben probarse primero en un entorno aislado; no se han aplicado al proyecto compartido de producción en esta entrega.

1. Aportar un proveedor SMTP propio en Supabase Auth; verificar remitente, entrega real, confirmación y recuperación con un correo externo. No desactivar la confirmación ni contratar servicios para sustituirlo.
2. Crear/configurar Turnstile con los dominios de revisión y producción. Guardar la **clave secreta en Supabase Auth → protección contra abuso/CAPTCHA** y la clave pública `TURNSTILE_SITE_KEY` en Vercel. La clave secreta nunca pertenece al repositorio ni a una variable pública. Una nueva build incorpora únicamente la clave pública a `campus-config.<revisión>.json`.
3. Aplicar las migraciones en orden al entorno de revisión y ejecutar las suites contra él. Configurar allí Site URL y redirecciones exactas de confirmación y recuperación, sin comodines generales. Usar sus variables de backend en Preview; no copiar ni imprimir secretos en el chat.
4. Antes de habilitar Anonymous Sign-Ins, verificar RLS y todos los rechazos de invitados. Aplicar `supabase/activation/campus-cleanup.sql` como propietario y confirmar que el trabajo está activo y ejecuta correctamente. Manual linking debe permanecer deshabilitado.
5. Verificar invitado y anfitrión en dos sesiones reales: contraseña errónea, inicio, turnos, resultados, salida y reconexión. Probar cuotas y denegación de IA al invitado. Ejecutar asesores de seguridad/rendimiento de Supabase y resolver hallazgos materiales antes de activar.
6. Preparar una build de producción sin asignar dominio, con las variables de Production; comprobar migración, **actualización desde una PWA v30 instalada** y alta completa. La suite local verifica la instalación/caché offline v31 y conservación de almacenamiento y cachés ajenas; la actualización real sobre dispositivos con v30 instalada queda pendiente de esta etapa. Recién entonces promover. Conservar la versión anterior y respaldar datos antes de cualquier cambio de esquema.

Mientras falten SMTP y Turnstile, el alta pública y el ingreso temporal real muestran que todavía no están habilitados. Las pruebas con mocks no se presentan como aprobación de esos servicios.

## Referencias y límites académicos

Base introductoria universitaria, sin equivalencia oficial con programas de carreras argentinas. Cada unidad enlaza sus referencias de consulta; no reproduce programas oficiales ni pruebas psicológicas protegidas. Salud utiliza escenarios ficticios, sin datos identificables ni instrucciones de dosificación o procedimientos para uso clínico. Los borradores personalizados proceden del alumno. La expansión a bibliografías por cátedra y la revisión docente de profundidad no se confunden con las pruebas funcionales.
