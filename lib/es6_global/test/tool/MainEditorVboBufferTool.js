

import * as ImmutableSparseMapService$WonderCommonlib from "../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

function passBufferShouldExistCheckWhenDisposeGeometry(geometryIndex, state) {
  var match = state[/* vboBufferRecord */33];
  ImmutableSparseMapService$WonderCommonlib.set(geometryIndex, 0, match[/* geometryVertexBufferMap */0]);
  ImmutableSparseMapService$WonderCommonlib.set(geometryIndex, 0, match[/* geometryElementArrayBufferMap */3]);
  return state;
}

export {
  passBufferShouldExistCheckWhenDisposeGeometry ,
  
}
/* No side effect */
