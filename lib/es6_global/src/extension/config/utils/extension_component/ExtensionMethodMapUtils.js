'use strict';

import * as HashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";

function createExtensionMap(methodExtension) {
  return methodExtension.map((function (func) {
                  return func;
                })).reduce((function (map, func) {
                return HashMapService$WonderCommonlib.set(func.name, func.value, map);
              }), HashMapService$WonderCommonlib.createEmpty(/* () */0));
}

export {
  createExtensionMap ,
  
}
/* HashMapService-WonderCommonlib Not a pure module */
