let prepareState = () => (EditorStateView.getEditorState(), EngineStateView.getEngineState());

let finishState = ((editorState, engineState)) => {
  EditorStateView.setEditorState(editorState) |> ignore;
  EngineStateView.setEngineState(engineState) |> ignore;
  ()
};
/* let getEditorState = EditorStateView.getEditorState;

   let getEngineState = EngineStateView.getEngineState;

   let setEngineState = EngineStateView.setEngineState;

   let setEditorState = EditorStateView.setEditorState;

   let prepareState = () => (getEditorState(), getEngineState());

   let finishState = ((editorState, engineState)) => {
     setEditorState(editorState) |> ignore;
     setEngineState(engineState) |> ignore;
     ()
   }; */