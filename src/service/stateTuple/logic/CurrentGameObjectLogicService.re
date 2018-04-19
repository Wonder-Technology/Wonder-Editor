let disposeCurrentGameObject = (gameObject) => {
  GameObjectEngineService.disposeGameObjectKeepOrder
  |> StateLogicService.getAndRefreshEngineStateWithDiff(
    [|gameObject|], DiffType.GameObject);
  SceneEditorService.clearCurrentGameObject |> StateLogicService.getAndSetEditorState
};