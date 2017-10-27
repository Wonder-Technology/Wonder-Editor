'use strict';

import * as Jest  from "../../../node_modules/bs-jest/lib/es6_global/src/jest.js";
import * as Curry from "../../../node_modules/bs-platform/lib/es6/curry.js";

describe("Expect", (function () {
        Jest.test("toBe1", (function () {
                return Jest.Expect[/* toBe */2](3)(Jest.Expect[/* expect */0](3));
              }));
        return Jest.test("toBe2", (function () {
                      return Jest.Expect[/* toBe */2](3)(Jest.Expect[/* expect */0](3));
                    }));
      }));

describe("Expect.Operators", (function () {
        return Jest.test("==", (function () {
                      return Curry._2(Jest.Expect[/* Operators */23][/* == */0], Jest.Expect[/* expect */0](3), 3);
                    }));
      }));

export {
  
}
/*  Not a pure module */
