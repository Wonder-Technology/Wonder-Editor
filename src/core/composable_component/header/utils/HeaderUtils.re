let doesSceneHasRemoveableCamera = () =>
  switch (
    GameObjectComponentEngineService.getAllBasicCameraViewComponents
    |> StateLogicService.getEngineStateToGetData
    |> Js.Array.length
  ) {
  | 1 => false
  | _ => true
  };

let isGameObjectNotRemoveable = gameObject =>
  switch (gameObject) {
  | None => true
  | Some(gameObject) =>
    CameraEngineService.hasCameraComponent(gameObject)
    |> StateLogicService.getEngineStateToGetData ?
      ! doesSceneHasRemoveableCamera() : false
  };