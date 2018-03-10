let disposeCurrentGameObject = (gameObject) => {
  GameObjectEngineService.disposeGameObject(gameObject) |> StateLogicService.getAndSetEngineState;
  CurrentGameObjectService.clearCurrentGameObject |> StateLogicService.getAndSetEditorState
};
