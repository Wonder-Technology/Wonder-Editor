

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ControllerTool$WonderEditor from "../../../../../controller/tool/ControllerTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../tool/GameObjectTool.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../tool/MainEditorSceneTool.js";
import * as GameViewEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/view/gameView/GameViewEditorService.js";
import * as MainEditorCameraViewTool$WonderEditor from "../../../../../../../integration/inspector/composable_component/sceneTree_inspector/cameraGroup/cameraView/tool/MainEditorCameraViewTool.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "../../../../../../../integration/inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js";

describe("controller inspector cameraView", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return ControllerTool$WonderEditor.setIsRun(false);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test camera bind arcballCameraController event", (function () {
                describe("test has two cameras with arcballCameraController component", (function () {
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                return Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                              }));
                        Wonder_jest.test("test click run, the current camera arcballCameraController should bind event, the other camera shouldn't bind event", (function () {
                                var match = MainEditorInspectorAddComponentTool$WonderEditor.buildTwoAddedArcballCameraControllerCamera(sandbox);
                                MainEditorSceneTool$WonderEditor.setSceneSecondCameraToBeCurrentSceneTreeNode(/* () */0);
                                MainEditorCameraViewTool$WonderEditor.setCurrentCamera(GameObjectTool$WonderEditor.getCurrentGameObjectBasicCameraView(/* () */0), undefined, undefined, undefined, /* () */0);
                                ControllerTool$WonderEditor.run(/* () */0);
                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(match[0], engineState), engineState),
                                                ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(match[1], engineState), engineState)
                                              ]), /* tuple */[
                                            false,
                                            true
                                          ]);
                              }));
                        Wonder_jest.test("test click stop, the two camera arcballCameraController shouldn't bind event", (function () {
                                var match = MainEditorInspectorAddComponentTool$WonderEditor.buildTwoAddedArcballCameraControllerCamera(sandbox);
                                ControllerTool$WonderEditor.run(/* () */0);
                                ControllerTool$WonderEditor.stop(/* () */0);
                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(match[0], engineState), engineState),
                                                ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(match[1], engineState), engineState)
                                              ]), /* tuple */[
                                            false,
                                            false
                                          ]);
                              }));
                        describe("test click run and change current camera", (function () {
                                var _prepareAndExec = function () {
                                  var match = MainEditorInspectorAddComponentTool$WonderEditor.buildTwoAddedArcballCameraControllerCamera(sandbox);
                                  var camera2 = match[1];
                                  var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(camera2, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                  StateEngineService$WonderEditor.setState(ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventForGameView(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
                                  ControllerTool$WonderEditor.run(/* () */0);
                                  MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode(/* () */0);
                                  MainEditorCameraViewTool$WonderEditor.setCurrentCamera(GameObjectTool$WonderEditor.getCurrentGameObjectBasicCameraView(/* () */0), undefined, undefined, undefined, /* () */0);
                                  return /* tuple */[
                                          match[0],
                                          camera2
                                        ];
                                };
                                Wonder_jest.test("the target camera should bind event, and the source camera shouldn't bind event", (function () {
                                        var match = _prepareAndExec(/* () */0);
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                        ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(match[0], engineState), engineState),
                                                        ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(match[1], engineState), engineState)
                                                      ]), /* tuple */[
                                                    true,
                                                    false
                                                  ]);
                                      }));
                                return Wonder_jest.test("active source camera->basicCameraView", (function () {
                                              var match = _prepareAndExec(/* () */0);
                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameViewEditorService$WonderEditor.getActivedBasicCameraView(editorState)), GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(match[0], engineState));
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
