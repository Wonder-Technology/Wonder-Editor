'use strict';

import * as Jest    from "../../../../node_modules/wonder-bs-jest/lib/es6_global/src/jest.js";
import * as $$Array from "../../../../node_modules/bs-platform/lib/es6/array.js";

function getSandboxDefaultVal() {
  return [{
            stub: 1
          }];
}

var restoreSandbox = ( function(sandbox) {
    sandbox.restore();
}
);

var createEmptyStub = ( function(sandbox) {
    return sandbox.stub();
}
);

var createMethodStub = ( function(sandbox, obj, method) {
    sandbox.stub(obj, method);

    /* obj[method] =  sandbox.stub(); */

    return obj[method];
}
);

function setReturn(stub, returnVal) {
  return stub.returns(returnVal);
}

function withOneArg(stub, arg) {
  return stub.withArgs(arg);
}

function getCall(stub, index) {
  return stub.getCall(index);
}

function getArgsFromEmptyStub(call) {
  return $$Array.to_list(call.args);
}

function getArgs(call) {
  return $$Array.to_list(call.args);
}

function getCallCount(stub) {
  return stub.callCount;
}

function toCalledWith(expectedArg, expect) {
  return Jest.ExpectSinon[/* toCalledWith */24]($$Array.of_list(expectedArg))(expect);
}

function toCalledBefore(expectedArg, expect) {
  return Jest.ExpectSinon[/* toCalledBefore */25](expectedArg)(expect);
}

function toCalledAfter(expectedArg, expect) {
  return Jest.ExpectSinon[/* toCalledAfter */26](expectedArg)(expect);
}

function toCalled(expect) {
  return Jest.ExpectSinon[/* toCalled */27](expect);
}

function toCalledOnce(expect) {
  return Jest.ExpectSinon[/* toCalledOnce */28](expect);
}

function toCalledTwice(expect) {
  return Jest.ExpectSinon[/* toCalledTwice */29](expect);
}

function toCalledThrice(expect) {
  return Jest.ExpectSinon[/* toCalledThrice */30](expect);
}

export {
  getSandboxDefaultVal ,
  restoreSandbox       ,
  createEmptyStub      ,
  createMethodStub     ,
  setReturn            ,
  withOneArg           ,
  getCall              ,
  getArgsFromEmptyStub ,
  getArgs              ,
  getCallCount         ,
  toCalledWith         ,
  toCalledBefore       ,
  toCalledAfter        ,
  toCalled             ,
  toCalledOnce         ,
  toCalledTwice        ,
  toCalledThrice       ,
  
}
/* restoreSandbox Not a pure module */
