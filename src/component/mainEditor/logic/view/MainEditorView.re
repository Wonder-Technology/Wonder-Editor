open StateDataEditType;

let _initEditor = (editorState) => editorState;

let _init = (editorState) => {
  /* todo should get canvasId from config */
  let engineState = MainEditorBuss.initEngineMain("webgl");
  let editorState = _initEditor(editorState);
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