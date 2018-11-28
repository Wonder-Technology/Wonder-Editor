

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../../../../tool/ui/BaseEventTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as TransformUtils$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/utils/TransformUtils.js";
import * as EventListenerTool$WonderEditor from "../../../../../../unit/tool/EventListenerTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as DirectorToolEngine$WonderEditor from "../../../../../../tool/engine/DirectorToolEngine.js";
import * as TransformEventTool$WonderEditor from "../../../../../../tool/TransformEventTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as MainEditorTransformBaseTestTool$WonderEditor from "../tool/MainEditorTransformBaseTestTool.js";

describe("MainEditorTransform scale", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        MainEditorTransformBaseTestTool$WonderEditor.transformBaseTest(sandbox, "test change scale value", /* tuple */[
              1,
              TransformUtils$WonderEditor.getTransformScaleData
            ], /* tuple */[
              TransformEventTool$WonderEditor.triggerChangeScaleX,
              TransformEventTool$WonderEditor.triggerChangeScaleY,
              TransformEventTool$WonderEditor.triggerChangeScaleZ
            ]);
        describe("deal with specific case", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                        Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                        return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                      }));
                describe("the scale value in engineState can't be 0", (function () {
                        return Wonder_jest.test("if input 0, set origin value to engineState instead of 0", (function () {
                                      var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                      var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                              return TransformEventTool$WonderEditor.triggerChangeScaleZ("0", param);
                                            }));
                                      var match = TransformUtils$WonderEditor.getTransformScaleData(currentGameObjectTransform);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[2]), 1);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
