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

let getEngineState = (handleFunc) =>
  switch (EngineStateDataEditorService.getIsRun()) {
  | false => getEngineStateForEdit() |> handleFunc
  | true => getEngineStateForRun() |> handleFunc
  };

let getAndSetEngineState = (handleFunc) => {
  switch (EngineStateDataEditorService.getIsRun()) {
  | false => ()
  | true => getEngineStateForRun() |> handleFunc |> setEngineStateForRun
  };
  getEngineStateForEdit() |> handleFunc |> setEngineStateForEdit
};

let refreshEngineState = (handleFunc) => {
  handleFunc |> DirectorEngineService.loopBody(0.) |> setEngineStateForEdit;
  switch (EngineStateDataEditorService.getIsRun()) {
  | false => ()
  | true => handleFunc |> DirectorEngineService.loopBody(0.) |> setEngineStateForRun
  }
};

let getAndRefreshEngineState = (handleFunc) => {
  switch (EngineStateDataEditorService.getIsRun()) {
  | false => ()
  | true =>
    getEngineStateForRun()
    |> handleFunc
    |> DirectorEngineService.loopBody(0.)
    |> setEngineStateForRun
  };
  getEngineStateForEdit()
  |> handleFunc
  |> DirectorEngineService.loopBody(0.)
  |> setEngineStateForEdit
};

let getEditorState = (handleFunc) => StateEditorService.getState() |> handleFunc;

let getAndSetEditorState = (handleFunc) =>
  StateEditorService.getState() |> handleFunc |> StateEditorService.setState |> ignore;

let _prepareState = () => (
  StateEditorService.getState(),
  switch (EngineStateDataEditorService.getIsRun()) {
  | false => getEngineStateForEdit()
  | true => getEngineStateForRun()
  }
);

let _prepareStateForEdit = () => (StateEditorService.getState(), getEngineStateForEdit());

let _prepareStateForRun = () => (StateEditorService.getState(), getEngineStateForRun());

let _finishSetStateForEdit = ((editorState, engineState)) => {
  editorState |> StateEditorService.setState |> ignore;
  engineState |> setEngineStateForEdit;
  ()
};

let _finishSetStateForRun = ((editorState, engineState)) => {
  editorState |> StateEditorService.setState |> ignore;
  engineState |> setEngineStateForRun;
  ()
};

let _finishRefreshStateForEdit = ((editorState, engineState)) => {
  editorState |> StateEditorService.setState |> ignore;
  engineState |> DirectorEngineService.loopBody(0.) |> setEngineStateForEdit;
  ()
};

let _finishRefreshStateForRun = ((editorState, engineState)) => {
  editorState |> StateEditorService.setState |> ignore;
  engineState |> DirectorEngineService.loopBody(0.) |> setEngineStateForRun;
  ()
};

let getState = (handleFunc) => _prepareState() |> handleFunc;

let setState = (stateTuple) => {
  switch (EngineStateDataEditorService.getIsRun()) {
  | false => ()
  | true => stateTuple |> _finishSetStateForRun
  };
  stateTuple |> _finishSetStateForEdit
};

let getAndSetState = (handleFunc) => {
  switch (EngineStateDataEditorService.getIsRun()) {
  | false => ()
  | true => _prepareStateForRun() |> handleFunc |> _finishSetStateForRun
  };
  _prepareStateForEdit() |> handleFunc |> _finishSetStateForEdit
};

let getAndRefreshState = (handleFunc) => {
  switch (EngineStateDataEditorService.getIsRun()) {
  | false => ()
  | true => _prepareStateForRun() |> handleFunc |> _finishRefreshStateForRun
  };
  _prepareStateForEdit() |> handleFunc |> _finishRefreshStateForEdit
};