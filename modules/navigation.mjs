export const routes = Object.freeze({
  campus:'viewCampus', materias:'viewSubjects', materia:'viewSubject', home: 'viewHome', solo: 'viewSolo', juntos: 'viewDuelo', bolillero: 'viewBolillero',
  fama: 'viewFama', juegos: 'viewJuegosEdu', laboratorio: 'viewLaboratorio', podio: 'viewPodioOnline',
  'med-interna': 'viewMedInterna', 'farmacologia-2': 'viewFarmacologia2', 'salud-publica': 'viewSaludPublica',
  'fin-hub': 'viewFinanzasHub', 'fin-filosofia': 'viewFinFilosofia', 'fin-sfi': 'viewFinSFI',
  'fin-historia': 'viewFinHistoria', 'fin-estadistica': 'viewFinEstadistica', 'fin-contabilidad': 'viewFinContabilidad'
});
export function normalizeRoute(value) {
  const name = String(value || '').replace(/^#/, '').split('?')[0];
  if (/^materia\/[a-z0-9-]+$/.test(name)) return name;
  if (name.startsWith('legacy/') && Object.hasOwn(routes,name.slice(7))) return name;
  return name === 'duelo' ? 'juntos' : Object.hasOwn(routes, name) ? name : 'home';
}
export function showRoute(name) {
  if(name.startsWith('materia/'))name='materia';
  if(name.startsWith('legacy/'))name=name.slice(7);
  for (const [route, id] of Object.entries(routes)) {
    const view = document.getElementById(id);
    if (!view) continue;
    const active = name === route;
    view.classList.toggle('view--hidden', !active); view.classList.toggle('view--active', active);
    view.setAttribute('aria-hidden', String(!active));
    view.inert = !active;
  }
  for (const button of document.querySelectorAll('[data-view]')) {
    const active = normalizeRoute(button.dataset.view) === name;
    button.classList.toggle('is-active', active);
    if (active) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current');
  }
}
