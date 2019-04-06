let _runInitScriptJob = engineState =>
  engineState
  |> ScriptEventFunctionEngineService.enableScriptEventFunction
  |> Wonderjs.InitScriptJobUtils.exec
  |> ScriptEventFunctionEngineService.disableScriptEventFunction;

let run = uiState => {
  StateEditorService.setIsRun(true);

  AllStateData.getHistoryState()
  |> ControllerHistoryUtils.copyHistoryStack(
       uiState,
       StateHistoryService.getStateForHistory(),
     );

  StateEngineService.unsafeGetState()
  |> ArcballCameraControllerLogicService.bindGameViewActiveCameraArcballCameraControllerEvent
  |> _runInitScriptJob
  |> StateEngineService.setState
  |> ignore;

  LoopEngineService.loop() |> ignore;
};

let _restoreScreen = () => {
  let editorState = StateEditorService.getState();

  SceneViewEditorService.hasViewRect(editorState) ?
    ResizeUtils.isViewSizeChange(
      SceneViewEditorService.unsafeGetViewRect(editorState),
      GameViewEditorService.unsafeGetViewRect(editorState),
      ResizeUtils.getCanvasSize(),
    ) ?
      ResizeUtils.resizeScreen() : () :
    ();
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

  _restoreScreen();
};