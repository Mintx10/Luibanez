import { getClient, currentUser, currentRoomUser, guestAlias } from './session.mjs';

// The legacy game renderers consume messages. Transport and authority live in RPCs.
export function createRoomTransport({ receive, discover, report }) {
  let roomCode = null, channel = null, cursor = 0, polling = null, discoveryTimer = null, busy = false;
  let generation = 0, lastHeartbeat = 0;
  let sendChain = Promise.resolve();
  async function rpc(name, args = {}) {
    if (!currentRoomUser()) throw new Error('Ingresá con un perfil o un apodo de invitado.');
    if (navigator.onLine === false) throw new Error('Necesitás conexión para jugar online.');
    const { data, error } = await getClient().rpc(name, args);
    if (error) throw new Error(error.message || 'No se pudo comunicar con la sala.');
    return data;
  }
  async function refreshMembers() {
    if (!roomCode) return;
    const code = roomCode;
    const state = await rpc('study_read_room', { p_code: code });
    if (code !== roomCode) return;
    receive({ tipo: 'SINCRONIZAR_SALA', jugadores: state.members, config: state.config, estadoSala: state.status, formatoModo: state.config.formatoModo, juegoSeleccionado: state.config.juego });
    return state;
  }
  async function poll() {
    if (busy || !roomCode || document.visibilityState === 'hidden') return;
    busy = true;
    const started = generation, code = roomCode;
    try {
      if (Date.now() - lastHeartbeat > 30000) { await rpc('study_room_heartbeat', { p_code: code }); lastHeartbeat = Date.now(); }
      const { data, error } = await getClient().from('study_room_events').select('id,payload').eq('room_code', code).gt('id', cursor).order('id').limit(200);
      if (started !== generation) return;
      if (error) throw error;
      for (const event of data || []) { cursor = Math.max(cursor, event.id); receive(event.payload); }
      await refreshMembers();
      transport.connected = true;
    } catch (error) {
      if (started !== generation) return;
      if (/No pertenecés|expiró|Sala no disponible/.test(error.message)) { await stopWatching(); receive({ tipo: 'SALA_CERRADA' }); }
      if (transport.connected) report(`Sala sin sincronizar: ${error.message}`, 'error');
      transport.connected = false;
    }
    finally { busy = false; }
  }
  async function watch(code) {
    if (roomCode === code && polling) return;
    await stopWatching(); roomCode = code; cursor = 0;
    const state = await refreshMembers();
    cursor = Number(state.cursor || 0);
    if (state.snapshot) receive({ ...state.snapshot, restoring: true });
    channel = getClient().channel(`study-room:${code}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'study_room_events', filter: `room_code=eq.${code}` }, () => poll())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'study_room_members', filter: `room_code=eq.${code}` }, () => refreshMembers().catch(error => report(error.message, 'error')))
      .subscribe(status => { transport.connected = status === 'SUBSCRIBED'; if (transport.connected) poll(); });
    polling = setInterval(poll, 5000); // Recover missed events even if Realtime is unavailable.
  }
  async function stopWatching() {
    generation++; lastHeartbeat = 0;
    clearInterval(polling); polling = null;
    if (channel) await getClient()?.removeChannel(channel);
    channel = null; roomCode = null; cursor = 0;
  }
  async function refreshDiscovery() {
    if (!currentUser() || navigator.onLine === false) return;
    const { data, error } = await getClient().from('study_public_rooms').select('*').limit(100);
    if (error) { report('No se pudieron consultar las salas. Revisá la conexión o reintentá.', 'error'); return; }
    discover(data || []);
  }
  const transport = {
    connected: true,
    async create({ codigo, nombre, password, publica, config }) {
      if(!currentUser())throw new Error('Necesitás un perfil de alumno para crear salas.');
      await rpc('study_create_room', { p_code: codigo, p_name: nombre, p_password: password, p_public: publica, p_config: config });
      if (roomCode && roomCode !== codigo) await rpc('study_leave_room', { p_code: roomCode });
    },
    async join(codigo, password) {
      const result = await rpc(currentRoomUser()?.is_anonymous ? 'study_join_guest_room' : 'study_join_room', { p_code: codigo, p_password: password,...(currentRoomUser()?.is_anonymous?{p_apodo:guestAlias()}:{}) });
      if (result?.error) throw new Error(result.error);
      if (roomCode && roomCode !== codigo) await rpc('study_leave_room', { p_code: roomCode });
    },
    subscribe(topic, callback) {
      const operation = topic === 'luibanez/lobbies/discover' ? refreshDiscovery().then(() => {
        if (!discoveryTimer) discoveryTimer = setInterval(refreshDiscovery, 15000);
      }) : watch(topic.split('/').pop());
      operation.then(() => callback?.()).catch(error => { report(error.message, 'error'); callback?.(error); });
    },
    publish(topic, data) {
      if (topic === 'luibanez/lobbies/discover') return;
      const payload = typeof data === 'string' ? JSON.parse(data) : data;
      if (['INTENTO_UNION', 'LOBBY_DISCOVERY_PING', 'SALIDA_JUGADOR'].includes(payload.tipo)) return;
      const code = topic.split('/').pop();
      sendChain = sendChain.then(() => rpc('study_send_room_event', { p_code: code, p_payload: payload })).catch(error => report(`No se confirmó la acción: ${error.message}`, 'error'));
      return sendChain;
    },
    async unsubscribe(topic) {
      if (topic === 'luibanez/lobbies/discover') { clearInterval(discoveryTimer); discoveryTimer = null; return; }
      const code = topic.split('/').pop();
      await stopWatching();
      await rpc('study_leave_room', { p_code: code }).catch(error => report(error.message, 'error'));
    },
    reconnect: poll,
    once(event, callback) { if (event === 'connect') poll().then(callback); },
    async close() { clearInterval(discoveryTimer); discoveryTimer = null; await stopWatching(); }
  };
  window.addEventListener('online', poll);
  window.addEventListener('pagehide', () => transport.close(), { once: true });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') poll(); });
  return transport;
}
