let hasSourceInstanceComponent = (gameObject) =>
  MainEditorStateView.prepareState()
  |> MainEditorGameObjectBuss.hasSourceInstanceComponent(gameObject);