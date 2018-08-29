

import * as List from "../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";

function getMessage(error) {
  return List.hd(Sinon.getArgs(Sinon.getCall(0, error)));
}

function logInfo(msg) {
  console.log(msg);
  console.log(JSON.stringify(msg).split(","));
  console.log("end log");
  return /* () */0;
}

export {
  getMessage ,
  logInfo ,
  
}
/* Sinon Not a pure module */
