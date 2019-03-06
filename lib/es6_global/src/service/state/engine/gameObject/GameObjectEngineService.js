

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateEditorService$WonderEditor from "../../editor/StateEditorService.js";
import * as IsRootGameObjectMainService$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/gameObject/IsRootGameObjectMainService.js";
import * as MeshRendererEngineService$WonderEditor from "../MeshRendererEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "./HierarchyGameObjectEngineService.js";

function cloneGameObject(gameObject, count, isShareMaterial, engineState) {
  var match = GameObjectAPI$Wonderjs.cloneGameObject(gameObject, count, isShareMaterial, engineState);
  return /* tuple */[
          match[1],
          match[0]
        ];
}

function setGameObjectName(name, gameObject, engineState) {
  return GameObjectAPI$Wonderjs.setGameObjectName(gameObject, name, engineState);
}

var getGameObjectIsRoot = IsRootGameObjectMainService$Wonderjs.getIsRoot;

function _getAllComponents(allGameObjects, param, engineState) {
  var unsafeGetComponentFunc = param[1];
  var hasComponentFunc = param[0];
  return ArrayService$WonderCommonlib.removeDuplicateItems(allGameObjects.filter((function (gameObject) {
                      return Curry._2(hasComponentFunc, gameObject, engineState);
                    })).map((function (gameObject) {
                    return Curry._2(unsafeGetComponentFunc, gameObject, engineState);
                  })));
}

function getAllBasicMaterials(allGameObjects, engineState) {
  return _getAllComponents(allGameObjects, /* tuple */[
              GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent,
              GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent
            ], engineState);
}

function getAllLightMaterials(allGameObjects, engineState) {
  return _getAllComponents(allGameObjects, /* tuple */[
              GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent,
              GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent
            ], engineState);
}

function getAllArcballCameraControllers(allGameObjects, engineState) {
  return _getAllComponents(allGameObjects, /* tuple */[
              GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent,
              GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent
            ], engineState);
}

function getAllDirectionLights(allGameObjects, engineState) {
  return _getAllComponents(allGameObjects, /* tuple */[
              GameObjectComponentEngineService$WonderEditor.hasDirectionLightComponent,
              GameObjectComponentEngineService$WonderEditor.unsafeGetDirectionLightComponent
            ], engineState);
}

function getAllPointLights(allGameObjects, engineState) {
  return _getAllComponents(allGameObjects, /* tuple */[
              GameObjectComponentEngineService$WonderEditor.hasPointLightComponent,
              GameObjectComponentEngineService$WonderEditor.unsafeGetPointLightComponent
            ], engineState);
}

function initAllGameObjects(gameObject, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                return GameObjectAPI$Wonderjs.initGameObject(gameObject, engineState);
              }), engineState, HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState));
}

function _getGameObjectActiveBasicCameraViews(gameObject, engineState) {
  return Contract$WonderLog.ensureCheck((function (activedBasicCameraViews) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("only has 0 or 1 active basicCameraView", "not"), (function (param) {
                              return Contract$WonderLog.Operators[/* <= */11](activedBasicCameraViews.length, 1);
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState).filter((function (gameObject) {
                        return GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(gameObject, engineState);
                      })).map((function (gameObject) {
                      return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(gameObject, engineState);
                    })).filter((function (basicCameraView) {
                    return BasicCameraViewEngineService$WonderEditor.isActiveBasicCameraView(basicCameraView, engineState);
                  })));
}

function getGameObjectActiveBasicCameraView(gameObject, engineState) {
  var activeBasicCameraViews = _getGameObjectActiveBasicCameraViews(gameObject, engineState);
  var match = activeBasicCameraViews.length === 0;
  if (match) {
    return undefined;
  } else {
    return activeBasicCameraViews[0];
  }
}

function setAllGameObjectsIsRenderIfHasMeshRenderer(isRender, gameObject, engineState) {
  var _iterateGameObjectArr = function (gameObjectArr, engineState) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, gameObject) {
                  var match = GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent(gameObject, engineState);
                  var engineState$1 = match ? MeshRendererEngineService$WonderEditor.setMeshRendererIsRender(GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(gameObject, engineState), isRender, engineState) : engineState;
                  return _iterateGameObjectArr(HierarchyGameObjectEngineService$WonderEditor.getChildren(gameObject, engineState$1), engineState$1);
                }), engineState, gameObjectArr);
  };
  return _iterateGameObjectArr(/* array */[gameObject], engineState);
}

var create = GameObjectAPI$Wonderjs.createGameObject;

var initGameObject = GameObjectAPI$Wonderjs.initGameObject;

var isGameObjectAlive = GameObjectAPI$Wonderjs.isGameObjectAlive;

var disposeGameObject = GameObjectAPI$Wonderjs.disposeGameObject;

var disposeGameObjectKeepOrder = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrder;

var disposeGameObjectKeepOrderRemoveGeometry = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrderRemoveGeometry;

var disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial = GameObjectAPI$Wonderjs.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial;

var disposeGameObjectDisposeGeometryRemoveMaterial = GameObjectAPI$Wonderjs.disposeGameObjectDisposeGeometryRemoveMaterial;

var getGameObjectName = GameObjectAPI$Wonderjs.getGameObjectName;

var unsafeGetGameObjectName = GameObjectAPI$Wonderjs.unsafeGetGameObjectName;

var unsafeGetGameObjectIsRoot = GameObjectAPI$Wonderjs.unsafeGetGameObjectIsRoot;

var setGameObjectIsRoot = GameObjectAPI$Wonderjs.setGameObjectIsRoot;

export {
  create ,
  initGameObject ,
  isGameObjectAlive ,
  disposeGameObject ,
  cloneGameObject ,
  disposeGameObjectKeepOrder ,
  disposeGameObjectKeepOrderRemoveGeometry ,
  disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial ,
  disposeGameObjectDisposeGeometryRemoveMaterial ,
  getGameObjectName ,
  unsafeGetGameObjectName ,
  setGameObjectName ,
  getGameObjectIsRoot ,
  unsafeGetGameObjectIsRoot ,
  setGameObjectIsRoot ,
  _getAllComponents ,
  getAllBasicMaterials ,
  getAllLightMaterials ,
  getAllArcballCameraControllers ,
  getAllDirectionLights ,
  getAllPointLights ,
  initAllGameObjects ,
  _getGameObjectActiveBasicCameraViews ,
  getGameObjectActiveBasicCameraView ,
  setAllGameObjectsIsRenderIfHasMeshRenderer ,
  
}
/* Log-WonderLog Not a pure module */
