export function normalizeLists(input) {
  if (!Array.isArray(input)) throw new Error('El respaldo debe contener una lista de materias.');
  return input.map((list, i) => {
    if (!list || typeof list !== 'object' || typeof (list.nombre || list.titulo) !== 'string' || !Array.isArray(list.temas)) throw new Error(`La materia ${i + 1} está incompleta.`);
    return { ...list, id: typeof list.id === 'string' ? list.id : `import-list-${i}`, nombre: (list.nombre || list.titulo).slice(0,150), temas: list.temas.map((topic,j) => {
      if (typeof topic === 'string') return { id: `${list.id || i}-topic-${j}`, nombre: topic, titulo: topic, descripcion: '', guia: '' };
      if (!topic || typeof topic !== 'object' || typeof (topic.nombre || topic.titulo) !== 'string') throw new Error(`El tema ${j + 1} de ${list.nombre || list.titulo} está incompleto.`);
      return { ...topic, id: typeof topic.id === 'string' ? topic.id : `${list.id || i}-topic-${j}`, nombre: topic.nombre || topic.titulo, titulo: topic.titulo || topic.nombre, descripcion: typeof topic.descripcion === 'string' ? topic.descripcion : '', guia: typeof topic.guia === 'string' ? topic.guia : '' };
    }) };
  });
}
export function parseBackup(text) {
  if (typeof text !== 'string' || text.length > 12000000) throw new Error('El respaldo supera el límite de 12 MB.');
  const data = JSON.parse(text, (key, value) => ['__proto__','constructor','prototype'].includes(key) ? undefined : value);
  if (!data || typeof data !== 'object' || !Array.isArray(data.listas)) throw new Error('El archivo no es un respaldo válido de estudio.');
  return { ...data, listas: normalizeLists(data.listas) };
}
