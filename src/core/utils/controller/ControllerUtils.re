let run = store => {
  SceneEditorService.setIsRun(true)
  |> StateLogicService.getAndSetEditorState
  |> ignore;
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

  SceneEditorService.setIsRun(false)
  |> StateLogicService.getAndSetEditorState
  |> ignore;
};