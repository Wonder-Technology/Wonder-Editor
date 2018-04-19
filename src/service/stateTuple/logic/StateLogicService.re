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

/* let refreshEngineState = (handleFunc) => {
  handleFunc |> DirectorEngineService.loopBody(0.) |> setEditEngineState;
  handleFunc |> DirectorEngineService.loopBody(0.) |> setRunEngineState
}; */

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

/* TODO rename */
let getEditorState = (handleFunc) => StateEditorService.getState() |> handleFunc;

let getAndSetEditorState = (handleFunc) =>
  StateEditorService.getState() |> handleFunc |> StateEditorService.setState |> ignore;

let getStateToGetData = (handleFunc) =>
  (StateEditorService.getState(), getRunEngineState()) |> handleFunc;

let getStateForHistory = () => (
  StateEditorService.getState(),
  getEditEngineState(),
  getRunEngineState()
);

let refreshStateForHistory = ((editorState, engineStateForEdit, engineStateForRun)) => {
  editorState |> StateEditorService.setState |> ignore;
  engineStateForEdit |> DirectorEngineService.loopBody(0.) |> setEditEngineState;
  engineStateForRun |> DirectorEngineService.loopBody(0.) |> setRunEngineState
};

let getAndRefreshStateForHistory = (handleFunc) =>
  getStateForHistory() |> handleFunc |> refreshStateForHistory;