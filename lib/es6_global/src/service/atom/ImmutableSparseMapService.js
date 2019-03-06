

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
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
  return Caml_option.undefined_to_opt(map.find(Curry.__1(func)));
}

export {
  getValidDataArr ,
  find ,
  
}
/* No side effect */
