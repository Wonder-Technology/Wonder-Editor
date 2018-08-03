let doesSceneHasRemoveableCamera = () =>
  switch (
    (
      engineState =>
        engineState
        |> GameObjectUtils.getChildren(
             engineState |> SceneEngineService.getSceneGameObject,
           )
        |> Js.Array.filter(gameObject =>
             engineState |> CameraEngineService.hasCameraComponent(gameObject)
           )
        |> Js.Array.length
    )
    |> StateLogicService.getEngineStateToGetData
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