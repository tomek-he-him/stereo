let emitterProto = {
  on(event, listener) {},
  once(event, listener) {},
  off(event, listener) {},
  emit(event, listener) {}
};

export default function stereo () {
  return Object.create(emitterProto);
}
