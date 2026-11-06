import catalog from '../../catalog.json' with { type: 'json' };
export const careers = Object.freeze(catalog.careers);
export const subjects = Object.freeze(careers.flatMap(career => career.subjects.map(subject => Object.freeze({ ...subject, careerId: career.id }))));
export function getCareer(value) { return careers.find(c => c.id === value || c.value === value); }
export function getSubject(id) { return subjects.find(s => s.id === id); }
export function careerValue(id) { return getCareer(id)?.value || 'General'; }
export function legacySubject(route) { return subjects.find(s => s.legacyRoute === route); }
const loaders = {
 finanzas: () => import('./content/finanzas.mjs'), medicina: () => import('./content/medicina.mjs'),
 marketing: () => import('./content/marketing.mjs'), veterinaria: () => import('./content/veterinaria.mjs'),
 psicologia: () => import('./content/psicologia.mjs'), sistemas: () => import('./content/sistemas.mjs')
};
const pending = new Map();
export async function loadSubject(id) {
 const subject = getSubject(id);
 if (!subject) throw new Error('No se encontró esta materia.');
 if (!pending.has(subject.careerId)) pending.set(subject.careerId, loaders[subject.careerId]().catch(error => { pending.delete(subject.careerId); throw error; }));
 const module = await pending.get(subject.careerId);
 const content = module.default[subject.id];
 if (!content) throw new Error('El contenido de esta materia no pudo cargarse. Reintentá.');
 return { ...subject, ...content };
}

export const contentUrls={finanzas:new URL('./content/finanzas.mjs',import.meta.url).href,medicina:new URL('./content/medicina.mjs',import.meta.url).href,marketing:new URL('./content/marketing.mjs',import.meta.url).href,veterinaria:new URL('./content/veterinaria.mjs',import.meta.url).href,psicologia:new URL('./content/psicologia.mjs',import.meta.url).href,sistemas:new URL('./content/sistemas.mjs',import.meta.url).href};
