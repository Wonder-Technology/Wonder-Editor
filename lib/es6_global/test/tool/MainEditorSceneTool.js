

import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "./TestTool.js";
import * as ArrayService$WonderEditor from "../../src/service/atom/ArrayService.js";
import * as GameObjectTool$WonderEditor from "./GameObjectTool.js";
import * as TestToolEngine$WonderEditor from "./engine/TestToolEngine.js";
import * as GameObjectUtils$WonderEditor from "../../src/core/utils/engine/GameObjectUtils.js";
import * as FakeGlToolEngine$WonderEditor from "./engine/FakeGlToolEngine.js";
import * as DefaultSceneUtils$WonderEditor from "../../src/core/utils/engine/DefaultSceneUtils.js";
import * as SettingToolEngine$WonderEditor from "./engine/SettingToolEngine.js";
import * as StateLogicService$WonderEditor from "../../src/service/stateTuple/logic/StateLogicService.js";
import * as LightEngineService$WonderEditor from "../../src/service/state/engine/LightEngineService.js";
import * as SceneEngineService$WonderEditor from "../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../src/service/state/editor/StateEditorService.js";
import * as AllMaterialToolEngine$WonderEditor from "./engine/AllMaterialToolEngine.js";
import * as GeometryEngineService$WonderEditor from "../../src/service/state/engine/GeometryEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../src/service/state/engine/GameObjectEngineService.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "./engine/NoWorkerJobConfigToolEngine.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../src/service/state/engine/BasicCameraViewEngineService.js";
import * as CreateEditorStateEditorService$WonderEditor from "../../src/service/state/editor/CreateEditorStateEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../src/service/state/engine/GameObjectComponentEngineService.js";

function unsafeGetScene() {
  return StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject);
}

function setFirstCameraTobeCurrentSceneTreeNode() {
  var engineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(ArrayService$WonderEditor.getFirst(GameObjectComponentEngineService$WonderEditor.getAllBasicCameraViewComponents(engineState).map((function (component) {
                        return BasicCameraViewEngineService$WonderEditor.getBasicCameraViewGameObject(component, engineState);
                      }))));
}

function _isBox(gameObject, engineState) {
  if (GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(gameObject, engineState)) {
    return GeometryEngineService$WonderEditor.getGeometryVertices(GameObjectComponentEngineService$WonderEditor.getGeometryComponent(gameObject, engineState), engineState).length === 72;
  } else {
    return false;
  }
}

function getBoxByIndex(index, engineState) {
  return ArrayService$WonderEditor.getNth(index, GameObjectUtils$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                    return _isBox(gameObject, engineState);
                  })));
}

function getDirectionLightGameObjectByIndex(index, engineState) {
  return ArrayService$WonderEditor.getNth(index, GameObjectUtils$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                    return GameObjectComponentEngineService$WonderEditor.hasDirectionLightComponent(gameObject, engineState);
                  })));
}

function setFirstBoxTobeCurrentSceneTreeNode() {
  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(getBoxByIndex(0, StateLogicService$WonderEditor.getRunEngineState(/* () */0)));
}

function setDirectionLightGameObjectTobeCurrentSceneTreeNode() {
  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(getDirectionLightGameObjectByIndex(0, StateLogicService$WonderEditor.getRunEngineState(/* () */0)));
}

function initStateWithJob(sandbox, noWorkerJobRecord, $staropt$star, _) {
  var buffer = $staropt$star !== undefined ? $staropt$star : SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  TestTool$WonderEditor.initEditorAndEngineStateAndInitSceneWithJob(sandbox, buffer, noWorkerJobRecord, /* () */0);
  TestTool$WonderEditor.openContractCheck(/* () */0);
  TestToolEngine$WonderEditor.openContractCheck(/* () */0);
  AllMaterialToolEngine$WonderEditor.prepareForInit(/* () */0);
  StateEditorService$WonderEditor.setState(CreateEditorStateEditorService$WonderEditor.create(/* () */0));
  return /* () */0;
}

function initState(sandbox, $staropt$star, _) {
  var buffer = $staropt$star !== undefined ? $staropt$star : SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  return initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerEmptyJobConfig(/* () */0), buffer, /* () */0);
}

function createDefaultScene(sandbox, initFunc) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var editEngineState = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
  var match = DefaultSceneUtils$WonderEditor.prepareSpecificGameObjectsForEditEngineState(editEngineState);
  var editEngineState$1 = DefaultSceneUtils$WonderEditor.createDefaultSceneForEditEngineState(match[0]);
  var match$1 = DefaultSceneUtils$WonderEditor.computeDiffValue(editorState, editEngineState$1);
  var editEngineState$2 = match$1[1];
  StateEditorService$WonderEditor.setState(match$1[0]);
  StateLogicService$WonderEditor.setEditEngineState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.getBasicCameraViewComponent(match[1], editEngineState$2), editEngineState$2)));
  var editorState$1 = StateEditorService$WonderEditor.getState(/* () */0);
  var match$2 = DefaultSceneUtils$WonderEditor.createDefaultSceneForRunEngineState(editorState$1, StateLogicService$WonderEditor.getRunEngineState(/* () */0));
  StateEditorService$WonderEditor.setState(match$2[0]);
  StateLogicService$WonderEditor.setRunEngineState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$2[1]));
  return Curry._1(initFunc, /* () */0);
}

var _isDirectionLight = LightEngineService$WonderEditor.hasLightComponent;

function getBoxInDefaultScene(engineState) {
  return GameObjectUtils$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                  return _isBox(gameObject, engineState);
                })).pop();
}

function getDirectionLightInDefaultScene(engineState) {
  return ArrayService$WonderEditor.getFirst(GameObjectUtils$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                    return LightEngineService$WonderEditor.hasLightComponent(gameObject, engineState);
                  })));
}

function getGridPlaneInDefaultScene(engineState) {
  return GameObjectUtils$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                  return GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(gameObject, engineState) === "gridPlane";
                })).pop();
}

export {
  unsafeGetScene ,
  setFirstCameraTobeCurrentSceneTreeNode ,
  _isBox ,
  getBoxByIndex ,
  getDirectionLightGameObjectByIndex ,
  setFirstBoxTobeCurrentSceneTreeNode ,
  setDirectionLightGameObjectTobeCurrentSceneTreeNode ,
  initStateWithJob ,
  initState ,
  createDefaultScene ,
  _isDirectionLight ,
  getBoxInDefaultScene ,
  getDirectionLightInDefaultScene ,
  getGridPlaneInDefaultScene ,
  
}
/* TestTool-WonderEditor Not a pure module */
