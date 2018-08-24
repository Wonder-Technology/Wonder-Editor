open Wonderjs;

let init = DirectorAPI.initDirector;

/* TODO add try catch */
let loopBodyForEditEngineState = (value, state) =>
  DirectorAPI.loopBody(value, state);

let loopBodyForRunEngineState = (value, state) => {
  WonderLog.Log.print("run engine state camera count") |> ignore;
  WonderLog.Log.print(
    state
    |> GameObjectComponentEngineService.getAllBasicCameraViewComponents
    |> Js.Array.length,
  )
  |> ignore;

  state
  |> GameObjectComponentEngineService.getAllBasicCameraViewComponents
  |> Js.Array.length >= 1 ?
    DirectorAPI.loopBody(value, state) : state;
};