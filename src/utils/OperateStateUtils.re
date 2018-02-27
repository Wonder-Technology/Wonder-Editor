let operateState = (handleFunc) =>
  MainEditorStateView.prepareState() |> handleFunc |> MainEditorStateView.finishState;

let operateStateWithReduxData = (handleFunc, store, dispatch) =>
  MainEditorStateView.prepareState()
  |> handleFunc(store, dispatch)
  |> MainEditorStateView.finishState;