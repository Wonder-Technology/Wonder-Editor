
open Wonderjs;

let init = (canvasId: string, isDebug: Js.boolean) =>
  Main.setMainConfig({
    "canvasId": Js.Nullable.return(canvasId),
    "bufferConfig": Js.Nullable.undefined,
    "gpuConfig": Js.Nullable.undefined,
    "isDebug": Js.Nullable.return(isDebug),
    "contextConfig": Js.Nullable.undefined
  });

