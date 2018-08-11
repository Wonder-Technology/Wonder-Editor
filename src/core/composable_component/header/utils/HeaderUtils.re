let doesSceneHasRemoveableCamera = () =>
  GameObjectComponentEngineService.getAllBasicCameraViewComponents
  |> StateLogicService.getEngineStateToGetData
  |> Js.Array.length > 1;

let isGameObjectNotRemoveable = gameObject =>
  switch (gameObject) {
  | None => true
  | Some(gameObject) =>
    CameraEngineService.hasCameraGroup(gameObject)
    |> StateLogicService.getEngineStateToGetData ?
      ! doesSceneHasRemoveableCamera() : false
  };