let prepareState = () => (EditorStateView.getEditorState(), EngineStateView.getEngineState());

let finishState = ((editorState, engineState)) => {
  EditorStateView.setEditorState(editorState) |> ignore;
  EngineStateView.setEngineState(engineState) |> ignore;
  ()
};