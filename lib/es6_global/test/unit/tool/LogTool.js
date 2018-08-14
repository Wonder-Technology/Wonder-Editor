

import * as List from "../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";

function getMessage(error) {
  return List.hd(Sinon.getArgs(Sinon.getCall(0, error)));
}

export {
  getMessage ,
  
}
/* Sinon Not a pure module */
