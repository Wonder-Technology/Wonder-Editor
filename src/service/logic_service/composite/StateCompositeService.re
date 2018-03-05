let prepareState = () => (EditorStateView.getEditorState(), EngineStateLogicService.getState());

let finishState = ((editorState, engineState)) => {
  EditorStateView.setEditorState(editorState) |> ignore;
  EngineStateLogicService.setState(engineState) |> ignore;
  ()
};

let getState = (handleFunc) => prepareState() |> handleFunc;

let setState = (stateTuple) => stateTuple |> finishState;

let getAndSetState = (handleFunc) => prepareState() |> handleFunc |> finishState;