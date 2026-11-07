# Luibañez · campus en revisión

Aplicación de estudio con HTML, módulos ES, una función de Vercel para IA y Supabase para identidad, documentos y partidas. Las funciones de estudio local se pueden usar como invitado.

La versión 30.1.0 está publicada en https://luibanez.vercel.app y las cuatro migraciones están aplicadas al proyecto Supabase existente. El [informe del despliegue](audit/deployment.md) registra las comprobaciones reales y la configuración de correo pendiente. El [informe de auditoría](audit/README.md) detalla la cobertura local.

La revisión **31.1.0** incorpora cuentas con **usuario y contraseña, sin correo ni SMTP**. Reemplaza el requisito anterior de confirmación por correo por decisión del propietario. La recuperación utiliza una clave privada descargable antes de crear la cuenta; perder contraseña y clave impide recuperar el acceso. El [informe de cuentas sin correo](audit/username-accounts.md) detalla la implementación, activación y límites de verificación. Los informes anteriores son históricos.

## Desarrollo y verificación

Requiere Node.js 22 o posterior; esta auditoría se ejecutó con Node.js 24 y Microsoft Edge en Windows.

```sh
npm ci
npm run dev
```

La aplicación se sirve en `http://127.0.0.1:5500`. El servidor de desarrollo nunca publica archivos de configuración, migraciones, dependencias de Node o pruebas. Para probar la IA localmente, definir las variables de `.env.example` en el entorno del proceso; el servidor no carga secretos automáticamente desde archivos.

```sh
npm run check
npm test
npm run audit:controls
npm run audit:css
npm run test:e2e
```

Las pruebas de navegador compilan primero la versión de producción. Usan Edge; en equipos sin Edge, adaptar `channel` en `playwright.config.cjs` e instalar el navegador correspondiente con Playwright. Las pruebas de cuentas usan una sesión simulada; las de salas ejecutan las migraciones en PostgreSQL local mediante PGlite y conectan dos sesiones del navegador. El cifrado `pgcrypto` se sustituye **solo dentro de esas pruebas** porque PGlite no incluye la extensión; su funcionamiento real debe verificarse en Supabase.

```sh
npm run build
npm run preview
```

La compilación genera `dist/` y la vista previa de producción usa `http://127.0.0.1:5501`. Los recursos JavaScript y CSS reciben una revisión de contenido; el service worker conserva una versión anterior completa para las pestañas que todavía la usan. Las bibliotecas del navegador se copian desde las versiones fijadas en `package-lock.json`, con sus licencias en `vendor/licenses/`.

## Activación en Supabase y Vercel

1. Respaldar la base y comprobar las migraciones en un entorno de prueba. El proyecto Supabase se mantiene; no hay que crear otro sitio ni cambiar de hosting.
2. Aplicar, como propietario de la base, las migraciones pendientes de `supabase/migrations/`, en orden. Son migraciones de una sola ejecución, no scripts para repetir sobre la misma base. Las cuatro primeras ya están aplicadas.
3. Mantener habilitado el proveedor de contraseña de Supabase Auth. El servidor provisiona las cuentas de usuario sin enviar correos. No hace falta SMTP, una dirección real ni comprar un dominio. No desactivar globalmente los controles de correo de las cuentas antiguas. Configurar Turnstile para la dirección exacta de Vercel y activar su protección en Supabase para los invitados anónimos.
4. Configurar en Vercel `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY` y un `RATE_LIMIT_SALT` aleatorio. Usar la URL del proyecto existente. Las claves de servicio y de Gemini son exclusivamente del servidor. Las variables y sus ejemplos están en `.env.example`.
   Añadir `TURNSTILE_SITE_KEY` (pública, usada durante el build) y `TURNSTILE_SECRET_KEY` (secreta, solo servidor). Configurar los entornos autorizados; no compartir secretos de producción con previews de ramas no confiables. Volver a desplegar tras cambiar variables.
5. Para un dominio adicional o un preview, añadir su origen exacto a `ALLOWED_ORIGINS`. No se habilitan comodines de dominios. Si se cambia el proyecto Supabase, actualizar también la configuración pública de `modules/session.mjs` y la CSP de `vercel.json`.
6. Desplegar este checkout en Vercel: `vercel.json` utiliza `npm run build`, publica `dist/` y empaqueta `api/gemini.js` con `lib/`. La [configuración oficial de Vercel](https://vercel.com/docs/project-configuration/vercel-json) describe estas opciones.

**Hacer las migraciones y el despliegue de v30 en una misma ventana de mantenimiento.** Las tablas anteriores `perfiles`, `documentos_pdf` y `preguntas_cache` se conservan, pero se les revoca el acceso público. La versión v29 deja de poder sincronizar con ellas después de la migración. Un rollback a v29 requiere recuperar los permisos anteriores desde el respaldo; no basta con volver a desplegar el HTML anterior.

El modelo predeterminado es `gemini-3.5-flash-lite`, configurable mediante `GEMINI_PRIMARY_MODEL` y `GEMINI_FALLBACK_MODEL`. Se eligió un modelo estable que admite respuestas estructuradas según el [catálogo oficial de Google](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite?frmapp=yes). Sin una clave real no se validó la disponibilidad ni la cuota de ese modelo para esta cuenta.

## Seguridad y límites

El [refuerzo de seguridad v30.1](audit/security.md) documenta los controles y las verificaciones. Las claves privadas de Gemini y Supabase quedan en variables Secret/Sensitive de Vercel; la clave `sb_publishable_...` del navegador es pública por diseño y no permite acceder a datos privados sin sesión y RLS.

IA: 15 consultas/minuto y 200/día por usuario; 40/minuto y 1000/día por IP, almacenada como hash con secreto. El día se reinicia a medianoche UTC. Salas: hasta 3 abiertas simultáneas, 10 creaciones/minuto y 100/24 horas por cuenta. Nube: 200 documentos activos, 100 MB de texto y 2000 registros totales incluyendo marcadores de borrado; los originales locales se conservan si una operación se rechaza. Estos límites se aplican en servidor. Un reloj del dispositivo adelantado más de cinco minutos requiere corregirse antes de sincronizar.

## Cuentas y datos anteriores

Las cuentas con PIN del navegador no son credenciales de Supabase. Crear una cuenta con usuario, guardar la clave de recuperación e iniciar sesión. Desde **Cuenta y datos** se puede elegir carrera y revisar qué información anterior de este dispositivo importar. Los originales se conservan; no se importan PIN, claves API ni identidades antiguas. No se asignan documentos de la nube antigua a una identidad nueva basándose en un ID local.

El almacenamiento local e IndexedDB se separan por usuario. Los documentos y las fotos de perfil privados están sujetos a RLS. Las fotos no se guardan en los metadatos del JWT. Las operaciones sin conexión se guardan en una cola de IndexedDB; los borrados conservan un marcador mínimo en el servidor, con el contenido eliminado, para que una copia antigua no vuelva a subirlo accidentalmente.

Los resultados de práctica locales se distinguen de los resultados online validados por las transacciones del servidor. Las salas requieren una cuenta verificada; el anfitrión debe mantener conexión para renovar su presencia. Una sala sin renovación expira a los dos minutos. Los invitados pueden estudiar con sus datos locales sin utilizar la clave de IA del servidor.

Los archivos de estudio tienen un límite de 20 MB, 4 MB de texto extraído y hasta 100 páginas por PDF. Se informa cuántas páginas se leyeron. Los archivos Office se comprueban antes de descomprimirlos. El contexto enviado a IA se limita a 120.000 caracteres, tomando fragmentos cuando el material es más extenso. Los errores no generan conceptos ficticios ni se presentan como reconocimiento OCR exitoso.

## Comprobación posterior al despliegue

Verificar con dos cuentas reales: registro con usuario, descarga y uso de clave de recuperación, cierre/expiración de sesión, aislamiento de documentos, sincronización después de perder conexión, sala con contraseña, reconexión, turnos y resultados. Comprobar también una actualización desde la PWA instalada anterior y permisos reales de micrófono/cámara cuando correspondan. Estas comprobaciones no quedan sustituidas por las pruebas locales ni por el inventario de eventos.
