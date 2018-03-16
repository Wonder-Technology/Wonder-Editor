let disposeCurrentGameObject = (gameObject) => {
  GameObjectEngineService.disposeGameObjectKeepOrder(gameObject) |> StateLogicService.getAndSetEngineState;
  SceneEditorService.clearCurrentGameObject |> StateLogicService.getAndSetEditorState
};
