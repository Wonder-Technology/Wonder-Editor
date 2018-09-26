open Sinon;

let logInfo = msg => {
  Js.log(msg);
  msg |> Obj.magic |> Js.Json.stringify |> Js.String.split(",") |> Js.log;
  Js.log("end log");
};