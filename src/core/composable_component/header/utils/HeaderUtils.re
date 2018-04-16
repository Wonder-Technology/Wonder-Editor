let doesSceneHasRemoveableCamera = () =>
  switch (
    (
      (engineState) =>
        engineState
        |> GameObjectUtils.getChildren(
             SceneEditorService.unsafeGetScene |> StateLogicService.getEditorState
           )
        |> Js.Array.filter(
             (gameObject) =>
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

let isGameObjectNotRemoveable = (gameObject) =>
  switch gameObject {
  | None => Js.true_
  | Some(gameObject) =>
    CameraEngineService.isCamera(gameObject) |> StateLogicService.getEngineStateToGetData ?
      Js.Boolean.to_js_boolean(!doesSceneHasRemoveableCamera()) : Js.false_
  };