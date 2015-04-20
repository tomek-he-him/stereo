import normalizeEvents from './tools/normalizeEvents';
import normalizeListener from './tools/normalizeListener';

export default (emitter) => function once(events, listener) {
  let { on, off } = emitter;

  events = normalizeEvents(events);
  listener = normalizeListener(listener);

  let listenerWrapper = (...args) => {
    off(events, listenerWrapper);
    listener(...args);
  };

  on(events, listenerWrapper);
};
