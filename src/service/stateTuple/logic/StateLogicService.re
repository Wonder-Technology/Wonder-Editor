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

let getAndRefreshEngineState = () =>
  StateEngineService.unsafeGetState()
  |> DirectorEngineService.loopBody(0.)
  |> StateEngineService.setState
  |> ignore;

let getAndRefreshEngineStateWithFunc = handleFunc =>
  StateEngineService.unsafeGetState()
  |> handleFunc
  |> DirectorEngineService.loopBody(0.)
  |> StateEngineService.setState
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