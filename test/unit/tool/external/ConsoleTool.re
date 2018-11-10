open Sinon;

type console = Sinon.obj;

[@bs.val] external console : console = "";

let getMessage = output => output |> getCall(0) |> getArgs |> List.hd;

let markTestConsole = [%bs.raw
  () => {|
    window.isTestConsole = true;
    |}
];

let markNotTestConsole = [%bs.raw
  () => {|
    window.isTestConsole = false;
    |}
];

let buildFakeError = [%bs.raw
  (sandbox) => {|
    sandbox.spy(Error, "captureStackTrace");
  /* var Error =  {
    captureStackTrace: sandbox.stub()
  };

  window.Error = Error; */

  return Error;

  |}
];