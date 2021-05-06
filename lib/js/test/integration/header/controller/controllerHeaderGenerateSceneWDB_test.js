'use strict';

var Most = require("most");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var LoadTool$WonderEditor = require("../../asset/tool/LoadTool.js");
var JudgeTool$WonderEditor = require("../../../tool/JudgeTool.js");
var ControllerTool$WonderEditor = require("../../../unit/composable_component/controller/tool/ControllerTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var SceneEngineService$WonderEditor = require("../../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorAssetTool$WonderEditor = require("../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var FlyCameraEngineService$WonderEditor = require("../../../../src/service/state/engine/FlyCameraEngineService.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var GameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/GameObjectEngineService.js");
var AssembleWDBEngineService$WonderEditor = require("../../../../src/service/state/engine/AssembleWDBEngineService.js");
var HeaderExportSceneWDBUtils$WonderEditor = require("../../../../src/core/composable_component/header/utils/export/HeaderExportSceneWDBUtils.js");
var ArcballCameraEngineService$WonderEditor = require("../../../../src/service/state/engine/ArcballCameraEngineService.js");
var BasicCameraViewEngineService$WonderEditor = require("../../../../src/service/state/engine/camera/BasicCameraViewEngineService.js");
var Uint8ArrayAssetEditorService$WonderEditor = require("../../../../src/service/state/editor/asset/Uint8ArrayAssetEditorService.js");
var GenerateSceneGraphEngineService$WonderEditor = require("../../../../src/service/state/engine/GenerateSceneGraphEngineService.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");

Wonder_jest.describe("controller header generate scene wdb", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _generateSceneWDB = function ($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
          var isSceneRoot = $staropt$star !== undefined ? $staropt$star : false;
          var generateWDBFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : GenerateSceneGraphEngineService$WonderEditor.generateSceneWDB;
          var imageUint8ArrayMap = $staropt$star$2 !== undefined ? Caml_option.valFromOption($staropt$star$2) : Uint8ArrayAssetEditorService$WonderEditor.buildBasicSourceTextureImageUint8ArrayMap(StateEditorService$WonderEditor.getState(/* () */0));
          var engineState = $staropt$star$3 !== undefined ? $staropt$star$3 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
          return HeaderExportSceneWDBUtils$WonderEditor.generateSceneWDB(isSceneRoot, generateWDBFunc, imageUint8ArrayMap, engineState);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                LoadTool$WonderEditor.buildFakeTextEncoder(/* () */0);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                LoadTool$WonderEditor.buildFakeLoadImage();
                var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                        return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                      }));
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                return LoadTool$WonderEditor.buildFakeLoadImage();
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("fix bind arcballCameraController event bug: package should bind event if any basicCameraView is active", (function (param) {
                var _getIsBindLength = function (gameObject, engineState) {
                  var __x = HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState);
                  return GameObjectEngineService$WonderEditor.getAllArcballCameraControllers(__x, engineState).filter((function (arcballCameraController) {
                                return ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(arcballCameraController, engineState);
                              })).length;
                };
                var _test = function (controlFunc) {
                  MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                  var basicCameraView = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicCameraView(/* () */0);
                  StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                          return BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(basicCameraView, param);
                        }));
                  GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                  Curry._1(controlFunc, /* () */0);
                  var match = _generateSceneWDB(undefined, undefined, undefined, undefined, /* () */0);
                  var isBind = /* record */[/* contents */false];
                  return Most.drain(Most.tap((function (param) {
                                      var __x = _getIsBindLength(param[2][0], param[0]);
                                      isBind[0] = JudgeTool$WonderEditor.isNotEqual(__x, 0);
                                      return /* () */0;
                                    }), AssembleWDBEngineService$WonderEditor.assembleWDB(match[1], true, true, true, true, true, match[0]))).then((function (param) {
                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](isBind[0]), true));
                              }));
                };
                Wonder_jest.testPromise("test run", undefined, (function (param) {
                        return _test((function (param) {
                                      return ControllerTool$WonderEditor.run(/* () */0);
                                    }));
                      }));
                return Wonder_jest.describe("test stop", (function (param) {
                              Wonder_jest.testPromise("should bind", undefined, (function (param) {
                                      return _test((function (param) {
                                                    ControllerTool$WonderEditor.run(/* () */0);
                                                    return ControllerTool$WonderEditor.stop(/* () */0);
                                                  }));
                                    }));
                              return Wonder_jest.test("should unbind after package", (function (param) {
                                            MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                            var basicCameraView = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicCameraView(/* () */0);
                                            StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                    return BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(basicCameraView, param);
                                                  }));
                                            ControllerTool$WonderEditor.run(/* () */0);
                                            ControllerTool$WonderEditor.stop(/* () */0);
                                            var match = _generateSceneWDB(undefined, undefined, undefined, undefined, /* () */0);
                                            var engineState = match[0];
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getIsBindLength(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState)), 0);
                                          }));
                            }));
              }));
        return Wonder_jest.describe("fix bind flyCameraController event bug: package should bind event if any basicCameraView is active", (function (param) {
                      var _getIsBindLength = function (gameObject, engineState) {
                        var __x = HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState);
                        return GameObjectEngineService$WonderEditor.getAllFlyCameraControllers(__x, engineState).filter((function (flyCameraController) {
                                      return FlyCameraEngineService$WonderEditor.isBindFlyCameraControllerEventForGameView(flyCameraController, engineState);
                                    })).length;
                      };
                      var _test = function (controlFunc) {
                        MainEditorInspectorAddComponentTool$WonderEditor.addFlyCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                        var basicCameraView = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicCameraView(/* () */0);
                        StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                return BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(basicCameraView, param);
                              }));
                        Curry._1(controlFunc, /* () */0);
                        var match = _generateSceneWDB(undefined, undefined, undefined, undefined, /* () */0);
                        var isBind = /* record */[/* contents */false];
                        return Most.drain(Most.tap((function (param) {
                                            var __x = _getIsBindLength(param[2][0], param[0]);
                                            isBind[0] = JudgeTool$WonderEditor.isNotEqual(__x, 0);
                                            return /* () */0;
                                          }), AssembleWDBEngineService$WonderEditor.assembleWDB(match[1], true, true, true, true, true, match[0]))).then((function (param) {
                                      return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](isBind[0]), true));
                                    }));
                      };
                      Wonder_jest.testPromise("test run", undefined, (function (param) {
                              return _test((function (param) {
                                            return ControllerTool$WonderEditor.run(/* () */0);
                                          }));
                            }));
                      return Wonder_jest.describe("test stop", (function (param) {
                                    Wonder_jest.testPromise("should bind", undefined, (function (param) {
                                            return _test((function (param) {
                                                          ControllerTool$WonderEditor.run(/* () */0);
                                                          return ControllerTool$WonderEditor.stop(/* () */0);
                                                        }));
                                          }));
                                    return Wonder_jest.test("should unbind after package", (function (param) {
                                                  MainEditorInspectorAddComponentTool$WonderEditor.addFlyCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                                  var basicCameraView = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicCameraView(/* () */0);
                                                  StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                                          return BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(basicCameraView, param);
                                                        }));
                                                  ControllerTool$WonderEditor.run(/* () */0);
                                                  ControllerTool$WonderEditor.stop(/* () */0);
                                                  var match = _generateSceneWDB(undefined, undefined, undefined, undefined, /* () */0);
                                                  var engineState = match[0];
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getIsBindLength(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState)), 0);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
