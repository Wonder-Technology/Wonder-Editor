

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTool$WonderEditor from "../../../tool/ui/ReactTool.js";
import * as SinonTool$WonderEditor from "../../../tool/SinonTool.js";
import * as FloatInputTool$WonderEditor from "../../../integration/tool/FloatInputTool.js";

describe("FloatInput", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test FloatInput component set float value", (function (param) {
                var _test = function (value, onChangeValue, onBlurValue) {
                  var onChangeFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                  var onBlurFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                  var state = ReactTool$WonderEditor.getUpdateState(FloatInputTool$WonderEditor.reducer(Caml_option.some(onBlurFunc), Caml_option.some(onChangeFunc), false, /* Change */[value], /* record */[
                            /* inputValue */undefined,
                            /* originValue */""
                          ], /* () */0));
                  ReactTool$WonderEditor.getUpdateState(FloatInputTool$WonderEditor.reducer(Caml_option.some(onBlurFunc), Caml_option.some(onChangeFunc), false, /* Blur */0, state, /* () */0));
                  return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                  Sinon.getCallCount(onChangeFunc),
                                  Sinon.getCallCount(onBlurFunc),
                                  SinonTool$WonderEditor.calledWith(onChangeFunc, onChangeValue),
                                  SinonTool$WonderEditor.calledWith(onBlurFunc, onBlurValue)
                                ]), /* tuple */[
                              1,
                              1,
                              true,
                              true
                            ]);
                };
                Wonder_jest.test("if float value's decimal digits <= 5, can set the whole value", (function (param) {
                        return _test("351687.54654", 351687.54654, 351687.54654);
                      }));
                return Wonder_jest.test("else, still set the whole value", (function (param) {
                              return _test("351687.54654111", 351687.54654111, 351687.54654111);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
