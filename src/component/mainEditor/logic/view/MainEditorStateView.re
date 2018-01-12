open MainEditorMainBuss;

let getEditorState = getEditorState;

let getEngineState = getEngineState;

let setEngineState = setEngineState;

let setEditorState = setEditorState;

let prepareState = () => (getEditorState(), getEngineState());

let finishState = ((editorState, engineState)) => {

  setEditorState(editorState) |> ignore;
  setEngineState(engineState) |> ignore;
  ()
};