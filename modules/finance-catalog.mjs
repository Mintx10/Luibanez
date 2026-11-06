export function buildFinanceStudyList(materia, materiaId) {
  const concepts = materia.conceptosJuegos;
  function question(concept) {
    return { pregunta: concept.preguntaBomba, opciones: concept.cables.map(c => c.texto), respuestaCorrecta: concept.cables.findIndex(c => c.correcta), explicacion: concept.guia };
  }
  return {
    id: `fin_${materiaId}_conceptos`, nombre: materia.nombre, titulo: `${materia.nombre} (Finanzas)`, descripcion: materia.criterioDocente,
    temas: concepts.map((concept,index) => ({
      id: concept.id || `t_${materiaId}_${index}`, nombre: concept.nombre, titulo: concept.nombre, guia: concept.guia, descripcion: concept.guia,
      bomba: { fase1: question(concept), fase2: question(concepts[(index+1)%concepts.length]), fase3: question(concepts[(index+2)%concepts.length]) },
      impostor: { afirmacionesVerdaderas: concept.impostorAfirmaciones.filter((_,i)=>i!==concept.impostorCorrecta), afirmacionImpostora: concept.impostorAfirmaciones[concept.impostorCorrecta], explicacionError: concept.guia },
      memotest: { concepto: concept.memotestPar.concepto, definicionOFormula: concept.memotestPar.definicion, definicion: concept.memotestPar.definicion }
    }))
  };
}
