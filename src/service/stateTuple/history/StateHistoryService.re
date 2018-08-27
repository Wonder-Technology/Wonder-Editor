let getStateForHistory = () => (
  StateEditorService.getState(),
  StateLogicService.getEditEngineState(),
  StateLogicService.getRunEngineState()
);

let refreshStateForHistory = ((editorState, engineStateForEdit, engineStateForRun)) => {
  editorState |> StateEditorService.setState |> ignore;
  engineStateForEdit |> DirectorEngineService.loopBody(0.) |> StateLogicService.setEditEngineState;
  engineStateForRun |> DirectorEngineService.loopBody(0.) |> StateLogicService.setRunEngineState
};

let getAndRefreshStateForHistory = (handleFunc) =>
  getStateForHistory() |> handleFunc |> refreshStateForHistory;