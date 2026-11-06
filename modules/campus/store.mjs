import {readValue,writeValue} from '../database.mjs';
import {currentUser,currentStudentProfile,getClient} from '../session.mjs';
import {getCareer,getSubject} from './catalog.mjs';
let state={tracks:{},custom:[],progress:{},materials:{},pending:[]};
let flushing,mutations=Promise.resolve();
export function campusState(){return state;}
export function activeCareer(){return getCareer(currentStudentProfile()?.carrera||currentUser()?.user_metadata?.carrera);}
export function selectedSubjects(id=activeCareer()?.id){return state.tracks[id]||[];}
export function ownSubject(id){return getSubject(id)||state.custom.find(s=>s.id===id);}
export function subjectProgress(id){return Object.values(state.progress).filter(p=>p.subject_id===id);}
async function persist(){await writeValue('campus:v1',state);window.dispatchEvent(new Event('campus:data'));}
function mutate(operation){const task=mutations.then(operation);mutations=task.catch(()=>{});return task;}
async function enqueue(kind,key,args){
 await mutate(async()=>{state.pending=state.pending.filter(op=>op.key!==key);state.pending.push({kind,key,args});await persist();});
 await flushCampus();
}
export function syncMessage(){return state.pending.length?`${state.pending.length} cambio(s) guardados en este dispositivo · pendientes de sincronizar`:state.syncError?'No se pudo actualizar la nube. Tus datos locales se conservan.':'Cambios guardados';}
export async function flushCampus(){
 if(flushing)return flushing;
 if(!currentUser()||navigator.onLine===false||!state.pending.length)return;
 flushing=(async()=>{
  state.syncError='';
  while(state.pending.length){
   const operation=state.pending[0];
   const rpc={track:'study_save_track',custom:'study_save_custom_subject',progress:'study_record_subject_progress',material:'study_link_subject_material'}[operation.kind];
   try{const {error}=await getClient().rpc(rpc,operation.args);if(error)throw error;}
   catch(error){state.syncError=error.message||'Sin conexión';await persist();return;}
   await mutate(async()=>{if(state.pending[0]===operation)state.pending.shift();await persist();});
  }
 })().finally(()=>{flushing=null;});return flushing;
}
export async function initializeCampusStore(){
 if(!currentUser())return;
 const saved=await readValue('campus:v1');if(saved&&typeof saved==='object')state={...state,...saved};
 const user=currentUser(),career=activeCareer();
 // Supabase does not create application profiles automatically.
 if(!currentStudentProfile()&&career){const {error}=await getClient().from('study_profiles').upsert({id:user.id,apodo:user.user_metadata?.apodo||'Estudiante',carrera:career.value,avatar:user.user_metadata?.avatar||'👤'});if(error)state.syncError=error.message;}
 if(navigator.onLine!==false){
  await Promise.all([['study_student_tracks','track',6],['study_custom_subjects','custom',100],['study_subject_progress','progress',2000],['study_subject_materials','material',1000]].map(async([table,kind,limit])=>{
   try{
    const {data,error}=await getClient().from(table).select('*').eq('user_id',user.id).limit(limit);if(error)throw error;
    for(const row of data||[]){
     const key=kind==='track'?`track:${row.career_id}`:kind==='custom'?`custom:${row.id}`:kind==='material'?`material:${row.subject_id}:${row.document_id}`:`progress:${row.subject_id}:${row.activity_id}`;
     if(state.pending.some(op=>op.key===key))continue;
     if(kind==='track')state.tracks[row.career_id]=row.selected_subjects;
     if(kind==='custom'&&!state.custom.some(s=>s.id===row.id))state.custom.push({id:row.id,careerId:row.career_id,name:row.name,intro:row.description,custom:true});
     if(kind==='progress')state.progress[`${row.subject_id}:${row.activity_id}`]=row;
     if(kind==='material'){const ids=state.materials[row.subject_id]||[];if(!ids.includes(row.document_id))ids.push(row.document_id);state.materials[row.subject_id]=ids;}
    }
   }catch(error){state.syncError=error.message||'No se pudo actualizar la nube';}
  }));
 }
 if(career&&!Object.hasOwn(state.tracks,career.id)){
  const initial=(user.user_metadata?.selected_subjects||[]).filter(id=>getSubject(id)?.careerId===career.id);
  state.tracks[career.id]=initial;
  if(initial.length)state.pending.push({kind:'track',key:`track:${career.id}`,args:{p_career:career.id,p_subjects:initial}});
 }
 await persist();await flushCampus();window.addEventListener('online',flushCampus);window.addEventListener('study:cloud-synced',flushCampus);
}
export async function saveSelection(careerId,ids){
 if(!currentUser())throw new Error('Creá tu perfil para elegir materias.');
 if(!getCareer(careerId)||!Array.isArray(ids)||ids.length>100||ids.some(id=>ownSubject(id)?.careerId!==careerId))throw new Error('La selección de materias no es válida.');
 state.tracks[careerId]=[...new Set(ids)];await enqueue('track',`track:${careerId}`,{p_career:careerId,p_subjects:state.tracks[careerId]});
}
export async function createCustomSubject(careerId,name,description){
 name=name.trim();description=description.trim();
 if(!currentUser()||!getCareer(careerId)||name.length<3||name.length>100||description.length>1000)throw new Error('Usá un nombre de 3 a 100 caracteres y una descripción de hasta 1000.');
 const id='custom-'+crypto.randomUUID();
 const entry={id,careerId,name,intro:description,custom:true};state.custom.push(entry);
 await enqueue('custom',`custom:${id}`,{p_id:id,p_career:careerId,p_name:name,p_description:description});
 await saveSelection(careerId,[...selectedSubjects(careerId),id]);return entry;
}
export async function recordProgress(subjectId,activityId,score=null,detail={}){
 const subject=ownSubject(subjectId);if(!subject||!currentUser())return;
 if(score!==null&&(!Number.isFinite(score)||score<0||score>100))throw new Error('Resultado inválido.');
 const key=`${subjectId}:${activityId}`,old=state.progress[key],at=new Date().toISOString();
 const best=score===null?(old?.best_score??null):Math.max(score,old?.best_score??0);
 state.progress[key]={subject_id:subjectId,career_id:subject.careerId,activity_id:activityId,score,best_score:best,detail,updated_at:at};
 await enqueue('progress',`progress:${key}`,{p_career:subject.careerId,p_subject:subjectId,p_activity:activityId,p_score:score,p_detail:detail,p_at:at});
}
export async function linkMaterial(subjectId,documentId){
 const subject=ownSubject(subjectId);if(!subject||!currentUser())throw new Error('Elegí una materia de tu perfil.');
 const ids=state.materials[subjectId]||[];if(!ids.includes(documentId))ids.push(documentId);state.materials[subjectId]=ids;
 await enqueue('material',`material:${subjectId}:${documentId}`,{p_career:subject.careerId,p_subject:subjectId,p_document:String(documentId)});
}
export async function localDocuments(){return await readValue('apuntesColeccion')||[];}
