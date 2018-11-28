

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTool$WonderEditor from "../../../../../../tool/ui/ReactTool.js";
import * as FloatInputTool$WonderEditor from "../../../../../tool/FloatInputTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as TransformUtils$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/utils/TransformUtils.js";
import * as DirectorToolEngine$WonderEditor from "../../../../../../tool/engine/DirectorToolEngine.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorTransformTool$WonderEditor from "../tool/MainEditorTransformTool.js";
import * as MainEditorTransformTestTool$WonderEditor from "../tool/MainEditorTransformTestTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../../../tool/engine/NoWorkerJobConfigToolEngine.js";

describe("MainEditorTransform scale", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        MainEditorTransformTestTool$WonderEditor.transformBaseTest(sandbox, "test change scale value", /* tuple */[
              1,
              TransformUtils$WonderEditor.getTransformScaleData
            ], /* tuple */[
              MainEditorTransformTool$WonderEditor.changeScaleX,
              MainEditorTransformTool$WonderEditor.changeScaleY,
              MainEditorTransformTool$WonderEditor.changeScaleZ
            ]);
        describe("deal with specific case", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                        return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
                      }));
                describe("the scale value in engineState can't be 0", (function () {
                        return Wonder_jest.test("if input 0, set origin value to engineState instead of 0", (function () {
                                      GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                      var reasonStateUpdate = ReactTool$WonderEditor.getUpdateState(FloatInputTool$WonderEditor.reducer(undefined, undefined, true, /* Blur */0, /* record */[
                                                /* inputValue */"0.",
                                                /* originValue */"1.0"
                                              ], /* () */0));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](reasonStateUpdate[/* inputValue */0]), "0");
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
