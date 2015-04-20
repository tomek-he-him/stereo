import normalizeEvents from './tools/normalizeEvents';
import getListeners from './tools/getListeners';
import getCache from './tools/getCache';

export default (emitter) => {
  let listeners = getListeners(emitter);
  let cache = getCache(emitter);

  return function emit(events, ...args) {

    // Normalize arguments.
    events = normalizeEvents(events);

    // For every event,
    let dispatchedListeners = new Set();
    for (let event of events) {

      // - dispatch listeners
      let register = listeners[event];
      if (!register) continue;
      for (let listener of register) {
        if (dispatchedListeners.has(listener)) continue;
        dispatchedListeners.add(listener);
        listener(...args);
      }

      // - cache the event as latest
      cache[event] = { latest: args };
    }
  };
};
