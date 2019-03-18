

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "../../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js";
import * as MainEditorArcballCameraControllerTool$WonderEditor from "../../inspector/composable_component/sceneTree_inspector/camera_controller/tool/MainEditorArcballCameraControllerTool.js";

describe("redo_undo: arcballCameraController distance and minDistance", (function () {
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
        describe("test drag drop distance", (function () {
                beforeEach((function () {
                        return _beforeEach(/* () */0);
                      }));
                describe("test undo operate", (function () {
                        describe("test undo one step", (function () {
                                return Wonder_jest.test("step which from second to first", (function (param) {
                                              var match = _simulateDragDropDistance(/* () */0);
                                              var currentSceneTreeNodeArcballCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeArcballCamera(/* () */0);
                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                    return ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerDistance(currentSceneTreeNodeArcballCamera, param);
                                                                  }))), match[0]);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
