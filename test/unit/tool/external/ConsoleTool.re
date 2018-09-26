open Sinon;

type console = Sinon.obj;

[@bs.val] external console : console = "";

let getMessage = output => output |> getCall(0) |> getArgs |> List.hd;