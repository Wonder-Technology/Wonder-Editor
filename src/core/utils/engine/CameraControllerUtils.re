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

let _getAllCameraControllerBindEventCount = engineState =>
  (
    HierarchyGameObjectEngineService.getAllGameObjects(
      SceneEngineService.getSceneGameObject(engineState),
      engineState,
    )
    |> GameObjectEngineService.getAllFlyCameraControllers(_, engineState)
    |> Js.Array.filter(flyCameraController =>
         FlyCameraEngineService.isBindFlyCameraControllerEventForGameView(
           flyCameraController,
           engineState,
         )
       )
    |> Js.Array.length
  )
  + (
    HierarchyGameObjectEngineService.getAllGameObjects(
      SceneEngineService.getSceneGameObject(engineState),
      engineState,
    )
    |> GameObjectEngineService.getAllArcballCameraControllers(_, engineState)
    |> Js.Array.filter(arcballCameraController =>
         ArcballCameraEngineService.isBindArcballCameraControllerEventForGameView(
           arcballCameraController,
           engineState,
         )
       )
    |> Js.Array.length
  );

let bindGameViewActiveCameraControllerEvent = engineState => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|should has no camera controller binded event|j},
                ~actual={j|not|j},
              ),
              () =>
              _getAllCameraControllerBindEventCount(engineState) == 0
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

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

let unbindGameViewActiveCameraControllerEvent = engineState => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|only has one binded camera controller|j},
                ~actual={j|not|j},
              ),
              () =>
              _getAllCameraControllerBindEventCount(engineState) <= 1
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

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
};