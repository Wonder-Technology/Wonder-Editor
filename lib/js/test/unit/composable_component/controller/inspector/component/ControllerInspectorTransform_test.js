'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../../tool/TestTool.js");
var ReactTestTool$WonderEditor = require("../../../../../tool/ReactTestTool.js");
var ControllerTool$WonderEditor = require("../../tool/ControllerTool.js");
var GameObjectTool$WonderEditor = require("../../../../../tool/GameObjectTool.js");
var BuildComponentTool$WonderEditor = require("../../../../../tool/BuildComponentTool.js");
var StateEngineService$WonderEditor = require("../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../tool/MainEditorSceneTool.js");
var TransformEngineService$WonderEditor = require("../../../../../../src/service/state/engine/TransformEngineService.js");
var MainEditorTransformTool$WonderEditor = require("../../../../../integration/inspector/composable_component/sceneTree_inspector/transform/tool/MainEditorTransformTool.js");

Wonder_jest.describe("controller inspector transform", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                TestTool$WonderEditor.closeContractCheck(/* () */0);
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                return Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                return TestTool$WonderEditor.openContractCheck(/* () */0);
              }));
        Wonder_jest.describe("test set transform in engine state", (function (param) {
                return Wonder_jest.test("current gameObject's tranform position should set into engine", (function (param) {
                              ControllerTool$WonderEditor.run(/* () */0);
                              var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                              MainEditorTransformTool$WonderEditor.changePositionXAndBlur(155, currentGameObjectTransform, undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformEngineService$WonderEditor.getLocalPosition(currentGameObjectTransform, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* tuple */[
                                          155,
                                          0,
                                          0
                                        ]);
                            }));
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      return Wonder_jest.test("should refresh transform when stop", (function (param) {
                                    ControllerTool$WonderEditor.run(/* () */0);
                                    var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                    MainEditorTransformTool$WonderEditor.changePositionXAndBlur(155, currentGameObjectTransform, undefined, undefined, /* () */0);
                                    ControllerTool$WonderEditor.stop(/* () */0);
                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform));
                                  }));
                    }));
      }));

/*  Not a pure module */
