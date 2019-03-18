

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as ControllerTool$WonderEditor from "../../tool/ControllerTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../tool/GameObjectTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as TransformEngineService$WonderEditor from "../../../../../../src/service/state/engine/TransformEngineService.js";
import * as MainEditorTransformTool$WonderEditor from "../../../../../integration/inspector/composable_component/sceneTree_inspector/transform/tool/MainEditorTransformTool.js";

describe("controller inspector transform", (function () {
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
        describe("test set transform in engine state", (function () {
                return Wonder_jest.test("current gameObject's tranform position should set into engine", (function () {
                              ControllerTool$WonderEditor.run(/* () */0);
                              var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                              MainEditorTransformTool$WonderEditor.changePositionXAndBlur(155, currentGameObjectTransform, undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformEngineService$WonderEditor.getLocalPosition(currentGameObjectTransform, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* tuple */[
                                          155,
                                          0,
                                          0
                                        ]);
                            }));
              }));
        describe("fix bug", (function () {
                return Wonder_jest.test("should refresh transform when stop", (function () {
                              ControllerTool$WonderEditor.run(/* () */0);
                              var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                              MainEditorTransformTool$WonderEditor.changePositionXAndBlur(155, currentGameObjectTransform, undefined, undefined, /* () */0);
                              ControllerTool$WonderEditor.stop(/* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
