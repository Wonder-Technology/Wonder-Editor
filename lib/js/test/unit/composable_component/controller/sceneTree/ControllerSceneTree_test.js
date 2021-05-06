'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var ControllerTool$WonderEditor = require("../tool/ControllerTool.js");
var EventListenerTool$WonderEditor = require("../../../tool/EventListenerTool.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../tool/MainEditorSceneTreeTool.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");

Wonder_jest.describe("controller sceneTree", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                return ControllerTool$WonderEditor.run(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test set parent in engine", (function (param) {
                      Wonder_jest.test("no drag", (function (param) {
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                            }));
                      return Wonder_jest.test("drag treeNode into target treeNode, set dragged gameObject's parent to be target gameObject", (function (param) {
                                    var targetGameObject = MainEditorSceneTool$WonderEditor.getCubeByIndex(0, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                    var draggedGameObject = MainEditorSceneTool$WonderEditor.getCubeByIndex(1, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                    MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](draggedGameObject, targetGameObject, undefined, undefined, undefined, /* () */0);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getParentTransform(draggedGameObject, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), targetGameObject);
                                  }));
                    }));
      }));

/*  Not a pure module */
