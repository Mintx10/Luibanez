import DOMPurify from '../vendor/dompurify.mjs';
const actions = new Set(['entrarALobbyDesdeCartelera','eliminarAsientoContable','eliminarFilaDeAsiento','agregarFilaAAsiento','seleccionarModeloExamen','generarNuevoModeloConIA','limpiarYReintentarExamen','borrarModelosCustomDeMateria','evaluarExamenMateria','actualizarFechaAsiento','actualizarDetalleAsiento','actualizarCeldaDiario']);
export function setHTML(element, markup) {
  element.innerHTML = DOMPurify.sanitize(String(markup ?? ''), { ADD_DATA_URI_TAGS: ['audio', 'source'], FORBID_TAGS: ['script', 'iframe', 'object', 'embed'], FORBID_ATTR: ['srcdoc', 'data-page-action', 'data-prevent-submit'] });
}
function dispatch(event) {
  const target = event.target.closest?.(`[data-study-${event.type}]`);
  if (!target || target.disabled) return;
  const source = target.getAttribute(`data-study-${event.type}`);
  if (source === 'scrollTop') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const call = /^(\w+)\((.*)\)$/.exec(source || '');
  if (!call || !actions.has(call[1])) return;
  const tokens = call[2].trim() ? call[2].split(',').map(s => s.trim()) : [];
  const args = [];
  for (const token of tokens) {
    if (token === 'this.value') args.push(target.value);
    else if (/^-?\d+(?:\.\d+)?$/.test(token)) args.push(Number(token));
    else if (token === 'true' || token === 'false') args.push(token === 'true');
    else if (/^'[\w-]*'$/.test(token) || /^"[\w-]*"$/.test(token)) args.push(token.slice(1, -1));
    else return; // No eval, expressions, object properties, or arbitrary code.
  }
  const handler = window[call[1]];
  if (typeof handler === 'function') handler(...args);
}
for (const type of ['click', 'input', 'change']) document.addEventListener(type, dispatch);
