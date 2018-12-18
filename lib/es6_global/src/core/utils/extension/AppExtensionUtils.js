

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as LocalStorage$WonderEditor from "../../external/LocalStorage.js";

function getExtension(key) {
  return Caml_option.undefined_to_opt(Curry._1(LocalStorage$WonderEditor.getLocalStorage, key));
}

function setExtension(key, value) {
  return Curry._2(LocalStorage$WonderEditor.setLocalStorage, key, value);
}

export {
  getExtension ,
  setExtension ,
  
}
/* LocalStorage-WonderEditor Not a pure module */
