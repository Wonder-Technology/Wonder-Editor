let run = (store) => {
  EngineStateDataEditorService.setIsRun(true);
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(store, StateLogicService.getStateForHistory());
  LoopEngineService.loop() |> ignore
};

let stop = (dispatch) => {
  EngineStateDataEditorService.setIsRun(false);
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.restoreHistoryStack(
       dispatch,
       StateLogicService.getEditEngineState(),
       StateLogicService.getRunEngineState()
     )
};