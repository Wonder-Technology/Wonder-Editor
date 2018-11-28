

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as ControllerTool$WonderEditor from "../../../controller/tool/ControllerTool.js";
import * as GameObjectUtils$WonderEditor from "../../../../../../src/core/utils/engine/GameObjectUtils.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../../tool/MainEditorSceneTreeTool.js";

describe("controller sceneTree", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                return ControllerTool$WonderEditor.run(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set parent in engine", (function () {
                Wonder_jest.test("no drag", (function () {
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                      }));
                return Wonder_jest.test("drag treeNode into target treeNode, set draged gameObject's parent to be target gameObject", (function () {
                              var targetGameObject = MainEditorSceneTool$WonderEditor.getBoxByIndex(0, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                              var dragedGameObject = MainEditorSceneTool$WonderEditor.getBoxByIndex(1, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectIntoGameObject */2](dragedGameObject, targetGameObject, undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectUtils$WonderEditor.getParent(dragedGameObject, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), targetGameObject);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
