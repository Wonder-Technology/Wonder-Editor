open EditorStateDataTypeEdit;

let _initEditor = MainEditorMainBuss.initEditor;

let _init = (editorState: editorState) => {
  let engineState = MainEditorMainBuss.initEngineMain();
  let (editorState, engineState) = _initEditor((editorState, engineState));
  let engineState = MainEditorMainBuss.initEngineDirector(engineState);
  (editorState, engineState)
};

let _loop = (engineState) => {
  /* todo save loop id */
  let rec _loopRequest = (time: float, engineState) =>
    DomHelper.requestAnimationFrame(
      (time: float) => {
        let engineState = engineState |> MainEditorMainBuss.loopBody(time);
        _loopRequest(time, engineState) |> ignore
      }
    );
  engineState |> _loopRequest(0.) |> ignore
};
let start = () => {
  let (editorState, engineState) = MainEditorMainBuss.getEditorState() |> _init;
  engineState |> _loop;
  (
    editorState |> MainEditorMainBuss.setEditorState,
    engineState |> MainEditorMainBuss.setEngineState
  )
};