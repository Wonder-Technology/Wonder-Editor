let getBoxTexturedMeshGameObject = engineState =>
  engineState
  |> GameObjectEngineService.getAllGameObjects(
       SceneEngineService.getSceneGameObject(engineState),
     )
  |> Js.Array.filter(gameObject =>
       GameObjectEngineService.getGameObjectName(gameObject, engineState)
       === Some("Mesh")
     )
  |> ArrayService.unsafeGetFirst;