

import * as HashMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";

function isShaderCacheClear(engineState) {
  return HashMapService$WonderCommonlib.length(engineState[/* shaderRecord */25][/* shaderIndexMap */1]) === 0;
}

export {
  isShaderCacheClear ,
  
}
/* HashMapService-WonderCommonlib Not a pure module */
