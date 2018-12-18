

import * as Log$WonderLog from "../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as LogUtils$WonderEditor from "../../src/core/utils/console/LogUtils.js";
import * as GameObjectUtils$WonderEditor from "../../src/core/utils/engine/GameObjectUtils.js";
import * as StateLogicService$WonderEditor from "../../src/service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../src/service/state/editor/scene/SceneEditorService.js";
import * as StateEngineService$WonderEditor from "../../src/service/state/engine/StateEngineService.js";
import * as AliveGameObjectMainService$Wonderjs from "../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/gameObject/AliveGameObjectMainService.js";
import * as MainEditorVboBufferTool$WonderEditor from "./MainEditorVboBufferTool.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../src/service/state/engine/GameObjectComponentEngineService.js";

var getChildren = GameObjectUtils$WonderEditor.getChildren;

function getChild(gameObject, index, engineState) {
  return GameObjectUtils$WonderEditor.getChildren(gameObject, engineState)[index];
}

function unsafeGetCurrentSceneTreeNode(param) {
  return StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
}

function clearCurrentSceneTreeNode(param) {
  return StateLogicService$WonderEditor.getAndSetEditorState(SceneEditorService$WonderEditor.clearCurrentSceneTreeNode);
}

function addFakeVboBufferForGameObject(gameObject) {
  StateEngineService$WonderEditor.setState(MainEditorVboBufferTool$WonderEditor.passBufferShouldExistCheckWhenDisposeGeometry(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                  return GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, param);
                })), StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function getCurrentSceneTreeNodeTransform(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectMaterial(param) {
  var gameObject = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(gameObject, engineState);
  if (match) {
    return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(gameObject, engineState);
  } else {
    var match$1 = GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(gameObject, engineState);
    if (match$1) {
      return GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(gameObject, engineState);
    } else {
      return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("gameObject should has material, but actual not", "", "", ""));
    }
  }
}

function getCurrentGameObjectBasicMaterial(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectLightMaterial(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectDirectionLightComponent(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetDirectionLightComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectPointLightComponent(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetPointLightComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectBasicCameraView(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectPerspectiveCamera(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectGeometry(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectArcballCamera(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectMeshRenderer(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(partial_arg, param);
              }));
}

function getCurrentSceneTreeNode(param) {
  return StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentSceneTreeNode);
}

function setCurrentSceneTreeNode(gameObject) {
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return SceneEditorService$WonderEditor.setCurrentSceneTreeNode(gameObject, param);
              }));
}

function getNewGameObjectUid($staropt$star, param) {
  var engineState = $staropt$star !== undefined ? $staropt$star : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return engineState[/* gameObjectRecord */10][/* uid */0];
}

var isAlive = AliveGameObjectMainService$Wonderjs.isAlive;

export {
  getChildren ,
  getChild ,
  unsafeGetCurrentSceneTreeNode ,
  clearCurrentSceneTreeNode ,
  addFakeVboBufferForGameObject ,
  getCurrentSceneTreeNodeTransform ,
  getCurrentGameObjectMaterial ,
  getCurrentGameObjectBasicMaterial ,
  getCurrentGameObjectLightMaterial ,
  getCurrentGameObjectDirectionLightComponent ,
  getCurrentGameObjectPointLightComponent ,
  getCurrentGameObjectBasicCameraView ,
  getCurrentGameObjectPerspectiveCamera ,
  getCurrentGameObjectGeometry ,
  getCurrentGameObjectArcballCamera ,
  getCurrentGameObjectMeshRenderer ,
  getCurrentSceneTreeNode ,
  setCurrentSceneTreeNode ,
  isAlive ,
  getNewGameObjectUid ,
  
}
/* Log-WonderLog Not a pure module */
