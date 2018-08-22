open Sinon;

let getMessage = error => error |> getCall(0) |> getArgs |> List.hd;

let logInfo = msg => {
  WonderLog.Log.print(msg) |> ignore;
  msg |> Obj.magic |> Js.Json.stringify
  |> Js.String.split(",")
  |> WonderLog.Log.print |> ignore;
  WonderLog.Log.print(123) |> ignore;
  WonderLog.Log.print(123) |> ignore;
};