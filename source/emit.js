import normalizeEvents from './tools/normalizeEvents';
import getListeners from './tools/getListeners';

export default (emitter) => function emit(events, ...args) {
  let listeners = getListeners(emitter);

  // Normalize arguments.
  events = normalizeEvents(events);

  // Dispatch listeners.
  let dispatchedListeners = new Set();
  for (let event of events) {
    let register = listeners[event];
    if (!register) continue;
    for (let listener of register) {
      if (dispatchedListeners.has(listener)) continue;
      dispatchedListeners.add(listener);
      listener(...args);
    }
  }
};
