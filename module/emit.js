import normalizeEvents from './tools/normalizeEvents';

export default () => {
  let listeners = {};
  let hooks = [];

  function emit(events, ...args) {

    // Normalize arguments.
    events = normalizeEvents(events);

    // For every event,
    let dispatchedListeners = new Set();
    events.forEach((event) => {

      // - dispatch hooks
      hooks.forEach((hook) => hook(event, args));

      // - dispatch listeners
      let eventListeners = listeners[event];
      if (!eventListeners) return;
      eventListeners.forEach((listener) => {
        if (dispatchedListeners.has(listener)) return;
        dispatchedListeners.add(listener);
        listener(...args);
      });
    });
    return this;
  }

  // Export listeners an hooks.
  emit.listeners = listeners;
  emit.hooks = hooks;
  return emit;
};
