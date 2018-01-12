'use strict';

import * as Curry                     from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as LocalStorage$WonderEditor from "../../external/LocalStorage.js";

function getText(key) {
  return Curry._1(LocalStorage$WonderEditor.getLocalStorage, key);
}

function setText(key, value) {
  return Curry._2(LocalStorage$WonderEditor.setLocalStorage, key, value);
}

export {
  getText ,
  setText ,
  
}
/* LocalStorage-WonderEditor Not a pure module */
