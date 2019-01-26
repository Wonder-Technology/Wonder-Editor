open SceneViewType;

let getData = sceneViewRecord => sceneViewRecord.transformGizmoData;

let unsafeGetData = sceneViewRecord =>
  sceneViewRecord |> getData |> OptionService.unsafeGet;