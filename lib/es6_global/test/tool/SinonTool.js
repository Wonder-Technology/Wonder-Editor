


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

export {
  calledWith ,
  calledWithArg2 ,
  calledWithArg3 ,
  calledWithArg4 ,
  createMethodStub ,
  createOneLengthStub ,
  
}
/* createMethodStub Not a pure module */
