'use strict';
const fs=require('node:fs');
const css=require('css-tree');
const source=fs.readFileSync('style.css','utf8');
const errors=[];
const tree=css.parse(source,{positions:true,onParseError:error=>errors.push({line:error.line,message:error.message})});
const groups=new WeakMap(),duplicates=[];
css.walk(tree,{visit:'Rule',enter(node,item,list){
  if(!list)return;
  let group=groups.get(list);if(!group){group=new Map();groups.set(list,group);}
  const key=css.generate(node);
  const previous=group.get(key);
  // Identical sibling rules have the same selector, conditions, declarations and specificity.
  // Keeping the last copy preserves the cascade; no unused-selector guesses are made.
  if(previous)duplicates.push({start:previous.loc.start.offset,end:previous.loc.end.offset,line:previous.loc.start.line,selector:css.generate(previous.prelude)});
  group.set(key,node);
}});
console.log(`${duplicates.length} reglas idénticas redundantes; ${errors.length} errores de sintaxis CSS.`);
fs.mkdirSync('audit',{recursive:true});fs.writeFileSync('audit/css.json',JSON.stringify({duplicates,errors},null,2)+'\n');
if(process.argv.includes('--fix')){
 if(errors.length)throw Error('No se modifica CSS con errores de análisis pendientes.');
 let next=source;
 for(const entry of duplicates.sort((a,b)=>b.start-a.start))next=next.slice(0,entry.start)+next.slice(entry.end);
 fs.writeFileSync('style.css',next);
 console.log(`Eliminados ${source.length-next.length} caracteres redundantes.`);
}
if(errors.length)process.exitCode=1;
