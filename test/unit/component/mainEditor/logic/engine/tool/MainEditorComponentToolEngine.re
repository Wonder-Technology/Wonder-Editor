let hasSourceInstanceComponent = (gameObject) =>
  StateFacade.prepareState()
  |> GameObjectFacade.hasSourceInstanceComponent(gameObject);