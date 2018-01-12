'use strict';

import * as HashMapSystem$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapSystem.js";

function createComponentMap() {
  return HashMapSystem$WonderCommonlib.createEmpty(/* () */0);
}

function addExtensionMap(componentMap, extensionName, extensionMap) {
  return HashMapSystem$WonderCommonlib.set(extensionName, extensionMap, componentMap);
}

export {
  createComponentMap ,
  addExtensionMap    ,
  
}
/* HashMapSystem-WonderCommonlib Not a pure module */
