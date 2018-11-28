

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function immutableSet(key, value, map) {
  return SparseMapService$WonderCommonlib.set(key, value, map.slice());
}

function immutableDeleteVal(key, map) {
  return SparseMapService$WonderCommonlib.deleteVal(key, map.slice());
}

function isDeleted(item) {
  return item == null;
}

function filter(prim, prim$1) {
  return prim$1.filter(Curry.__1(prim));
}

function find(prim, prim$1) {
  return Js_primitive.undefined_to_opt(prim$1.find(Curry.__1(prim)));
}

function map(prim, prim$1) {
  return prim$1.map(Curry.__1(prim));
}

function includes(prim, prim$1) {
  return prim$1.includes(prim);
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

function filteriValid(func, map) {
  return map.filter((function (value, index) {
                if (value === undefined) {
                  return false;
                } else {
                  return func(value, index);
                }
              }));
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

function reduceValid(func, initValue, map) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (previousValue, value) {
                if (value === undefined) {
                  return previousValue;
                } else {
                  return func(previousValue, value);
                }
              }), initValue, map);
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

function mergeSparseMaps(mapArr) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (resultMap, map) {
                return reduceiValid((function (resultMap, value, key) {
                              return SparseMapService$WonderCommonlib.set(key, value, resultMap);
                            }), resultMap, map);
              }), SparseMapService$WonderCommonlib.createEmpty(/* () */0), mapArr);
}

var reduce = ArrayService$WonderCommonlib.reduceOneParam;

export {
  immutableSet ,
  immutableDeleteVal ,
  isDeleted ,
  filter ,
  find ,
  map ,
  includes ,
  length ,
  copy ,
  getValidValues ,
  getValidKeys ,
  getValidDataArr ,
  filteriValid ,
  forEachValid ,
  forEachiValid ,
  reduce ,
  reduceValid ,
  reduceiValid ,
  mergeSparseMaps ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
