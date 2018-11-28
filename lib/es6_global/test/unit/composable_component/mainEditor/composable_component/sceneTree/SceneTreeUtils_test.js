

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as SceneTreeUtils$WonderEditor from "../../../../../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as GameObjectUtils$WonderEditor from "../../../../../../src/core/utils/engine/GameObjectUtils.js";
import * as FakeGlToolEngine$WonderEditor from "../../../../../tool/engine/FakeGlToolEngine.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as GameObjectToolEngine$WonderEditor from "../../../../../tool/engine/GameObjectToolEngine.js";

describe("SceneTreeUtils", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("isGameObjectRelationError", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                        StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), engineState));
                        return /* () */0;
                      }));
                Wonder_jest.test("if draged and target gameObject is the same one, return true ", (function () {
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                              return SceneTreeUtils$WonderEditor.isGameObjectRelationError(1, 1, param);
                                            }))), true);
                      }));
                describe("else", (function () {
                        Wonder_jest.test("if draged gameObject is target gameObject's parent, return true", (function () {
                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                var match = GameObjectToolEngine$WonderEditor.createGameObject(engineState);
                                var gameObject1 = match[1];
                                var match$1 = GameObjectToolEngine$WonderEditor.createGameObject(match[0]);
                                var gameObject2 = match$1[1];
                                var engineState$1 = GameObjectUtils$WonderEditor.addChild(gameObject1, gameObject2, match$1[0]);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SceneTreeUtils$WonderEditor.isGameObjectRelationError(gameObject2, gameObject1, /* tuple */[
                                                    editorState,
                                                    engineState$1
                                                  ])), true);
                              }));
                        describe("else", (function () {
                                return Wonder_jest.test("if target gameObject is draged gameObject's parent, return true", (function () {
                                              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var match = GameObjectToolEngine$WonderEditor.createGameObject(engineState);
                                              var gameObject1 = match[1];
                                              var match$1 = GameObjectToolEngine$WonderEditor.createGameObject(match[0]);
                                              var gameObject2 = match$1[1];
                                              var engineState$1 = GameObjectUtils$WonderEditor.addChild(gameObject1, gameObject2, match$1[0]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](SceneTreeUtils$WonderEditor.isGameObjectRelationError(gameObject1, gameObject2, /* tuple */[
                                                                  editorState,
                                                                  engineState$1
                                                                ])), true);
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
