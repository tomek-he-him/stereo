import normalizeListener from './tools/normalizeListener';
import hookListener from './tools/hookListener';

export default (emit) => {
  let { listeners } = emit;
  let hook = hookListener(listeners);

  // Register an auto-throw listener.
  hook(['error'], function autoThrow(error) {

    // If no other listeners are registered, throw the `error`.
    if (listeners.error.size === 1) throw error;
  });

  return function(listener) {
    // Register the listener at the event "error".
    hook(['error'], normalizeListener(listener));
    return this;
  };
};
