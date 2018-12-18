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

let findGameObjectByName = (name, engineState) =>
  engineState
  |> GameObjectEngineService.getAllGameObjects(
       getSceneGameObject(engineState),
     )
  |> Js.Array.filter(gameObject =>
       switch (
         GameObjectEngineService.getGameObjectName(gameObject, engineState)
       ) {
       | None => false
       | Some(gameObjectName) => gameObjectName === name
       }
     );