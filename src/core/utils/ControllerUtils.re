let run = (store) => {
  WonderLog.Log.print("it's start run") |> ignore;
  EngineStateDataEditorService.setIsRun(true);
  AllStateData.getHistoryState()
  |> ControllerRedoUndoEventHandlerUtils.copyRedoUndoStack(
       store,
       StateLogicService.getStateForHistory()
     );
  LoopEngineService.loop() |> ignore
};

let stop = (dispatch) => {
  EngineStateDataEditorService.setIsRun(false);
  AllStateData.getHistoryState()
  |> ControllerRedoUndoEventHandlerUtils.restoreController(
       dispatch,
       StateLogicService.getEngineStateForEdit(),
       StateLogicService.getEngineStateForRun()
     )
};