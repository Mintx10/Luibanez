import { subject } from './subject.mjs';
export function pack(career, entries, references) {
 references=references.map(ref=>({title:ref.title,url:ref.url||ref.href})).filter(ref=>ref.url?.startsWith('https://'));
 return Object.fromEntries(entries.map(([slug,intro,unitText,caseText,activity]) => {
  const rows=text=>text.trim().split('\n').map(line=>line.trim().split('~').map(s=>s.trim()));
  const units=rows(unitText),cases=rows(caseText);
  if(units.some(row=>row.length!==4)||cases.some(row=>row.length!==4))throw new Error(`Malformed pack: ${slug}`);
  return [`${career}-${slug}`,subject({intro,units,cases,activity,references})];
 }));
}
export function numberActivity(title, expression, labels, values, explanation, unit='') {
 return {type:'numeric',title,expression,fields:labels.map((label,i)=>({id:['a','b','c'][i],label,value:values[i]})),explanation,unit};
}
export const flowActivity=(title,steps,explanation)=>({type:'flow',title,steps:steps.split('|'),explanation});
export const canvasActivity=(title,fields,explanation)=>({type:'canvas',title,fields:fields.split('|'),explanation});
export const casesActivity=(type,title)=>({type,title});
