'use strict';

import * as Log$WonderLog                    from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog               from "../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as EditorStateDataEdit$WonderEditor from "../../logic/edit/EditorStateDataEdit.js";

function getFirst(arr) {
  return Contract$WonderLog.ensureCheck((function (r) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("array[0] element exist", "not"), (function () {
                              return Contract$WonderLog.assertNullableExist(r);
                            }));
              }), EditorStateDataEdit$WonderEditor.getStateIsDebug(/* () */0), arr[0]);
}

function getNth(index, arr) {
  return Contract$WonderLog.ensureCheck((function (r) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("array[" + (String(index) + "] element exist"), "not"), (function () {
                              return Contract$WonderLog.assertNullableExist(r);
                            }));
              }), EditorStateDataEdit$WonderEditor.getStateIsDebug(/* () */0), arr[index]);
}

function hasItem(arr) {
  var match = +(arr.length > 0);
  if (match !== 0) {
    return /* true */1;
  } else {
    return /* false */0;
  }
}

function push(item, arr) {
  arr.push(item);
  return arr;
}

export {
  getFirst ,
  getNth   ,
  hasItem  ,
  push     ,
  
}
/* Log-WonderLog Not a pure module */
