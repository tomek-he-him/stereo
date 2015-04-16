import normalizeEvents from './tools/normalizeEvents';
import normalizeListener from './tools/normalizeListener';

export default function stereo () {
  let listeners = {};

  return {
    on(events, listener) {
      // Normalize arguments.
      events = normalizeEvents(events);
      listener = normalizeListener(listener);

      // Register the listener.
      for(let event of events) {
        let register = listeners[event];
        if (!register) listeners[event] = [listener];
        else if (!register.includes(listener)) {
          register.push(listener);
        }
      }
    },

    once() {},

    off() {},

    emit() {}
  };
}
