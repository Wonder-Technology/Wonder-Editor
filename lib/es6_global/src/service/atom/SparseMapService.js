'use strict';

import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function immutableSet(key, value, map) {
  return SparseMapService$WonderCommonlib.set(key, value, map.slice());
}

function copy(prim) {
  return prim.slice();
}

export {
  immutableSet ,
  copy         ,
  
}
/* No side effect */
