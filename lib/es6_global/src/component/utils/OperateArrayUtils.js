'use strict';

import * as Contract$WonderEditor       from "../../definition/Contract.js";
import * as ArraySystem$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArraySystem.js";

function getFirst(arr) {
  return Contract$WonderEditor.ensureCheck((function () {
                return Contract$WonderEditor.test("array[0] element should exist", (function () {
                              return Contract$WonderEditor.assertExist(ArraySystem$WonderCommonlib.get(0, arr));
                            }));
              }), arr[0]);
}

function getNth(index, arr) {
  return Contract$WonderEditor.ensureCheck((function () {
                return Contract$WonderEditor.test("array[" + (String(index) + "] element should exist"), (function () {
                              return Contract$WonderEditor.assertExist(ArraySystem$WonderCommonlib.get(index, arr));
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
