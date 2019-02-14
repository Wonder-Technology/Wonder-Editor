

import * as MutableHashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

function createComponentMap() {
  return MutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
}

function addExtensionMap(componentMap, extensionName, extensionMap) {
  return MutableHashMapService$WonderCommonlib.set(extensionName, extensionMap, componentMap);
}

export {
  createComponentMap ,
  addExtensionMap ,
  
}
/* MutableHashMapService-WonderCommonlib Not a pure module */
