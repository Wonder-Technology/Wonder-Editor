'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var ControllerTool$WonderEditor = require("../../../unit/composable_component/controller/tool/ControllerTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var SettingToolEngine$WonderEditor = require("../../../tool/engine/SettingToolEngine.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var RedoUndoTransformTool$WonderEditor = require("../transform/tool/RedoUndoTransformTool.js");
var TransformEngineService$WonderEditor = require("../../../../src/service/state/engine/TransformEngineService.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");

Wonder_jest.describe("redo_undo: controller engine", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test undo operate", (function (param) {
                      Wonder_jest.describe("test add gameObject", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                                      MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                                      Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                      return ControllerTool$WonderEditor.run(/* () */0);
                                    }));
                              return Wonder_jest.test("test undo one step which from second to first", (function (param) {
                                            MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                                            MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 5);
                                          }));
                            }));
                      Wonder_jest.describe("test dispose gameObject from engine", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                    {\n                        \"name\": \"default\",\n                        \"jobs\": [\n                            {\n                                \"name\": \"dispose\"\n                            }\n                        ]\n                    }\n                ]\n            ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                      Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                      return ControllerTool$WonderEditor.run(/* () */0);
                                    }));
                              return Wonder_jest.test("test undo one step which from second to first", (function (param) {
                                            MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                            MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                                            MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 3);
                                          }));
                            }));
                      Wonder_jest.describe("test transform", (function (param) {
                              beforeEach((function () {
                                      MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, SettingToolEngine$WonderEditor.buildBufferConfigStr(undefined, undefined, 10, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), /* () */0);
                                      MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                      Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                      return ControllerTool$WonderEditor.run(/* () */0);
                                    }));
                              return Wonder_jest.test("test undo one step which from second to first", (function (param) {
                                            var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                            RedoUndoTransformTool$WonderEditor.simulateTwiceChangePosition(155, 200, /* () */0);
                                            RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformEngineService$WonderEditor.getLocalPosition(currentGameObjectTransform, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* tuple */[
                                                        155,
                                                        0,
                                                        0
                                                      ]);
                                          }));
                            }));
                      return Wonder_jest.describe("fix bug", (function (param) {
                                    beforeEach((function () {
                                            MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                                            MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                                            Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                            return ControllerTool$WonderEditor.run(/* () */0);
                                          }));
                                    return Wonder_jest.test("the undo operate should deep copy current engineState", (function (param) {
                                                  var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                                  RedoUndoTransformTool$WonderEditor.simulateTwiceChangePosition(150, 200, /* () */0);
                                                  RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformEngineService$WonderEditor.getLocalPosition(currentGameObjectTransform, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* tuple */[
                                                              150,
                                                              200,
                                                              0
                                                            ]);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
