export module Utils {
  function isFunction(func) {
    return Object.prototype.toString.call(func) === '[object Function]';
  }

  /**
  * This function converts an array to hash map
  * @param {String | function} key describes the key to be evaluated in each object to use as key for hashmap
  * @returns Object
  * @Example 
  *      [{id:123, name:'naveen'}, {id:345, name:"kumar"}].toHashMap("id")
  *      Returns :- Object {123: Object, 345: Object}
  *
  *      [{id:123, name:'naveen'}, {id:345, name:"kumar"}].toHashMap(function(obj){return obj.id+1})
  *      Returns :- Object {124: Object, 346: Object}
  */
  Array.prototype.toHashMap = function (key) {
    var _hashMap = {}, getKey = isFunction(key) ? key : function (_obj) { return _obj[key]; };
    this.forEach(function (obj) {
      _hashMap[getKey(obj)] = obj;
    });
    return _hashMap;
  };
}

