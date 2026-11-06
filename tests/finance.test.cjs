const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateOutput } = require('../lib/ai-validation.cjs');
test('all finance catalog games retain their authored questions and correct answers', async () => {
  const { MATERIAS_FINANZAS }=await import('../modules/finance-data.mjs');
  const { buildFinanceStudyList }=await import('../modules/finance-catalog.mjs');
  for(const [id,materia] of Object.entries(MATERIAS_FINANZAS)){
    const list=buildFinanceStudyList(materia,id);
    assert.ok(list.temas.length>=3,id);
    for(const [i,topic] of list.temas.entries()){
      validateOutput('bomba',topic.bomba);
      assert.equal(topic.bomba.fase1.pregunta,materia.conceptosJuegos[i].preguntaBomba);
      assert.equal(topic.impostor.afirmacionesVerdaderas.length,3);
      assert.ok(topic.impostor.afirmacionImpostora);
      assert.ok(topic.memotest.definicionOFormula);
    }
  }
});
