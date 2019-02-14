

import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

function createExtensionMap(methodExtension) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (map, func) {
                return MutableHashMapService$WonderCommonlib.set(func.name, func.value, map);
              }), MutableHashMapService$WonderCommonlib.createEmpty(/* () */0), methodExtension.map((function (func) {
                    return func;
                  })));
}

export {
  createExtensionMap ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
