open SceneEngineService;

let getSceneAllBasicCameraViews = engineState =>
  engineState
  |> HierarchyGameObjectEngineService.getAllGameObjects(
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

let findGameObjectByName = (name, engineState) =>
  GameObjectToolEngine.findGameObjectByName(
    name,
    getSceneGameObject(engineState),
    engineState,
  );