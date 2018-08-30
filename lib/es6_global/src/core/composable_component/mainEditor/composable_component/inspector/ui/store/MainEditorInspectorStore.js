

import * as SparseMapService$WonderEditor from "../../../../../../../service/atom/SparseMapService.js";

function inspectorReducer(state, action) {
  return /* record */[/* showComponentMap */SparseMapService$WonderEditor.immutableSet(action[0], action[1], state[/* showComponentMap */0])];
}

export {
  inspectorReducer ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
