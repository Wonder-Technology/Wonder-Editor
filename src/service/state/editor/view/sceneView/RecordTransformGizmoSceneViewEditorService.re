open SceneViewType;

let getData = sceneViewRecord =>
  sceneViewRecord.transformGizmoData |> OptionService.unsafeGet;