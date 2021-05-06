'use strict';


function calledWith(stub, arg) {
  return stub.calledWith(arg);
}

function calledWithArg2(stub, arg1, arg2) {
  return stub.calledWith(arg1, arg2);
}

function calledWithArg3(stub, arg1, arg2, arg3) {
  return stub.calledWith(arg1, arg2, arg3);
}

function calledWithArg4(stub, arg1, arg2, arg3, arg4) {
  return stub.calledWith(arg1, arg2, arg3, arg4);
}

var createMethodStub = ( function(sandbox, obj, method) {
    obj[method] =  sandbox.stub();

    return obj[method];
}
);

var createOneLengthStub = ( function(sandbox) {
    var stub =  sandbox.stub();

    Object.defineProperty(stub, "length", {
        enumerable: true,
        configurable: true,
        writable: false,
        value: 1
      });

    return stub;
}
);

exports.calledWith = calledWith;
exports.calledWithArg2 = calledWithArg2;
exports.calledWithArg3 = calledWithArg3;
exports.calledWithArg4 = calledWithArg4;
exports.createMethodStub = createMethodStub;
exports.createOneLengthStub = createOneLengthStub;
/* createMethodStub Not a pure module */
