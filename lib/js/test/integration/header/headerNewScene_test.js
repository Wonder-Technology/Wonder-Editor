'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../tool/TestTool.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var ConsoleTool$WonderEditor = require("../../unit/tool/external/ConsoleTool.js");
var OptionService$WonderEditor = require("../../../src/service/primitive/OptionService.js");
var ControllerTool$WonderEditor = require("../../unit/composable_component/controller/tool/ControllerTool.js");
var GameObjectTool$WonderEditor = require("../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var GeometryToolEngine$WonderEditor = require("../../tool/engine/GeometryToolEngine.js");
var SceneEngineService$WonderEditor = require("../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var GameViewEditorService$WonderEditor = require("../../../src/service/state/editor/view/gameView/GameViewEditorService.js");
var HeaderFileNewSceneUtils$WonderEditor = require("../../../src/core/composable_component/header/atom_component/file/utils/HeaderFileNewSceneUtils.js");
var LightMaterialToolEngine$WonderEditor = require("../../tool/engine/LightMaterialToolEngine.js");
var MainEditorCameraViewTool$WonderEditor = require("../inspector/composable_component/sceneTree_inspector/cameraGroup/cameraView/tool/MainEditorCameraViewTool.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var BasicCameraViewEngineService$WonderEditor = require("../../../src/service/state/engine/camera/BasicCameraViewEngineService.js");
var GeometryDataAssetEditorService$WonderEditor = require("../../../src/service/state/editor/asset/GeometryDataAssetEditorService.js");
var MaterialDataAssetEditorService$WonderEditor = require("../../../src/service/state/editor/asset/MaterialDataAssetEditorService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");

Wonder_jest.describe("header->file->New Scene", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _handleNewScene = function ($staropt$star, $staropt$star$1, $staropt$star$2, param) {
          var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
          var engineState = $staropt$star$1 !== undefined ? $staropt$star$1 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
          var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
          return HeaderFileNewSceneUtils$WonderEditor.handleNewScene(dispatchFunc, /* tuple */[
                      editorState,
                      engineState
                    ]);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.test("if is run, warn", (function (param) {
                ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                ControllerTool$WonderEditor.setIsRun(true);
                _handleNewScene(undefined, undefined, undefined, /* () */0);
                return Sinon.toCalledWith(/* array */["should operate when stop, but now is run!"], Wonder_jest.Expect[/* expect */0](warn));
              }));
        return Wonder_jest.describe("else", (function (param) {
                      beforeEach((function () {
                              return ControllerTool$WonderEditor.setIsRun(false);
                            }));
                      Wonder_jest.describe("replace scene with default scene", (function (param) {
                              return Wonder_jest.test("test", (function (param) {
                                            MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                                            var match = _handleNewScene(undefined, undefined, undefined, /* () */0);
                                            var engineState = match[1];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getAllChildren(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).length), 4);
                                          }));
                            }));
                      Wonder_jest.test("default geometry shouldn't be disposed", (function (param) {
                              var match = _handleNewScene(undefined, undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryToolEngine$WonderEditor.isGeometryDisposed(StateLogicService$WonderEditor.getEditorState(GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent), match[1])), false);
                            }));
                      Wonder_jest.test("default material shouldn't be disposed", (function (param) {
                              var match = _handleNewScene(undefined, undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightMaterialToolEngine$WonderEditor.isAlive(StateLogicService$WonderEditor.getEditorState(MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial), match[1])), true);
                            }));
                      Wonder_jest.describe("update active basic camera view", (function (param) {
                              var _prepare = function (sandbox) {
                                MainEditorInspectorAddComponentTool$WonderEditor.buildTwoAddedArcballCameraControllerCamera(sandbox);
                                MainEditorSceneTool$WonderEditor.setSceneSecondCameraToBeCurrentSceneTreeNode(/* () */0);
                                return MainEditorCameraViewTool$WonderEditor.setCurrentCamera(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicCameraView(/* () */0), undefined, undefined, undefined, /* () */0);
                              };
                              Wonder_jest.test("test editorState", (function (param) {
                                      _prepare(sandbox);
                                      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                      var activedBasicCameraViewBefore = OptionService$WonderEditor.unsafeGet(GameViewEditorService$WonderEditor.getActivedBasicCameraView(editorState));
                                      var match = _handleNewScene(undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* != */7], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(GameViewEditorService$WonderEditor.getActivedBasicCameraView(match[0]))), activedBasicCameraViewBefore);
                                    }));
                              return Wonder_jest.test("test engineState", (function (param) {
                                            _prepare(sandbox);
                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            var activedBasicCameraViewBefore = OptionService$WonderEditor.unsafeGet(BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView(engineState));
                                            var match = _handleNewScene(undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* != */7], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(BasicCameraViewEngineService$WonderEditor.getActiveBasicCameraView(match[1]))), activedBasicCameraViewBefore);
                                          }));
                            }));
                      return Wonder_jest.test("should clear current scene tree node before exec update_transform_gizmos job", (function (param) {
                                    MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               },\n            {\n                \"name\": \"update_transform_gizmos\"\n            }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, false, undefined, undefined, /* () */0);
                                    MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                    StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
                                    MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                    TestTool$WonderEditor.openContractCheck(/* () */0);
                                    var match = _handleNewScene(undefined, undefined, undefined, /* () */0);
                                    StateEditorService$WonderEditor.setState(match[0]);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.getCurrentSceneTreeNode(/* () */0)), undefined);
                                  }));
                    }));
      }));

/*  Not a pure module */
