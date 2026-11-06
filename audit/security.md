# Refuerzo de seguridad · v30.1.0 · 6 de noviembre de 2026

## Claves y exposición

`GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY` y `RATE_LIMIT_SALT` se mantienen exclusivamente como secretos de Production en Vercel. La revisión consultó sus nombres y tipos, sin recuperar valores. El navegador utiliza una clave `sb_publishable_...`: es un identificador público del proyecto, no una credencial administrativa. La protección de los datos procede de Auth, RLS y los permisos SQL.

El [análisis del historial](secret-scan.json) revisó 667 blobs de texto alcanzables en el Git local: no detectó claves privadas con los patrones buscados ni JWT con rol `service_role`. Una prueba adicional revisa el código actual del navegador. No es una garantía sobre cualquier formato de secreto, forks, copias externas o credenciales fuera del repositorio. No se reescribió el historial ni se rotaron claves sin evidencia de filtración.

## Controles aplicados

| Área | Refuerzo |
| --- | --- |
| Ejecución en navegador | 61 eventos inline trasladados a un módulo con funciones fijas. CSP sin `unsafe-inline` para scripts y con `script-src-attr 'none'`. No se usa `eval` para ejecutar controles. |
| HTML no confiable | DOMPurify elimina eventos, scripts y atributos capaces de suplantar los controles estáticos. CSP limita imágenes a recursos propios, `data:` y `blob:` para reducir seguimiento externo. |
| Ventanas y recursos | COOP y CORP con `same-origin`, DNS prefetch desactivado; se mantienen HTTPS/HSTS, protección contra framing, `nosniff` y permisos del navegador restringidos. |
| Sesiones | La API rechaza tokens malformados o mayores de 8192 caracteres antes de consultar Supabase; verifica la identidad remotamente y falla de forma controlada ante respuestas inválidas. |
| Contraseñas | Mínimo de 12 caracteres guardado en Supabase Auth, además de la validación del cliente. Confirmación de correo obligatoria; acceso anónimo de Auth y vinculación manual continúan deshabilitados. |
| CORS | En producción se rechazan los orígenes HTTP locales. Orígenes adicionales requieren URLs HTTPS exactas, sin comodines, credenciales ni rutas. |
| Consumo de IA | Cuotas persistentes por usuario e IP: 15/40 por minuto y 200/1000 por día, respectivamente. El día se reinicia a medianoche UTC. La IP se almacena como hash con secreto obligatorio; `Retry-After` procede del servidor. La RPC sólo admite `service_role`. |
| Permisos heredados | Retirados privilegios innecesarios como `TRUNCATE`, `REFERENCES` y `TRIGGER`; perfiles permiten lectura, inserción y actualización propias. Descubrimiento de salas sólo para cuentas autenticadas. |
| Tablas antiguas | Datos conservados, con permisos de cliente revocados y políticas permisivas antiguas retiradas. Conteos preservados: 3 perfiles, 6 documentos y 36 preguntas. |
| Tablas internas | RLS también en las siete tablas privadas, sin acceso directo del cliente. Los futuros objetos del rol de migración dejan de recibir privilegios públicos por defecto. |
| Documentos | Escritura y borrado mediante RPC, sin mutaciones directas. Límites por cuenta: 200 documentos activos, 100 MB de texto y 2000 registros incluyendo marcadores de borrado. Bloqueo transaccional por propietario y rechazo de fechas adelantadas más de cinco minutos. Los originales locales se conservan ante un rechazo. |
| Salas | Creación serializada por usuario: hasta tres abiertas, diez creaciones por minuto y cien en 24 horas, contando también las cerradas. Contraseñas con hash; turnos, identidad y resultados continúan validados por servidor. |
| Rendimiento de permisos | Tres expresiones RLS optimizadas e índices para las ocho claves foráneas señaladas; índice adicional para limpieza de cuotas. La descarga de documentos pagina también los marcadores de borrado. |
| PWA | Nuevo módulo incluido en el precaché y revisión de recursos actualizada; se mantiene el aislamiento de datos privados respecto de la caché HTTP. |

La migración `20261106060716_security_hardening.sql` está aplicada en el proyecto existente. Es compatible con la API anterior durante el cambio de versión. Un rollback a una versión anterior no debe restaurar indiscriminadamente los permisos retirados.

## Evidencia

- 23 pruebas de lógica/API/SQL aprobadas. Incluyen permisos heredados equivalentes a los observados en Supabase, rechazo de escrituras directas, cuotas diarias, creación excesiva de salas, fechas futuras y paginación después de borrados.
- 32 recorridos de escritorio y móvil aprobados, incluidos ataques de script y atributos inline bloqueados por CSP, controles de Finanzas, documentos, estudio offline y partidas con dos sesiones de prueba. El paralelismo se limita a dos trabajadores porque cada prueba de sala carga PostgreSQL/WASM y dos navegadores.
- 13 vistas/perfiles inventariados sin controles desconectados, sin IDs duplicados ni referencias sin resolver.
- `npm audit --omit=dev --json`: cero vulnerabilidades conocidas reportadas en dependencias de producción en esta revisión.
- Base remota: confirmados los permisos mínimos, cero tablas privadas sin RLS y ejecución de cuota reservada al servidor. Prueba real transaccional de perfil, sala, sincronización, rechazo de escritura directa, borrado y cuota de quince solicitudes; se ejecutó `ROLLBACK`, sin dejar datos de prueba.

## Lectura de los asesores y límites

El asesor de rendimiento ya no señala claves foráneas sin índices, expresiones RLS por fila ni políticas permisivas duplicadas. Informa índices aún sin uso, esperable en tablas sin actividad. No se eliminan índices de protección referencial por esa observación inicial. [Referencia](https://supabase.com/docs/guides/database/database-linter?lint=0005_unused_index).

El asesor de seguridad informa once tablas con RLS y sin políticas, cerradas intencionalmente al cliente, y once RPC `SECURITY DEFINER` expuestas deliberadamente a usuarios autenticados. Estas RPC comprueban identidad/propiedad/membresía y fijan `search_path`; las de cuota están reservadas al servidor. No se presenta esta revisión como un resultado de cero avisos del asesor. [Tablas cerradas](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy), [RPC privilegiadas](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable).

Continúa pendiente SMTP propio para correos a usuarios externos. No se enviaron correos reales ni se certificó una generación real de Gemini o una partida entre dos cuentas reales. La protección contra contraseñas filtradas del proveedor requiere un plan de pago y no se activó una mejora de facturación. Tampoco se afirma que esta revisión sustituya una prueba de penetración independiente, monitoreo continuo o la seguridad de los dispositivos y cuentas administrativas.

Las sesiones de la SPA siguen gestionadas por Supabase JS en el navegador; no se afirma que se hayan migrado a cookies `HttpOnly`. Los controles actuales reducen la superficie XSS, pero un dispositivo comprometido o un token robado requieren revocación y respuesta al incidente.
