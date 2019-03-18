

import * as MutableHashMapService$WonderCommonlib from "../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";

function buildFakeLocalStorage(param) {
  var fakeLocalStorage = MutableHashMapService$WonderCommonlib.createEmpty(/* () */0);
  global._localStorage = fakeLocalStorage;
  return /* () */0;
}

function getExtensionTestKey(param) {
  return "databaseTest";
}

export {
  buildFakeLocalStorage ,
  getExtensionTestKey ,
  
}
/* No side effect */
