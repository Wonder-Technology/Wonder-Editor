

import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function immutableSet(key, value, map) {
  return SparseMapService$WonderCommonlib.set(key, value, map.slice());
}

function isDeleted(item) {
  return item == null;
}

function length(prim) {
  return prim.length;
}

function copy(prim) {
  return prim.slice();
}

function getValidValues(map) {
  return map.filter((function (value) {
                return value !== undefined;
              }));
}

function getValidKeys(map) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (arr, value, key) {
                if (value === undefined) {
                  return arr;
                } else {
                  arr.push(key);
                  return arr;
                }
              }), /* array */[], map);
}

function getValidDataArr(map) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (arr, value, key) {
                if (value === undefined) {
                  return arr;
                } else {
                  arr.push(/* tuple */[
                        key,
                        value
                      ]);
                  return arr;
                }
              }), /* array */[], map);
}

function forEachValid(func, map) {
  return ArrayService$WonderCommonlib.forEach((function (value) {
                if (value === undefined) {
                  return /* () */0;
                } else {
                  return func(value);
                }
              }), map);
}

function forEachiValid(func, map) {
  return ArrayService$WonderCommonlib.forEachi((function (value, index) {
                if (value === undefined) {
                  return /* () */0;
                } else {
                  return func(value, index);
                }
              }), map);
}

function reduceiValid(func, initValue, map) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (previousValue, value, index) {
                if (value === undefined) {
                  return previousValue;
                } else {
                  return func(previousValue, value, index);
                }
              }), initValue, map);
}

export {
  immutableSet ,
  isDeleted ,
  length ,
  copy ,
  getValidValues ,
  getValidKeys ,
  getValidDataArr ,
  forEachValid ,
  forEachiValid ,
  reduceiValid ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
