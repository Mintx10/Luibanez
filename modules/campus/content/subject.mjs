// Academic packs contain authored facts and applications. Mechanics are shared;
// definitions, examples, solutions, parameters and distractors belong to each subject.
export function subject({ intro, units, cases, activity, references }) {
 if (units.length !== 6 || cases.length !== 3) throw new Error('Incomplete academic pack');
 const prepared = units.map(([title, concept, explanation, application], i) => ({ id:`unit-${i+1}`, title, concept, explanation, application, objective:`Distinguir y aplicar ${concept.toLowerCase()} en situaciones de ${title.toLowerCase()}.`, references }));
 const questions = prepared.flatMap((unit, index) => {
  const others = [1,2,3].map(offset => prepared[(index+offset)%6]);
  const alternatives=[unit,...others];
  const shift=index%4;
  const rotated=alternatives.slice(shift).concat(alternatives.slice(0,shift));
  return [
   {id:`question-${index*2+1}`,question:`¿Qué enunciado caracteriza ${unit.concept.toLowerCase()}?`,options:rotated.map(u=>u.explanation),correct:rotated.indexOf(unit),explanation:unit.explanation,unit:unit.id},
   {id:`question-${index*2+2}`,question:unit.application,options:rotated.map(u=>u.concept),correct:rotated.indexOf(unit),explanation:`${unit.concept}: ${unit.explanation}`,unit:unit.id}
  ];
 });
 return { intro, units:prepared, questions, cases:cases.map(([title,prompt,solution,criteria],i)=>({id:`case-${i+1}`,title,prompt,solution,criteria:criteria.split('|')})),activity,references };
}
