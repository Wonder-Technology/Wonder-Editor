let disposeCurrentGameObject = (gameObject) => {
  GameObjectEngineService.disposeGameObject(gameObject) |> StateLogicService.getAndSetEngineState;
  CurrentGameObjectEditorService.clearCurrentGameObject |> StateLogicService.getAndSetEditorState
};
