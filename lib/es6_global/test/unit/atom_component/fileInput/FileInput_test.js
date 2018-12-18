

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTestRenderer from "react-test-renderer";
import * as FileInput$WonderEditor from "../../../../src/core/atom_component/fileInput/FileInput.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";

describe("FileInput", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test workflow", (function (param) {
                Wonder_jest.test("set showInput button text", (function (param) {
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(ReactTestRenderer.create(ReasonReact.element(undefined, undefined, FileInput$WonderEditor.make("showInput", undefined, undefined, undefined, /* array */[]))));
                      }));
                Wonder_jest.test("click the showInput button, show the textarea and submit-button", (function (param) {
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(ReactTestRenderer.create(ReasonReact.element(undefined, undefined, FileInput$WonderEditor.make("showInput", undefined, true, undefined, /* array */[]))));
                      }));
                Wonder_jest.test("key in text", (function (param) {
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(ReactTestRenderer.create(ReasonReact.element(undefined, undefined, FileInput$WonderEditor.make("showInput", undefined, true, "you can input value in textarea", /* array */[]))));
                      }));
                describe("submit", (function (param) {
                        Wonder_jest.test("click submit-button,the onSubmit func should be called", (function (param) {
                                var inputValue = "you can click submit after input value";
                                var onSubmitFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                var state = /* record */[
                                  /* inputValue */inputValue,
                                  /* isShowInput */true
                                ];
                                FileInput$WonderEditor.reducer(onSubmitFunc, /* Submit */1)(state);
                                return Sinon.toCalledWith(/* array */[inputValue], Wonder_jest.Expect[/* expect */0](onSubmitFunc));
                              }));
                        return Wonder_jest.test("submit trimed inputValue", (function (param) {
                                      var onSubmitFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      FileInput$WonderEditor.reducer(onSubmitFunc, /* Submit */1)(/* record */[
                                            /* inputValue */" aaa ",
                                            /* isShowInput */true
                                          ]);
                                      return Sinon.toCalledWith(/* array */["aaa"], Wonder_jest.Expect[/* expect */0](onSubmitFunc));
                                    }));
                      }));
                return /* () */0;
              }));
        describe("deal with the specific case", (function (param) {
                return Wonder_jest.test("if input value == '', click submit-button shouldn't handle onSubmit func", (function (param) {
                              var onSubmitFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              FileInput$WonderEditor.reducer(onSubmitFunc, /* Submit */1)(/* record */[
                                    /* inputValue */"",
                                    /* isShowInput */true
                                  ]);
                              return Sinon.toCalled(Wonder_jest.Expect[/* noT_ */22](Wonder_jest.Expect[/* expect */0](onSubmitFunc)));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
