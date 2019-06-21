let startLoop = engineState =>
  engineState
  |> CameraControllerUtils.loopBodyWhenCameraChangeDirection(
       StateEditorService.getState(),
     );