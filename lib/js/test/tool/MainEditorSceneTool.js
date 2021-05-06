'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$WonderEditor = require("./TestTool.js");
var ConsoleTool$WonderEditor = require("../unit/tool/external/ConsoleTool.js");
var SettingTool$WonderEditor = require("../unit/tool/SettingTool.js");
var ArrayService$WonderEditor = require("../../src/service/atom/ArrayService.js");
var InitEditorJob$WonderEditor = require("../../src/core/job/init/InitEditorJob.js");
var GameObjectTool$WonderEditor = require("./GameObjectTool.js");
var TestToolEngine$WonderEditor = require("./engine/TestToolEngine.js");
var BuildCanvasTool$WonderEditor = require("./BuildCanvasTool.js");
var FakeGlToolEngine$WonderEditor = require("./engine/FakeGlToolEngine.js");
var RenderToolEngine$WonderEditor = require("./engine/RenderToolEngine.js");
var DefaultSceneUtils$WonderEditor = require("../../src/core/utils/engine/DefaultSceneUtils.js");
var InitEditorJobTool$WonderEditor = require("./editor/InitEditorJobTool.js");
var SettingToolEngine$WonderEditor = require("./engine/SettingToolEngine.js");
var StateLogicService$WonderEditor = require("../../src/service/stateTuple/logic/StateLogicService.js");
var LightEngineService$WonderEditor = require("../../src/service/state/engine/LightEngineService.js");
var SceneEngineService$WonderEditor = require("../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../src/service/state/engine/state/StateEngineService.js");
var GPUDetectToolEngine$WonderEditor = require("./engine/GPUDetectToolEngine.js");
var AllMaterialToolEngine$WonderEditor = require("./engine/AllMaterialToolEngine.js");
var GeometryEngineService$WonderEditor = require("../../src/service/state/engine/GeometryEngineService.js");
var TreeAssetEditorService$WonderEditor = require("../../src/service/state/editor/asset/TreeAssetEditorService.js");
var MainEditorAssetTreeTool$WonderEditor = require("../integration/asset/tool/MainEditorAssetTreeTool.js");
var CubemapTextureEngineService$WonderEditor = require("../../src/service/state/engine/texture/CubemapTextureEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("./engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var CreateEditorStateEditorService$WonderEditor = require("../../src/service/state/editor/CreateEditorStateEditorService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var ImgContextImgCanvasEditorService$WonderEditor = require("../../src/service/state/editor/imgCanvas/ImgContextImgCanvasEditorService.js");

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
    return GeometryEngineService$WonderEditor.unsafeGetGeometryVertices(GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState), engineState).length === 72;
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
  StateEditorService$WonderEditor.setState(ImgContextImgCanvasEditorService$WonderEditor.setImgContext(BuildCanvasTool$WonderEditor.getFakeCanvasDom("img-canvas", /* tuple */[
                  0,
                  0
                ], sandbox).getContext(), TreeAssetEditorService$WonderEditor.createTree(SettingTool$WonderEditor.initSetting(CreateEditorStateEditorService$WonderEditor.create(/* () */0)))));
  TestTool$WonderEditor.setLanguageTypeToEn(/* () */0);
  return ConsoleTool$WonderEditor.notShowMessage(/* () */0);
}

function initState(sandbox, $staropt$star, $staropt$star$1, param) {
  var isBuildFakeDom = $staropt$star !== undefined ? $staropt$star : true;
  var buffer = $staropt$star$1 !== undefined ? $staropt$star$1 : SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  return initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerEmptyJobConfig(/* () */0), buffer, isBuildFakeDom, undefined, undefined, /* () */0);
}

function initInspectorEngineState(sandbox, noWorkerJobRecord, $staropt$star, $staropt$star$1, param) {
  var buffer = $staropt$star !== undefined ? $staropt$star : SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var isInitJob = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
  TestToolEngine$WonderEditor.createAndSetInspectorEngineState(sandbox, noWorkerJobRecord, buffer, isInitJob, undefined, undefined, undefined, undefined, /* () */0);
  StateInspectorEngineService$WonderEditor.setIsDebug(true);
  AllMaterialToolEngine$WonderEditor.prepareForInitInspectorEngineState(/* () */0);
  SettingToolEngine$WonderEditor.setFakeCanvasToInspectorEngineState(undefined, undefined, /* () */0);
  StateInspectorEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), RenderToolEngine$WonderEditor.createActivableTextureUnitArray(GPUDetectToolEngine$WonderEditor.setMaxTextureUnit(16, StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)))));
  return /* () */0;
}

function prepareGl(sandbox) {
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return /* () */0;
}

function createDefaultSceneAndNotInit(sandbox) {
  StateEngineService$WonderEditor.setState(InitEditorJob$WonderEditor.initEditorJob(/* array */[], StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return prepareGl(sandbox);
}

function createDefaultSceneWithArcballCamera(sandbox) {
  StateEngineService$WonderEditor.setState(InitEditorJobTool$WonderEditor.initEditorWithArcballCamera(/* array */[], StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
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
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), engineState));
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

function createCubemapAndSetToSceneSkybox(engineState) {
  var match = CubemapTextureEngineService$WonderEditor.create(engineState);
  var cubemap = match[1];
  var engineState$1 = SceneEngineService$WonderEditor.setCubemapTexture(cubemap, match[0]);
  return /* tuple */[
          engineState$1,
          cubemap
        ];
}

var Skybox = /* module */[/* createCubemapAndSetToSceneSkybox */createCubemapAndSetToSceneSkybox];

exports.unsafeGetScene = unsafeGetScene;
exports.getSceneCameras = getSceneCameras;
exports.getSceneFirstCamera = getSceneFirstCamera;
exports.getSceneSecondCamera = getSceneSecondCamera;
exports.setSceneFirstCameraToBeCurrentSceneTreeNode = setSceneFirstCameraToBeCurrentSceneTreeNode;
exports.setSceneSecondCameraToBeCurrentSceneTreeNode = setSceneSecondCameraToBeCurrentSceneTreeNode;
exports._isCube = _isCube;
exports.getCubeByIndex = getCubeByIndex;
exports.getDirectionLightGameObjectByIndex = getDirectionLightGameObjectByIndex;
exports.getFirstCube = getFirstCube;
exports.getSecondCube = getSecondCube;
exports.setFirstCubeToBeCurrentSceneTreeNode = setFirstCubeToBeCurrentSceneTreeNode;
exports.setSecondCubeToBeCurrentSceneTreeNode = setSecondCubeToBeCurrentSceneTreeNode;
exports.setDirectionLightGameObjectToBeCurrentSceneTreeNode = setDirectionLightGameObjectToBeCurrentSceneTreeNode;
exports.initStateWithJob = initStateWithJob;
exports.initState = initState;
exports.initInspectorEngineState = initInspectorEngineState;
exports.prepareGl = prepareGl;
exports.createDefaultSceneAndNotInit = createDefaultSceneAndNotInit;
exports.createDefaultSceneWithArcballCamera = createDefaultSceneWithArcballCamera;
exports.createDefaultScene = createDefaultScene;
exports.createDefaultComponents = createDefaultComponents;
exports.prepareScene = prepareScene;
exports.getCameraInDefaultScene = getCameraInDefaultScene;
exports._isDirectionLight = _isDirectionLight;
exports.getCubeInDefaultScene = getCubeInDefaultScene;
exports.getDirectionLightInDefaultScene = getDirectionLightInDefaultScene;
exports.getDefaultGameObjects = getDefaultGameObjects;
exports.addSceneGameObjectComponentTypeToMap = addSceneGameObjectComponentTypeToMap;
exports.Skybox = Skybox;
/* TestTool-WonderEditor Not a pure module */
