

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../tool/ReactTestTool.js";
import * as TypeArrayTool$WonderEditor from "../../../../../redo_undo/tool/TypeArrayTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as TransformUtils$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/utils/TransformUtils.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../src/service/state/engine/TransformEngineService.js";
import * as MainEditorTransformTool$WonderEditor from "../tool/MainEditorTransformTool.js";

describe("MainEditorTransform rotation", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test change rotation value", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                      }));
                describe("test change localEulerAngle x", (function () {
                        Wonder_jest.test("test snapshot", (function () {
                                var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                MainEditorTransformTool$WonderEditor.changeRotationX(currentGameObjectTransform, -10.1213);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform));
                              }));
                        return Wonder_jest.test("set to engine state", (function () {
                                      var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                      MainEditorTransformTool$WonderEditor.changeRotationX(currentGameObjectTransform, -10.1213);
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var match = TransformEngineService$WonderEditor.getLocalEulerAngles(currentGameObjectTransform, engineState);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      TypeArrayTool$WonderEditor.truncateFloatValue(5, match[0]),
                                                      match[1],
                                                      match[2]
                                                    ]), /* tuple */[
                                                  -10.1213,
                                                  0,
                                                  0
                                                ]);
                                    }));
                      }));
                describe("deal with the specific case", (function () {
                        beforeEach((function () {
                                var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                TransformUtils$WonderEditor.getTransformRotationData(currentGameObjectTransform);
                                return /* () */0;
                              }));
                        Wonder_jest.test("\n      1.getTransformRotationData;\n      2.set rotation to (x:-45.0, y:180.0, z:0.0);\n\n      inspector->transform->rotation should show (-45.0, 180.0, 0.0)\n      ", (function () {
                                var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                MainEditorTransformTool$WonderEditor.changeRotationX(currentGameObjectTransform, -45);
                                MainEditorTransformTool$WonderEditor.changeRotationY(currentGameObjectTransform, 180);
                                MainEditorTransformTool$WonderEditor.changeRotationZ(currentGameObjectTransform, -0);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform));
                              }));
                        return Wonder_jest.test("\n      1.getTransformRotationData;\n      2.set rotation to (x:-45.0, y:180.0);\n\n      inspector->transform->rotation should show (-45.0, 180.0, 0.0)\n      ", (function () {
                                      var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                      MainEditorTransformTool$WonderEditor.changeRotationX(currentGameObjectTransform, -45);
                                      MainEditorTransformTool$WonderEditor.changeRotationY(currentGameObjectTransform, 180);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
