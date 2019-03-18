

import * as ArrayService$WonderEditor from "../../src/service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

function getAllGameObjectMeshRendererComponent(gameObject, engineState) {
  var _iterateGameObjectArr = function (gameObjectArr, resultArr) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (resultArr, gameObject) {
                  var match = GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent(gameObject, engineState);
                  var resultArr$1 = match ? ArrayService$WonderEditor.push(GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(gameObject, engineState), resultArr) : resultArr;
                  return _iterateGameObjectArr(HierarchyGameObjectEngineService$WonderEditor.getChildren(gameObject, engineState), resultArr$1);
                }), resultArr, gameObjectArr);
  };
  return _iterateGameObjectArr(/* array */[gameObject], /* array */[]);
}

export {
  getAllGameObjectMeshRendererComponent ,
  
}
/* ArrayService-WonderEditor Not a pure module */
