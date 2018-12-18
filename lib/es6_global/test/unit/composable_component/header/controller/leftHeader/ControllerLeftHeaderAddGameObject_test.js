

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
import * as MainEditorLeftHeaderTool$WonderEditor from "../../../mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";

describe("controller leftHeader add gameObject", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                return ControllerTool$WonderEditor.run(/* () */0);
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test add box", (function (param) {
                Wonder_jest.test("test add one box", (function (param) {
                        MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 5);
                      }));
                Wonder_jest.test("test add two boxes", (function (param) {
                        MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                        MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 6);
                      }));
                describe("test scene tree snapshot", (function (param) {
                        return Wonder_jest.test("test add one box", (function (param) {
                                      MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test add emptyGameObject", (function (param) {
                Wonder_jest.test("test add one emptyGameObject", (function (param) {
                        MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectUtils$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 5);
                      }));
                describe("test scene tree snanpshot", (function (param) {
                        return Wonder_jest.test("test add one emptyGameObject", (function (param) {
                                      MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
