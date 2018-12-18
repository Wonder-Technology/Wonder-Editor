

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTool$WonderEditor from "../../../tool/ui/ReactTool.js";
import * as SinonTool$WonderEditor from "../../../tool/SinonTool.js";
import * as StringInput$WonderEditor from "../../../../src/core/atom_component/stringInput/StringInput.js";

describe("StringInput", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepare = function (param) {
          var onChangeFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
          var onBlurFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
          return /* tuple */[
                  /* record */[
                    /* inputValue */"",
                    /* originalName */"origin"
                  ],
                  onChangeFunc,
                  onBlurFunc
                ];
        };
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test input value", (function (param) {
                return Wonder_jest.test("component can set any string", (function (param) {
                              var match = _prepare(/* () */0);
                              var onBlurFunc = match[2];
                              var onChangeFunc = match[1];
                              var state = ReactTool$WonderEditor.getUpdateState(StringInput$WonderEditor.reducer(/* tuple */[
                                        onChangeFunc,
                                        onBlurFunc
                                      ], false, /* Change */["aaa"], match[0]));
                              var state$1 = ReactTool$WonderEditor.getUpdateState(StringInput$WonderEditor.reducer(/* tuple */[
                                        onChangeFunc,
                                        onBlurFunc
                                      ], false, /* Blur */0, state));
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              Sinon.getCallCount(onChangeFunc),
                                              Sinon.getCallCount(onBlurFunc),
                                              SinonTool$WonderEditor.calledWith(onChangeFunc, "aaa"),
                                              SinonTool$WonderEditor.calledWith(onBlurFunc, "aaa"),
                                              state$1[/* inputValue */0]
                                            ]), /* tuple */[
                                          1,
                                          1,
                                          true,
                                          true,
                                          "aaa"
                                        ]);
                            }));
              }));
        describe("deal with specific case", (function (param) {
                Wonder_jest.test("if canBeNull == true, key in '', trigger onBlur, the input value should be ''", (function (param) {
                        var match = _prepare(/* () */0);
                        var onBlurFunc = match[2];
                        var onChangeFunc = match[1];
                        var state = ReactTool$WonderEditor.getUpdateState(StringInput$WonderEditor.reducer(/* tuple */[
                                  onChangeFunc,
                                  onBlurFunc
                                ], true, /* Change */[""], match[0]));
                        var result = StringInput$WonderEditor.reducer(/* tuple */[
                              onChangeFunc,
                              onBlurFunc
                            ], true, /* Blur */0, state);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        Sinon.getCallCount(onChangeFunc),
                                        Sinon.getCallCount(onBlurFunc),
                                        SinonTool$WonderEditor.calledWith(onChangeFunc, ""),
                                        SinonTool$WonderEditor.calledWith(onBlurFunc, ""),
                                        state[/* inputValue */0],
                                        ReactTool$WonderEditor.isNoUpdate(result)
                                      ]), /* tuple */[
                                    1,
                                    1,
                                    true,
                                    true,
                                    "",
                                    true
                                  ]);
                      }));
                return Wonder_jest.test("if canBeNull == false, key in '', trigger onBlur, the input value should be original name and not trigger onBlur func", (function (param) {
                              var match = _prepare(/* () */0);
                              var onBlurFunc = match[2];
                              var onChangeFunc = match[1];
                              var state = match[0];
                              var originName = state[/* originalName */1];
                              var state$1 = ReactTool$WonderEditor.getUpdateState(StringInput$WonderEditor.reducer(/* tuple */[
                                        onChangeFunc,
                                        onBlurFunc
                                      ], false, /* Change */[""], state));
                              var state$2 = ReactTool$WonderEditor.getUpdateState(StringInput$WonderEditor.reducer(/* tuple */[
                                        onChangeFunc,
                                        onBlurFunc
                                      ], false, /* Blur */0, state$1));
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              Sinon.getCallCount(onChangeFunc),
                                              Sinon.getCallCount(onBlurFunc),
                                              SinonTool$WonderEditor.calledWith(onChangeFunc, ""),
                                              state$2[/* inputValue */0]
                                            ]), /* tuple */[
                                          1,
                                          0,
                                          true,
                                          originName
                                        ]);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
