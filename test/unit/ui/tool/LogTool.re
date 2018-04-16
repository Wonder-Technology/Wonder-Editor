open Sinon;

let getMessage = (error) => error |> getCall(0) |> getArgs |> List.hd;