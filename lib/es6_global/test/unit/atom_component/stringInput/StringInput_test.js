

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTestRenderer from "react-test-renderer";
import * as StringInput$WonderEditor from "../../../../src/core/atom_component/stringInput/StringInput.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";

describe("StringInput", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _triggerChangeInputEvent = function (value, domChildren) {
          var input = domChildren[1];
          return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
        };
        var _triggerBlurEvent = function (value, domChildren) {
          var input = domChildren[1];
          return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test input value", (function () {
                return Wonder_jest.test("component can set any string", (function () {
                              var component = ReactTestRenderer.create(ReasonReact.element(undefined, undefined, StringInput$WonderEditor.make("2", "xyz", undefined, undefined, undefined, /* array */[])));
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                      return _triggerChangeInputEvent("hello world", param);
                                    }));
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                      return _triggerChangeInputEvent("351687.5445456654", param);
                                    }));
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                            }));
              }));
        describe("test trigger event", (function () {
                describe("test onChange", (function () {
                        return Wonder_jest.test("exec onChange handle on change event", (function () {
                                      var value = /* record */[/* contents */""];
                                      var str = "-2313";
                                      var onChange = function (str) {
                                        value[0] = str;
                                        return /* () */0;
                                      };
                                      var component = ReactTestRenderer.create(ReasonReact.element(undefined, undefined, StringInput$WonderEditor.make("22", "xyz", onChange, undefined, undefined, /* array */[])));
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                              return _triggerChangeInputEvent(str, param);
                                            }));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), str);
                                    }));
                      }));
                describe("test onBlur", (function () {
                        return Wonder_jest.test("exec onBlur handle on change event", (function () {
                                      var value = /* record */[/* contents */""];
                                      var str = "I am the content";
                                      var onBlur = function (str) {
                                        value[0] = str;
                                        return /* () */0;
                                      };
                                      var component = ReactTestRenderer.create(ReasonReact.element(undefined, undefined, StringInput$WonderEditor.make("22", "xyz", undefined, onBlur, undefined, /* array */[])));
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                              return _triggerChangeInputEvent(str, param);
                                            }));
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                              return _triggerBlurEvent(str, param);
                                            }));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](value[0]), str);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("deal with specific case", (function () {
                Wonder_jest.test("if canBeNull == true, key in '', trigger onBlur, the input value should be ''", (function () {
                        var value = /* record */[/* contents */""];
                        var str = "";
                        var onBlur = function (str) {
                          value[0] = str;
                          return /* () */0;
                        };
                        var component = ReactTestRenderer.create(ReasonReact.element(undefined, undefined, StringInput$WonderEditor.make("I am content", "xyz", undefined, onBlur, undefined, /* array */[])));
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                return _triggerChangeInputEvent(str, param);
                              }));
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                return _triggerBlurEvent(str, param);
                              }));
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                      }));
                return Wonder_jest.test("if canBeNull == false, key in '', trigger onBlur, the input value should be original name", (function () {
                              var value = /* record */[/* contents */""];
                              var str = "";
                              var onBlur = function (str) {
                                value[0] = str;
                                return /* () */0;
                              };
                              var component = ReactTestRenderer.create(ReasonReact.element(undefined, undefined, StringInput$WonderEditor.make("I am content", "xyz", undefined, onBlur, false, /* array */[])));
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                      return _triggerChangeInputEvent(str, param);
                                    }));
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                      return _triggerBlurEvent(str, param);
                                    }));
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
