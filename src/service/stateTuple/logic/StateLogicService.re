let getEditEngineState = () =>
  EngineStateDataEditorService.getEditEngineStateData() |> StateEngineService.getStateFromData;

let setEditEngineState = (state) =>
  state
  |> StateEngineService.setStateToData(EngineStateDataEditorService.getEditEngineStateData())
  |> ignore;

let getRunEngineState = () =>
  EngineStateDataEditorService.getRunEngineStateData() |> StateEngineService.getStateFromData;

let setRunEngineState = (state) =>
  state
  |> StateEngineService.setStateToData(EngineStateDataEditorService.getRunEngineStateData())
  |> ignore;

let getEngineStateToGetData = (handleFunc) => getRunEngineState() |> handleFunc;

let getAndSetEditAndRunEngineState = (handleFunc) => {
  getEditEngineState() |> handleFunc |> setEditEngineState;
  getRunEngineState() |> handleFunc |> setRunEngineState
};

let getAndSetEditEngineState = (handleFunc) =>
  getEditEngineState() |> handleFunc |> setEditEngineState;

let getAndSetRunEngineState = (handleFunc) =>
  getRunEngineState() |> handleFunc |> setRunEngineState;

let getAndRefreshEngineStateWithDiff = (componentForRun, type_, handleFunc) => {
  let componentForEdit =
    StateEditorService.getState()
    |> SceneEditorService.unsafeGetDiffMap
    |> DiffComponentService.getEditEngineComponent(type_)
    |> ((diffValue) => componentForRun + diffValue);
  getRunEngineState()
  |> handleFunc(componentForRun)
  |> DirectorEngineService.loopBody(0.)
  |> setRunEngineState;
  getEditEngineState()
  |> handleFunc(componentForEdit)
  |> DirectorEngineService.loopBody(0.)
  |> setEditEngineState
};

let getAndRefreshEngineStateWithTwoDiff = (firstComponent, lastComponent, type_, handleFunc) => {
  let diffValue =
    StateEditorService.getState()
    |> SceneEditorService.unsafeGetDiffMap
    |> DiffComponentService.getEditEngineComponent(type_);
  getRunEngineState()
  |> handleFunc(firstComponent, lastComponent)
  |> DirectorEngineService.loopBody(0.)
  |> setRunEngineState;
  getEditEngineState()
  |> handleFunc(firstComponent + diffValue, lastComponent + diffValue)
  |> DirectorEngineService.loopBody(0.)
  |> setEditEngineState
};

let getEditorState = (handleFunc) => StateEditorService.getState() |> handleFunc;

let getAndSetEditorState = (handleFunc) =>
  StateEditorService.getState() |> handleFunc |> StateEditorService.setState |> ignore;

let getStateToGetData = (handleFunc) =>
  (StateEditorService.getState(), getRunEngineState()) |> handleFunc;