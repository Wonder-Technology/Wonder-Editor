

import * as GameObjectUtils$WonderEditor from "../../src/core/utils/engine/GameObjectUtils.js";
import * as StateLogicService$WonderEditor from "../../src/service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../src/service/state/editor/scene/SceneEditorService.js";
import * as StateEngineService$WonderEditor from "../../src/service/state/engine/StateEngineService.js";
import * as AliveGameObjectMainService$Wonderjs from "../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/gameObject/AliveGameObjectMainService.js";
import * as MainEditorVboBufferTool$WonderEditor from "./MainEditorVboBufferTool.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../src/service/state/engine/GameObjectComponentEngineService.js";

function getChildren(gameObject) {
  return GameObjectUtils$WonderEditor.getChildren(gameObject, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
}

function unsafeGetCurrentSceneTreeNode() {
  return StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
}

function clearCurrentSceneTreeNode() {
  return StateLogicService$WonderEditor.getAndSetEditorState(SceneEditorService$WonderEditor.clearCurrentSceneTreeNode);
}

function addFakeVboBufferForGameObject(gameObject) {
  StateEngineService$WonderEditor.setState(MainEditorVboBufferTool$WonderEditor.passBufferShouldExistCheckWhenDisposeGeometry(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                  return GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, param);
                })), StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function getCurrentSceneTreeNodeTransform() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectBasicMaterial() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicMaterialComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectLightMaterial() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetLightMaterialComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectDirectionLightComponent() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetDirectionLightComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectPointLightComponent() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetPointLightComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectBasicCameraView() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectPerspectiveCamera() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(partial_arg, param);
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
                return GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(partial_arg, param);
              }));
}

function getCurrentGameObjectMeshRenderer() {
  var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
  return StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                return GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(partial_arg, param);
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
  unsafeGetCurrentSceneTreeNode ,
  clearCurrentSceneTreeNode ,
  addFakeVboBufferForGameObject ,
  getCurrentSceneTreeNodeTransform ,
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
  
}
/* GameObjectUtils-WonderEditor Not a pure module */
