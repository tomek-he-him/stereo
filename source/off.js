import normalizeEvents from './tools/normalizeEvents';
import normalizeListener from './tools/normalizeListener';
import getListeners from './tools/getListeners';

export default (emitter) => {
  let listeners = getListeners(emitter);

  return function off(events, listener) {

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
  };
};
