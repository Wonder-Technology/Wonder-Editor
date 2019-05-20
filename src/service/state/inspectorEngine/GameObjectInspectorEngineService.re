let unsafeGetCamera = inspectorEngineState =>
  inspectorEngineState
  |> HierarchyGameObjectEngineService.getAllGameObjects(
       inspectorEngineState |> SceneEngineService.getSceneGameObject,
     )
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasBasicCameraViewComponent(
         gameObject,
         inspectorEngineState,
       )
     )
  |> ArrayService.unsafeGetFirst;