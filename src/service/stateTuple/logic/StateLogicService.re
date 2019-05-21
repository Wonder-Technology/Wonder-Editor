let getEngineStateToGetData = handleFunc =>
  StateEngineService.unsafeGetState() |> handleFunc;

let getAndSetEngineState = handleFunc =>
  StateEngineService.unsafeGetState()
  |> handleFunc
  |> StateEngineService.setState
  |> ignore;

let refreshEngineState = engineState =>
  engineState
  |> DirectorEngineService.loopBody(0.)
  |> StateEngineService.setState
  |> ignore;

let renderEngineStateAndReturnEngineState = engineState =>
  engineState |> DirectorEngineService.loopBody(0.);

let getAndRefreshEngineState = () =>
  StateEngineService.unsafeGetState()
  |> DirectorEngineService.loopBody(0.)
  |> StateEngineService.setState
  |> ignore;

let getAndRefreshEngineStateForRunLoop = () =>
  StateEngineService.unsafeGetState()
  |> ScriptEventFunctionEngineService.enableScriptEventFunction
  |> DirectorEngineService.loopBody(0.)
  |> ScriptEventFunctionEngineService.disableScriptEventFunction
  |> StateEngineService.setState
  |> ignore;

let getAndRefreshEngineStateWithFunc = handleFunc =>
  StateEngineService.unsafeGetState()
  |> handleFunc
  |> DirectorEngineService.loopBody(0.)
  |> StateEngineService.setState
  |> ignore;

let loopBodyWhenStop = engineState =>
  StateEditorService.getIsRun() ?
    engineState : engineState |> DirectorEngineService.loopBody(0.);

let getAndRefreshEngineStateWhenStop = () =>
  StateEngineService.unsafeGetState()
  |> loopBodyWhenStop
  |> StateEngineService.setState
  |> ignore;

let renderWhenStop = engineState =>
  StateEditorService.getIsRun() ?
    engineState : engineState |> DirectorEngineService.loopBody(0.);

let renderInspectorEngineStateAndReturnState = inspectorEngineState =>
  inspectorEngineState |> DirectorEngineService.loopBody(0.);

let refreshInspectorEngineState = inspectorEngineState =>
  inspectorEngineState
  |> DirectorEngineService.loopBody(0.)
  |> StateInspectorEngineService.setState
  |> ignore;

let getEditorState = handleFunc => StateEditorService.getState() |> handleFunc;

let getAndSetEditorState = handleFunc =>
  StateEditorService.getState()
  |> handleFunc
  |> StateEditorService.setState
  |> ignore;

let getStateToGetData = handleFunc =>
  (StateEditorService.getState(), StateEngineService.unsafeGetState())
  |> handleFunc;

let getAndSetState = handleFunc => {
  let (editorState, engineState) =
    (StateEditorService.getState(), StateEngineService.unsafeGetState())
    |> handleFunc;

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;
};

let setState = ((editorState, engineState)) => {
  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;
};