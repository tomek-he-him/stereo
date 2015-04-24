import øon from './on';
import øoff from './off';
import øonce from './once';
import øemit from './emit';
import øwhen from './when';
import øcatch from './catch';

export default function stereo () {
  if (arguments.length) throw new TypeError(
    'stereo: Expected no arguments.'
  );

  let emit = øemit();
  let on = øon(emit);
  let off = øoff(emit);
  let once = øonce(emit);
  let when = øwhen(emit);
  let snatch = øcatch(emit);

  return { emit, on, off, once, when, catch: snatch };
}
