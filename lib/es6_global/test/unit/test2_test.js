'use strict';

import * as Jest               from "../../../../node_modules/wonder-bs-jest/lib/es6_global/src/jest.js";
import * as Curry              from "../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon              from "sinon";
import * as Sinon$WonderEditor from "../external/sinon.js";

describe("expect", (function () {
        var sandbox = Sinon$WonderEditor.getSandboxDefaultVal(/* () */0);
        beforeAll((function () {
                sandbox[0] = Sinon.sandbox.create();
                return /* () */0;
              }));
        afterAll((function () {
                return Curry._1(Sinon$WonderEditor.restoreSandbox, sandbox[0]);
              }));
        describe("expect", (function () {
                Jest.test("tobe1", (function () {
                        return Jest.Expect[/* toBe */2](3)(Jest.Expect[/* expect */0](3));
                      }));
                return Jest.test("tobe2", (function () {
                              return Curry._2(Jest.Expect[/* Operators */23][/* = */5], Jest.Expect[/* expect */0](214), 214);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
