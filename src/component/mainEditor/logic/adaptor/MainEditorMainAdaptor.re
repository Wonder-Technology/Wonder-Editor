open Wonderjs;

let init = (canvasId: string, isTest: Js.boolean) =>
  Main.setMainConfig({
    "canvasId": Js.Nullable.return(canvasId),
    "bufferConfig": Js.Nullable.undefined,
    "isTest": Js.Nullable.return(isTest),
    "contextConfig": Js.Nullable.undefined
  });