let run = (store, ()) => {
  SceneEditorService.setIsRun(true) |> StateLogicService.getEditorState;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(store, StateHistoryService.getStateForHistory());
  LoopEngineService.loop() |> ignore
};

let stop = (dispatchFunc, ()) => {
  SceneEditorService.setIsRun(false) |> StateLogicService.getEditorState;
  StateEditorService.getState() |> LoopEditorService.getLoopId |> LoopEngineService.stopLoop;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.restoreHistoryStack(
       dispatchFunc,
       StateLogicService.getEditEngineState(),
       StateLogicService.getRunEngineState()
     )
};