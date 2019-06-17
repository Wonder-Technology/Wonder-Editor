open Wonderjs;

open StateDataMainType;

let unsafeGetTranslationDiff = (cameraController, state) =>
  state.flyCameraControllerRecord
  |> OperateFlyCameraControllerService.unsafeGetTranslationDiff(
       cameraController,
     );

let setTranslationDiff = (cameraController, value, state) =>
  state.flyCameraControllerRecord
  |> OperateFlyCameraControllerService.setTranslationDiff(
       cameraController,
       value,
     );

let unsafeGetEulerAngleDiff = (cameraController, state) =>
  state.flyCameraControllerRecord
  |> OperateFlyCameraControllerService.unsafeGetEulerAngleDiff(
       cameraController,
     );

let setEulerAngleDiff = (cameraController, value, state) =>
  state.flyCameraControllerRecord
  |> OperateFlyCameraControllerService.setEulerAngleDiff(
       cameraController,
       value,
     );

let createGameObject = state => {
  open Wonderjs;
  open GameObjectAPI;

  let (state, cameraController) =
    FlyCameraControllerAPI.createFlyCameraController(state);

  let (
    state,
    gameObject,
    transform,
    (basicCameraView, perspectiveCameraProjection),
  ) =
    CameraToolEngine.createCameraGameObject(state);

  let state =
    addGameObjectFlyCameraControllerComponent(
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

let addGameObjectFlyCameraControllerComponent = (gameObject, engineState) => {
  let (engineState, cameraController) =
    FlyCameraEngineService.create(engineState);

  let engineState =
    gameObject
    |> GameObjectComponentEngineService.addFlyCameraControllerComponent(
         _,
         cameraController,
         engineState,
       );

  (engineState, gameObject, cameraController);
};

let addGameObjectFlyCameraControllerComponentAndBindFlyCameraControllerEventForGameView =
    (gameObject, engineState) => {
  let (engineState, gameObject, cameraController) =
    addGameObjectFlyCameraControllerComponent(gameObject, engineState);

  let engineState =
    engineState
    |> FlyCameraEngineService.bindFlyCameraControllerEventForGameView(
         cameraController,
       );

  (engineState, gameObject, cameraController);
};