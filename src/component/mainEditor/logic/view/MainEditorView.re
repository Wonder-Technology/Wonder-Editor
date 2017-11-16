open StateDataTypeEdit;

let _initEditor = (stateTuple) => {
    MainEditorBuss.initEditor(stateTuple);
};

let _init = (editorState:editorState) => {
  let engineState = MainEditorBuss.initEngineMain();
  let (editorState, engineState) = _initEditor((  editorState, engineState, ));
  let engineState =
    /* MainEditorBuss.initEngineDirector(engineState) |> MainEditorBuss.setEngineStateToEngineData; */
    MainEditorBuss.initEngineDirector(engineState);
  (editorState, engineState)
};

let _loop = (stateTuple) => {
  /* todo save loop id */
  let rec _loopRequest = (time: float, stateTuple) =>
    DomHelper.requestAnimationFrame(
      (time: float) => {
        let (editorState, engineState) = stateTuple |> MainEditorBuss.loopBody(time);
        let editorState = MainEditorBuss.setEditorState(editorState);
        _loopRequest(time, (editorState, engineState)) |> ignore
      }
    );
  stateTuple |> _loopRequest(0.) |> ignore
};

let start = () =>
  /* MainEditorBuss.createEditorState() |> _init |> loop |> MainEditorBuss.setEditorState |> ignore; */
  MainEditorBuss.createEditorState() |> _init |> _loop;