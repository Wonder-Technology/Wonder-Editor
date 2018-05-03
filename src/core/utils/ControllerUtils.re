let run = (store, ()) => {
  SceneEditorService.setIsRun(true) |> StateLogicService.getEditorState;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(store, StateHistoryService.getStateForHistory());
  LoopEngineService.loop() |> ignore
};

let stop = (dispatch, ()) => {
  SceneEditorService.setIsRun(false) |> StateLogicService.getEditorState;
  StateEditorService.getState() |> LoopEditorService.getLoopId |> LoopEngineService.stopLoop;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.restoreHistoryStack(
       dispatch,
       StateLogicService.getEditEngineState(),
       StateLogicService.getRunEngineState()
     )
};