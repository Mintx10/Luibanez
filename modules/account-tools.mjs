import {careers,getCareer} from './campus/catalog.mjs';
import {setStudentCareer} from './session.mjs';
import { currentUser, getClient, withAuthAction, updatePassword } from './session.mjs';
import { legacyPreview, importLegacy, legacyDocuments } from './storage.mjs';
export function muestrearContexto(text, max = 120000) {
  if (text.length <= max) return text;
  const size = Math.floor((max - 100) / 3);
  const middle = Math.floor((text.length - size) / 2);
  return `${text.slice(0, size)}\n[Fragmento intermedio]\n${text.slice(middle, middle + size)}\n[Fragmento final]\n${text.slice(-size)}`;
}
export function setupAccountTools({ importDocuments, report, welcome }) {
  const button = document.createElement('button');
  button.type = 'button'; button.id = 'accountToolsBtn'; button.className = 'theme-toggle-btn';
  button.textContent = '⚙'; button.setAttribute('aria-label', 'Cuenta y datos de este dispositivo'); button.title = 'Cuenta y datos';
  document.querySelector('.top-nav__actions')?.prepend(button);
  const dialog = document.createElement('dialog'); dialog.className = 'modal'; dialog.id = 'accountToolsDialog';
  dialog.setAttribute('aria-labelledby', 'accountToolsTitle');
  dialog.innerHTML = `<div class="modal__content"><header class="modal__header"><h2 id="accountToolsTitle">Cuenta y datos</h2><button type="button" data-close class="icon-button" aria-label="Cerrar">✕</button></header>
    <form id="careerForm"><label for="accountCareer">Carrera</label><select id="accountCareer"><option>General</option><option>Medicina</option><option>Licenciatura en Finanzas</option></select><button class="button button--primary" type="submit">Guardar carrera</button></form>
    <form id="passwordRecoveryForm" class="hidden"><label for="newAccountPassword">Nueva contraseña</label><input id="newAccountPassword" type="password" minlength="6" required autocomplete="new-password"><button class="button button--primary" type="submit">Guardar contraseña</button></form>
    <h3>Importar datos anteriores</h3><p>Revisá los datos compartidos que quedaron en este dispositivo y elegí cuáles pertenecen a tu perfil. Los originales se conservarán. Los PIN y claves no se importan.</p>
    <form id="legacyImportForm"><div id="legacyImportPreview"></div><button class="button button--secondary" type="submit">Importar selección</button></form>
    <p id="accountToolsMessage" role="status"></p></div>`;
  document.body.append(dialog);
  const message = dialog.querySelector('#accountToolsMessage');
  if (currentUser()?.user_metadata?.carrera === 'Medicina' && welcome) {
    const intro = document.createElement('button'); intro.type='button'; intro.className='button button--secondary';intro.textContent='Ver bienvenida de Medicina';
    intro.onclick=()=>{dialog.close();welcome();};message.before(intro);
  }
  dialog.querySelector('[data-close]').onclick = () => dialog.close();
  const career = dialog.querySelector('#accountCareer');
  career.replaceChildren(...careers.map(c=>new Option(c.name,c.id)));
  career.value = getCareer(currentUser()?.user_metadata?.carrera)?.id || '';
  dialog.querySelector('#careerForm').classList.toggle('hidden', !currentUser());
  dialog.querySelector('#careerForm').onsubmit = event => {
    event.preventDefault();
    withAuthAction(event.submitter, async () => {
      await setStudentCareer(career.value);
      location.reload();
    }, report);
  };
  let docs = [];
  button.onclick = async () => {
    dialog.showModal();
    const preview = dialog.querySelector('#legacyImportPreview'); preview.replaceChildren();
    for (const entry of legacyPreview()) {
      const label = document.createElement('label'); const check = document.createElement('input');
      check.type = 'checkbox'; check.value = entry.key; check.name = 'legacy';
      label.append(check, document.createTextNode(` ${entry.key} · ${entry.items} elementos · ${Math.ceil(entry.bytes / 1024)} KB`));
      preview.append(label, document.createElement('br'));
    }
    docs = await legacyDocuments().catch(() => []);
    if (docs.length) {
      const label = document.createElement('label'); const check = document.createElement('input'); check.type = 'checkbox'; check.value = 'documents'; check.name = 'legacy';
      label.append(check, document.createTextNode(` ${docs.length} documentos: ${docs.map(d => d.nombre).join(', ')}`)); preview.append(label);
    }
    if (!preview.childElementCount) preview.textContent = 'No se encontraron datos anteriores para importar.';
  };
  dialog.querySelector('#legacyImportForm').onsubmit = event => {
    event.preventDefault();
    const selected = [...dialog.querySelectorAll('[name="legacy"]:checked')].map(input => input.value);
    if (!selected.length) { message.textContent = 'Seleccioná los datos que querés importar.'; return; }
    withAuthAction(event.submitter, async () => {
      await importLegacy(selected.filter(k => k !== 'documents'));
      if (selected.includes('documents')) await importDocuments(docs);
      location.reload();
    }, report);
  };
  const recoveryForm = dialog.querySelector('#passwordRecoveryForm');
  function recovery() { recoveryForm.classList.remove('hidden'); if (!dialog.open) dialog.showModal(); recoveryForm.querySelector('input').focus(); }
  window.addEventListener('study:password-recovery', recovery);
  if (new URLSearchParams(location.search).has('recover')) recovery();
  recoveryForm.onsubmit = event => {
    event.preventDefault();
    withAuthAction(event.submitter, async () => {
      if (!recoveryForm.reportValidity()) return;
      await updatePassword(dialog.querySelector('#newAccountPassword').value);
      recoveryForm.reset(); recoveryForm.classList.add('hidden'); message.textContent = 'Contraseña actualizada.';
      history.replaceState(null, '', location.pathname + location.hash);
    }, report);
  };
  window.addEventListener('study:storage-error', () => report('No hay espacio para guardar los cambios. Exportá tus datos antes de continuar.', 'error'));
}
