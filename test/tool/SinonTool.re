open Sinon;

let calledWith = (stub, arg) => stub##calledWith(arg);

let calledWithArg2 = (stub, arg1, arg2) => stub##calledWith(arg1, arg2);

let calledWithArg3 = (stub, arg1, arg2, arg3) =>
  stub##calledWith(arg1, arg2, arg3);

let calledWithArg4 = (stub, arg1, arg2, arg3, arg4) =>
  stub##calledWith(arg1, arg2, arg3, arg4);

let createMethodStub = [%bs.raw
  {| function(sandbox, obj, method) {
    obj[method] =  sandbox.stub();

    return obj[method];
}
|}
];