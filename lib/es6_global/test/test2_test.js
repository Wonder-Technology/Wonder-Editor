'use strict';

import * as Jest  from "../../../node_modules/bs-jest/lib/es6_global/src/jest.js";
import * as Curry from "../../../node_modules/bs-platform/lib/es6/curry.js";

describe("Expect", (function () {
        return Jest.test("toBe", (function () {
                      return Jest.Expect[/* toBe */2](3)(Jest.Expect[/* expect */0](3));
                    }));
      }));

describe("Expect.Operators", (function () {
        return Jest.test("==", (function () {
                      return Curry._2(Jest.Expect[/* Operators */23][/* = */5], Jest.Expect[/* expect */0](3), 3);
                    }));
      }));

export {
  
}
/*  Not a pure module */
