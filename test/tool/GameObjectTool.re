let getChildren = (gameObject) =>
  StateLogicService.getEngineStateForEdit() |> GameObjectUtils.getChildren(gameObject);