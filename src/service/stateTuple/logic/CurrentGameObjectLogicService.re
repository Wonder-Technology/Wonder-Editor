let disposeCurrentGameObject = (gameObject) => {
  /* TODO fix dispose gameObject not re-render */
  GameObjectEngineService.disposeGameObjectKeepOrder
  |> StateLogicService.getAndRefreshEngineStateWithDiff(gameObject, DiffType.GameObject);
  SceneEditorService.clearCurrentGameObject |> StateLogicService.getAndSetEditorState
};