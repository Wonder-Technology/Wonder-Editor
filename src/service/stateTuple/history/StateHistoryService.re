let getStateForHistory = () => (
  StateEditorService.getState(),
  StateEngineService.unsafeGetState(),
);

let refreshStateForHistory = ((editorState, engineState)) => {
  editorState |> StateEditorService.setState |> ignore;
  engineState
  |> DirectorEngineService.loopBody(0.)
  |> StateEngineService.setState
  |> ignore;
};

let getAndRefreshStateForHistory = handleFunc =>
  getStateForHistory() |> handleFunc |> refreshStateForHistory;