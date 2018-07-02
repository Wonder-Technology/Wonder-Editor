

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as OptionService$WonderEditor from "../primitive/OptionService.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateEditorService$WonderEditor from "../state/editor/StateEditorService.js";

function range(a, b) {
  var result = ArrayService$WonderCommonlib.createEmpty(/* () */0);
  for(var i = a; i <= b; ++i){
    result.push(i);
  }
  return result;
}

function getFirst(arr) {
  return Contract$WonderLog.ensureCheck((function (r) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("array[0] element exist", "not"), (function () {
                              return Contract$WonderLog.assertNullableExist(r);
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), arr[0]);
}

function removeLast(arr) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("array length should >= 1", "not"), (function () {
                        return Contract$WonderLog.Operators[/* >= */7](arr.length, 1);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return OptionService$WonderEditor.unsafeGet(Js_primitive.undefined_to_opt(arr.pop()));
}

function removeFirst(arr) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("array length should >= 1", "not"), (function () {
                        return Contract$WonderLog.Operators[/* >= */7](arr.length, 1);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return OptionService$WonderEditor.unsafeGet(Js_primitive.undefined_to_opt(arr.shift()));
}

function getNth(index, arr) {
  return Contract$WonderLog.ensureCheck((function (r) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("array[" + (String(index) + "] element exist"), "not"), (function () {
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

function hasItemByFunc(func, arr) {
  return hasItem(arr.filter(Curry.__1(func)));
}

export {
  range ,
  getFirst ,
  removeLast ,
  removeFirst ,
  getNth ,
  hasItem ,
  unshift ,
  push ,
  hasItemByFunc ,
  
}
/* Log-WonderLog Not a pure module */
