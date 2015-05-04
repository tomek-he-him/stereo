[![Coveralls – test coverage
](https://img.shields.io/coveralls/tomekwi/stereo.svg?style=flat-square)
](https://coveralls.io/r/tomekwi/stereo)
 [![Travis – build status
](https://img.shields.io/travis/tomekwi/stereo/master.svg?style=flat-square)
](https://travis-ci.org/tomekwi/stereo)
 [![David – status of dependencies
](https://img.shields.io/david/tomekwi/stereo.svg?style=flat-square)
](https://david-dm.org/tomekwi/stereo)
 [![Code style: airbnb
](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)
](https://github.com/airbnb/javascript)




stereo
======

**The event emitter power kit.**  
**Supports multiple channels**  
**and promise-like caching.**

[*“EventEmitter compared to RxJS is analogous to roller blades versus cars.”*](http://futurice.com/blog/reactive-mvc-and-the-virtual-dom/) This is a super-lightweight “build your own car” kit.

 

 

*stereo* is a super-lightweight alternative to RXjs. A collection of micro modules you can mix, match and extend.

Create your own slim and powerful event emitter.

*Note: I’m very tied up with work at the moment. I’m using this library in my own projects, but I still need a while to document it, do coverage reports, changelog and the marketing :) [Ideas and questions are very welcome](http://github.com/tomekwi/stereo/issues).*




Installation
------------

```sh
$ npm install stereo
```




Usage
-----


### The “batteries included” way

```js
import ø from 'stereo';

let myLibrary = 'anything';
Object.assign(myLibrary, ø());

myLibrary.on('channel one', console.log.bind(console));
myLibrary.emit('channel one', 'All arguments are passed on.', /Not kiddin'/);
//» All arguments are passed on. /Not kiddin'/

myLibrary.off('channel one');
myLibrary.emit('channel one', 'No-one’s listening anymore.');

// Boring? Don’t give up – read on!
```


### The “DIY” way

```js
import øEmit from 'stereo/emit';
import øWhen from 'stereo/when';

let myLibrary = 'anything';
myLibrary.emit = øEmit();
myLibrary.when = øWhen(myLibrary.emit);

// Miracles happen!

myLibrary.emit('channel one', 'Yay, this has been cached!');

// Time goes by...
myLibrary.when(
  ['channel one', 'channel two'],
  console.log.bind(console)
);
//» Yay, this has been cached!

myLibrary.emit(
  ['channel one', 'channel two', 'channel three']
  'This is called http://j.mp/demultiplexing .'
);
//» This is called http://j.mp/demultiplexing .
```




License
-------

[MIT][] © [Tomek Wiszniewski][]

[MIT]: ./License.md
[Tomek Wiszniewski]: https://github.com/tomekwi
