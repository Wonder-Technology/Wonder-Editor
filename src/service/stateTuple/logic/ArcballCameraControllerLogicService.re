let bindArcballCameraControllerEventForSceneView =
    (cameraController, engineState) => {
  let (
    engineState,
    pointDownHandleFunc,
    pointUpHandleFunc,
    pointDragHandleFunc,
    pointScaleHandleFunc,
    keydownHandleFunc,
  ) =
    ArcballCameraEngineService.prepareBindEvent(
      cameraController,
      engineState,
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=EventEditorService.getPointDownEventName(),
      ~handleFunc=pointDownHandleFunc,
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=EventEditorService.getPointUpEventName(),
      ~handleFunc=pointUpHandleFunc,
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=EventEditorService.getPointDragEventName(),
      ~handleFunc=pointDragHandleFunc,
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onCustomGlobalEvent(
      ~eventName=EventEditorService.getPointScaleEventName(),
      ~handleFunc=pointScaleHandleFunc,
      ~state=engineState,
      (),
    );

  let engineState =
    ManageEventEngineService.onKeyboardEvent(
      ~eventName=EventType.KeyDown_editor |> Obj.magic,
      ~handleFunc=keydownHandleFunc,
      ~state=engineState,
      (),
    );

  engineState;
};