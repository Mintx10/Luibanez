# Publicación · 6 de noviembre de 2026

## Estado publicado

- Sitio: https://luibanez.vercel.app — versión 30.0.0.
- Código de la aplicación: `d5d5fc916f99612ec3a54234e5c8777cfef71540`, publicado en `Mintx10/Luibanez`, rama `main`.
- Vercel: `dpl_AEDk4ncskPeecpvo5LiSAyAAfT4F`, Production, `READY`, con los alias de producción asignados.
- Supabase: proyecto existente `xyaykxkytjnzykcjkopj`, reactivado y saludable.
- Variables de Production verificadas por nombre, sin recuperar secretos: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RATE_LIMIT_SALT`, `GEMINI_API_KEY`.

## Migraciones reales

| Versión registrada por Supabase | Nombre |
| --- | --- |
| 20261106044845 | secure_study |
| 20261106044911 | verified_games |
| 20261106044918 | document_sync |

Los archivos locales se renombraron para coincidir con las versiones asignadas por el servidor; el SQL no cambió. No ejecutar nuevamente estas migraciones en este proyecto.

## Comprobaciones efectuadas

- HTTPS: portada, `version.json` y salud de `/api/gemini` respondieron 200. La versión informada es 30.0.0.
- API: solicitud válida sin sesión → 401 `AUTH_REQUIRED`; origen ajeno → 403; actividad inválida → 400.
- Navegador real: portada → estudio individual → formulario de correo/contraseña → vuelta a portada; sin errores ni advertencias de consola durante ese recorrido.
- Base real: inserción de perfil y documento propios, creación de sala con hash bcrypt real, rechazo RLS de una identidad ajena y borrado con cuerpo vacío y marcador de eliminación. Toda la prueba se revirtió mediante `ROLLBACK`; no quedaron usuarios, perfiles, documentos ni salas de prueba.
- Los datos antiguos mantienen los mismos conteos antes y después: 3 perfiles, 6 documentos y 36 preguntas. Se revocó su acceso anónimo sin eliminar los registros.
- Todas las tablas nuevas expuestas tienen RLS. La cuota es ejecutable únicamente por `service_role`; las funciones de aplicación tienen un `search_path` fijo. Realtime incluye miembros y eventos de sala.
- Supabase Auth: correo habilitado, registro habilitado y confirmación de correo obligatoria. Se corrigió Site URL desde localhost a `https://luibanez.vercel.app` y se guardaron los retornos exactos `/` y `/?recover=1`.

## Pendientes y límites

**Falta SMTP propio.** El proyecto mantiene el servicio de correo de pruebas de Supabase; no está listo para enviar confirmaciones y recuperaciones a usuarios externos de forma general. El propietario confirmó que todavía no dispone de proveedor SMTP. La página y el estudio de invitado están publicados; el registro público requiere completar ese servicio. No se deshabilitó la verificación de correo como sustituto.

No se enviaron correos ni se crearon cuentas reales. La generación con Gemini y las partidas entre dos cuentas reales siguen pendientes de verificación; una respuesta de salud 200 no certifica una generación de IA ni la validez de la clave privada guardada. Las pruebas locales de dos sesiones se detallan en el informe de auditoría.

El asesor de seguridad señala las once RPC `SECURITY DEFINER` que se exponen deliberadamente a usuarios autenticados: requieren identidad y aplican controles de propiedad, membresía o turnos. También informa una tabla antigua vacía `public.Luibanez` con RLS y sin políticas, que permanece cerrada. Referencia: https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable.

El asesor de rendimiento recomienda índices adicionales para ocho claves foráneas y optimizar tres expresiones RLS con subconsultas de identidad. Las políticas permisivas duplicadas pertenecen a las tablas antiguas, cuyo acceso público ya fue revocado. Estas recomendaciones no se presentan como corregidas ni como errores observados de ejecución. Referencias: https://supabase.com/docs/guides/database/database-linter?lint=0001_unindexed_foreign_keys y https://supabase.com/docs/guides/database/database-linter?lint=0003_auth_rls_initplan.

La consulta autenticada del conector Vercel a URLs protegidas falló por selección de equipo; las comprobaciones HTTP se realizaron sobre el dominio público. No se desactivó la protección de despliegues.
