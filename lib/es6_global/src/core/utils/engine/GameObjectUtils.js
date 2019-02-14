

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as TransformEngineService$WonderEditor from "../../../service/state/engine/TransformEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../service/state/engine/MeshRendererEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/GameObjectComponentEngineService.js";

function setParentKeepOrder(parent, child, engineState) {
  return TransformEngineService$WonderEditor.setParentKeepOrder(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(parent, engineState), GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(child, engineState), engineState);
}

function getParent(child, engineState) {
  return TransformEngineService$WonderEditor.getParent(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(child, engineState), engineState);
}

function getParentGameObject(child, engineState) {
  return Js_option.map((function (parentTransform) {
                return TransformEngineService$WonderEditor.getGameObjectByTransform(parentTransform, engineState);
              }), getParent(child, engineState));
}

function addChild(parent, child, engineState) {
  return TransformEngineService$WonderEditor.setParent(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(parent, engineState), GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(child, engineState), engineState);
}

function getChildren(gameObject, engineState) {
  return TransformEngineService$WonderEditor.getChildren(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState).map((function (transform) {
                return TransformEngineService$WonderEditor.getGameObjectByTransform(transform, engineState);
              }));
}

function hasChildren(gameObject, engineState) {
  return getChildren(gameObject, engineState).length > 0;
}

function setAllGameObjectsIsRenderIfHasMeshRenderer(isRender, gameObject, engineState) {
  var _iterateGameObjectArr = function (gameObjectArr, engineState) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                  var match = GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent(gameObject, engineState);
                  var engineState$1 = match ? MeshRendererEngineService$WonderEditor.setMeshRendererIsRender(GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(gameObject, engineState), isRender, engineState) : engineState;
                  return _iterateGameObjectArr(getChildren(gameObject, engineState$1), engineState$1);
                }), engineState, gameObjectArr);
  };
  return _iterateGameObjectArr(/* array */[gameObject], engineState);
}

export {
  setParentKeepOrder ,
  getParent ,
  getParentGameObject ,
  addChild ,
  getChildren ,
  hasChildren ,
  setAllGameObjectsIsRenderIfHasMeshRenderer ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
