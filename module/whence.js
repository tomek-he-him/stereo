import normalizeEvents from './tools/normalizeEvents';
import normalizeListener from './tools/normalizeListener';
import hookListener from './tools/hookListener';
import unhookListener from './tools/unhookListener';

export default (emit) => {
  // Hook the event cache to `.emit()`.
  let cache = {};
  emit.hooks.push((event, args) => {
    cache[event] = args;
  });

  let hook = hookListener(emit.listeners);
  let unhook = unhookListener(emit.listeners);

  return function whence(events, listener) {
    events = normalizeEvents(events);
    listener = normalizeListener(listener);

    // If any of the `events` is in the cache, trigger the listener.
    let args;
    let triggered = events.some((event) => {
      if ((args = cache[event])) {
        listener(...args);
        return true;
      }
    });

    if (triggered) {
      return this;
    }

    // Create an unhooker.
    function unhooker() {
      unhook(events, listener);
      unhook(events, unhooker);
    }

    // Hook the listener to the `events`.
    hook(events, listener);
    hook(events, unhooker);
    return this;
  };
};
