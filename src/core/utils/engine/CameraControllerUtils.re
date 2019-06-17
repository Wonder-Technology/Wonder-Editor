open InspectorComponentType;

let getCameraControllerType = (gameObject, engineState) =>
  engineState
  |> GameObjectComponentEngineService.hasFlyCameraControllerComponent(
       gameObject,
     ) ?
    Some(FlyCameraController) :
    engineState
    |> GameObjectComponentEngineService.hasArcballCameraControllerComponent(
         gameObject,
       ) ?
      Some(ArcballCameraController) : None;

let bindGameViewActiveCameraControllerEvent = engineState =>
  switch (
    GameViewEditorService.getActivedBasicCameraView(
      StateEditorService.getState(),
    )
  ) {
  | None => engineState
  | Some(activeBasicCameraView) =>
    let gameObject =
      BasicCameraViewEngineService.getBasicCameraViewGameObject(
        activeBasicCameraView,
        engineState,
      );

    switch (getCameraControllerType(gameObject, engineState)) {
    | Some(FlyCameraController) =>
      engineState
      |> FlyCameraControllerLogicService.bindGameViewActiveCameraFlyCameraControllerEvent(
           gameObject,
         )
    | Some(ArcballCameraController) =>
      engineState
      |> ArcballCameraControllerLogicService.bindGameViewActiveCameraArcballCameraControllerEvent
    | None => engineState
    };
  };

let unbindGameViewActiveCameraControllerEvent = engineState =>
  switch (
    GameViewEditorService.getActivedBasicCameraView(
      StateEditorService.getState(),
    )
  ) {
  | None => engineState
  | Some(activeBasicCameraView) =>
    let gameObject =
      BasicCameraViewEngineService.getBasicCameraViewGameObject(
        activeBasicCameraView,
        engineState,
      );

    switch (getCameraControllerType(gameObject, engineState)) {
    | Some(FlyCameraController) =>
      engineState
      |> FlyCameraControllerLogicService.unbindGameViewActiveCameraFlyCameraControllerEvent(
           gameObject,
         )
    | Some(ArcballCameraController) =>
      engineState
      |> ArcballCameraControllerLogicService.unbindGameViewActiveCameraArcballCameraControllerEvent
    | None => engineState
    };
  };