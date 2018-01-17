open Sinon;

let getErrorMessage = (error) => error |> getCall(0) |> getArgs |> List.hd;