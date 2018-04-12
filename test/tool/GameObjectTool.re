let getChildren = (gameObject) =>
  StateLogicService.getRunEngineState() |> GameObjectUtils.getChildren(gameObject);