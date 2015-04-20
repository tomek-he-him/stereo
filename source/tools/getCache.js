export default function getCache(emitter) {
  return (emitter.stereo || (emitter.stereo = {}))
    .cache || (emitter.stereo.cache = {})
  ;
}
