'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../../tool/TestTool.js");
var ReactTestTool$WonderEditor = require("../../../../tool/ReactTestTool.js");
var ControllerTool$WonderEditor = require("../tool/ControllerTool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEngineService$WonderEditor = require("../../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var GeometryEngineService$WonderEditor = require("../../../../../src/service/state/engine/GeometryEngineService.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../../mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");

Wonder_jest.describe("controller leftHeader add gameObject", (function (param) {
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
        Wonder_jest.describe("test add cube", (function (param) {
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
                return Wonder_jest.describe("test scene tree snapshot", (function (param) {
                              return Wonder_jest.test("test add one cube", (function (param) {
                                            MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                          }));
                            }));
              }));
        Wonder_jest.describe("test add emptyGameObject", (function (param) {
                Wonder_jest.test("test add one emptyGameObject", (function (param) {
                        MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](HierarchyGameObjectEngineService$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0), StateEngineService$WonderEditor.unsafeGetState(/* () */0)).length), 5);
                      }));
                return Wonder_jest.describe("test scene tree snanpshot", (function (param) {
                              return Wonder_jest.test("test add one emptyGameObject", (function (param) {
                                            MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
                                            return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("test add sphere", (function (param) {
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
                      return Wonder_jest.describe("test scene tree snapshot", (function (param) {
                                    return Wonder_jest.test("test add one sphere", (function (param) {
                                                  MainEditorLeftHeaderTool$WonderEditor.addSphere(undefined, undefined, /* () */0);
                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
