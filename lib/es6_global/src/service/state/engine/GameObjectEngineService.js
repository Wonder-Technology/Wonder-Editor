

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as OptionService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateEditorService$WonderEditor from "../editor/StateEditorService.js";
import * as TransformEngineService$WonderEditor from "./TransformEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "./camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";

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

var getAllChildrenTransform = GameObjectAPI$Wonderjs.getAllChildrenTransform;

var getAllGameObjects = GameObjectAPI$Wonderjs.getAllGameObjects;

function _getAllComponents(allGameObjects, param, engineState) {
  var unsafeGetComponentFunc = param[1];
  var hasComponentFunc = param[0];
  return allGameObjects.filter((function (gameObject) {
                  return Curry._2(hasComponentFunc, gameObject, engineState);
                })).map((function (gameObject) {
                return Curry._2(unsafeGetComponentFunc, gameObject, engineState);
              }));
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
              }), engineState, GameObjectAPI$Wonderjs.getAllGameObjects(gameObject, engineState));
}

function _getGameObjectActiveBasicCameraViews(gameObject, engineState) {
  return Contract$WonderLog.ensureCheck((function (activedBasicCameraViews) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("only has 0 or 1 active basicCameraView", "not"), (function () {
                              return Contract$WonderLog.Operators[/* <= */11](activedBasicCameraViews.length, 1);
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), GameObjectAPI$Wonderjs.getAllGameObjects(gameObject, engineState).filter((function (gameObject) {
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

function changeGameObjectChildOrder(sourceGameObject, targetGameObject, transformType, engineState) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("the target gameObject parent should exist", "not"), (function () {
                        return Contract$WonderLog.assertTrue(Js_option.isSome(TransformEngineService$WonderEditor.getParent(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(targetGameObject, engineState), engineState)));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var sourceTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(sourceGameObject, engineState);
  var targetTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(targetGameObject, engineState);
  var targetParentTransform = OptionService$Wonderjs.unsafeGet(TransformEngineService$WonderEditor.getParent(targetTransform, engineState));
  return TransformEngineService$WonderEditor.changeChildOrder(sourceTransform, targetTransform, targetParentTransform, transformType, engineState);
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
  getAllChildrenTransform ,
  getAllGameObjects ,
  _getAllComponents ,
  getAllBasicMaterials ,
  getAllLightMaterials ,
  getAllArcballCameraControllers ,
  getAllDirectionLights ,
  getAllPointLights ,
  initAllGameObjects ,
  _getGameObjectActiveBasicCameraViews ,
  getGameObjectActiveBasicCameraView ,
  changeGameObjectChildOrder ,
  
}
/* Log-WonderLog Not a pure module */
