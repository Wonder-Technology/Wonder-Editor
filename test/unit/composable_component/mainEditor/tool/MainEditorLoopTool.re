let startLoopForCameraChangeDirection = engineState =>
  engineState
  |> CameraControllerUtils.loopBodyWhenCameraChangeDirectionAndStop(
       StateEditorService.getState(),
     );