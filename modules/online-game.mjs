import { getClient, currentUser } from './session.mjs';
let host;
let latest;
let timer;
let options;
export function stopOnlineGame() { clearInterval(timer); host?.classList.add('hidden'); }
async function rpc(name, args) {
  const { data, error } = await getClient().rpc(name, args);
  if (error) throw error;
  return data;
}
export async function startOnlineGame(code, rounds, callbacks) {
  await rpc('study_start_game', { p_code: code, p_rounds: rounds });
  return refreshOnlineGame(code, callbacks);
}
export async function refreshOnlineGame(code, callbacks) {
  let state = await rpc('study_game_state', { p_code: code });
  if (state?.expired && !state.complete) state = await rpc('study_game_action', { p_code: code, p_version: state.version, p_action: 'expire', p_index: null });
  if (state) render(state, { ...callbacks, code });
}
function render(state, callbacks) {
  const newGame = callbacks.forceNavigate || !host || options?.code !== callbacks.code || state.version < (latest?.version || 0);
  latest = state; options = callbacks;
  if (!newGame && (host.classList.contains('hidden') || document.getElementById('viewJuegosEdu').classList.contains('view--hidden'))) return;
  if (newGame) callbacks.navigate(state);
  for (const id of ['arenaBomba','arenaImpostor','arenaMemotest','triatlonProgressBar']) document.getElementById(id)?.classList.add('hidden');
  if (!host) {
    host = document.createElement('section'); host.id = 'arenaOnlineSecure'; host.className = 'secure-game';
    host.innerHTML = `<header><h2 id="secureGameTitle"></h2><p id="secureGameProgress"></p><p id="secureGameClock" role="timer"></p></header><p id="secureGameQuestion"></p><div id="secureGameOptions"></div><p id="secureGameFeedback" role="status" aria-live="polite"></p><div class="secure-game-tools"><button type="button" data-action="hint">💡 Pista (−5 pts)</button><button type="button" data-action="cut">✂️ Descartar dos (−5 pts)</button><button type="button" data-action="freeze">❄️ Agregar 15 segundos</button></div><h3>Marcador de la sala</h3><ol id="secureGamePlayers" aria-live="polite"></ol><button type="button" id="secureGameReturn">Volver a la sala</button>`;
    document.getElementById('viewJuegosEdu').append(host);
    host.addEventListener('click', async event => {
      const button = event.target.closest('button');
      if (!button || button.disabled) return;
      if (button.id === 'secureGameReturn') { clearInterval(timer); host.classList.add('hidden'); options.back(); return; }
      const action = button.dataset.action;
      if (!action) return;
      const version = latest.version;
      host.querySelectorAll('button[data-action]').forEach(b => { b.disabled = true; });
      try {
        const next = await rpc('study_game_action', { p_code: options.code, p_version: version, p_action: action, p_index: button.dataset.index === undefined ? null : Number(button.dataset.index) });
        const feedback = next.mistakes > latest.mistakes ? 'Respuesta incorrecta. Revisá el material y continuá.' : next.points > latest.points ? 'Respuesta validada por el servidor.' : '';
        render(next, options); document.getElementById('secureGameFeedback').textContent = feedback;
      } catch (error) { document.getElementById('secureGameFeedback').textContent = error.message || 'No se pudo confirmar la acción. Reintentá.'; render(latest, options); }
    });
  }
  host.classList.remove('hidden');
  document.getElementById('secureGameTitle').textContent = `${({ bomba: 'Desactivá la bomba', impostor: 'Caza al impostor', memotest: 'Memotest', triatlon: 'Triatlón' })[state.game] || 'Estudio online'} · ${state.mode === 'coop' ? 'Cooperativo' : 'Versus'}`;
  document.getElementById('juegosGameTitle').textContent = document.getElementById('secureGameTitle').textContent;
  for (const id of ['bombaOpenConfigBtn','impostorOpenConfigBtn','memotestOpenConfigBtn']) document.getElementById(id)?.classList.add('hidden');
  document.getElementById('secureGameProgress').textContent = `Etapa ${Math.min(state.roundIndex + 1, state.totalRounds)} de ${state.totalRounds} · ${state.points} pts · ${state.mistakes} errores`;
  const players=document.getElementById('secureGamePlayers');players.replaceChildren();
  for (const player of state.players || []) { const item=document.createElement('li'); item.textContent=`${player.name}: ${player.points} pts${player.complete?' · Finalizó':''}`;players.append(item); }
  const finished = state.complete || state.expired;
  document.getElementById('secureGameQuestion').textContent = finished ? state.expired ? 'Se agotó el tiempo de la partida.' : 'Partida terminada. El puntaje fue registrado por el servidor.' : state.question || state.title || 'Encontrá los pares de concepto y definición.';
  const container = document.getElementById('secureGameOptions'); container.replaceChildren();
  container.className = state.type === 'memory' ? 'secure-game-memory' : 'secure-game-answers';
  if (!finished) {
    const choices = state.type === 'memory' ? state.cards || [] : state.options || [];
    choices.forEach((choice, index) => {
      if (state.removedOptions?.includes(index)) return;
      const button = document.createElement('button'); button.type = 'button'; button.className = 'button button--secondary';
      button.dataset.action = state.type === 'memory' ? 'flip' : 'answer'; button.dataset.index = index;
      button.textContent = state.type === 'memory' ? choice.text || `Carta ${index + 1}` : choice;
      button.setAttribute('aria-label', state.type === 'memory' ? `${choice.matched ? 'Par encontrado: ' : ''}${button.textContent}` : choice);
      button.disabled = Boolean(choice.matched || (state.type === 'memory' && state.mode === 'coop' && state.turnUserId !== currentUser()?.id));
      container.append(button);
    });
  }
  for (const [action, used] of [['hint',state.hintUsed],['cut',state.cutUsed],['freeze',state.freezeUsed]]) {
    const button = host.querySelector(`[data-action="${action}"]`); button.disabled = finished || used || (action === 'cut' && (state.type !== 'quiz' || state.cutAllowed === false));
  }
  if (state.hint) document.getElementById('secureGameFeedback').textContent = state.hint;
  clearInterval(timer);
  function tick() {
    const seconds = Math.max(0, Math.ceil((Date.parse(state.deadline) - Date.now()) / 1000));
    document.getElementById('secureGameClock').textContent = finished ? '' : `Tiempo: ${seconds}s`;
    if (!seconds && !finished) {
      clearInterval(timer);
      rpc('study_game_action', { p_code: options.code, p_version: state.version, p_action: 'expire', p_index: null }).then(next => render(next, options)).catch(error => { document.getElementById('secureGameFeedback').textContent = error.message; });
    }
  }
  if (!finished) { timer = setInterval(tick, 1000); tick(); }
}
