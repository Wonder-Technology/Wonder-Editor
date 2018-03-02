let getState = (handleFunc) => MainEditorStateView.prepareState() |> handleFunc;

let setState = (stateTuple) => stateTuple |> MainEditorStateView.finishState;

let getAndSetState = (handleFunc) =>
  MainEditorStateView.prepareState() |> handleFunc |> MainEditorStateView.finishState;