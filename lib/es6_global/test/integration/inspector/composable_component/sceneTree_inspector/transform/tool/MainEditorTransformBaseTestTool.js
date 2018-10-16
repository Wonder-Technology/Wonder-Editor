

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_format from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_format.js";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../tool/ReactTestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";

function transformBaseTest(sandbox, describeName, param, param$1) {
  var changeZFunc = param$1[2];
  var changeYFunc = param$1[1];
  var changeXFunc = param$1[0];
  var getValueFunc = param[1];
  var defaultValue = param[0];
  describe(describeName, (function () {
          beforeEach((function () {
                  MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                  return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                }));
          describe("changeX should set current gameObject local x", (function () {
                  Wonder_jest.test("set x value to floatInput", (function () {
                          var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                          var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                          BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeXFunc, "-10.1213"));
                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                        }));
                  describe("set engine x value", (function () {
                          describe("if value's decimal digits <= 5, can set the whole value to engine", (function () {
                                  Wonder_jest.test("test < 5", (function () {
                                          var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                          var value = "-11.1111";
                                          var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                                          BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeXFunc, value));
                                          var match = Curry._1(getValueFunc, currentGameObjectTransform);
                                          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[0]), Caml_format.caml_float_of_string(value));
                                        }));
                                  return Wonder_jest.test("test = 5", (function () {
                                                var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                                var value = "-11.11112";
                                                var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                                                BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeXFunc, value));
                                                var match = Curry._1(getValueFunc, currentGameObjectTransform);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[0]), Caml_format.caml_float_of_string(value));
                                              }));
                                }));
                          describe("else", (function () {
                                  Wonder_jest.test("can't set the value to engine", (function () {
                                          var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                          var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                                          BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeXFunc, "-14.6613123"));
                                          var match = Curry._1(getValueFunc, currentGameObjectTransform);
                                          return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[0]), defaultValue);
                                        }));
                                  return Wonder_jest.test("get the x from engine should == last value", (function () {
                                                var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                                var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                                                var value1 = "-1.11222";
                                                BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeXFunc, value1));
                                                BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeXFunc, "-14.6613123"));
                                                var match = Curry._1(getValueFunc, currentGameObjectTransform);
                                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[0]), Caml_format.caml_float_of_string(value1));
                                              }));
                                }));
                          return /* () */0;
                        }));
                  return /* () */0;
                }));
          describe("changeY should set current gameObject local y", (function () {
                  Wonder_jest.test("set y value to floatInput", (function () {
                          var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                          var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                          BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeYFunc, "25.21246"));
                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                        }));
                  describe("set engine y value", (function () {
                          Wonder_jest.test("if value's decimal digits <= 5, can set the whole value to engine", (function () {
                                  var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                  var value = "-11.11112";
                                  var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                                  BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeYFunc, value));
                                  var match = Curry._1(getValueFunc, currentGameObjectTransform);
                                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), Caml_format.caml_float_of_string(value));
                                }));
                          Wonder_jest.test("if value is empty ", (function () {
                                  var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                  var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                                  BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeYFunc, ""));
                                  var match = Curry._1(getValueFunc, currentGameObjectTransform);
                                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), defaultValue);
                                }));
                          return Wonder_jest.test("else, get the y from engine should == last value", (function () {
                                        var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                        var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                                        var value1 = "-1.11222";
                                        BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeYFunc, value1));
                                        BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeYFunc, "-14.66132133"));
                                        var match = Curry._1(getValueFunc, currentGameObjectTransform);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[1]), Caml_format.caml_float_of_string(value1));
                                      }));
                        }));
                  return /* () */0;
                }));
          describe("changeZ should set current gameObject local z", (function () {
                  Wonder_jest.test("set z value to floatInput", (function () {
                          var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                          var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                          BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeZFunc, "155.2164"));
                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                        }));
                  describe("set engine z value", (function () {
                          Wonder_jest.test("if value's decimal digits <= 5, can set the whole value to engine", (function () {
                                  var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                  var value = "-11.1112";
                                  var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                                  BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeZFunc, value));
                                  var match = Curry._1(getValueFunc, currentGameObjectTransform);
                                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[2]), Caml_format.caml_float_of_string(value));
                                }));
                          return Wonder_jest.test("else, get the z from engine should == last value", (function () {
                                        var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                        var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                                        var value1 = "-1.23435";
                                        BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeZFunc, value1));
                                        BaseEventTool$WonderEditor.triggerComponentEvent(component, Curry._1(changeZFunc, "-24.6613123"));
                                        var match = Curry._1(getValueFunc, currentGameObjectTransform);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](match[2]), Caml_format.caml_float_of_string(value1));
                                      }));
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
