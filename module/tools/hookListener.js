export default (listeners) => (events, listener) => {
  for (let event of events) {
    let eventListeners = listeners[event];
    if (!eventListeners) listeners[event] = new Set([listener]);
    else if (!eventListeners.has(listener)) eventListeners.add(listener);
  }
};
