

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as LocalStorage$WonderEditor from "../../external/LocalStorage.js";

function getExtension(key) {
  return Js_primitive.undefined_to_opt(Curry._1(LocalStorage$WonderEditor.getLocalStorage, key));
}

function setExtension(key, value) {
  return Curry._2(LocalStorage$WonderEditor.setLocalStorage, key, value);
}

export {
  getExtension ,
  setExtension ,
  
}
/* LocalStorage-WonderEditor Not a pure module */
