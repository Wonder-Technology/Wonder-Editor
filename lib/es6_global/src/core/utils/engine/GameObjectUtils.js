

import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as CameraEngineService$WonderEditor from "../../../service/state/engine/CameraEngineService.js";
import * as TransformEngineService$WonderEditor from "../../../service/state/engine/TransformEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../service/state/engine/MeshRendererEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/GameObjectComponentEngineService.js";

function setParentKeepOrder(parent, child, engineState) {
  return TransformEngineService$WonderEditor.setParentKeepOrder(GameObjectComponentEngineService$WonderEditor.getTransformComponent(parent, engineState), GameObjectComponentEngineService$WonderEditor.getTransformComponent(child, engineState), engineState);
}

function getParent(child, engineState) {
  return TransformEngineService$WonderEditor.getParent(GameObjectComponentEngineService$WonderEditor.getTransformComponent(child, engineState), engineState);
}

function addChild(parent, child, engineState) {
  return TransformEngineService$WonderEditor.setParent(GameObjectComponentEngineService$WonderEditor.getTransformComponent(parent, engineState), GameObjectComponentEngineService$WonderEditor.getTransformComponent(child, engineState), engineState);
}

function getChildren(gameObject, engineState) {
  return TransformEngineService$WonderEditor.getChildren(GameObjectComponentEngineService$WonderEditor.getTransformComponent(gameObject, engineState), engineState).map((function (transform) {
                return TransformEngineService$WonderEditor.getGameObjectByTransform(transform, engineState);
              }));
}

function hasChildren(gameObject, engineState) {
  return getChildren(gameObject, engineState).length > 0;
}

function doesSceneHasRemoveableCamera() {
  return StateLogicService$WonderEditor.getEngineStateToGetData(GameObjectComponentEngineService$WonderEditor.getAllBasicCameraViewComponents).length > 1;
}

function isGameObjectNotRemoveable(gameObject) {
  if (gameObject !== undefined) {
    var gameObject$1 = gameObject;
    var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
            return CameraEngineService$WonderEditor.hasCameraGroup(gameObject$1, param);
          }));
    if (match) {
      return !doesSceneHasRemoveableCamera(/* () */0);
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function setGameObjectIsRenderIfHasMeshRenderer(isRender, gameObject, engineState) {
  var _iterateGameObjectArr = function (gameObjectArr, engineState) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                  var match = GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent(gameObject, engineState);
                  var engineState$1 = match ? MeshRendererEngineService$WonderEditor.setMeshRendererIsRender(GameObjectComponentEngineService$WonderEditor.getMeshRendererComponent(gameObject, engineState), isRender, engineState) : engineState;
                  return _iterateGameObjectArr(getChildren(gameObject, engineState$1), engineState$1);
                }), engineState, gameObjectArr);
  };
  return _iterateGameObjectArr(/* array */[gameObject], engineState);
}

export {
  setParentKeepOrder ,
  getParent ,
  addChild ,
  getChildren ,
  hasChildren ,
  doesSceneHasRemoveableCamera ,
  isGameObjectNotRemoveable ,
  setGameObjectIsRenderIfHasMeshRenderer ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
