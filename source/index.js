export default function stereo () {
  let listeners = {};

  return {
    on(events, listener) {
      // Normalize arguments.
      if (typeof events === 'string') events = [events];
      else if (!Array.isArray(events)) throw new TypeError(
        'stereo: The first argument to `.on()` should be `{String} event` or ' +
        '`{Array} events`.'
      );
      if (typeof listener !== 'function') throw new TypeError(
        'stereo: The second argument to `.on()` should be `{Function} '+
        'listener`.'
      );

      // Register the listener.
      for(let event of events) {
        let register = listeners[event];
        if (!register) listeners[event] = [listener];
        else if (!register.includes(listener)) {
          register.push(listener);
        }
      }
    },

    once() {},

    off() {},

    emit() {}
  };
}
