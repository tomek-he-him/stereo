export default (listeners) => (events, listener) => {
  for (let event of events) {
    listeners[event].delete(listener);
  }
};
