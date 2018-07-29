

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as HashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";

function createExtensionMap(methodExtension) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (map, func) {
                return HashMapService$WonderCommonlib.set(func.name, func.value, map);
              }), HashMapService$WonderCommonlib.createEmpty(/* () */0), methodExtension.map((function (func) {
                    return func;
                  })));
}

export {
  createExtensionMap ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
