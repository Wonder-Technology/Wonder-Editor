let createGameObject = state => {
  open Wonderjs;
  open GameObjectAPI;

  let (state, cameraController) =
    ArcballCameraControllerAPI.createArcballCameraController(state);

  let (
    state,
    gameObject,
    transform,
    (basicCameraView, perspectiveCameraProjection),
  ) =
    CameraToolEngine.createCameraGameObject(state);

  let state =
    addGameObjectArcballCameraControllerComponent(
      gameObject,
      cameraController,
      state,
    );

  (
    state,
    gameObject,
    transform,
    (cameraController, basicCameraView, perspectiveCameraProjection),
  );
};

let addGameObjectArcballCameraControllerComponent = (gameObject, engineState) => {
  let (engineState, cameraController) =
    ArcballCameraEngineService.create(engineState);

  let engineState =
    gameObject
    |> GameObjectComponentEngineService.addArcballCameraControllerComponent(
         _,
         cameraController,
         engineState,
       );

  (engineState, gameObject, cameraController);
};

let addGameObjectArcballCameraControllerComponentAndBindArcballCameraControllerEventForGameView =
    (gameObject, engineState) => {
  let (engineState, gameObject, cameraController) =
    addGameObjectArcballCameraControllerComponent(gameObject, engineState);

  let engineState =
    engineState
    |> ArcballCameraEngineService.bindArcballCameraControllerEventForGameView(
         cameraController,
       );

  (engineState, gameObject, cameraController);
};

let clearDirtyArray = engineState =>
  Wonderjs.UpdateArcballCameraControllerMainService._clearDirtyArray(
    engineState,
  );