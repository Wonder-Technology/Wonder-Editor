let getStateForHistory = () => (
  StateEditorService.getState(),
  StateLogicService.getEditEngineState(),
  StateLogicService.getRunEngineState()
);

let refreshStateForHistory = ((editorState, engineStateForEdit, engineStateForRun)) => {
  editorState |> StateEditorService.setState |> ignore;
  engineStateForEdit |> DirectorEngineService.loopBodyForEditEngineState(0.) |> StateLogicService.setEditEngineState;
  engineStateForRun |> DirectorEngineService.loopBodyForRunEngineState(0.) |> StateLogicService.setRunEngineState
};

let getAndRefreshStateForHistory = (handleFunc) =>
  getStateForHistory() |> handleFunc |> refreshStateForHistory;