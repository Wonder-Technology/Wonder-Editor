let createCamera = (editorState, engineState) => {
  let (editorState, (engineState, gameObject)) =
    GameObjectLogicService.createGameObject((editorState, engineState));
  let (engineState, cameraComponentRecord) =
    CameraEngineService.createCameraGroup(engineState);

  let engineState =
    engineState
    |> GameObjectEngineService.setGameObjectName("Camera", gameObject);

  let (editorState, engineState) =
    (editorState, engineState)
    |> GameObjectLogicService.addCameraGroup(
         gameObject,
         cameraComponentRecord,
       );

  (editorState, engineState, gameObject);
};
let unbindCameraControllerEventIfHasComponentGameView =
    (camera, (editorState, engineState)) => {
  let removeCameraBasicCameraView =
    engineState
    |> GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
         camera,
       );

  GameViewEditorService.isActiveBasicCameraView(
    removeCameraBasicCameraView,
    editorState,
  ) ?
    {
      let engineState =
        StateEditorService.getIsRun() ?
          switch (
            CameraControllerUtils.getCameraControllerType(camera, engineState)
          ) {
          | Some(FlyCameraController) =>
            engineState
            |> FlyCameraControllerLogicService.unbindGameViewActiveCameraFlyCameraControllerEvent(
                 camera,
               )
          | Some(ArcballCameraController) =>
            engineState
            |> ArcballCameraControllerLogicService.unbindGameViewActiveCameraArcballCameraControllerEvent(
                 camera,
               )
          | None => engineState
          } :
          engineState;

      let editorState =
        GameViewEditorService.removeActivedBasicCameraView(editorState);

      (editorState, engineState);
    } :
    (editorState, engineState);
};