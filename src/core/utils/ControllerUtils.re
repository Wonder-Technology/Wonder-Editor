let run = (store) => {
  EngineStateDataEditorService.setIsRun(true);
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(store, StateLogicService.getStateForHistory());
  LoopEngineService.loop() |> ignore
};

let runForTest = (store) => {
  EngineStateDataEditorService.setIsRun(true);
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(store, StateLogicService.getStateForHistory())
};

let stop = (dispatch) => {
  EngineStateDataEditorService.setIsRun(false);
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.restoreHistoryStack(
       dispatch,
       StateLogicService.getEngineStateForEdit(),
       StateLogicService.getEngineStateForRun()
     )
};