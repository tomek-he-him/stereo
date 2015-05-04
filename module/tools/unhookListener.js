export default (listeners) => (events, listener) => {
  events.forEach((event) => {
    listeners[event].delete(listener);
  });
};
