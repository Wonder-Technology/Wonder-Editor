

import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "./TestTool.js";
import * as ArrayService$WonderEditor from "../../src/service/atom/ArrayService.js";
import * as GameObjectTool$WonderEditor from "./GameObjectTool.js";
import * as TestToolEngine$WonderEditor from "./engine/TestToolEngine.js";
import * as GameObjectUtils$WonderEditor from "../../src/core/utils/engine/GameObjectUtils.js";
import * as FakeGlToolEngine$WonderEditor from "./engine/FakeGlToolEngine.js";
import * as SettingToolEngine$WonderEditor from "./engine/SettingToolEngine.js";
import * as StateLogicService$WonderEditor from "../../src/service/stateTuple/logic/StateLogicService.js";
import * as InitEditorJobUtils$WonderEditor from "../../src/core/utils/engine/job/InitEditorJobUtils.js";
import * as LightEngineService$WonderEditor from "../../src/service/state/engine/LightEngineService.js";
import * as SceneEngineService$WonderEditor from "../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../src/service/state/engine/StateEngineService.js";
import * as AllMaterialToolEngine$WonderEditor from "./engine/AllMaterialToolEngine.js";
import * as GeometryEngineService$WonderEditor from "../../src/service/state/engine/GeometryEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../src/service/state/engine/GameObjectEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "./engine/NoWorkerJobConfigToolEngine.js";
import * as CreateEditorStateEditorService$WonderEditor from "../../src/service/state/editor/CreateEditorStateEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../src/service/state/engine/GameObjectComponentEngineService.js";

function unsafeGetScene() {
  return StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject);
}

function getSceneFirstCamera() {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return ArrayService$WonderEditor.unsafeGetFirst(GameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (gameObject) {
                    return GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(gameObject, engineState);
                  })));
}

function setSceneFirstCameraToBeCurrentSceneTreeNode() {
  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(getSceneFirstCamera(/* () */0));
}

function _isBox(gameObject, engineState) {
  if (GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(gameObject, engineState)) {
    return GeometryEngineService$WonderEditor.getGeometryVertices(GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState), engineState).length === 72;
  } else {
    return false;
  }
}

function getBoxByIndex(index, engineState) {
  return ArrayService$WonderEditor.unsafeGetNth(index, GameObjectUtils$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                    return _isBox(gameObject, engineState);
                  })));
}

function getDirectionLightGameObjectByIndex(index, engineState) {
  return ArrayService$WonderEditor.unsafeGetNth(index, GameObjectUtils$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                    return GameObjectComponentEngineService$WonderEditor.hasDirectionLightComponent(gameObject, engineState);
                  })));
}

function setFirstBoxToBeCurrentSceneTreeNode() {
  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(getBoxByIndex(0, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

function setSecondBoxToBeCurrentSceneTreeNode() {
  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(getBoxByIndex(1, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

function setDirectionLightGameObjectToBeCurrentSceneTreeNode() {
  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(getDirectionLightGameObjectByIndex(0, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

function initStateWithJob(sandbox, noWorkerJobRecord, $staropt$star, $staropt$star$1, $staropt$star$2, _) {
  var buffer = $staropt$star !== undefined ? $staropt$star : SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var isBuildFakeDom = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
  var isInitJob = $staropt$star$2 !== undefined ? $staropt$star$2 : true;
  TestTool$WonderEditor.initEditorAndEngineStateAndInitSceneWithJob(sandbox, buffer, noWorkerJobRecord, isBuildFakeDom, isInitJob, /* () */0);
  TestTool$WonderEditor.openContractCheck(/* () */0);
  TestToolEngine$WonderEditor.openContractCheck(/* () */0);
  AllMaterialToolEngine$WonderEditor.prepareForInit(/* () */0);
  SettingToolEngine$WonderEditor.setFakeCanvasToEngineState(undefined, undefined, /* () */0);
  StateEditorService$WonderEditor.setState(CreateEditorStateEditorService$WonderEditor.create(/* () */0));
  return /* () */0;
}

function initState(sandbox, $staropt$star, _) {
  var buffer = $staropt$star !== undefined ? $staropt$star : SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  return initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerEmptyJobConfig(/* () */0), buffer, undefined, undefined, /* () */0);
}

function createDefaultSceneAndNotInit(sandbox) {
  var engineState = InitEditorJobUtils$WonderEditor.initEditorJob(/* array */[], StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), engineState));
  return /* () */0;
}

function createDefaultScene(sandbox, initFunc) {
  createDefaultSceneAndNotInit(sandbox);
  return Curry._1(initFunc, /* () */0);
}

function getCameraInDefaultScene(engineState) {
  return GameObjectUtils$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                  return GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(gameObject, engineState);
                })).pop();
}

var _isDirectionLight = LightEngineService$WonderEditor.hasLightComponent;

function getBoxInDefaultScene(engineState) {
  return GameObjectUtils$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                  return _isBox(gameObject, engineState);
                })).pop();
}

function getDirectionLightInDefaultScene(engineState) {
  return ArrayService$WonderEditor.unsafeGetFirst(GameObjectUtils$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                    return LightEngineService$WonderEditor.hasLightComponent(gameObject, engineState);
                  })));
}

export {
  unsafeGetScene ,
  getSceneFirstCamera ,
  setSceneFirstCameraToBeCurrentSceneTreeNode ,
  _isBox ,
  getBoxByIndex ,
  getDirectionLightGameObjectByIndex ,
  setFirstBoxToBeCurrentSceneTreeNode ,
  setSecondBoxToBeCurrentSceneTreeNode ,
  setDirectionLightGameObjectToBeCurrentSceneTreeNode ,
  initStateWithJob ,
  initState ,
  createDefaultSceneAndNotInit ,
  createDefaultScene ,
  getCameraInDefaultScene ,
  _isDirectionLight ,
  getBoxInDefaultScene ,
  getDirectionLightInDefaultScene ,
  
}
/* TestTool-WonderEditor Not a pure module */
