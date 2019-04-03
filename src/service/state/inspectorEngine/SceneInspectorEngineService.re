let getMaterialSphere = engineState => {
  let sceneGameObject = SceneEngineService.getSceneGameObject(engineState);

  engineState |> HierarchyGameObjectEngineService.hasChildren(sceneGameObject) ?
    (
      engineState
      |> HierarchyGameObjectEngineService.getChildren(sceneGameObject)
      |> ArrayService.unsafeGetFirst
    )
    ->Some :
    None;
};