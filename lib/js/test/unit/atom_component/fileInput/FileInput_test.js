'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ReactTestRenderer = require("react-test-renderer");
var FileInput$WonderEditor = require("../../../../src/core/atom_component/fileInput/FileInput.js");
var SinonTool$WonderEditor = require("../../../tool/SinonTool.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");

Wonder_jest.describe("FileInput", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test workflow", (function (param) {
                Wonder_jest.test("set showInput button text", (function (param) {
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(ReactTestRenderer.create(ReasonReact.element(undefined, undefined, FileInput$WonderEditor.make("showInput", undefined, undefined, undefined, /* array */[]))));
                      }));
                Wonder_jest.test("click the showInput button, show the textarea and submit-button", (function (param) {
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(ReactTestRenderer.create(ReasonReact.element(undefined, undefined, FileInput$WonderEditor.make("showInput", undefined, true, undefined, /* array */[]))));
                      }));
                Wonder_jest.test("key in text", (function (param) {
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(ReactTestRenderer.create(ReasonReact.element(undefined, undefined, FileInput$WonderEditor.make("showInput", undefined, true, "you can input value in textarea", /* array */[]))));
                      }));
                return Wonder_jest.describe("submit", (function (param) {
                              Wonder_jest.test("click submit-button,the onSubmit func should be called", (function (param) {
                                      var inputValue = "you can click submit after input value";
                                      var onSubmitFunc = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                      var state = /* record */[
                                        /* inputValue */inputValue,
                                        /* isShowInput */true
                                      ];
                                      FileInput$WonderEditor.reducer(onSubmitFunc, /* Submit */1)(state);
                                      return Sinon.toCalledWith(/* array */[inputValue], Wonder_jest.Expect[/* expect */0](onSubmitFunc));
                                    }));
                              return Wonder_jest.test("submit trimed inputValue", (function (param) {
                                            var onSubmitFunc = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                            FileInput$WonderEditor.reducer(onSubmitFunc, /* Submit */1)(/* record */[
                                                  /* inputValue */" aaa ",
                                                  /* isShowInput */true
                                                ]);
                                            return Sinon.toCalledWith(/* array */["aaa"], Wonder_jest.Expect[/* expect */0](onSubmitFunc));
                                          }));
                            }));
              }));
        return Wonder_jest.describe("deal with the specific case", (function (param) {
                      return Wonder_jest.test("if input value == '', click submit-button shouldn't handle onSubmit func", (function (param) {
                                    var onSubmitFunc = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                    FileInput$WonderEditor.reducer(onSubmitFunc, /* Submit */1)(/* record */[
                                          /* inputValue */"",
                                          /* isShowInput */true
                                        ]);
                                    return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](onSubmitFunc)));
                                  }));
                    }));
      }));

/*  Not a pure module */
