import normalizeEvents from './tools/normalizeEvents';
import normalizeListener from './tools/normalizeListener';
import getListeners from './tools/getListeners';

export default (emitter) => {
  let listeners = getListeners(emitter);

  return function on(events, listener) {

    // Normalize arguments.
    events = normalizeEvents(events);
    listener = normalizeListener(listener);

    // Register the listener.
    for (let event of events) {
      let register = listeners[event];
      if (!register) listeners[event] = new Set([listener]);
      else if (!register.has(listener)) register.add(listener);
    }
  };
};
