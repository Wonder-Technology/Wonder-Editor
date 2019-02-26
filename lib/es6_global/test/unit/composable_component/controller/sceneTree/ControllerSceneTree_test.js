

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as ControllerTool$WonderEditor from "../tool/ControllerTool.js";
import * as EventListenerTool$WonderEditor from "../../../tool/EventListenerTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../tool/MainEditorSceneTreeTool.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

describe("controller sceneTree", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                return ControllerTool$WonderEditor.run(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set parent in engine", (function () {
                Wonder_jest.test("no drag", (function () {
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                      }));
                return Wonder_jest.test("drag treeNode into target treeNode, set dragged gameObject's parent to be target gameObject", (function () {
                              var targetGameObject = MainEditorSceneTool$WonderEditor.getCubeByIndex(0, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                              var draggedGameObject = MainEditorSceneTool$WonderEditor.getCubeByIndex(1, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                              MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](draggedGameObject, targetGameObject, undefined, undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getParentTransform(draggedGameObject, StateEngineService$WonderEditor.unsafeGetState(/* () */0))), targetGameObject);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
