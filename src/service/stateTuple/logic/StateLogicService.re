let getEngineState = (handleFunc) => StateEngineService.getState() |> handleFunc;

let getAndSetEngineState = (handleFunc) =>
  StateEngineService.getState() |> handleFunc |> StateEngineService.setState |> ignore;

let refreshEngineState = (handleFunc) =>
  handleFunc |> DirectorEngineService.loopBody(0.) |> StateEngineService.setState |> ignore;

let getAndRefreshEngineState = (handleFunc) =>
  StateEngineService.getState()
  |> handleFunc
  |> DirectorEngineService.loopBody(0.)
  |> StateEngineService.setState
  |> ignore;

let getEditorState = (handleFunc) => StateEditorService.getState() |> handleFunc;

let getAndSetEditorState = (handleFunc) =>
  StateEditorService.getState() |> handleFunc |> StateEditorService.setState |> ignore;

let _prepareState = () => (StateEditorService.getState(), StateEngineService.getState());

let _finishSetState = ((editorState, engineState)) => {
  StateEditorService.setState(editorState) |> ignore;
  StateEngineService.setState(engineState) |> ignore;
  ()
};

let _finishRefreshState = ((editorState, engineState)) => {
  StateEditorService.setState(editorState) |> ignore;
  engineState |> DirectorEngineService.loopBody(0.) |> StateEngineService.setState |> ignore;
  ()
};

let getState = (handleFunc) => _prepareState() |> handleFunc;

let setState = (stateTuple) => stateTuple |> _finishSetState;

let getAndSetState = (handleFunc) => _prepareState() |> handleFunc |> _finishSetState;

let getAndRefreshState = (handleFunc) => _prepareState() |> handleFunc |> _finishRefreshState;