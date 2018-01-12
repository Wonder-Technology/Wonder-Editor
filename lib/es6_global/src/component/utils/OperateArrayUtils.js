'use strict';

import * as Contract$WonderEditor from "../../definition/Contract.js";

function getFirst(arr) {
  return Contract$WonderEditor.ensureCheck((function (r) {
                return Contract$WonderEditor.test("array[0] element should exist", (function () {
                              return Contract$WonderEditor.assertNullableExist(r);
                            }));
              }), arr[0]);
}

function getNth(index, arr) {
  return Contract$WonderEditor.ensureCheck((function (r) {
                return Contract$WonderEditor.test("array[" + (String(index) + "] element should exist"), (function () {
                              return Contract$WonderEditor.assertNullableExist(r);
                            }));
              }), arr[index]);
}

function push(item, arr) {
  arr.push(item);
  return arr;
}

export {
  getFirst ,
  getNth   ,
  push     ,
  
}
/* Contract-WonderEditor Not a pure module */
