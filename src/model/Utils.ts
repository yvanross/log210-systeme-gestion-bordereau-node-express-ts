export module Utils {
  function isFunction(func) {
    return Object.prototype.toString.call(func) === '[object Function]';
  }
}

