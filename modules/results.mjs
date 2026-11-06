import { currentUser, getClient } from './session.mjs';
let panel;
export async function showVerifiedResults() {
  if (!panel) {
    panel = document.createElement('section'); panel.id = 'verifiedResultsPanel'; panel.className = 'secure-game';
    const title = document.createElement('h2'); title.textContent = 'Mis resultados online validados';
    const body = document.createElement('div'); body.id = 'verifiedResultsBody'; body.setAttribute('aria-live','polite');
    const button = document.createElement('button'); button.className='button button--secondary'; button.type='button'; button.textContent='Actualizar resultados';
    button.onclick = showVerifiedResults; panel.append(title,body,button); document.querySelector('#viewFama .fama-container').prepend(panel);
  }
  const output = panel.querySelector('#verifiedResultsBody'), button = panel.querySelector('button');
  if (!currentUser()) { output.textContent = 'Iniciá sesión para consultar los resultados validados de tu cuenta.'; return; }
  if (button.disabled) return;
  button.disabled = true; output.textContent='Cargando resultados…';
  try {
    if (!navigator.onLine) throw new Error('Conectate para consultar tus resultados online.');
    const { data,error } = await getClient().from('study_verified_results').select('game,points,completed_at').eq('user_id',currentUser().id).order('completed_at',{ascending:false}).limit(100);
    if (error) throw new Error('No se pudieron consultar los resultados. Reintentá cuando vuelva la conexión.');
    output.replaceChildren();
    if (!data?.length) { output.textContent='Todavía no hay partidas validadas para esta cuenta.'; return; }
    const list=document.createElement('ul');
    for(const result of data){const item=document.createElement('li');item.textContent=`${result.game} · ${result.points} pts · ${new Date(result.completed_at).toLocaleString('es-AR')}`;list.append(item);}
    output.append(list);
  } catch(error){output.textContent=error.message;}
  finally{button.disabled=false;}
}
