import test from 'tape-catch';

import stereo from './source/index';

test('The API is in good shape.', (is) => {
  is.equal(
    typeof stereo,
    'function',
    '`stereo` is a function'
  );

  let emitter = stereo();

  is.ok(
    ['function', 'object'].includes(typeof emitter),
    '– returning an emitter'
  );

  is.equal(
    typeof emitter.on,
    'function',
    '– with the method `on`'
  );

  is.equal(
    typeof emitter.off,
    'function',
    '– with the method `off`'
  );

  is.equal(
    typeof emitter.once,
    'function',
    '– with the method `once`'
  );

  is.equal(
    typeof emitter.emit,
    'function',
    '– with the method `emit`'
  );

  is.end();
});

test.skip('Works with single-channel events.', (is) => {
  is.end();
});

test.skip('Works with multi-channel events.', (is) => {
  is.end();
});

test.skip('Handles errors alright.', (is) => {
  is.end();
});
