open Wonderjs;

let init = (canvasId: string) =>
  /* todo pass isTest? */
  Main.setMainConfig({
    "canvasId": Js.Nullable.return(canvasId),
    "bufferConfig": Js.Nullable.undefined,
    "isTest": Js.Nullable.undefined,
    "contextConfig": Js.Nullable.undefined
  });