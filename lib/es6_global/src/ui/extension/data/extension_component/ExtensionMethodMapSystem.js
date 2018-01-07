'use strict';

import * as HashMapSystem$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapSystem.js";

function createExtensionMap(methodExtension) {
  return methodExtension.map((function (func) {
                  return func;
                })).reduce((function (map, func) {
                return HashMapSystem$WonderCommonlib.set(func.name, func.value, map);
              }), HashMapSystem$WonderCommonlib.createEmpty(/* () */0));
}

export {
  createExtensionMap ,
  
}
/* HashMapSystem-WonderCommonlib Not a pure module */
