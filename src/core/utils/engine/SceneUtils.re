let doesSceneHasRemoveableCamera = () =>
  GameObjectComponentEngineService.getAllBasicCameraViewComponents
  |> StateLogicService.getEngineStateToGetData
  |> Js.Array.length > 1;

let isSceneHaveNoActiveCamera = () =>
  SceneEngineService.getSceneActiveBasicCameraView
  |> StateLogicService.getEngineStateToGetData
  |> Js.Option.isNone;