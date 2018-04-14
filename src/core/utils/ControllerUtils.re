let run = (store) =>
  EngineStateDataEditorService.getIsRun() ?
    WonderLog.Log.print("already run") |> ignore :
    {
      EngineStateDataEditorService.setIsRun(true);
      AllStateData.getHistoryState()
      |> ControllerHistoryUtils.copyHistoryStack(store, StateLogicService.getStateForHistory());
      LoopEngineService.loop() |> ignore
    };

let stop = (dispatch) =>
  EngineStateDataEditorService.getIsRun() ?
    {
      EngineStateDataEditorService.setIsRun(false);
      AllStateData.getHistoryState()
      |> ControllerHistoryUtils.restoreHistoryStack(
           dispatch,
           StateLogicService.getEditEngineState(),
           StateLogicService.getRunEngineState()
         )
    } :
    WonderLog.Log.print("already stop") |> ignore;