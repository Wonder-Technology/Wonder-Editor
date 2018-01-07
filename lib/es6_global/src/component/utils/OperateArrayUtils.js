'use strict';

import * as Contract$WonderEditor       from "../../definition/Contract.js";
import * as ArraySystem$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArraySystem.js";

function getFirst(arr) {
  Contract$WonderEditor.requireCheck((function () {
          return Contract$WonderEditor.test("arrary:first element should exist", (function () {
                        return Contract$WonderEditor.assertExist(ArraySystem$WonderCommonlib.get(0, arr));
                      }));
        }));
  return arr[0];
}

function push(item, arr) {
  arr.push(item);
  return arr;
}

export {
  getFirst ,
  push     ,
  
}
/* ArraySystem-WonderCommonlib Not a pure module */
