

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SceneTreeTool$WonderEditor from "../../../../../../../tool/SceneTreeTool.js";
import * as ControllerTool$WonderEditor from "../../../../../../../integration/redo_undo/tool/ControllerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../../tool/MainEditorSceneTool.js";
import * as AddableComponentTool$WonderEditor from "../../../../../../../integration/inspector/atom_component/addableComponent/tool/AddableComponentTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../../../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as MainEditorCameraViewTool$WonderEditor from "../../../../../../../integration/inspector/composable_component/sceneTree_inspector/cameraGroup/cameraView/tool/MainEditorCameraViewTool.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("controller cameraView", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test camera bind arcballCameraController event", (function () {
                describe("test has two cameras with arcballCameraController component", (function () {
                        beforeEach((function () {
                                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                                return Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                              }));
                        Wonder_jest.test("test click run, the current camera arcballCameraController should bind event, the other camera shouldn't bind event", (function () {
                                var match = AddableComponentTool$WonderEditor.getTwoAddedArcballCameraControllerCamera(sandbox);
                                ControllerTool$WonderEditor.run(/* () */0);
                                var runEngineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(match[0], runEngineState), runEngineState),
                                                ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(match[1], runEngineState), runEngineState)
                                              ]), /* tuple */[
                                            false,
                                            true
                                          ]);
                              }));
                        Wonder_jest.test("test click stop, the two camera arcballCameraController shouldn't bind event", (function () {
                                var match = AddableComponentTool$WonderEditor.getTwoAddedArcballCameraControllerCamera(sandbox);
                                ControllerTool$WonderEditor.run(/* () */0);
                                ControllerTool$WonderEditor.stop(/* () */0);
                                var runEngineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(match[0], runEngineState), runEngineState),
                                                ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(match[1], runEngineState), runEngineState)
                                              ]), /* tuple */[
                                            false,
                                            false
                                          ]);
                              }));
                        return Wonder_jest.test("test click run, then change current camera,the target camera should bind event, and the source camera shouldn't bind event", (function () {
                                      var match = AddableComponentTool$WonderEditor.getTwoAddedArcballCameraControllerCamera(sandbox);
                                      ControllerTool$WonderEditor.run(/* () */0);
                                      var runEngineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                      SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateTwoCamera[/* getFirstCameraDomIndex */0](/* () */0));
                                      MainEditorCameraViewTool$WonderEditor.triggerClickSetCurrentCameraEvent(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(match[0], runEngineState), runEngineState),
                                                      ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEvent(GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(match[1], runEngineState), runEngineState)
                                                    ]), /* tuple */[
                                                  true,
                                                  false
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
