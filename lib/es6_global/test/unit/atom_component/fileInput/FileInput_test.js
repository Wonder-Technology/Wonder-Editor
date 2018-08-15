

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTestRenderer from "react-test-renderer";
import * as FileInput$WonderEditor from "../../../../src/core/atom_component/fileInput/FileInput.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";

describe("FileInput", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _triggerClickShowInputEvent = function (domChildren) {
          return BaseEventTool$WonderEditor.triggerClickEvent(domChildren[0]);
        };
        var _triggerChangeTextAreaEvent = function (value, domChildren) {
          var article = domChildren[1];
          var textarea = article.children[0];
          return BaseEventTool$WonderEditor.triggerChangeEvent(textarea, BaseEventTool$WonderEditor.buildFormEvent(value));
        };
        var _triggerSubmitClickEvent = function (domChildren) {
          var article = domChildren[1];
          return BaseEventTool$WonderEditor.triggerClickEvent(article.children[1]);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test workflow", (function () {
                Wonder_jest.test("set showInput button text", (function () {
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(ReactTestRenderer.create(ReasonReact.element(undefined, undefined, FileInput$WonderEditor.make("showInput", undefined, /* array */[]))));
                      }));
                Wonder_jest.test("click the showInput button, show the textarea and submit-button", (function () {
                        var component = ReactTestRenderer.create(ReasonReact.element(undefined, undefined, FileInput$WonderEditor.make("showInput", undefined, /* array */[])));
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, _triggerClickShowInputEvent);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                      }));
                Wonder_jest.test("key in text", (function () {
                        var component = ReactTestRenderer.create(ReasonReact.element(undefined, undefined, FileInput$WonderEditor.make("showInput", undefined, /* array */[])));
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, _triggerClickShowInputEvent);
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                return _triggerChangeTextAreaEvent("you can input value in textarea", param);
                              }));
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                      }));
                return Wonder_jest.test("click submit-button,the onSubmit method should be called", (function () {
                              var inputValue = "you can click submit after input value";
                              var onSubmit = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var component = ReactTestRenderer.create(ReasonReact.element(undefined, undefined, FileInput$WonderEditor.make("showInput", onSubmit, /* array */[])));
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, _triggerClickShowInputEvent);
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                      return _triggerChangeTextAreaEvent(inputValue, param);
                                    }));
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, _triggerSubmitClickEvent);
                              return Sinon.toCalledWith(/* array */[inputValue], Wonder_jest.Expect[/* expect */0](onSubmit));
                            }));
              }));
        describe("deal with the specific case", (function () {
                Wonder_jest.test("if submit method not pass in, shouldn't handle onSubmit method", (function () {
                        var onSubmit = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                        var component = ReactTestRenderer.create(ReasonReact.element(undefined, undefined, FileInput$WonderEditor.make("showInput", undefined, /* array */[])));
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, _triggerClickShowInputEvent);
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                return _triggerChangeTextAreaEvent("this is value", param);
                              }));
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, _triggerSubmitClickEvent);
                        return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](onSubmit)));
                      }));
                return Wonder_jest.test("if input value == '', click submit-button shouldn't handle onSubmit method", (function () {
                              var onSubmit = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              var component = ReactTestRenderer.create(ReasonReact.element(undefined, undefined, FileInput$WonderEditor.make("showInput", onSubmit, /* array */[])));
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, _triggerClickShowInputEvent);
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                      return _triggerChangeTextAreaEvent("", param);
                                    }));
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, _triggerSubmitClickEvent);
                              return Sinon.toCalled(Wonder_jest.Expect[/* not_ */22](Wonder_jest.Expect[/* expect */0](onSubmit)));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
