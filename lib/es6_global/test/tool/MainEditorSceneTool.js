

import * as Curry from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "./TestTool.js";
import * as ConsoleTool$WonderEditor from "../unit/tool/external/ConsoleTool.js";
import * as SettingTool$WonderEditor from "../unit/tool/SettingTool.js";
import * as ArrayService$WonderEditor from "../../src/service/atom/ArrayService.js";
import * as InitEditorJob$WonderEditor from "../../src/core/job/init/InitEditorJob.js";
import * as GameObjectTool$WonderEditor from "./GameObjectTool.js";
import * as TestToolEngine$WonderEditor from "./engine/TestToolEngine.js";
import * as FakeGlToolEngine$WonderEditor from "./engine/FakeGlToolEngine.js";
import * as DefaultSceneUtils$WonderEditor from "../../src/core/utils/engine/DefaultSceneUtils.js";
import * as SettingToolEngine$WonderEditor from "./engine/SettingToolEngine.js";
import * as StateLogicService$WonderEditor from "../../src/service/stateTuple/logic/StateLogicService.js";
import * as LightEngineService$WonderEditor from "../../src/service/state/engine/LightEngineService.js";
import * as SceneEngineService$WonderEditor from "../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../src/service/state/engine/state/StateEngineService.js";
import * as AllMaterialToolEngine$WonderEditor from "./engine/AllMaterialToolEngine.js";
import * as GeometryEngineService$WonderEditor from "../../src/service/state/engine/GeometryEngineService.js";
import * as TreeAssetEditorService$WonderEditor from "../../src/service/state/editor/asset/TreeAssetEditorService.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../integration/asset/tool/MainEditorAssetTreeTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "./engine/NoWorkerJobConfigToolEngine.js";
import * as CreateEditorStateEditorService$WonderEditor from "../../src/service/state/editor/CreateEditorStateEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

function unsafeGetScene(param) {
  return StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject);
}

function getSceneCameras(param) {
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (gameObject) {
                return GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(gameObject, engineState);
              }));
}

function getSceneFirstCamera(param) {
  return ArrayService$WonderEditor.unsafeGetFirst(getSceneCameras(/* () */0));
}

function getSceneSecondCamera(param) {
  return ArrayService$WonderEditor.unsafeGetNth(1, getSceneCameras(/* () */0));
}

function setSceneFirstCameraToBeCurrentSceneTreeNode(param) {
  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(ArrayService$WonderEditor.unsafeGetFirst(getSceneCameras(/* () */0)));
}

function setSceneSecondCameraToBeCurrentSceneTreeNode(param) {
  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(ArrayService$WonderEditor.unsafeGetNth(1, getSceneCameras(/* () */0)));
}

function _isCube(gameObject, engineState) {
  if (GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(gameObject, engineState)) {
    return GeometryEngineService$WonderEditor.getGeometryVertices(GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState), engineState).length === 72;
  } else {
    return false;
  }
}

function getCubeByIndex(index, engineState) {
  return ArrayService$WonderEditor.unsafeGetNth(index, HierarchyGameObjectEngineService$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                    return _isCube(gameObject, engineState);
                  })));
}

function getDirectionLightGameObjectByIndex(index, engineState) {
  return ArrayService$WonderEditor.unsafeGetNth(index, HierarchyGameObjectEngineService$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                    return GameObjectComponentEngineService$WonderEditor.hasDirectionLightComponent(gameObject, engineState);
                  })));
}

function getFirstCube(engineState) {
  return getCubeByIndex(0, engineState);
}

function getSecondCube(engineState) {
  return getCubeByIndex(1, engineState);
}

function setFirstCubeToBeCurrentSceneTreeNode(param) {
  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(getCubeByIndex(0, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

function setSecondCubeToBeCurrentSceneTreeNode(param) {
  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(getCubeByIndex(1, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

function setDirectionLightGameObjectToBeCurrentSceneTreeNode(param) {
  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(getDirectionLightGameObjectByIndex(0, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
}

function initStateWithJob(sandbox, noWorkerJobRecord, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var buffer = $staropt$star !== undefined ? $staropt$star : SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var isBuildFakeDom = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
  var isInitJob = $staropt$star$2 !== undefined ? $staropt$star$2 : true;
  var context = $staropt$star$3 !== undefined ? $staropt$star$3 : TestToolEngine$WonderEditor.getDefaultContext(/* () */0);
  TestTool$WonderEditor.initEngineStateAndInitSceneWithJob(sandbox, buffer, noWorkerJobRecord, isBuildFakeDom, isInitJob, context, /* () */0);
  TestTool$WonderEditor.openContractCheck(/* () */0);
  TestToolEngine$WonderEditor.openContractCheck(/* () */0);
  AllMaterialToolEngine$WonderEditor.prepareForInit(/* () */0);
  SettingToolEngine$WonderEditor.setFakeCanvasToEngineState(undefined, undefined, /* () */0);
  StateEditorService$WonderEditor.setState(TreeAssetEditorService$WonderEditor.createTree(SettingTool$WonderEditor.initSetting(CreateEditorStateEditorService$WonderEditor.create(/* () */0))));
  TestTool$WonderEditor.setLanguageTypeToEn(/* () */0);
  return ConsoleTool$WonderEditor.notShowMessage(/* () */0);
}

function initState(sandbox, $staropt$star, $staropt$star$1, param) {
  var isBuildFakeDom = $staropt$star !== undefined ? $staropt$star : true;
  var buffer = $staropt$star$1 !== undefined ? $staropt$star$1 : SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  return initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerEmptyJobConfig(/* () */0), buffer, isBuildFakeDom, undefined, undefined, /* () */0);
}

function prepareGl(sandbox) {
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function createDefaultSceneAndNotInit(sandbox) {
  StateEngineService$WonderEditor.setState(InitEditorJob$WonderEditor.initEditorJob(/* array */[], StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return prepareGl(sandbox);
}

function createDefaultScene(sandbox, initFunc) {
  createDefaultSceneAndNotInit(sandbox);
  return Curry._1(initFunc, /* () */0);
}

function createDefaultComponents(param) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = DefaultSceneUtils$WonderEditor.prepareDefaultComponent(editorState, engineState);
  StateEditorService$WonderEditor.setState(match[0]);
  StateEngineService$WonderEditor.setState(match[1]);
  return /* () */0;
}

function prepareScene(sandbox) {
  createDefaultComponents(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), engineState));
  MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
  return /* () */0;
}

function getCameraInDefaultScene(engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                  return GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(gameObject, engineState);
                })).pop();
}

var _isDirectionLight = LightEngineService$WonderEditor.hasLightComponent;

function getCubeInDefaultScene(engineState) {
  return HierarchyGameObjectEngineService$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                  return _isCube(gameObject, engineState);
                })).pop();
}

function getDirectionLightInDefaultScene(engineState) {
  return ArrayService$WonderEditor.unsafeGetFirst(HierarchyGameObjectEngineService$WonderEditor.getChildren(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject), engineState).filter((function (gameObject) {
                    return LightEngineService$WonderEditor.hasLightComponent(gameObject, engineState);
                  })));
}

function getDefaultGameObjects(engineState) {
  var scene = StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getSceneGameObject);
  return /* tuple */[
          scene,
          /* tuple */[
            getCameraInDefaultScene(engineState),
            getCubeByIndex(0, engineState),
            getCubeByIndex(1, engineState),
            getDirectionLightInDefaultScene(engineState)
          ]
        ];
}

function addSceneGameObjectComponentTypeToMap(param) {
  var partial_arg = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                return InitEditorJob$WonderEditor._addSceneGameObjectComponentTypeToMap(partial_arg, param);
              }));
}

export {
  unsafeGetScene ,
  getSceneCameras ,
  getSceneFirstCamera ,
  getSceneSecondCamera ,
  setSceneFirstCameraToBeCurrentSceneTreeNode ,
  setSceneSecondCameraToBeCurrentSceneTreeNode ,
  _isCube ,
  getCubeByIndex ,
  getDirectionLightGameObjectByIndex ,
  getFirstCube ,
  getSecondCube ,
  setFirstCubeToBeCurrentSceneTreeNode ,
  setSecondCubeToBeCurrentSceneTreeNode ,
  setDirectionLightGameObjectToBeCurrentSceneTreeNode ,
  initStateWithJob ,
  initState ,
  prepareGl ,
  createDefaultSceneAndNotInit ,
  createDefaultScene ,
  createDefaultComponents ,
  prepareScene ,
  getCameraInDefaultScene ,
  _isDirectionLight ,
  getCubeInDefaultScene ,
  getDirectionLightInDefaultScene ,
  getDefaultGameObjects ,
  addSceneGameObjectComponentTypeToMap ,
  
}
/* TestTool-WonderEditor Not a pure module */
