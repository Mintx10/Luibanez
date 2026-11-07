# Cuentas sin correo · revisión 31.1.0

El propietario pidió reemplazar el correo por usuario y contraseña el 7 de noviembre de 2026. Esta decisión sustituye el requisito anterior de confirmación por correo para cuentas nuevas. No requiere SMTP, una dirección de correo real, comprar un dominio ni contratar un proveedor. Turnstile se mantiene como protección contra abuso.

## Implementación

- Registro en tres pasos: carrera, materias y cuenta. Usuario único normalizado de 3–30 caracteres ASCII (letras, números y guion bajo). Apodo independiente. Contraseñas de al menos 12 caracteres, hasta 72 bytes, sin recortes.
- El alumno descarga o copia una clave aleatoria de recuperación de 192 bits **antes** de enviar el registro y confirma que la guardó. Solo vive en memoria durante el diálogo y en la descarga que elige el alumno; no se escribe en localStorage/IndexedDB, URLs ni metadatos de Auth. Ante una respuesta perdida se conserva la misma clave para reintentar.
- `/api/account` valida solicitudes, carrera/materias, cuota persistente por IP y usuario y Turnstile con comprobación de hostname. Límites: 30 intentos por IP cada 10 minutos, 10 por usuario cada 10 minutos y 5 registros por IP/día UTC. Las IP y usuarios de los contadores se derivan con hash y secreto del servidor. Una ventana total de 25 segundos limita las llamadas externas. Respuestas privadas con `no-store`; sin contraseñas, claves o respuestas del proveedor en logs.
- Supabase Auth conserva el hash de contraseña, tokens y renovación de sesión. El servidor crea una identidad independiente con UUID y un identificador interno aleatorio `UUID@accounts.luibanez.invalid`: no es un buzón, no pertenece al alumno, no puede recibir correos y no se usa como nombre de acceso. La API de administración confirma solo ese identificador técnico sin enviar correo. No se desactiva globalmente la verificación de cuentas de correo antiguas.
- El registro privado vincula usuario→UUID y guarda únicamente SHA-256 de la clave de recuperación de alta entropía. RLS habilitada, sin acceso directo para `anon`/`authenticated`; RPC exclusivamente `service_role`, `search_path` vacío. Un usuario provisionado sin completar ese registro no obtiene privilegios de alumno. Se preservan los permisos de cuentas antiguas con correo verificado.
- El acceso verifica la contraseña mediante el endpoint de Supabase Auth; solo entrega tokens reales y la aplicación los instala mediante `auth.setSession`. La autorización administrativa de esa llamada evita verificar dos veces el mismo token CAPTCHA, ya comprobado por el backend. [Implementación oficial de Supabase](https://github.com/supabase/auth/blob/master/internal/api/middleware.go).
- Recuperación con usuario, clave privada y nueva contraseña. La clave permanece válida para futuras recuperaciones y debe protegerse como una contraseña. Un fallo del proveedor no la consume. La UI pública ya no solicita un enlace por correo. El cambio utiliza la operación oficial de administración de Auth; no modifica hashes ni tablas internas de contraseñas mediante SQL.
- Los reintentos de un registro ya confirmado solo se aceptan con el mismo secreto de recuperación. En un conflicto de nombre se elimina únicamente la identidad nueva de esa petición, sin sesiones ni perfil previo. No se vinculan ni importan invitados automáticamente.
- Fotos posteriores en el perfil privado; la API de registro no acepta fotos en metadatos. La PWA precarga el módulo nuevo de recuperación y conserva `/api/*` fuera de caché.

## Verificación

34 pruebas de lógica, API y PostgreSQL aprobadas. Incluyen entradas inválidas, límites, CAPTCHA ausente/erróneo/hostname ajeno, login desconocido, recuperación inválida y proveedor fallido, reintento idempotente, limpieza de conflictos, permisos de RPC y RLS entre usuarios. PostgreSQL local usa PGlite con sustitutos de pgcrypto únicamente para las pruebas preexistentes de salas.

16 comprobaciones de navegador aprobadas en Edge/Chromium de escritorio y viewport móvil: alta sin correo, acceso, recuperación, salida y cambio de carrera; validación y foco de errores; error y reintento; descarga y privacidad de clave; fotos privadas y PWA offline. Auth, la API de cuentas y Turnstile se simulan en estas pruebas. No certifican el servicio externo real ni un dispositivo físico.

## Estado de activación

La revisión se publica en la rama `codex/campus-seis-carreras` y Vercel Preview. Producción conserva v30.1.0. Las migraciones nuevas `20261106090000_student_campus.sql` y `20261107065238_username_accounts.sql` están comprobadas en PostgreSQL aislado, **pendientes de aplicar al proyecto compartido** durante la activación. No se modificaron las migraciones previamente aplicadas ni se eliminaron datos.

La consulta real al proyecto Supabase confirmó cero usuarios de Auth y cero perfiles de alumno antes de este cambio. Las tablas antiguas se conservan. Los asesores actuales señalan funciones SECURITY DEFINER deliberadamente públicas para alumnos y tablas cerradas sin políticas; no se amplían permisos para silenciar los avisos. [Referencia del asesor](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable).

Vercel tiene las cinco variables del backend anterior solo en Production. No se encontraron `TURNSTILE_SITE_KEY` ni `TURNSTILE_SECRET_KEY`. Sin ellas, el registro muestra la configuración pendiente antes de pedir credenciales. SMTP deja de bloquear esta revisión.

Para activar:

1. Configurar un widget Turnstile con los hostnames exactos de Vercel. Guardar `TURNSTILE_SITE_KEY` pública y `TURNSTILE_SECRET_KEY` secreta en el entorno autorizado. Para invitados anónimos, configurar también el secreto en Supabase Auth CAPTCHA. No desactivar su protección para compensar la falta de claves.
2. Aplicar las dos migraciones pendientes en orden, configurar el planificador de limpieza y comprobar RPC, RLS y CAPTCHA real. Habilitar invitados anónimos solo con esas protecciones listas. No habilitar vinculación manual.
3. Dar al Preview confiable acceso a su backend mediante variables de ámbito limitado. Actualmente no tiene las variables de Production. No difundir secretos a todas las ramas.
4. Verificar dos cuentas reales: alta, nombres duplicados, login, recuperación válida/errónea, aislamiento, sesiones y salas. Verificar la actualización real desde la PWA v30. Luego promover producción.

Límites: perder contraseña y clave impide recuperar el acceso; aún no se incorpora una interfaz de rotación de la clave. La invalidación de tokens de acceso ya emitidos depende también de la expiración/configuración de Supabase; no se certifica revocación inmediata solo por cambiar contraseña. La recuperación no se declara comprobada en producción hasta completar el recorrido real.
