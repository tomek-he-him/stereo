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
  is.plan(11);

  let emitter = stereo();

  emitter.on('1', () => is.pass(
    'in the simplest case'
  ));
  emitter.emit('1');

  emitter.on('2 and 3', (has, really) => is.ok(has.passed && really,
    'when a listener has arguments'
  ));
  emitter.emit('2 and 3', {passed: true}, 'yup');

  emitter.on('4 and 5', () => is.pass(
    'when an event occurs more than once'
  ));
  emitter.emit('4 and 5');
  emitter.emit('4 and 5');

  let five = (firstCall) => is.ok(firstCall,
    '`off` unregisters a specific listener'
  );
  emitter.on('6 and 7', five);
  emitter.emit('6 and 7', true);
  emitter.on('6 and 7', () => is.pass(
    '– really, only a specific one'
  ));
  emitter.off('6 and 7', five);
  emitter.emit('6 and 7', false);

  emitter.on('8 and 9', (firstCall) => is.ok(firstCall,
    '`off` unregisters all listeners on a channel'
  ));
  emitter.on('8 and 9', (firstCall) => is.ok(firstCall,
    '– no matter how many'
  ));
  emitter.emit('8 and 9', true);
  emitter.off('8 and 9');
  emitter.emit('8 and 9', false);

  emitter.on('10', (has) => is.ok(has.passed,
    'passes arguments to all listeners'
  ));
  emitter.on('10', (has) => is.ok(has.passed,
    '– even if there are more of them'
  ));
  emitter.emit('10', {passed: true});

  emitter.once('11', (firstCall) => is.ok(firstCall,
    '`once` fires listeners only once'
  ));
  emitter.emit('11', true);
  emitter.emit('11', false);

  is.end();
});

test.skip('Works with multi-channel events.', (is) => {
  is.end();
});

test.skip('Handles errors alright.', (is) => {
  is.end();
});
