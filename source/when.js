import normalizeEvents from './tools/normalizeEvents';
import normalizeListener from './tools/normalizeListener';
import hookListener from './tools/hookListener';

export default (emit) => {
  // Hook the event cache to `.emit()`.
  let cache = {};
  emit.hooks.push((event, args) => {
    cache[event] = args;
  });

  let hook = hookListener(emit.listeners);

  return function when(events, listener) {
    events = normalizeEvents(events);
    listener = normalizeListener(listener);

    // If any of the `events` is in the cache, trigger the listener.
    let args;
    for (let event of events) if ((args = cache[event])) {
      listener(...args);
      break;
    }

    // Hook the listener to the `events`.
    hook(events, listener);
  };
};
