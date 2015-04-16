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
    '`off` unregisters a specific listener'
  );
  emitter.on('5 and 6', five);
  emitter.emit('5 and 6', true);
  emitter.on('5 and 6', () => is.pass(
    '– really, only a specific one'
  ));
  emitter.off('5 and 6', five);
  emitter.emit('5 and 6', false);

  emitter.on('7 and 8', (firstCall) => is.ok(firstCall,
    '`off` unregisters all listeners on a channel'
  ));
  emitter.on('7 and 8', (firstCall) => is.ok(firstCall,
    '– no matter how many'
  ));
  emitter.emit('7 and 8', true);
  emitter.off('7 and 8');
  emitter.emit('7 and 8', false);

  emitter.on('9 and 10', (has) => is.ok(has.passed,
    'passes arguments to all listeners'
  ));
  emitter.on('9 and 10', (has) => is.ok(has.passed,
    '– even if there are more of them'
  ));
  emitter.emit('9 and 10', {passed: true});

  emitter.once('11', (firstCall) => is.ok(firstCall,
    '`once` fires listeners only once'
  ));
  emitter.emit('11', true);
  emitter.emit('11', false);

  is.end();
});

test('Works with multi-channel events.', (is) => {
  is.plan(11);

  let emitter = stereo();

  emitter.on(['1', '1.5'], () => is.pass(
    '`on` listens on multiple channels'
  ));
  emitter.emit('1.5');

  emitter.on('2', () => is.pass(
    '`emit` emits an event on multiple channels'
  ));
  emitter.emit(['2', '2.33']);

  emitter.on('3', (has, really) => is.ok(has.passed && really,
    'all arguments are still passed on to the listener'
  ));
  emitter.emit(['3', '3.7'], {passed: true}, 'yup');

  let counter4 = 0;
  emitter.on(['4', '4.7'], () => is.equal(++counter4, 1,
    'the listener is fired once when it receives the same event on multiple ' +
    'channels'
  ));
  emitter.emit(['4', '4.7']);

  let five = 0;
  emitter.on('5', () => is.equal(++five, 1,
    '– or the same event multiple times on one channel'
  ));
  emitter.emit(['5', '5']);

  let six = 0;
  emitter.on(['6 and 7', '6 and 7.6'], () => is.ok(++six <= 2,
    'and multiple times when it receives multiple different events ' +
    `(${six} of 2)`
  ));
  emitter.emit('6 and 7');
  emitter.emit('6 and 7.6');

  let eightCounter = 0;
  let eight = () => is.ok(++eightCounter <= 2,
    (eightCounter === 1 ?
      '`off` unregisters a specific listener from specific channels' :
      '– really, only from specific channels'
    )
  );
  emitter.on(['8-10', '8-10.1'], eight);
  emitter.emit(['8-10', '8-10.1']);
  emitter.on('8-10', () => is.pass(
    '– really, only a specific listener'
  ));
  emitter.off('8-10', eight);
  emitter.emit('8-10');
  emitter.emit('8-10.1');

  let eleven = 0;
  emitter.once(['11', '11.234'], () => is.equal(++eleven, 1,
    '`once` fires a listener only once, on any of the registered channels'
  ));
  emitter.emit('11');
  emitter.emit('11.234');
  emitter.emit('11');

  is.end();
});

test.skip('Handles errors alright.', (is) => {
  is.end();
});
