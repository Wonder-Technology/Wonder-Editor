

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

function getValidDataArr(map) {
  return ImmutableSparseMapService$WonderCommonlib.reduceiValid((function (arr, value, key) {
                arr.push(/* tuple */[
                      key,
                      value
                    ]);
                return arr;
              }), /* array */[], map);
}

function find(func, map) {
  return Js_primitive.undefined_to_opt(map.find(Curry.__1(func)));
}

export {
  getValidDataArr ,
  find ,
  
}
/* ImmutableSparseMapService-WonderCommonlib Not a pure module */
