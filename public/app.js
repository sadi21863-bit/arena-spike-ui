(function (global) {
  'use strict';

  function increment(current) {
    return current + 1;
  }

  function formatCount(count) {
    return count === 1 ? '1 press' : count + ' presses';
  }

  var api = {
    increment: increment,
    formatCount: formatCount
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    global.pressCounter = api;
  }
})(typeof self !== 'undefined' ? self : this);
