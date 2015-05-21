import normalizeEvents from './tools/normalizeEvents';
import normalizeListener from './tools/normalizeListener';
import unhookListener from './tools/unhookListener';

export default (emit) => {
  let { listeners } = emit;
  let unhook = unhookListener(listeners);

  return function off(events, listener) {

    // Normalize arguments.
    events = normalizeEvents(events);

    // If no listener is specified, unregister all listeners.
    if (listener == null) events.forEach((event) => {
      delete listeners[event];
    });

    // Otherwise unregister the given listener.
    else {
      unhook(events, normalizeListener(listener));
    }
    return this;
  };
};
