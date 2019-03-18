

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as ReactTestTool$WonderEditor from "../../../../tool/ReactTestTool.js";
import * as ControllerTool$WonderEditor from "../tool/ControllerTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as GeometryEngineService$WonderEditor from "../../../../../src/service/state/engine/GeometryEngineService.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

describe("controller leftHeader add gameObject", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                return ControllerTool$WonderEditor.run(/* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test add cube", (function () {
                Wonder_jest.test("test add one cube", (function (param) {
                        MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 5);
                      }));
                Wonder_jest.test("test add two cubees", (function (param) {
                        MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                        MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 6);
                      }));
                Wonder_jest.test("the added cube's geometry's name should be Wonder-Default-Cube", (function (param) {
                        var addedCubeUid = GameObjectTool$WonderEditor.getNewGameObject(undefined, /* () */0);
                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                        MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryEngineService$WonderEditor.unsafeGetGeometryName(GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(addedCubeUid, engineState), engineState)), "Wonder-Default-Cube");
                      }));
                describe("test scene tree snapshot", (function () {
                        return Wonder_jest.test("test add one cube", (function (param) {
                                      MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test add emptyGameObject", (function () {
                Wonder_jest.test("test add one emptyGameObject", (function (param) {
                        MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 5);
                      }));
                describe("test scene tree snanpshot", (function () {
                        return Wonder_jest.test("test add one emptyGameObject", (function (param) {
                                      MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test add sphere", (function () {
                Wonder_jest.test("test add one sphere", (function (param) {
                        MainEditorLeftHeaderTool$WonderEditor.addSphere(undefined, undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 5);
                      }));
                Wonder_jest.test("test add two spheres", (function (param) {
                        MainEditorLeftHeaderTool$WonderEditor.addSphere(undefined, undefined, /* () */0);
                        MainEditorLeftHeaderTool$WonderEditor.addSphere(undefined, undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 6);
                      }));
                Wonder_jest.test("the added sphere's geometry's name should be Wonder-Default-Sphere", (function (param) {
                        var addedSphereUid = GameObjectTool$WonderEditor.getNewGameObject(undefined, /* () */0);
                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                        MainEditorLeftHeaderTool$WonderEditor.addSphere(undefined, undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryEngineService$WonderEditor.unsafeGetGeometryName(GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(addedSphereUid, engineState), engineState)), "Wonder-Default-Sphere");
                      }));
                describe("test scene tree snapshot", (function () {
                        return Wonder_jest.test("test add one sphere", (function (param) {
                                      MainEditorLeftHeaderTool$WonderEditor.addSphere(undefined, undefined, /* () */0);
                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
