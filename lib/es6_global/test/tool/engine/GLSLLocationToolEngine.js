

import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";

function stubLocation(stub, pos, _, name) {
  Sinon.returns(pos, Sinon.withTwoArgs(Sinon$1.match.any, name, stub));
  return stub;
}

function _getLocation($staropt$star, sandbox, name) {
  var pos = $staropt$star !== undefined ? $staropt$star : 10;
  return stubLocation(Sinon.createEmptyStubWithJsObjSandbox(sandbox), pos, sandbox, name);
}

var getAttribLocation = _getLocation;

var getUniformLocation = _getLocation;

export {
  stubLocation ,
  _getLocation ,
  getAttribLocation ,
  getUniformLocation ,
  
}
/* Sinon Not a pure module */
