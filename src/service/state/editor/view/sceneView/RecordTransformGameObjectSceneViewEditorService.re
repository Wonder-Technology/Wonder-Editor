open SceneViewType;

let getData = sceneViewRecord =>
  sceneViewRecord.transformGameObjectData |> OptionService.unsafeGet;