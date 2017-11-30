open MainEditorMainBuss;

let getEditorState = getEditorState;

/*
 let getEngineState = getEngineState;

 let setEngineState = setEngineState;

 let setEditorState = setEditorState; */
let prepareState = () => {
  let editorState = getEditorState();
  let engineState = getEngineState();
  (editorState, engineState)
};

let finishState = (stateTuple) => {
  let (editorState, engineState) = stateTuple;
  setEditorState(editorState);
  setEngineState(engineState);
  ()
};