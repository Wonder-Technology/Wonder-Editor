open InspectorComponentType;

let _getCameraControllerType = (gameObject, engineState) =>
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

let _updateFlyCameraDirection = (editCamera, engineState) => {
  let flyCameraController =
    engineState
    |> GameObjectComponentEngineService.unsafeGetFlyCameraControllerComponent(
         editCamera,
       );

  FlyCameraEngineService.hasFlyCameraControllerDirection(
    flyCameraController,
    engineState,
  ) ?
    engineState |> StateLogicService.renderWhenStop : engineState;
};

let renderWhenCameraChangeDirection = (editorState, engineState) => {
  let editCamera = editorState |> SceneViewEditorService.unsafeGetEditCamera;

  switch (_getCameraControllerType(editCamera, engineState)) {
  | Some(FlyCameraController) =>
    engineState |> _updateFlyCameraDirection(editCamera)
  | Some(ArcballCameraController) => engineState
  | None => engineState
  };
};

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

    switch (_getCameraControllerType(gameObject, engineState)) {
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

    switch (_getCameraControllerType(gameObject, engineState)) {
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