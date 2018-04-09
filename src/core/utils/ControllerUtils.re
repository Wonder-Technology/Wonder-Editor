let run = (store) => {
  WonderLog.Log.print("it's start run") |> ignore;
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
       StateLogicService.getEngineStateForEdit(),
       StateLogicService.getEngineStateForRun()
     )
};