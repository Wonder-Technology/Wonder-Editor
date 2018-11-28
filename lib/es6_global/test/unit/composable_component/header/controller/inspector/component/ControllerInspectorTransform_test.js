

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as ControllerTool$WonderEditor from "../../../../controller/tool/ControllerTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as StateEngineService$WonderEditor from "../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../src/service/state/engine/TransformEngineService.js";
import * as MainEditorTransformTool$WonderEditor from "../../../../../../integration/inspector/composable_component/sceneTree_inspector/transform/tool/MainEditorTransformTool.js";

describe("controller inspector transform", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                TestTool$WonderEditor.closeContractCheck(/* () */0);
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                return ControllerTool$WonderEditor.run(/* () */0);
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                return TestTool$WonderEditor.openContractCheck(/* () */0);
              }));
        describe("test set transform in engine state", (function () {
                return Wonder_jest.test("current gameObject's tranform position should set into engine", (function () {
                              var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                              MainEditorTransformTool$WonderEditor.changePositionXAndBlur(155, currentGameObjectTransform, undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformEngineService$WonderEditor.getLocalPosition(currentGameObjectTransform, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), /* tuple */[
                                          155,
                                          0,
                                          0
                                        ]);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
