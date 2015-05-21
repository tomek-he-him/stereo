import normalizeEvents from './tools/normalizeEvents';
import normalizeListener from './tools/normalizeListener';
import hookListener from './tools/hookListener';

export default (emit) => {
  let { listeners } = emit;
  let hook = hookListener(listeners);

  return function on(events, listener) {

    // Normalize arguments and register the listener.
    hook(
      normalizeEvents(events),
      normalizeListener(listener)
    );
    return this;
  };
};
