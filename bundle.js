(function () {
'use strict';

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var offset = 0;
var interval = null;

var settings = {
    speed: 100,
    maxOffset: 400
};

var parseHash = function parseHash() {
    var hash = window.location.hash;
    if (!hash) {
        return;
    }

    hash = hash.substr(1);

    hash.split('&').forEach(function (pair) {
        var _pair$split = pair.split('='),
            _pair$split2 = slicedToArray(_pair$split, 2),
            key = _pair$split2[0],
            value = _pair$split2[1];

        settings[key] = value;
    });
};

parseHash();

console.log('Settings', settings);

var cursorLeft = document.querySelector('.cursor-left');
var cursorRight = document.querySelector('.cursor-right');

function moveCursors(x) {
    cursorLeft.style.cssText = 'left: calc(50% - ' + x + 'px - 75px)';
    cursorRight.style.cssText = 'left: calc(50% + ' + x + 'px - 75px)';
    cursorLeft.innerHTML = x;
    cursorRight.innerHTML = x;
}

function restart() {
    offset = 0;
    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(function () {
        if (settings.maxOffset && offset >= settings.maxOffset) {
            clearInterval(interval);
        }

        console.info('Moving cursor to', offset, 'from center', 'offset:', offset);
        moveCursors(++offset);
    }, settings.speed);
}

console.log('Api');
console.log('window.setSpeed(speed)', 'speed: in ms to itterate');
console.log('window.setMaxOffset(num)', 'num: max itterations');
console.log('window.restart()', 'restarts the thing');
console.log('Starting in 5s');
setTimeout(function () {
    restart();
}, 5000);

window.restart = restart;
window.setSpeed = function (s) {
    settings.speed = s;
    restart();
};

window.setMaxOffset = function (m) {
    if (m > 1) {
        settings.maxOffset = m;
    }
    restart();
};

}());
