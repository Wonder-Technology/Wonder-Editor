

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";

function transformBaseTest(sandbox, describeName, param, param$1) {
  var changeXFunc = param$1[0];
  var getValueFunc = param[1];
  describe(describeName, (function (param) {
          beforeEach((function (param) {
                  MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                  return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                }));
          describe("changeX should set current gameObject->transform->value x", (function (param) {
                  Wonder_jest.test("set x value to floatInput", (function (param) {
                          var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                          Curry._2(changeXFunc, currentGameObjectTransform, -10.1213);
                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform));
                        }));
                  describe("set engine x value", (function (param) {
                          describe("if value's decimal digits <= 5, can set the whole value to engine", (function (param) {
                                  Wonder_jest.test("test < 5", (function (param) {
                                          var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                          Curry._2(changeXFunc, currentGameObjectTransform, -11.1111);
                                          var match = Curry._1(getValueFunc, currentGameObjectTransform);
                                          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[0]), -11.1111);
                                        }));
                                  Wonder_jest.test("test = 5", (function (param) {
                                          var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                          Curry._2(changeXFunc, currentGameObjectTransform, -11.11112);
                                          var match = Curry._1(getValueFunc, currentGameObjectTransform);
                                          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[0]), -11.11112);
                                        }));
                                  return Wonder_jest.test("get the x from engine should == last value", (function (param) {
                                                var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                                BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                                                Curry._2(changeXFunc, currentGameObjectTransform, -1.11222);
                                                Curry._2(changeXFunc, currentGameObjectTransform, -14.66131);
                                                var match = Curry._1(getValueFunc, currentGameObjectTransform);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[0]), -14.66131);
                                              }));
                                }));
                          describe("else", (function (param) {
                                  return Wonder_jest.test("should set truncated value to engine", (function (param) {
                                                var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                                Curry._2(changeXFunc, currentGameObjectTransform, -14.6613123);
                                                var match = Curry._1(getValueFunc, currentGameObjectTransform);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[0]), -14.66131);
                                              }));
                                }));
                          return /* () */0;
                        }));
                  return /* () */0;
                }));
          return /* () */0;
        }));
  return /* () */0;
}

export {
  transformBaseTest ,
  
}
/* Wonder_jest Not a pure module */
