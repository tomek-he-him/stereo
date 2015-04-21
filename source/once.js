import normalizeEvents from './tools/normalizeEvents';
import normalizeListener from './tools/normalizeListener';
import unhookListener from './tools/unhookListener';
import hookListener from './tools/hookListener';

export default (emit) => {
  let { listeners } = emit;
  let unhook = unhookListener(listeners);
  let hook = hookListener(listeners);

  return function once(events, listener) {
    events = normalizeEvents(events);
    listener = normalizeListener(listener);

    // Create an unhooker.
    function unhooker() {
      unhook(events, listener);
      unhook(events, unhooker);
    }

    // Hook the listener and the unhooker to every event.
    hook(events, listener);
    hook(events, unhooker);
  };
};
