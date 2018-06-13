let doesSceneHasRemoveableCamera = () =>
  switch (
    (
      engineState =>
        engineState
        |> GameObjectUtils.getChildren(
             SceneEditorService.unsafeGetScene
             |> StateLogicService.getEditorState,
           )
        |> Js.Array.filter(gameObject =>
             CameraEngineService.isCamera(gameObject)
             |> StateLogicService.getEngineStateToGetData
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