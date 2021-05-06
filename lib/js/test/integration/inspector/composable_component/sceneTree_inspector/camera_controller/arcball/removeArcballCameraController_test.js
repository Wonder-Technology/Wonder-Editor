'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ControllerTool$WonderEditor = require("../../../../../../unit/composable_component/controller/tool/ControllerTool.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var ArcballCameraEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/ArcballCameraEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../../../atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var MainEditorInspectorRemoveComponentTool$WonderEditor = require("../../../../atom_component/addableComponent/tool/MainEditorInspectorRemoveComponentTool.js");

Wonder_jest.describe("test remove arcball camera controller", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                   [\n                       {\n                           \"name\": \"default\",\n                           \"jobs\": [\n                               {\n                                   \"name\": \"dispose\"\n                               }\n                           ]\n                       }\n                   ]\n               ", undefined, undefined, /* () */0), undefined, undefined, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
                return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                              return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                            }));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("if is run", (function (param) {
                      beforeEach((function () {
                              return ControllerTool$WonderEditor.setIsRun(true);
                            }));
                      return Wonder_jest.test("unbind arcballCameraController event for game view", (function (param) {
                                    MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                    var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                    var cameraController = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                    StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                            return ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventForGameView(cameraController, param);
                                          }));
                                    MainEditorInspectorRemoveComponentTool$WonderEditor.removeArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(cameraController, engineState)), false);
                                  }));
                    }));
      }));

/*  Not a pure module */
