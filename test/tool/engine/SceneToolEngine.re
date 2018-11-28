open SceneEngineService;

let getSceneAllBasicCameraViews = engineState =>
  engineState
  |> GameObjectEngineService.getAllGameObjects(
       getSceneGameObject(engineState),
     )
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasBasicCameraViewComponent(
         gameObject,
         engineState,
       )
     )
  |> Js.Array.map(gameObject =>
       GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
         gameObject,
         engineState,
       )
     );