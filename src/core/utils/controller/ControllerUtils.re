let run = (store, ()) => {
  SceneEditorService.setIsRun(true)
  |> StateLogicService.getEditorState
  |> ignore;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(
       store,
       StateHistoryService.getStateForHistory(),
     );
  LoopEngineService.loop() |> ignore;
};

let stop = (dispatchFunc, ()) => {
  SceneEditorService.setIsRun(false)
  |> StateLogicService.getEditorState
  |> ignore;
  StateEditorService.getState()
  |> LoopEditorService.getLoopId
  |> LoopEngineService.stopLoop;

  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.restoreHistoryStack(
       dispatchFunc,
       StateLogicService.getEditEngineState(),
       StateLogicService.getRunEngineState(),
     );
  
};