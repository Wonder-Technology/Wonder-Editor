

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";

var _setLocalStorage = (
    function(key, val) {
      window.localStorage[key] = val;
    }
  );

var _getLocalStorage = (
    function(key) {
      return window.localStorage[key];
    }
  );

function getValue(key) {
  return Caml_option.undefined_to_opt(Curry._1(_getLocalStorage, key));
}

var setValue = Curry.__2(_setLocalStorage);

export {
  _setLocalStorage ,
  _getLocalStorage ,
  getValue ,
  setValue ,
  
}
/* _setLocalStorage Not a pure module */
