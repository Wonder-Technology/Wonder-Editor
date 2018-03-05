let prepareState = () => (EditorStateView.getEditorState(), EngineStateFacade.getEngineState());

let finishState = ((editorState, engineState)) => {
  EditorStateView.setEditorState(editorState) |> ignore;
  EngineStateFacade.setEngineState(engineState) |> ignore;
  ()
};