open Sinon;

let getMessage = error => error |> getCall(0) |> getArgs |> List.hd;

let logInfo = msg => {
  Js.log(msg);
  msg |> Obj.magic |> Js.Json.stringify |> Js.String.split(",") |> Js.log;
  Js.log(123);
  Js.log(123);
};