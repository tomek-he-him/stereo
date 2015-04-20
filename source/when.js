import normalizeEvents from './tools/normalizeEvents';
import normalizeListener from './tools/normalizeListener';
import getCache from './tools/getCache';

export default (emitter) => {
  let cache = getCache(emitter);

  return function when(events, listener) {
    let { on } = emitter;
    events = normalizeEvents(events);
    listener = normalizeListener(listener);

    // If any of the `events` is in the cache, trigger the listener.
    let eventCache;
    for (let event of events) if ((eventCache = cache[event])) {
      listener(eventCache.latest);
      break;
    }

    // Register through `on`.
    on(events, listener);
  };
};
