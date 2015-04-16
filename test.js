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

test('Works with single-channel events.', (is) => {
  is.plan(10);

  let emitter = stereo();

  emitter.on('1', () => is.pass(
    'in the simplest case'
  ));
  emitter.emit('1');

  emitter.on('2', (has, really) => is.ok(has.passed && really,
    'when a listener has arguments'
  ));
  emitter.emit('2', {passed: true}, 'yup');

  emitter.on('3 and 4', () => is.pass(
    'when an event occurs more than once'
  ));
  emitter.emit('3 and 4');
  emitter.emit('3 and 4');

  let five = (firstCall) => is.ok(firstCall,
    'with `off` unregistering a specific listener'
  );
  emitter.on('5 and 6', five);
  emitter.emit('5 and 6', true);
  emitter.on('5 and 6', () => is.pass(
    '– really, only a specific one'
  ));
  emitter.off('5 and 6', five);
  emitter.emit('5 and 6', false);

  emitter.on('7 and 8', (firstCall) => is.ok(firstCall,
    'with `off` unregistering all listeners on a channel'
  ));
  emitter.on('7 and 8', (firstCall) => is.ok(firstCall,
    '– no matter how many'
  ));
  emitter.emit('7 and 8', true);
  emitter.off('7 and 8');
  emitter.emit('7 and 8', false);

  emitter.on('9', (has) => is.ok(has.passed,
    'passes arguments to all listeners'
  ));
  emitter.on('9', (has) => is.ok(has.passed,
    '– even if there are more of them'
  ));
  emitter.emit('9', {passed: true});

  emitter.once('10', (firstCall) => is.ok(firstCall,
    'firing listeners only once when they’re registered with `once`'
  ));
  emitter.emit('10', true);
  emitter.emit('10', false);

  is.end();
});

test.skip('Works with multi-channel events.', (is) => {
  is.end();
});

test.skip('Handles errors alright.', (is) => {
  is.end();
});
