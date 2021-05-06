'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MouseEventTool$WonderEditor = require("../../integration/job/tool/MouseEventTool.js");
var MouseEventService$WonderEditor = require("../../../src/service/record/editor/event/MouseEventService.js");

Wonder_jest.describe("MouseEventService", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("getMovementDeltaWhenPointerLockedAndFixBug", (function (param) {
                      return Wonder_jest.describe("replace exception movement delta to zero data", (function (param) {
                                    Wonder_jest.test("if movementX > 500, return zero", (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MouseEventService$WonderEditor.getMovementDeltaWhenPointerLockedAndFixBug(MouseEventTool$WonderEditor.buildMouseDomEvent(undefined, undefined, undefined, 501, 1, undefined, undefined, undefined, undefined, undefined, /* () */0))), /* tuple */[
                                                        0,
                                                        0
                                                      ]);
                                          }));
                                    Wonder_jest.test("if movementY > 500, return zero", (function (param) {
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MouseEventService$WonderEditor.getMovementDeltaWhenPointerLockedAndFixBug(MouseEventTool$WonderEditor.buildMouseDomEvent(undefined, undefined, undefined, 1, 501, undefined, undefined, undefined, undefined, undefined, /* () */0))), /* tuple */[
                                                        0,
                                                        0
                                                      ]);
                                          }));
                                    return Wonder_jest.test("else, return data", (function (param) {
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MouseEventService$WonderEditor.getMovementDeltaWhenPointerLockedAndFixBug(MouseEventTool$WonderEditor.buildMouseDomEvent(undefined, undefined, undefined, 1, 2, undefined, undefined, undefined, undefined, undefined, /* () */0))), /* tuple */[
                                                              1,
                                                              2
                                                            ]);
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
