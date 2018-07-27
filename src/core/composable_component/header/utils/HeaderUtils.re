let doesSceneHasRemoveableCamera = () =>
  switch (
    (
      engineState =>
        engineState
        |> GameObjectUtils.getChildren(
             engineState |> SceneEngineService.getSceneGameObject,
           )
        |> Js.Array.filter(gameObject =>
             engineState |> CameraEngineService.isCamera(gameObject)
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
    CameraEngineService.isCamera(gameObject)
    |> StateLogicService.getEngineStateToGetData ?
      ! doesSceneHasRemoveableCamera() : false
  };