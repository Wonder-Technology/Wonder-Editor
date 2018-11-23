let run = store => {
  StateEditorService.setIsRun(true);

  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(
       store,
       StateHistoryService.getStateForHistory(),
     );

  StateEngineService.unsafeGetState()
  |> ArcballCameraControllerLogicService.bindGameViewActiveCameraArcballCameraControllerEvent
  |> StateEngineService.setState
  |> ignore;

  LoopEngineService.loop() |> ignore;
};

let stop = dispatchFunc => {
  StateEditorService.setIsRun(false);

  StateEditorService.getState()
  |> LoopEditorService.getLoopId
  |> LoopEngineService.stopLoop;

  ControllerHistoryUtils.restoreHistoryStack(
    dispatchFunc,
    (
      StateEditorService.getState(),
      StateEngineService.unsafeGetState(),
      AllStateData.getHistoryState(),
    ),
  );

  StateEngineService.unsafeGetState()
  |> ArcballCameraControllerLogicService.unbindGameViewActiveCameraArcballCameraControllerEvent
  |> StateEngineService.setState
  |> ignore;
};