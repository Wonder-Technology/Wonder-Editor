
let _bindRunEngineStateCurrentCamemraArcballEvent = () => {

};

let run = (store, ()) => {
  SceneEditorService.setIsRun(true)
  |> StateLogicService.getAndSetEditorState
  |> ignore;
  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(
       store,
       StateHistoryService.getStateForHistory(),
     );

  

  LoopEngineService.loop() |> ignore;
};

let stop = (dispatchFunc, ()) => {
  StateEditorService.getState()
  |> LoopEditorService.getLoopId
  |> LoopEngineService.stopLoop;

  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.restoreHistoryStack(
       dispatchFunc,
       StateLogicService.getEditEngineState(),
       StateLogicService.getRunEngineState(),
     );

  SceneEditorService.setIsRun(false)
  |> StateLogicService.getAndSetEditorState
  |> ignore;
};