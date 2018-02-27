let operateState = (handleFunc) =>
  MainEditorStateView.prepareState() |> handleFunc |> MainEditorStateView.finishState;