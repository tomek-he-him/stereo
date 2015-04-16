export default function normalizeListener(listener) {
  if (typeof listener !== 'function') throw new TypeError(
    'stereo: Expected `{Function} listener`.'
  );

  return listener;
}
