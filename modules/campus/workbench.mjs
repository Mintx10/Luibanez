import {el,button,field} from './dom.mjs';
import {evaluateExpression} from '../math.mjs';
import {recordProgress,subjectProgress} from './store.mjs';
export function calculate(activity,values){
 const expression=activity.expression.replace(/\b[abc]\b/g,key=>`(${Number(values[key])})`);
 if(Object.values(values).some(value=>!Number.isFinite(Number(value))))return NaN;
 return evaluateExpression(expression);
}
export function workbench(subject){
 const activity=subject.activity,root=el('section',{class:'campus-unit','data-workbench':activity.type},el('h2',{},activity.title));
 const status=el('p',{role:'status',class:'campus-feedback'});
 const save=async(score,detail)=>{await recordProgress(subject.id,'workbench',score,detail);};
 if(activity.type==='numeric'){
  const inputs=activity.fields.map(f=>el('input',{type:'number',step:'any',required:true,value:f.value,'data-variable':f.id}));
  const form=el('form',{class:'campus-stack'},...activity.fields.map((f,i)=>field(f.label,inputs[i])),el('button',{type:'submit',class:'campus-button'},'Calcular y guardar resultado'),status,el('p',{class:'campus-muted'},activity.explanation));
  form.addEventListener('submit',async e=>{e.preventDefault();const values=Object.fromEntries(activity.fields.map((f,i)=>[f.id,inputs[i].value]));const result=calculate(activity,values);if(!Number.isFinite(result)){status.textContent='La combinación no produce un resultado finito. Revisá los valores y denominadores.';return;}status.textContent=`Resultado: ${new Intl.NumberFormat('es-AR',{maximumFractionDigits:6}).format(result)} ${activity.unit||''}. Cálculo educativo, sin calificación.`;try{await save(null,{values,result});}catch(error){status.textContent+=' '+error.message;}});root.append(form);
 }else if(activity.type==='flow'){
  let order=[];const choices=el('div',{class:'campus-cluster'}),chosen=el('ol');
  const reset=()=>{order=[];chosen.replaceChildren();choices.replaceChildren(...activity.steps.map((text,index)=>({text,index})).reverse().map(({text,index})=>button(text,e=>{order.push(index);chosen.append(el('li',{},text));e.currentTarget.disabled=true;},true)));status.textContent='Elegí los pasos en su orden lógico.';};reset();
  root.append(choices,chosen,button('Comprobar secuencia',async()=>{if(order.length!==activity.steps.length){status.textContent='Completá todos los pasos antes de comprobar.';return;}const hits=order.filter((value,index)=>value===index).length;status.textContent=`${hits} de ${order.length} posiciones correctas. Orden de referencia: ${activity.steps.join(' → ')}. ${activity.explanation}`;await save(hits/order.length*100,{order});}),button('Reiniciar',reset,true),status);
 }else if(activity.type==='canvas'){
  const saved=subjectProgress(subject.id).find(p=>p.activity_id==='workbench')?.detail?.answers||[];
  const inputs=activity.fields.map((label,i)=>el('textarea',{rows:3,maxlength:600,required:true,value:saved[i]||''}));
  const form=el('form',{class:'campus-stack'},...activity.fields.map((label,i)=>field(label,inputs[i])),el('p',{class:'campus-muted'},activity.explanation),el('button',{type:'submit',class:'campus-button'},'Guardar mi borrador'),status);
  form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;try{await save(null,{answers:inputs.map(i=>i.value)});status.textContent='Borrador guardado en este dispositivo. Se sincronizará con tu perfil cuando haya conexión; no es una evaluación automática de calidad.';}catch(error){status.textContent=error.message;}});root.append(form);
 }else if(activity.type==='trace'){
  const isStack=activity.operation==='stack';root.append(el('p',{},isStack?`Se agregan a una pila ${activity.values.join(', ')}. Indicá el orden de extracción.`:`Partí de ${activity.initial} y sumá, en orden, ${activity.values.join(', ')}. Escribí el valor del acumulador después de cada suma.`));
  const input=el('input',{required:true,placeholder:'Valores separados por coma'});root.append(field('Tu traza',input),button('Verificar traza',async()=>{const actual=input.value.split(',').map(s=>Number(s.trim()));let accumulator=activity.initial;const expected=isStack?[...activity.values].reverse():activity.values.map(n=>(accumulator+=n));const correct=actual.length===expected.length&&actual.every((n,i)=>n===expected[i]);status.textContent=`${correct?'Traza correcta.':'Revisá la traza.'} Secuencia esperada: ${expected.join(', ')}.`;await save(correct?100:0,{trace:actual});}),status);
 }else{
  // A subject-specific concept network: match authored concepts to their mechanisms.
  root.append(el('p',{class:'campus-muted'},activity.type==='clinical'?'Relacioná cada mecanismo con su explicación antes de analizar los casos ficticios. No es una herramienta diagnóstica.':'Construí el mapa de relaciones entre conceptos y explicaciones de esta materia.'));
  const concepts=[...subject.units].reverse(),selects=subject.units.map(unit=>el('select',{'aria-label':unit.explanation},el('option',{value:''},'Elegí un concepto'),...concepts.map(c=>el('option',{value:c.id},c.concept))));
  subject.units.forEach((unit,i)=>root.append(field(unit.explanation,selects[i])));
  root.append(button('Comprobar relaciones',async()=>{if(selects.some(s=>!s.value)){status.textContent='Relacioná todos los enunciados.';return;}const hits=selects.filter((s,i)=>s.value===subject.units[i].id).length;status.textContent=`${hits} de 6 relaciones correctas. Referencia: ${subject.units.map(u=>`${u.concept}: ${u.explanation}`).join(' · ')}`;await save(hits/6*100,{matches:selects.map(s=>s.value)});}),status);
 }
 return root;
}
