import normalizeEvents from './tools/normalizeEvents';

 /**
  * @typedef  Publisher
  * @type     {Function}
  *
  * @param  {(String|String[])}  events
  *   An event or array of events.
  * @param  {...*}               args
  *   Arguments pushed to listeners.
  */

 /**
  * @typedef  Listener
  * @type     {Function}
  *
  * @param  {...*}  args
  *   Arguments received from a publisher.
  */

 /**
  * Creates a publisher
  *
  * This function is the heart of the library. Calling it with no arguments
  * creates a [publisher](#/publisher). Pass that publisher to [on](#/on),
  * [when](#/when) or any other function to register listeners on it.
  *
  * @module  {Function}  stereo/emit
  *
  * @returns  {Publisher}
  */
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
