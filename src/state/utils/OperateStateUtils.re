let getState = (handleFunc) => MainEditorStateView.prepareState() |> handleFunc;

let getAndSetState = (handleFunc) =>
  MainEditorStateView.prepareState() |> handleFunc |> MainEditorStateView.finishState;