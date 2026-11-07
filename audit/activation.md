# Activación real · 7 de noviembre de 2026

Actualización de la misma sesión: **alta real, login, persistencia de sesión en una pestaña nueva y guardado de selección/progreso comprobados**. La base contiene el perfil de prueba, su carrera y materia elegidas y la lectura registrada de una unidad. Recuperación y salas reales siguen en comprobación.

El propietario pidió quitar el mínimo de 12 caracteres. Supabase impone un piso de 6; se ajustaron el proveedor y todos los formularios/API a **6 caracteres**, sin afirmar que se admiten contraseñas más cortas. La revisión 31.1.2 conserva el límite máximo de 72 bytes sin truncar. [Límite en la implementación oficial](https://github.com/supabase/auth/blob/master/internal/conf/configuration.go).

## Aplicado y comprobado

- Supabase existente: migraciones `student_campus`, `username_accounts` y `campus_cleanup_schedule` aplicadas, además de las cuatro anteriores. Los archivos locales se alinearon con los identificadores reales del historial remoto.
- Catálogo real: 6 carreras y 72 materias. RPC del registro privado: denegado para `anon` y `authenticated`, permitido para `service_role`. No se borraron datos anteriores.
- Trabajo `study-cleanup-guests` activo, ejecución horaria al minuto 15. Su invocación manual concluyó correctamente sin identidades antiguas que eliminar. Las pruebas PGlite omiten únicamente la migración del planificador pg_cron, cuya extensión no está disponible allí; las demás migraciones se prueban completas.
- Widget real de Cloudflare Turnstile creado para la dirección pública principal y la rama de revisión. CAPTCHA de Supabase activado con Turnstile; invitados anónimos habilitados después de aplicar los permisos. Confirmación de correo y vinculación manual conservan su configuración anterior: activada y desactivada, respectivamente.
- Vercel Production tiene `TURNSTILE_SITE_KEY` y `TURNSTILE_SECRET_KEY`, además de las cinco variables anteriores. La clave privada se guarda como Secret. Las claves nunca se imprimieron ni se escribieron en el repositorio.
- Preview recibió seis variables exclusivamente para `codex/campus-seis-carreras`, con sal aleatoria independiente y secretos ocultos. No se amplió el acceso a otras ramas. Gemini sigue configurado únicamente en Production.
- Preview con backend real desplegada y READY. Actualización real desde la PWA anterior mediante **Menú → Actualizar** comprobada hasta mostrar el formulario nuevo sin correo y el desafío real de Turnstile. Se corrigió la etiqueta de versión que seguía mostrando 31.0.1 y se añadió una validación de versiones a la compilación.
- 34 pruebas de lógica/API/PostgreSQL y 16 comprobaciones de navegador de escritorio/móvil aprobadas durante esta activación. Los servicios externos se simulan en esas suites.

## Pendiente antes de publicar

El desafío real de Turnstile necesita intervención humana. El primer intento venció sin crear cuenta; el formulario conservó los datos y mostró el error. Alta y login se aprobaron después con Turnstile real. Recuperación, aislamiento entre dos cuentas, salas y consumo de IA todavía no se declaran aprobados.

La revisión automática rechazó crear un despliegue con destino Production antes de estas pruebas reales. Se continuó con Preview y el backend limitado a su rama. La asignación automática de dominios se restauró inmediatamente; la página pública conserva v30.1.0. No se eludió el rechazo con otra ruta de publicación.

Los avisos de los asesores sobre funciones SECURITY DEFINER y políticas para el rol authenticated se revisan junto con las comprobaciones de propiedad y `private.is_student()`; no se conceden permisos para silenciarlos. [Documentación de los asesores](https://supabase.com/docs/guides/database/database-advisors).

Este informe reemplaza los pendientes de infraestructura descritos en los informes anteriores; aquellos apartados son históricos. La activación completa exige terminar los recorridos reales, añadir al widget cualquier alias público adicional que vaya a utilizarse, comprobar una build con las variables de Production y publicar el commit comprobado en `main` y en el dominio público.
