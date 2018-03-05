let hasSourceInstanceComponent = (gameObject) =>
  StateFacade.prepareState()
  |> MainEditorGameObjectBuss.hasSourceInstanceComponent(gameObject);