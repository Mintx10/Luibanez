import { registerPageEvents } from './page-events.mjs';
import { initializeSession } from './session.mjs';
// Resolve the storage namespace before legacy calculators or notes read any state.
await initializeSession();
const {setupCampus}=await import('./campus/app.mjs');
setupCampus();
await import('../script.js?v=31.0.0');

registerPageEvents();
