[![Travis – build status](https://img.shields.io/travis/tomekwi/stereo/master.svg?style=flat-square)](https://travis-ci.org/tomekwi/stereo)
 
[![Code climate](https://img.shields.io/codeclimate/github/tomekwi/stereo.svg?style=flat-square)](https://codeclimate.com/github/tomekwi/stereo)
 
[![David – status of dependencies](https://img.shields.io/david/tomekwi/stereo.svg?style=flat-square)](https://david-dm.org/tomekwi/stereo)
 
[![Code style: airbnb](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)](https://github.com/airbnb/javascript)




stereo
======

**The event emitter kit.**  
**Supports multiple channels and caching.**

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
myLibrary.emit('channel one', 'All arguments are passed on.', /Really./);
//» All arguments are passed on. /Really./

myLibrary.off('channel one');
myLibrary.emit('channel one', 'No-one’s listening anymore.');

// Boring? Don’t give up – read on!
```


### The “DIY” way

```js
import øemit from 'stereo/emit';
import øwhen from 'stereo/when';

let myLibrary = 'anything';
myLibrary.emit = øemit();
myLibrary.when = øwhen(myLibrary.emit);

// Let miracles happen!
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
