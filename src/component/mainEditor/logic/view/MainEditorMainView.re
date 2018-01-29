open EditorStateDataTypeEdit;

let _initEditor = MainEditorMainBuss.initEditor;

let _init = (editorState: editorState) => {
  let engineState = MainEditorMainBuss.initEngineMain();
  let (editorState, engineState) = _initEditor((editorState, engineState));
  let engineState = MainEditorMainBuss.initEngineDirector(engineState);
  (editorState, engineState)
};

let loopSetState = (time, engineState) => engineState |> MainEditorMainBuss.loopBody(time);

let _loop = () => {
  /* todo save loop id */
  let rec _loopRequest = (time: float) =>
    DomHelper.requestAnimationFrame(
      (time: float) => {
        loopSetState(time, EngineStateView.getEngineState())
        |> EngineStateView.setEngineState
        |> ignore;
        _loopRequest(time) |> ignore
      }
    );
  _loopRequest(0.) |> ignore
};

let start = () => {
  let (editorState, engineState) = EditorStateView.getEditorState() |> _init;
  _loop();
  (editorState |> EditorStateView.setEditorState, engineState |> EngineStateView.setEngineState)
};