export default (listeners) => (events, listener) => {
  events.forEach((event) => {
    let eventListeners = listeners[event];
    if (!eventListeners) listeners[event] = new Set([listener]);
    else if (!eventListeners.has(listener)) eventListeners.add(listener);
  });
};
