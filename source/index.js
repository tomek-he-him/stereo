import normalizeEvents from './tools/normalizeEvents';
import normalizeListener from './tools/normalizeListener';

export default function stereo () {
  let listeners = {};

  let emitter = {
    on(events, listener) {
      // Normalize arguments.
      events = normalizeEvents(events);
      listener = normalizeListener(listener);

      // Register the listener.
      for (let event of events) {
        let register = listeners[event];
        if (!register) listeners[event] = new Set([listener]);
        else if (!register.has(listener)) register.add(listener);
      }
    },

    once(events, listener) {
      events = normalizeEvents(events);
      listener = normalizeListener(listener);

      function listenerWrapper (...args) {
        emitter.off(events, listenerWrapper);
        listener(...args);
      }

      emitter.on(events, listenerWrapper);
    },

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
          listeners[event].delete(listener);
        }
      }
    },

    emit(events, ...args) {
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
    }
  };

  return emitter;
}
