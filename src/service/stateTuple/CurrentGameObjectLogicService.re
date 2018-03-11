let disposeCurrentGameObject = (gameObject) => {
  GameObjectEngineService.disposeGameObject(gameObject) |> StateLogicService.getAndSetEngineState;
  SceneEditorService.clearCurrentGameObject |> StateLogicService.getAndSetEditorState
};
