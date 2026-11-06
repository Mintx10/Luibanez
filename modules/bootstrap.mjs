import { registerPageEvents } from './page-events.mjs';
import { initializeSession } from './session.mjs';
// Resolve the storage namespace before legacy calculators or notes read any state.
await initializeSession();
await import('../script.js?v=30.1.0');

registerPageEvents();
