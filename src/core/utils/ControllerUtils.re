let run = (store, ()) => {
  SceneEditorService.setIsRun(true)
  |> StateLogicService.getEditorState;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(store, StateHistoryService.getStateForHistory());
  LoopEngineService.loop() |> ignore
};

let stop = (dispatch, ()) => {
  /* TODO bug: stop loop */
  SceneEditorService.setIsRun(true)
  |> StateLogicService.getEditorState;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.restoreHistoryStack(
       dispatch,
       StateLogicService.getEditEngineState(),
       StateLogicService.getRunEngineState()
     )
};