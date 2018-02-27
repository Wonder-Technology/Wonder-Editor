let prepareState = () => (EditorStateView.getEditorState(), EngineStateView.getEngineState());

let finishState = ((editorState, engineState)) => {
WonderLog.Log.print("finish state") |> ignore;
  EditorStateView.setEditorState(editorState) |> ignore;
  EngineStateView.setEngineState(engineState) |> ignore;
  ()
};