

import * as GameObjectUtils$WonderEditor from "../../src/core/utils/engine/GameObjectUtils.js";
import * as StateLogicService$WonderEditor from "../../src/service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../src/service/state/editor/scene/SceneEditorService.js";
import * as AliveGameObjectMainService$Wonderjs from "../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/gameObject/AliveGameObjectMainService.js";
import * as MainEditorVboBufferTool$WonderEditor from "./MainEditorVboBufferTool.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../src/service/state/engine/GameObjectComponentEngineService.js";

function getChildren(gameObject) {
  return GameObjectUtils$WonderEditor.getChildren(gameObject, StateLogicService$WonderEditor.getRunEngineState(/* () */0));
}

function getEditEngineChildren(gameObject) {
  return GameObjectUtils$WonderEditor.getChildren(gameObject, StateLogicService$WonderEditor.getEditEngineState(/* () */0));
}

function unsafeGetCurrentSceneTreeNode() {
  return StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
}

function clearCurrentSceneTreeNode() {
  return StateLogicService$WonderEditor.getAndSetEditorState(SceneEditorService$WonderEditor.clearCurrentSceneTreeNode);
}

function addFakeVboBufferForGameObject(gameObject) {
  StateLogicService$WonderEditor.setEditEngineState(MainEditorVboBufferTool$WonderEditor.passBufferShouldExistCheckWhenDisposeGeometry(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                  return GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, param);
                })), StateLogicService$WonderEditor.getEditEngineState(/* () */0)));
  StateLogicService$WonderEditor.setRunEngineState(MainEditorVboBufferTool$WonderEditor.passBufferShouldExistCheckWhenDisposeGeometry(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                  return GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, param);
                })), StateLogicService$WonderEditor.getRunEngineState(/* () */0)));
  return /* () */0;
}

function getCurrentSceneTreeNodeTransform() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.getTransformComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectBasicMaterial() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.getBasicMaterialComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectLightMaterial() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.getLightMaterialComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectDirectionLightComponent() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.getDirectionLightComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectPointLightComponent() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.getPointLightComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectPerspectiveCamera() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.getPerspectiveCameraProjectionComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectGeometry() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectArcballCamera() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectMeshRenderer() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.getMeshRendererComponent(partial_arg, param);
              }));
}

function getCurrentSceneTreeNode() {
  return StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentSceneTreeNode);
}

function setCurrentSceneTreeNode(gameObject) {
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return SceneEditorService$WonderEditor.setCurrentSceneTreeNode(gameObject, param);
              }));
}

var isAlive = AliveGameObjectMainService$Wonderjs.isAlive;

export {
  getChildren ,
  getEditEngineChildren ,
  unsafeGetCurrentSceneTreeNode ,
  clearCurrentSceneTreeNode ,
  addFakeVboBufferForGameObject ,
  getCurrentSceneTreeNodeTransform ,
  getCurrentGameObjectBasicMaterial ,
  getCurrentGameObjectLightMaterial ,
  getCurrentGameObjectDirectionLightComponent ,
  getCurrentGameObjectPointLightComponent ,
  getCurrentGameObjectPerspectiveCamera ,
  getCurrentGameObjectGeometry ,
  getCurrentGameObjectArcballCamera ,
  getCurrentGameObjectMeshRenderer ,
  getCurrentSceneTreeNode ,
  setCurrentSceneTreeNode ,
  isAlive ,
  
}
/* GameObjectUtils-WonderEditor Not a pure module */
