export default function normalizeEvents(events) {
  if (typeof events === 'string') return [events];

  if (!Array.isArray(events)) throw new TypeError(
    'stereo: Expected `{String} event` or `{Array} events`.'
  );

  return events;
}
