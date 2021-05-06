'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var ArcballCameraEngineService$WonderEditor = require("../../../../src/service/state/engine/ArcballCameraEngineService.js");
var BuildComponentForCurryTool$WonderEditor = require("../../../tool/BuildComponentForCurryTool.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");
var MainEditorArcballCameraControllerTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/camera_controller/arcball/tool/MainEditorArcballCameraControllerTool.js");

Wonder_jest.describe("redo_undo: arcballCameraController distance and minDistance", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _changeDistanceAndBlur = function (value) {
          return MainEditorArcballCameraControllerTool$WonderEditor.changeDistanceAndBlur(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0), value, undefined, undefined, /* () */0);
        };
        var _simulateChangeAndBlurDistanceAndMinDistance = function (param) {
          _changeDistanceAndBlur(23.11);
          var value = 12.12;
          return MainEditorArcballCameraControllerTool$WonderEditor.changeMinDistanceAndBlur(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0), value, undefined, undefined, /* () */0);
        };
        var _simulateDragDropDistance = function (param) {
          MainEditorArcballCameraControllerTool$WonderEditor.changeDistanceAndDragDrop(GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0), 23.11, 10.0, undefined, undefined, /* () */0);
          return /* tuple */[
                  10.0,
                  23.11
                ];
        };
        var _beforeEach = function (param) {
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
          var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
          StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                  return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                }));
          return MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "test change and blur distance and minDistance", /* tuple */[
              _simulateChangeAndBlurDistanceAndMinDistance,
              _beforeEach,
              (function (param) {
                  return /* () */0;
                })
            ], BuildComponentForCurryTool$WonderEditor.buildInspectorComponent);
        return Wonder_jest.describe("test drag drop distance", (function (param) {
                      beforeEach((function () {
                              return _beforeEach(/* () */0);
                            }));
                      return Wonder_jest.describe("test undo operate", (function (param) {
                                    return Wonder_jest.describe("test undo one step", (function (param) {
                                                  return Wonder_jest.test("step which from second to first", (function (param) {
                                                                var match = _simulateDragDropDistance(/* () */0);
                                                                var currentSceneTreeNodeArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                      return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(currentSceneTreeNodeArcballCamera, param);
                                                                                    }))), match[0]);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
