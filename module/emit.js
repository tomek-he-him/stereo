import normalizeEvents from './tools/normalizeEvents';

export default () => {
  let listeners = {};
  let hooks = [];

  function emit(events, ...args) {

    // Normalize arguments.
    events = normalizeEvents(events);

    // For every event,
    let dispatchedListeners = new Set();
    for (let event of events) {

      // - dispatch hooks
      hooks.forEach((hook) => hook(event, args));

      // - dispatch listeners
      let eventListeners = listeners[event];
      if (!eventListeners) continue;
      for (let listener of eventListeners) {
        if (dispatchedListeners.has(listener)) continue;
        dispatchedListeners.add(listener);
        listener(...args);
      }
    }
  }

  // Export listeners an hooks.
  emit.listeners = listeners;
  emit.hooks = hooks;
  return emit;
};
