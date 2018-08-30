

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as GeometryEngineService$WonderEditor from "../../../../../src/service/state/engine/GeometryEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../src/service/state/engine/MeshRendererEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("controller init default scene", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test ee engine state", (function () {
                describe("add grid plane gameObject", (function () {
                        describe("test components", (function () {
                                describe("add custom geometry component", (function () {
                                        return Wonder_jest.test("test vertices, indices", (function () {
                                                      var engineState = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
                                                      var gridPlaneGameObject = MainEditorSceneTool$WonderEditor.getGridPlaneInDefaultScene(engineState);
                                                      var geometry = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gridPlaneGameObject, engineState);
                                                      var vertices = GeometryEngineService$WonderEditor.getGeometryVertices(geometry, engineState);
                                                      var indices = GeometryEngineService$WonderEditor.getGeometryIndices(geometry, engineState);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      vertices.length,
                                                                      indices.length,
                                                                      vertices.slice(0, 10),
                                                                      indices.slice(0, 10)
                                                                    ]), /* tuple */[
                                                                  732,
                                                                  244,
                                                                  new Float32Array(/* array */[
                                                                        -300,
                                                                        0,
                                                                        -300,
                                                                        300,
                                                                        0,
                                                                        -300,
                                                                        -300,
                                                                        0,
                                                                        -300,
                                                                        -300
                                                                      ]),
                                                                  new Uint16Array(/* array */[
                                                                        0,
                                                                        1,
                                                                        2,
                                                                        3,
                                                                        4,
                                                                        5,
                                                                        6,
                                                                        7,
                                                                        8,
                                                                        9
                                                                      ])
                                                                ]);
                                                    }));
                                      }));
                                describe("add meshRenderer component", (function () {
                                        return Wonder_jest.test("drawMode should be Lines", (function () {
                                                      var engineState = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
                                                      var gridPlaneGameObject = MainEditorSceneTool$WonderEditor.getGridPlaneInDefaultScene(engineState);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererEngineService$WonderEditor.getDrawMode(GameObjectComponentEngineService$WonderEditor.getMeshRendererComponent(gridPlaneGameObject, engineState), engineState)), /* Lines */1);
                                                    }));
                                      }));
                                return Wonder_jest.test("add basic material component", (function () {
                                              var engineState = StateLogicService$WonderEditor.getEditEngineState(/* () */0);
                                              var gridPlaneGameObject = MainEditorSceneTool$WonderEditor.getGridPlaneInDefaultScene(engineState);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(gridPlaneGameObject, engineState)), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
