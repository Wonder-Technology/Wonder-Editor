let disposeCurrentGameObject = (gameObject) => {
  GameObjectEngineService.disposeGameObjectKeepOrder(gameObject)
  |> StateLogicService.getAndSetEditAndRunEngineState;
  SceneEditorService.clearCurrentGameObject |> StateLogicService.getAndSetEditorState
};