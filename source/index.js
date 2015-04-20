import normalizeEvents from './tools/normalizeEvents';
import normalizeListener from './tools/normalizeListener';
import _on from './on';
import _off from './off';
import _once from './once';
import _emit from './emit';
import _when from './when';

export default function stereo () {
  if (arguments.length) throw new TypeError(
    'stereo: Expected no arguments.'
  );

  let listeners = {};

  let emitter = { listeners };
  emitter.on = _on(emitter);
  emitter.off = _off(emitter);
  emitter.once = _once(emitter);
  emitter.emit = _emit(emitter);
  emitter.when = _when(emitter);

  return emitter;
}
