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
      for (let event of events) {
        let register = listeners[event];
        if (!register) listeners[event] = [listener];
        else if (!register.includes(listener)) {
          register.push(listener);
        }
      }
    },

    once() {},

    off(events, listener) {
      // Normalize arguments.
      events = normalizeEvents(events);

      // If no listener is specified, unregister all listeners.
      if (listener == null) for (let event of events) {
        delete listeners[event];
      }

      // Otherwise unregister the given listener.
      else {
        listener = normalizeListener(listener);

        for (let event of events) {
          let register = listeners[event];
          let index = register.indexOf(listener);
          if (index !== -1) register.splice(index, 1);
        }
      }
    },

    emit(events, ...args) {
      // Normalize arguments.
      events = normalizeEvents(events);

      // Dispatch listeners.
      for (let event of events) {
        let register = listeners[event];
        if (register) for (let listener of register) {
          listener(...args);
        }
      }
    }
  };
}
