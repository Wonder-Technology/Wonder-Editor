let run = (store) => {
  WonderLog.Log.print("it's start run") |> ignore;
  EngineStateDataEditorService.setIsRun(true);
  AllStateData.getHistoryState()
  |> RedoUndoForRunAndStopEventHandlerUtils.storeRedoUndoForRunAndStop(
       store,
       StateLogicService.getStateForHistory()
     );
  LoopEngineService.loop() |> ignore
};

let stop = (dispatch) => {
  EngineStateDataEditorService.setIsRun(false);
  AllStateData.getHistoryState()
  |> RedoUndoForRunAndStopEventHandlerUtils.undo(
       dispatch,
       StateLogicService.getEngineStateForEdit(),
       StateLogicService.getEngineStateForRun()
     )
};