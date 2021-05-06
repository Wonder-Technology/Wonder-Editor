'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ReactTool$WonderEditor = require("../../../tool/ui/ReactTool.js");
var SinonTool$WonderEditor = require("../../../tool/SinonTool.js");
var StringInput$WonderEditor = require("../../../../src/core/atom_component/stringInput/StringInput.js");

Wonder_jest.describe("StringInput", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepare = function (param) {
          var onChangeFunc = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
          var onBlurFunc = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
          return /* tuple */[
                  /* record */[
                    /* inputValue */"",
                    /* originValue */"origin"
                  ],
                  onChangeFunc,
                  onBlurFunc
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test input value", (function (param) {
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
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
        return Wonder_jest.describe("deal with specific case", (function (param) {
                      Wonder_jest.test("if canBeNull == true, key in '', trigger onBlur, the input value should be ''", (function (param) {
                              var match = _prepare(/* () */0);
                              var onBlurFunc = match[2];
                              var onChangeFunc = match[1];
                              var state = ReactTool$WonderEditor.getUpdateState(StringInput$WonderEditor.reducer(/* tuple */[
                                        onChangeFunc,
                                        onBlurFunc
                                      ], true, /* Change */[""], match[0]));
                              StringInput$WonderEditor.reducer(/* tuple */[
                                    onChangeFunc,
                                    onBlurFunc
                                  ], true, /* Blur */0, state);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              Sinon.getCallCount(onChangeFunc),
                                              Sinon.getCallCount(onBlurFunc),
                                              SinonTool$WonderEditor.calledWith(onChangeFunc, ""),
                                              SinonTool$WonderEditor.calledWith(onBlurFunc, ""),
                                              state[/* inputValue */0]
                                            ]), /* tuple */[
                                          1,
                                          1,
                                          true,
                                          true,
                                          ""
                                        ]);
                            }));
                      Wonder_jest.test("if canBeNull == false, key in '', trigger onBlur, the input value should be original name and not trigger onBlur func", (function (param) {
                              var match = _prepare(/* () */0);
                              var onBlurFunc = match[2];
                              var onChangeFunc = match[1];
                              var state = match[0];
                              var originName = state[/* originValue */1];
                              var state$1 = ReactTool$WonderEditor.getUpdateState(StringInput$WonderEditor.reducer(/* tuple */[
                                        onChangeFunc,
                                        onBlurFunc
                                      ], false, /* Change */[""], state));
                              var state$2 = ReactTool$WonderEditor.getUpdateState(StringInput$WonderEditor.reducer(/* tuple */[
                                        onChangeFunc,
                                        onBlurFunc
                                      ], false, /* Blur */0, state$1));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                      return Wonder_jest.describe("test value not change", (function (param) {
                                    var _test = function (canBeNull) {
                                      var match = _prepare(/* () */0);
                                      var onBlurFunc = match[2];
                                      var onChangeFunc = match[1];
                                      var state = match[0];
                                      var originName = state[/* originValue */1];
                                      var state$1 = ReactTool$WonderEditor.getUpdateState(StringInput$WonderEditor.reducer(/* tuple */[
                                                onChangeFunc,
                                                onBlurFunc
                                              ], canBeNull, /* Change */[originName], state));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ReactTool$WonderEditor.isNoUpdate(StringInput$WonderEditor.reducer(/* tuple */[
                                                              onChangeFunc,
                                                              onBlurFunc
                                                            ], false, /* Blur */0, state$1))), true);
                                    };
                                    Wonder_jest.test("if canBeNull == true and value not change, trigger onBlur, shouldn't update", (function (param) {
                                            return _test(true);
                                          }));
                                    return Wonder_jest.test("if canBeNull == false and value not change, trigger onBlur, shouldn't update", (function (param) {
                                                  return _test(false);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
