'use strict';

var Log$WonderLog = require("wonder-log/lib/js/src/Log.js");
var LogUtils$WonderEditor = require("../../src/core/utils/console/LogUtils.js");
var ArrayService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ArrayService.js");
var StateLogicService$WonderEditor = require("../../src/service/stateTuple/logic/StateLogicService.js");
var StateEngineService$WonderEditor = require("../../src/service/state/engine/state/StateEngineService.js");
var AliveGameObjectMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/gameObject/AliveGameObjectMainService.js");
var SceneTreeEditorService$WonderEditor = require("../../src/service/state/editor/sceneTree/SceneTreeEditorService.js");
var MainEditorVboBufferTool$WonderEditor = require("./MainEditorVboBufferTool.js");
var GameObjectComponentEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");

var getChildren = HierarchyGameObjectEngineService$WonderEditor.getChildren;

function getChild(gameObject, index, engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getChildren(gameObject, engineState)[index];
}

function hasTargetChildren(gameObject, targetChildren, engineState) {
  var children = HierarchyGameObjectEngineService$WonderEditor.getChildren(gameObject, engineState);
  return ArrayService$WonderCommonlib.reduceOneParam((function (has, targetChild) {
                if (has) {
                  return true;
                } else {
                  return children.includes(targetChild);
                }
              }), false, targetChildren);
}

function unsafeGetCurrentSceneTreeNode(param) {
  return StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
}

function clearCurrentSceneTreeNode(param) {
  return StateLogicService$WonderEditor.getAndSetEditorState(SceneTreeEditorService$WonderEditor.clearCurrentSceneTreeNode);
}

function addFakeVboBufferForGameObject(gameObject) {
  StateEngineService$WonderEditor.setState(MainEditorVboBufferTool$WonderEditor.passBufferShouldExistCheckWhenDisposeGeometry(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                  return GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, param);
                })), StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function getCurrentSceneTreeNodeTransform(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(partial_arg, param);
              }));
}

function getCurrentSceneTreeNodeMaterial(param) {
  var gameObject = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
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

function getCurrentSceneTreeNodeBasicMaterial(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(partial_arg, param);
              }));
}

function getCurrentSceneTreeNodeLightMaterial(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(partial_arg, param);
              }));
}

function getCurrentSceneTreeNodeDirectionLightComponent(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetDirectionLightComponent(partial_arg, param);
              }));
}

function getCurrentSceneTreeNodePointLightComponent(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetPointLightComponent(partial_arg, param);
              }));
}

function getCurrentSceneTreeNodeBasicCameraView(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(partial_arg, param);
              }));
}

function getCurrentSceneTreeNodePerspectiveCamera(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(partial_arg, param);
              }));
}

function getCurrentSceneTreeNodeGeometry(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(partial_arg, param);
              }));
}

function getCurrentSceneTreeNodeFlyCamera(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetFlyCameraControllerComponent(partial_arg, param);
              }));
}

function getCurrentSceneTreeNodeArcballCamera(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(partial_arg, param);
              }));
}

function getCurrentSceneTreeNodeMeshRenderer(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(partial_arg, param);
              }));
}

function getCurrentSceneTreeNodeScript(param) {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetScriptComponent(partial_arg, param);
              }));
}

function getCurrentSceneTreeNode(param) {
  return StateLogicService$WonderEditor.getEditorState(SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode);
}

function setCurrentSceneTreeNode(gameObject) {
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return SceneTreeEditorService$WonderEditor.setCurrentSceneTreeNode(gameObject, param);
              }));
}

function getNewGameObject($staropt$star, param) {
  var engineState = $staropt$star !== undefined ? $staropt$star : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return engineState[/* gameObjectRecord */10][/* uid */0];
}

var addChild = HierarchyGameObjectEngineService$WonderEditor.addChild;

var isAlive = AliveGameObjectMainService$Wonderjs.isAlive;

exports.addChild = addChild;
exports.getChildren = getChildren;
exports.getChild = getChild;
exports.hasTargetChildren = hasTargetChildren;
exports.unsafeGetCurrentSceneTreeNode = unsafeGetCurrentSceneTreeNode;
exports.clearCurrentSceneTreeNode = clearCurrentSceneTreeNode;
exports.addFakeVboBufferForGameObject = addFakeVboBufferForGameObject;
exports.getCurrentSceneTreeNodeTransform = getCurrentSceneTreeNodeTransform;
exports.getCurrentSceneTreeNodeMaterial = getCurrentSceneTreeNodeMaterial;
exports.getCurrentSceneTreeNodeBasicMaterial = getCurrentSceneTreeNodeBasicMaterial;
exports.getCurrentSceneTreeNodeLightMaterial = getCurrentSceneTreeNodeLightMaterial;
exports.getCurrentSceneTreeNodeDirectionLightComponent = getCurrentSceneTreeNodeDirectionLightComponent;
exports.getCurrentSceneTreeNodePointLightComponent = getCurrentSceneTreeNodePointLightComponent;
exports.getCurrentSceneTreeNodeBasicCameraView = getCurrentSceneTreeNodeBasicCameraView;
exports.getCurrentSceneTreeNodePerspectiveCamera = getCurrentSceneTreeNodePerspectiveCamera;
exports.getCurrentSceneTreeNodeGeometry = getCurrentSceneTreeNodeGeometry;
exports.getCurrentSceneTreeNodeFlyCamera = getCurrentSceneTreeNodeFlyCamera;
exports.getCurrentSceneTreeNodeArcballCamera = getCurrentSceneTreeNodeArcballCamera;
exports.getCurrentSceneTreeNodeMeshRenderer = getCurrentSceneTreeNodeMeshRenderer;
exports.getCurrentSceneTreeNodeScript = getCurrentSceneTreeNodeScript;
exports.getCurrentSceneTreeNode = getCurrentSceneTreeNode;
exports.setCurrentSceneTreeNode = setCurrentSceneTreeNode;
exports.isAlive = isAlive;
exports.getNewGameObject = getNewGameObject;
/* Log-WonderLog Not a pure module */
