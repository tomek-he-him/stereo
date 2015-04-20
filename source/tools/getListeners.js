export default function getListeners(emitter) {
  return (emitter.stereo || (emitter.stereo = {}))
    .listeners || (emitter.stereo.listeners = new Set())
  ;
}
