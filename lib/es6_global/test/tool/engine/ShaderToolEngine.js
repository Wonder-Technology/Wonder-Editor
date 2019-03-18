

import * as MutableHashMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

function isInitShaderCacheClear(engineState) {
  return MutableHashMapService$WonderCommonlib.length(engineState[/* shaderRecord */25][/* shaderLibShaderIndexMap */2]) === 0;
}

export {
  isInitShaderCacheClear ,
  
}
/* No side effect */
