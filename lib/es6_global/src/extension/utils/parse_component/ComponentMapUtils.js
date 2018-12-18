

import * as HashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";

function createComponentMap(param) {
  return HashMapService$WonderCommonlib.createEmpty(/* () */0);
}

function addExtensionMap(componentMap, extensionName, extensionMap) {
  return HashMapService$WonderCommonlib.set(extensionName, extensionMap, componentMap);
}

export {
  createComponentMap ,
  addExtensionMap ,
  
}
/* No side effect */
