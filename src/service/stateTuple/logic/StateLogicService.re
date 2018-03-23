let getEngineStateForEdit = () =>
  EngineStateDataEditorService.getEngineStateDataForEdit() |> StateEngineService.getStateFromData;

let setEngineStateForEdit = (state) =>
  state
  |> StateEngineService.setStateToData(EngineStateDataEditorService.getEngineStateDataForEdit())
  |> ignore;

let getEngineStateForRun = () =>
  EngineStateDataEditorService.getEngineStateDataForRun() |> StateEngineService.getStateFromData;

let setEngineStateForRun = (state) =>
  state
  |> StateEngineService.setStateToData(EngineStateDataEditorService.getEngineStateDataForRun())
  |> ignore;

let getEngineStateToGetData = (handleFunc) => getEngineStateForEdit() |> handleFunc;

let getAndSetEngineState = (handleFunc) => {
  getEngineStateForEdit() |> handleFunc |> setEngineStateForEdit;
  getEngineStateForRun() |> handleFunc |> setEngineStateForRun
};

let refreshEngineState = (handleFunc) => {
  handleFunc |> DirectorEngineService.loopBody(0.) |> setEngineStateForEdit;
  handleFunc |> DirectorEngineService.loopBody(0.) |> setEngineStateForRun
};

let getAndRefreshEngineState = (handleFunc) => {
  getEngineStateForRun()
  |> handleFunc
  |> DirectorEngineService.loopBody(0.)
  |> setEngineStateForRun;
  getEngineStateForEdit()
  |> handleFunc
  |> DirectorEngineService.loopBody(0.)
  |> setEngineStateForEdit
};

/* TODO rename */
let getEditorState = (handleFunc) => StateEditorService.getState() |> handleFunc;

let getAndSetEditorState = (handleFunc) =>
  StateEditorService.getState() |> handleFunc |> StateEditorService.setState |> ignore;

let getStateToGetData = (handleFunc) =>
  (StateEditorService.getState(), getEngineStateForEdit()) |> handleFunc;

let getStateForHistory = () => (
  StateEditorService.getState(),
  getEngineStateForEdit(),
  getEngineStateForRun()
);

let refreshStateForHistory = ((editorState, engineStateForEdit, engineStateForRun)) => {
  editorState |> StateEditorService.setState |> ignore;
  engineStateForEdit |> DirectorEngineService.loopBody(0.) |> setEngineStateForEdit;
  engineStateForRun |> DirectorEngineService.loopBody(0.) |> setEngineStateForRun
};

let getAndRefreshStateForHistory = (handleFunc) =>
  getStateForHistory() |> handleFunc |> refreshStateForHistory;