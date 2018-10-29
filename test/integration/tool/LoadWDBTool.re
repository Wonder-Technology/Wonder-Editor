let getBoxTexturedMeshGameObjects = engineState =>
  engineState
  |> GameObjectEngineService.getAllGameObjects(
       SceneEngineService.getSceneGameObject(engineState),
     )
  |> Js.Array.filter(gameObject =>
       GameObjectEngineService.getGameObjectName(gameObject, engineState)
       === Some("Mesh")
     );

let getBoxTexturedMeshGameObject = engineState =>
  engineState |> getBoxTexturedMeshGameObjects |> ArrayService.unsafeGetFirst;