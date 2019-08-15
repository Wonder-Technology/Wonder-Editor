open Sinon;

type console = Sinon.obj;

[@bs.val] external console: console = "";

let getMessage = output => output |> getCall(0) |> getArgs |> List.hd;
let buildFakeError = [%bs.raw
  sandbox => {|
    sandbox.spy(Error, "captureStackTrace");

    return Error;
  |}
];

let judgeError = (message, errorStub) =>
  Wonder_jest.(
    Expect.(
      Expect.Operators.(
        Sinon.(
          errorStub
          |> getArgs
          |> Js.Json.stringifyAny
          |> OptionService.unsafeGet
          |> expect
          |> toContainString(message)
        )
      )
    )
  );

let judgeNotError = errorStub =>
  Wonder_jest.(
    Expect.(Expect.Operators.(Sinon.(errorStub |> expect |> not_ |> toCalled)))
  );

let stubError = (~sandbox, ~stubLog=true, ()) => {
  let _ = stubLog ? createMethodStub(sandbox^, console, "log") : ();

  let errorStub = createMethodStub(sandbox^, console, "error");

  errorStub;
};