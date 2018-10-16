

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Pervasives from "../../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../../../../tool/ui/BaseEventTool.js";
import * as ControllerTool$WonderEditor from "../../../../../../integration/redo_undo/tool/ControllerTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as TransformUtils$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/utils/TransformUtils.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../../../../src/service/state/engine/StateEngineService.js";
import * as TransformEventTool$WonderEditor from "../../../../../../tool/TransformEventTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../src/service/state/engine/TransformEngineService.js";

describe("controller inspector transform", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                TestTool$WonderEditor.closeContractCheck(/* () */0);
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                return ControllerTool$WonderEditor.run(/* () */0);
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                return TestTool$WonderEditor.openContractCheck(/* () */0);
              }));
        describe("test set transform in engine state", (function () {
                Wonder_jest.test("current gameObject's tranform position should set into engine", (function () {
                        var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                        var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                        var partial_arg = (155).toString();
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                return TransformEventTool$WonderEditor.triggerChangePositionX(partial_arg, param);
                              }));
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformEngineService$WonderEditor.getLocalPosition(currentGameObjectTransform, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* tuple */[
                                    155,
                                    0,
                                    0
                                  ]);
                      }));
                Wonder_jest.test("current gameObject's tranform scale should set into engine", (function () {
                        var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                        var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                        var partial_arg = Pervasives.string_of_float(19);
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                return TransformEventTool$WonderEditor.triggerChangeRotationX(partial_arg, param);
                              }));
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformUtils$WonderEditor.truncateTransformValue(TransformEngineService$WonderEditor.getLocalEulerAngles(currentGameObjectTransform, StateEngineService$WonderEditor.unsafeGetState(/* () */0)))), /* tuple */[
                                    19,
                                    0,
                                    0
                                  ]);
                      }));
                return Wonder_jest.test("current gameObject's tranform scale should set into engine", (function () {
                              var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                              var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                              var partial_arg = Pervasives.string_of_float(15);
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                      return TransformEventTool$WonderEditor.triggerChangeScaleX(partial_arg, param);
                                    }));
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformEngineService$WonderEditor.getLocalScale(currentGameObjectTransform, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* tuple */[
                                          15,
                                          1,
                                          1
                                        ]);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
