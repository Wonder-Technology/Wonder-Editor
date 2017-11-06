'use strict';

import * as Jest               from "../../../../node_modules/wonder-bs-jest/lib/es6_global/src/jest.js";
import * as Curry              from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon              from "sinon";
import * as Sinon$WonderEditor from "../external/sinon.js";

describe("test sinon", (function () {
        var sandbox = Sinon$WonderEditor.getSandboxDefaultVal(/* () */0);
        beforeAll((function () {
                sandbox[0] = Sinon.sandbox.create();
                return /* () */0;
              }));
        afterAll((function () {
                return Curry._1(Sinon$WonderEditor.restoreSandbox, sandbox[0]);
              }));
        Jest.test("test1", (function () {
                var stub = Curry._1(Sinon$WonderEditor.createEmptyStub, sandbox[0]);
                Curry._1(stub, /* tuple */[
                      1,
                      2
                    ]);
                return Curry._2(Jest.Expect[/* Operators */23][/* = */5], Jest.Expect[/* expect */0](Sinon$WonderEditor.getArgsFromEmptyStub(Sinon$WonderEditor.getCall(stub, 0))), /* :: */[
                            /* tuple */[
                              1,
                              2
                            ],
                            /* [] */0
                          ]);
              }));
        Jest.test("test2", (function () {
                var obj = {
                  func: (function (x, y) {
                      return x + y | 0;
                    })
                };
                var stub = Curry._3(Sinon$WonderEditor.createMethodStub, sandbox[0], obj, "func");
                var func = obj.func;
                Curry._2(func, 1, 2);
                return Curry._2(Jest.Expect[/* Operators */23][/* = */5], Jest.Expect[/* expect */0](Sinon$WonderEditor.getArgs(Sinon$WonderEditor.getCall(stub, 0))), /* :: */[
                            1,
                            /* :: */[
                              2,
                              /* [] */0
                            ]
                          ]);
              }));
        describe("test extended sinon matcher for jest", (function () {
                Jest.test("test toCalledWith", (function () {
                        var obj = {
                          func: (function (x, y) {
                              return x + y | 0;
                            })
                        };
                        var stub = Curry._3(Sinon$WonderEditor.createMethodStub, sandbox[0], obj, "func");
                        var func = obj.func;
                        Curry._2(func, 1, 2);
                        Sinon$WonderEditor.toCalledWith(/* :: */[
                              1,
                              /* :: */[
                                2,
                                /* [] */0
                              ]
                            ], Jest.Expect[/* expect */0](Sinon$WonderEditor.getCall(stub, 0)));
                        return Sinon$WonderEditor.toCalledWith(/* :: */[
                                    2,
                                    /* :: */[
                                      2,
                                      /* [] */0
                                    ]
                                  ], Jest.Expect[/* not_ */22](Jest.Expect[/* expect */0](Sinon$WonderEditor.getCall(stub, 0))));
                      }));
                Jest.test("test toCalledBefore", (function () {
                        var obj = {
                          func1: (function (x, y) {
                              return x + y | 0;
                            }),
                          func2: (function (x, y) {
                              return x - y | 0;
                            })
                        };
                        var stub1 = Curry._3(Sinon$WonderEditor.createMethodStub, sandbox[0], obj, "func1");
                        var stub2 = Curry._3(Sinon$WonderEditor.createMethodStub, sandbox[0], obj, "func2");
                        var func = obj.func1;
                        Curry._2(func, 1, 2);
                        Sinon$WonderEditor.toCalledBefore(stub2, Jest.Expect[/* not_ */22](Jest.Expect[/* expect */0](stub1)));
                        var func$1 = obj.func2;
                        Curry._2(func$1, 2, 3);
                        return Sinon$WonderEditor.toCalledBefore(stub2, Jest.Expect[/* expect */0](stub1));
                      }));
                Jest.test("test toCalledAfter", (function () {
                        var obj = {
                          func1: (function (x, y) {
                              return x + y | 0;
                            }),
                          func2: (function (x, y) {
                              return x - y | 0;
                            })
                        };
                        var stub1 = Curry._3(Sinon$WonderEditor.createMethodStub, sandbox[0], obj, "func1");
                        var stub2 = Curry._3(Sinon$WonderEditor.createMethodStub, sandbox[0], obj, "func2");
                        var func = obj.func1;
                        Curry._2(func, 1, 2);
                        Sinon$WonderEditor.toCalledAfter(stub1, Jest.Expect[/* not_ */22](Jest.Expect[/* expect */0](stub2)));
                        var func$1 = obj.func2;
                        Curry._2(func$1, 2, 3);
                        return Sinon$WonderEditor.toCalledAfter(stub1, Jest.Expect[/* expect */0](stub2));
                      }));
                Jest.test("test toCalled", (function () {
                        var obj = {
                          func1: (function (x, y) {
                              return x + y | 0;
                            })
                        };
                        var stub1 = Curry._3(Sinon$WonderEditor.createMethodStub, sandbox[0], obj, "func1");
                        var func = obj.func1;
                        Sinon$WonderEditor.toCalled(Jest.Expect[/* not_ */22](Jest.Expect[/* expect */0](stub1)));
                        Curry._2(func, 1, 2);
                        return Sinon$WonderEditor.toCalled(Jest.Expect[/* expect */0](stub1));
                      }));
                Jest.test("test toCalledOnce", (function () {
                        var obj = {
                          func1: (function (x, y) {
                              return x + y | 0;
                            })
                        };
                        var stub1 = Curry._3(Sinon$WonderEditor.createMethodStub, sandbox[0], obj, "func1");
                        var func = obj.func1;
                        Curry._2(func, 1, 2);
                        Sinon$WonderEditor.toCalledOnce(Jest.Expect[/* expect */0](stub1));
                        Curry._2(func, 2, 2);
                        return Sinon$WonderEditor.toCalledOnce(Jest.Expect[/* not_ */22](Jest.Expect[/* expect */0](stub1)));
                      }));
                Jest.test("test toCalledTwice", (function () {
                        var obj = {
                          func1: (function (x, y) {
                              return x + y | 0;
                            })
                        };
                        var stub1 = Curry._3(Sinon$WonderEditor.createMethodStub, sandbox[0], obj, "func1");
                        var func = obj.func1;
                        Curry._2(func, 1, 2);
                        Sinon$WonderEditor.toCalledTwice(Jest.Expect[/* not_ */22](Jest.Expect[/* expect */0](stub1)));
                        Curry._2(func, 2, 2);
                        return Sinon$WonderEditor.toCalledTwice(Jest.Expect[/* expect */0](stub1));
                      }));
                Jest.test("test toCalledThrice", (function () {
                        var obj = {
                          func1: (function (x, y) {
                              return x + y | 0;
                            })
                        };
                        var stub1 = Curry._3(Sinon$WonderEditor.createMethodStub, sandbox[0], obj, "func1");
                        var func = obj.func1;
                        Curry._2(func, 1, 2);
                        Sinon$WonderEditor.toCalledThrice(Jest.Expect[/* not_ */22](Jest.Expect[/* expect */0](stub1)));
                        Curry._2(func, 2, 2);
                        Sinon$WonderEditor.toCalledThrice(Jest.Expect[/* not_ */22](Jest.Expect[/* expect */0](stub1)));
                        Curry._2(func, 3, 2);
                        return Sinon$WonderEditor.toCalledThrice(Jest.Expect[/* expect */0](stub1));
                      }));
                return Jest.test("test getCallCount", (function () {
                              var obj = {
                                func1: (function (x, y) {
                                    return x + y | 0;
                                  }),
                                func2: (function (x, y) {
                                    return x - y | 0;
                                  })
                              };
                              var stub1 = Curry._3(Sinon$WonderEditor.createMethodStub, sandbox[0], obj, "func1");
                              var stub2 = Curry._3(Sinon$WonderEditor.createMethodStub, sandbox[0], obj, "func2");
                              var func = obj.func1;
                              Curry._2(func, 1, 2);
                              Curry._2(func, 2, 2);
                              var func$1 = obj.func2;
                              Curry._2(func$1, 2, 3);
                              Curry._2(Jest.Expect[/* Operators */23][/* = */5], Jest.Expect[/* expect */0](Sinon$WonderEditor.getCallCount(stub1)), 2);
                              return Curry._2(Jest.Expect[/* Operators */23][/* = */5], Jest.Expect[/* expect */0](Sinon$WonderEditor.getCallCount(stub2)), 1);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
