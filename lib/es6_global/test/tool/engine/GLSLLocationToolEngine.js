

import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function stubLocation(stub, pos, _, name) {
  Sinon.returns(pos, Sinon.withTwoArgs(Sinon$1.match.any, name, stub));
  return stub;
}

function _getLocation($staropt$star, sandbox, name) {
  var pos = $staropt$star !== undefined ? $staropt$star : 10;
  return stubLocation(Sinon.createEmptyStubWithJsObjSandbox(sandbox), pos, sandbox, name);
}

function getUniformLocationWithNameArr(_, stub, nameArr, posArr) {
  return nameArr.reduce((function (stub, name, index) {
                Sinon.returns(Caml_array.caml_array_get(posArr, index), Sinon.withTwoArgs(Sinon$1.match.any, name, stub));
                return stub;
              }), stub);
}

var getAttribLocation = _getLocation;

var getUniformLocation = _getLocation;

export {
  stubLocation ,
  _getLocation ,
  getAttribLocation ,
  getUniformLocation ,
  getUniformLocationWithNameArr ,
  
}
/* Sinon Not a pure module */
