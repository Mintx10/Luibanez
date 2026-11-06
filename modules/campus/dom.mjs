export function el(tag, attributes = {}, ...children) {
 const node = document.createElement(tag);
 for (const [key, value] of Object.entries(attributes)) {
  if (value === undefined || value === null || value === false) continue;
  if(key==='value' && ['INPUT','TEXTAREA','SELECT'].includes(node.tagName))node.value=value;
  else if (key === 'class') node.className = value;
  else if (key === 'text') node.textContent = value;
  else if (key === 'on') for (const [event, handler] of Object.entries(value)) node.addEventListener(event, handler);
  else if (/^on/i.test(key)) throw new Error('Inline events are forbidden.');
  else if (value === true) node.setAttribute(key, '');
  else node.setAttribute(key, String(value));
 }
 for (const child of children.flat(Infinity)) if (child !== undefined && child !== null && child !== false) node.append(child instanceof Node ? child : document.createTextNode(String(child)));
 return node;
}
export const button = (text, handler, secondary = false, attrs = {}) => el('button', { type: 'button', class: secondary ? 'campus-button campus-button--secondary' : 'campus-button', on: { click: event => {const target=event.currentTarget;try{const pending=handler(event);if(pending?.then){target.disabled=true;target.setAttribute('aria-busy','true');Promise.resolve(pending).catch(error=>notice(error.message,true)).finally(()=>{target.disabled=false;target.removeAttribute('aria-busy');});}}catch(error){notice(error.message,true);}} }, ...attrs }, text);
export function notice(message, error = false) {
 window.mostrarToast?.(message, error ? 'error' : 'exito');
}
export function field(label, input) { const id = input.id || `field-${crypto.randomUUID()}`; input.id=id;return el('label',{class:'campus-field',for:id},el('span',{},label),input); }
