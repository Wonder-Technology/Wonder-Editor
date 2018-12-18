

import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectEngineService$WonderEditor from "../../state/engine/GameObjectEngineService.js";

function cloneGameObject(gameObject, count, isShareMaterial, engineState) {
  var match = GameObjectEngineService$WonderEditor.cloneGameObject(gameObject, count, isShareMaterial, engineState);
  return /* tuple */[
          match[1],
          match[0]
        ];
}

var getFlattenClonedGameObjectArr = ArrayService$WonderCommonlib.flatten;

export {
  cloneGameObject ,
  getFlattenClonedGameObjectArr ,
  
}
/* GameObjectEngineService-WonderEditor Not a pure module */
