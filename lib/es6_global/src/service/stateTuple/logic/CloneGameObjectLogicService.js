

import * as ArrayService$WonderEditor from "../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";

var getAllClonedGameObjectArr = ArrayService$WonderCommonlib.flatten;

function getClonedGameObject(clonedGameObjectArr) {
  return ArrayService$WonderEditor.unsafeGetFirst(ArrayService$WonderCommonlib.flatten(clonedGameObjectArr));
}

export {
  getAllClonedGameObjectArr ,
  getClonedGameObject ,
  
}
/* ArrayService-WonderEditor Not a pure module */
