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
    engineState |> StateLogicService.renderEngineStateAndReturnEngineState :
    engineState;
};

let loopBodyWhenCameraChangeDirectionAndStop = (editorState, engineState) =>
  StateEditorService.getIsRun() ?
    engineState :
    {
      let editCamera =
        editorState |> SceneViewEditorService.unsafeGetEditCamera;

      switch (getCameraControllerType(editCamera, engineState)) {
      | Some(FlyCameraController) =>
        engineState |> _updateFlyCameraDirection(editCamera)
      | Some(ArcballCameraController) =>
        WonderLog.Log.error(
          WonderLog.Log.buildErrorMessage(
            ~title="loopBodyWhenCameraChangeDirectionAndStop",
            ~description=
              {j|the editCamera shouldn't has arcballCameraController|j},
            ~reason="",
            ~solution={j||j},
            ~params={j||j},
          ),
        );
        engineState;
      | None => engineState
      };
    };

let bindCameraControllerEventByType = (gameObject, engineState) =>
  switch (getCameraControllerType(gameObject, engineState)) {
  | Some(FlyCameraController) =>
    engineState
    |> FlyCameraControllerLogicService.bindGameViewActiveCameraFlyCameraControllerEvent(
         gameObject,
       )
  | Some(ArcballCameraController) =>
    engineState
    |> ArcballCameraControllerLogicService.bindGameViewActiveCameraArcballCameraControllerEvent(
         gameObject,
       )
  | None => engineState
  };

let bindGameViewActiveCameraControllerEvent = engineState =>
  /* TODO add require check: should has no binded camera controller(include fly,arc)  */
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

    bindCameraControllerEventByType(gameObject, engineState);
  };

let unbindCameraControllerEventByType = (gameObject, engineState) =>
  switch (getCameraControllerType(gameObject, engineState)) {
  | Some(FlyCameraController) =>
    engineState
    |> FlyCameraControllerLogicService.unbindGameViewActiveCameraFlyCameraControllerEvent(
         gameObject,
       )
  | Some(ArcballCameraController) =>
    engineState
    |> ArcballCameraControllerLogicService.unbindGameViewActiveCameraArcballCameraControllerEvent(
         gameObject,
       )
  | None => engineState
  };

let unbindGameViewActiveCameraControllerEvent = engineState =>
  /* TODO add require check: only has one binded camera controller(include fly,arc)  */
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
    unbindCameraControllerEventByType(gameObject, engineState);
  };