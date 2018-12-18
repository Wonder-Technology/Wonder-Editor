

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_obj from "../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Caml_option from "../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as OptionService$WonderEditor from "../primitive/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as HashMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as StateEditorService$WonderEditor from "../state/editor/StateEditorService.js";

function create(param) {
  return /* array */[];
}

function range(a, b) {
  var result = ArrayService$WonderCommonlib.createEmpty(/* () */0);
  for(var i = a; i <= b; ++i){
    result.push(i);
  }
  return result;
}

function unsafeGetFirst(arr) {
  return Contract$WonderLog.ensureCheck((function (r) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("array[0] element exist", "not"), (function (param) {
                              return Contract$WonderLog.assertNullableExist(r);
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), arr[0]);
}

function getFirst(arr) {
  return Caml_option.nullable_to_opt(arr[0]);
}

function unsafeGetLast(arr) {
  return Contract$WonderLog.ensureCheck((function (r) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("array[0] element exist", "not"), (function (param) {
                              return Contract$WonderLog.assertNullableExist(r);
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), arr[arr.length - 1 | 0]);
}

function getLast(arr) {
  return Caml_option.nullable_to_opt(arr[arr.length - 1 | 0]);
}

function removeLast(arr) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("array length should >= 1", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* >= */7](arr.length, 1);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return OptionService$WonderEditor.unsafeGet(Caml_option.undefined_to_opt(arr.pop()));
}

function removeFirst(arr) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("array length should >= 1", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* >= */7](arr.length, 1);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return OptionService$WonderEditor.unsafeGet(Caml_option.undefined_to_opt(arr.shift()));
}

function unsafeGetNth(index, arr) {
  return Contract$WonderLog.ensureCheck((function (r) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("array[" + (String(index) + "] element exist"), "not"), (function (param) {
                              return Contract$WonderLog.assertNullableExist(r);
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), arr[index]);
}

function hasItem(arr) {
  var match = arr.length > 0;
  if (match) {
    return true;
  } else {
    return false;
  }
}

function unshift(item, arr) {
  arr.unshift(item);
  return arr;
}

function push(item, arr) {
  arr.push(item);
  return arr;
}

function pushMany(itemArr, arr) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (arr, item) {
                return push(item, arr);
              }), arr, itemArr);
}

function hasItemByFunc(func, arr) {
  return hasItem(arr.filter(Curry.__1(func)));
}

function removeDuplicateItems(buildKeyFunc, arr) {
  var resultArr = /* array */[];
  var map = HashMapService$WonderCommonlib.createEmpty(/* () */0);
  for(var i = 0 ,i_finish = arr.length - 1 | 0; i <= i_finish; ++i){
    var item = arr[i];
    var key = buildKeyFunc(item);
    var match = HashMapService$WonderCommonlib.get(key, map);
    if (match === undefined) {
      resultArr.push(item);
      HashMapService$WonderCommonlib.set(key, item, map);
    }
    
  }
  return resultArr;
}

function exclude(excludeArr, arr) {
  return arr.filter((function (value) {
                return !excludeArr.includes(value);
              }));
}

function intersect(arr1, arr2) {
  return arr1.filter((function (value) {
                return arr2.includes(value);
              }));
}

function hasIntersect(arr1, arr2) {
  return intersect(arr1, arr2).length > 0;
}

function fastConcat(arr1, arr2) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (arr1, value2) {
                return push(value2, arr1);
              }), arr1, arr2);
}

function isEqual(arr1, arr2) {
  return Caml_obj.caml_equal(arr1.sort(), arr2.sort());
}

function isInclude(sourceArr, targetArr) {
  return targetArr.filter((function (value) {
                return !sourceArr.includes(value);
              })).length === 0;
}

export {
  create ,
  range ,
  unsafeGetFirst ,
  getFirst ,
  unsafeGetLast ,
  getLast ,
  removeLast ,
  removeFirst ,
  unsafeGetNth ,
  hasItem ,
  unshift ,
  push ,
  pushMany ,
  hasItemByFunc ,
  removeDuplicateItems ,
  exclude ,
  intersect ,
  hasIntersect ,
  fastConcat ,
  isEqual ,
  isInclude ,
  
}
/* Log-WonderLog Not a pure module */
