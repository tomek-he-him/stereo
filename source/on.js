import normalizeEvents from './tools/normalizeEvents';
import normalizeListener from './tools/normalizeListener';

export default (emit) => {
  let { listeners } = emit;

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
