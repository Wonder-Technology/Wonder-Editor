open Sinon;

open Wonderjs;

let buildMainConfig =
    (
      ~bufferConfig=Js.Nullable.undefined,
      ~canvasId=Js.Nullable.undefined,
      ~isTest=Js.Nullable.undefined,
      ~contextConfig=Js.Nullable.undefined,
      ()
    ) => {
  "bufferConfig": bufferConfig,
  "canvasId": canvasId,
  "isTest": isTest,
  "contextConfig": contextConfig
};

let getIsTest = () => InitConfigSystem.getIsTest(StateData.stateData);