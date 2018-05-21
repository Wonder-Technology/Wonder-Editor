let disposeCurrentSceneTreeNode = (gameObject) => {
  GameObjectEngineService.disposeGameObjectKeepOrder
  |> StateLogicService.getAndRefreshEngineStateWithDiff(
    [|gameObject|], DiffType.GameObject);
  SceneEditorService.clearCurrentSceneTreeNode |> StateLogicService.getAndSetEditorState
};