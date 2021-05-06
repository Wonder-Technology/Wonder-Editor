'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ReactTool$WonderEditor = require("../../../tool/ui/ReactTool.js");
var SinonTool$WonderEditor = require("../../../tool/SinonTool.js");
var FloatInput$WonderEditor = require("../../../../src/core/atom_component/floatInput/FloatInput.js");
var FloatInputTool$WonderEditor = require("../../../integration/tool/FloatInputTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");

Wonder_jest.describe("FloatInput", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.describe("test FloatInput component set float value", (function (param) {
                var _test = function (value, onChangeValue, onBlurValue) {
                  var state = FloatInputTool$WonderEditor.buildState(undefined, undefined, undefined, undefined, /* () */0);
                  var onChangeFunc = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                  var onBlurFunc = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                  var state$1 = ReactTool$WonderEditor.getUpdateState(FloatInputTool$WonderEditor.reducer(Caml_option.some(onBlurFunc), Caml_option.some(onChangeFunc), false, /* Change */[value], state, /* () */0));
                  ReactTool$WonderEditor.getUpdateState(FloatInputTool$WonderEditor.reducer(Caml_option.some(onBlurFunc), Caml_option.some(onChangeFunc), false, /* Blur */1, state$1, /* () */0));
                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
        return Wonder_jest.describe("test drag header to change value", (function (param) {
                      var _buildFakeEvent = function ($staropt$star, $staropt$star$1, sandbox, param) {
                        var movementX = $staropt$star !== undefined ? $staropt$star : 0;
                        var movementY = $staropt$star$1 !== undefined ? $staropt$star$1 : 0;
                        return {
                                target: {
                                  requestPointerLock: Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0])
                                },
                                movementX: movementX,
                                movementY: movementY
                              };
                      };
                      Wonder_jest.describe("test drag start", (function (param) {
                              Wonder_jest.test("request target pointerLock", (function (param) {
                                      var send = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                      var $$event = _buildFakeEvent(undefined, undefined, sandbox, /* () */0);
                                      FloatInput$WonderEditor.Method[/* handleDragStart */7]($$event, send);
                                      return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0]($$event.target.requestPointerLock));
                                    }));
                              return Wonder_jest.describe("send DragStart", (function (param) {
                                            Wonder_jest.test("test send", (function (param) {
                                                    var send = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                                    var $$event = _buildFakeEvent(undefined, undefined, sandbox, /* () */0);
                                                    FloatInput$WonderEditor.Method[/* handleDragStart */7]($$event, send);
                                                    return Sinon.toCalledWith(/* array */[/* DragStart */0], Wonder_jest.Expect[/* expect */0](send));
                                                  }));
                                            return Wonder_jest.test("set state->isDragStart to true", (function (param) {
                                                          var state = FloatInputTool$WonderEditor.buildState(undefined, undefined, undefined, undefined, /* () */0);
                                                          var state$1 = ReactTool$WonderEditor.getUpdateState(FloatInputTool$WonderEditor.reducer(undefined, undefined, undefined, /* DragStart */0, state, /* () */0));
                                                          return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](state$1[/* isDragStart */2]), true);
                                                        }));
                                          }));
                            }));
                      Wonder_jest.describe("test drag over", (function (param) {
                              Wonder_jest.test("if not drag start, do nothing", (function (param) {
                                      var send = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                      var $$event = _buildFakeEvent(undefined, undefined, sandbox, /* () */0);
                                      var state = FloatInputTool$WonderEditor.buildState(undefined, undefined, undefined, false, /* () */0);
                                      FloatInput$WonderEditor.Method[/* handleDragOver */9]($$event, /* tuple */[
                                            send,
                                            state
                                          ]);
                                      return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](send)));
                                    }));
                              return Wonder_jest.describe("else", (function (param) {
                                            var _getNewValue = function (send) {
                                              return List.hd(Sinon.getArgs(Sinon.getCall(0, send)));
                                            };
                                            var _testChangeValue = function (movementX, movementY, targetValue, $staropt$star, $staropt$star$1, param) {
                                              var inputValue = $staropt$star !== undefined ? $staropt$star : "0.5";
                                              var canBeZero = $staropt$star$1 !== undefined ? $staropt$star$1 : true;
                                              var send = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                              var $$event = _buildFakeEvent(movementX, movementY, sandbox, /* () */0);
                                              var state = FloatInputTool$WonderEditor.buildState(canBeZero, undefined, Caml_option.some(inputValue), true, /* () */0);
                                              FloatInput$WonderEditor.Method[/* handleDragOver */9]($$event, /* tuple */[
                                                    send,
                                                    state
                                                  ]);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](_getNewValue(send)), /* Change */[targetValue]);
                                            };
                                            Wonder_jest.test("if mouse move up, increase value", (function (param) {
                                                    return _testChangeValue(0, -2, "0.52", undefined, undefined, /* () */0);
                                                  }));
                                            Wonder_jest.test("if mouse move right, increase value", (function (param) {
                                                    return _testChangeValue(2, 0, "0.52", undefined, undefined, /* () */0);
                                                  }));
                                            Wonder_jest.test("if mouse move down, decrease value", (function (param) {
                                                    return _testChangeValue(0, 2, "0.48", undefined, undefined, /* () */0);
                                                  }));
                                            Wonder_jest.test("if mouse move left, decrease value", (function (param) {
                                                    return _testChangeValue(-2, 0, "0.48", undefined, undefined, /* () */0);
                                                  }));
                                            return Wonder_jest.describe("if change value to nearly zero", (function (param) {
                                                          Wonder_jest.test("if canBeZero === false, use 0.001 instead", (function (param) {
                                                                  return _testChangeValue(-2, 0, "0.001", "0.0201", false, /* () */0);
                                                                }));
                                                          return Wonder_jest.test("else, remain changed value", (function (param) {
                                                                        return _testChangeValue(-2, 0, "0.0001", "0.0201", true, /* () */0);
                                                                      }));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("test drag drop", (function (param) {
                                    var _handleDragDrop = function (send, state, $staropt$star, $staropt$star$1, param) {
                                      var $$event = $staropt$star !== undefined ? Caml_option.valFromOption($staropt$star) : _buildFakeEvent(undefined, undefined, sandbox, /* () */0);
                                      var onDragDrop = $staropt$star$1 !== undefined ? $staropt$star$1 : Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                      return FloatInput$WonderEditor.Method[/* handleDragDrop */8]($$event, /* tuple */[
                                                  send,
                                                  state
                                                ], onDragDrop);
                                    };
                                    Wonder_jest.describe("if not drag start", (function (param) {
                                            return Wonder_jest.test("not exec onDragDrop", (function (param) {
                                                          var onDragDrop = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                                          var send = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                                          var state = FloatInputTool$WonderEditor.buildState(undefined, undefined, undefined, false, /* () */0);
                                                          _handleDragDrop(send, state, undefined, onDragDrop, /* () */0);
                                                          return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](onDragDrop)));
                                                        }));
                                          }));
                                    return Wonder_jest.describe("else", (function (param) {
                                                  var $$document = /* record */[/* contents */-1];
                                                  var _prepareDocument = function (sandbox){
 document.exitPointerLock = sandbox.stub();

 return document;
  };
                                                  beforeEach((function () {
                                                          $$document[0] = _prepareDocument(sandbox[0]);
                                                          return /* () */0;
                                                        }));
                                                  Wonder_jest.test("exec onDragDrop", (function (param) {
                                                          var onDragDrop = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                                          var send = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                                          var state = FloatInputTool$WonderEditor.buildState(undefined, undefined, undefined, true, /* () */0);
                                                          _handleDragDrop(send, state, undefined, onDragDrop, /* () */0);
                                                          return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](onDragDrop));
                                                        }));
                                                  Wonder_jest.test("exit pointer lock", (function (param) {
                                                          var send = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                                          var state = FloatInputTool$WonderEditor.buildState(undefined, undefined, undefined, true, /* () */0);
                                                          _handleDragDrop(send, state, undefined, undefined, /* () */0);
                                                          return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0]($$document[0].exitPointerLock));
                                                        }));
                                                  return Wonder_jest.test("send DragDrop", (function (param) {
                                                                var send = Curry._1(SinonTool$WonderEditor.createOneLengthStub, sandbox[0]);
                                                                var state = FloatInputTool$WonderEditor.buildState(undefined, undefined, undefined, true, /* () */0);
                                                                _handleDragDrop(send, state, undefined, undefined, /* () */0);
                                                                return Sinon.toCalledWith(/* array */[/* DragDrop */2], Wonder_jest.Expect[/* expect */0](send));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
