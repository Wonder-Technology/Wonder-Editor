'use strict';


var setLocalStorage = (
  function(key, val) {
    window.localStorage[key] = val;
  }
  );

var getLocalStorage = (
  function(key) {
    return window.localStorage[key];
  }
  );

export {
  setLocalStorage ,
  getLocalStorage ,
  
}
/* setLocalStorage Not a pure module */
