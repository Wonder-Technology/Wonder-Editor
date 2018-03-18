let disposeCurrentGameObject = (gameObject) => {
  GameObjectEngineService.disposeGameObjectKeepOrder(gameObject) |> StateLogicService.getAndRefreshEngineState;
  SceneEditorService.clearCurrentGameObject |> StateLogicService.getAndSetEditorState
};
