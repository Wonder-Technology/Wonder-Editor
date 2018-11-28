

import * as SparseMapService$WonderCommonlib from "../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function passBufferShouldExistCheckWhenDisposeGeometry(geometryIndex, state) {
  var match = state[/* vboBufferRecord */33];
  SparseMapService$WonderCommonlib.set(geometryIndex, 0, match[/* geometryVertexBufferMap */0]);
  SparseMapService$WonderCommonlib.set(geometryIndex, 0, match[/* geometryElementArrayBufferMap */3]);
  return state;
}

export {
  passBufferShouldExistCheckWhenDisposeGeometry ,
  
}
/* No side effect */
