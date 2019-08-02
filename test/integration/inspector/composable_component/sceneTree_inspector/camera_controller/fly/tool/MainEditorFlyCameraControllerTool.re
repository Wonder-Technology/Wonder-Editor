let changeMoveSpeed = (cameraController, value) =>
  MainEditorFlyCameraController.Method.changeMoveSpeed(
    cameraController,
    value,
  );

let blurFlyCameraMoveSpeed =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorFlyCameraController.Method.blurFlyCameraMoveSpeed(
    (uiState, dispatchFunc),
    cameraController,
    value,
  );

let changeMoveSpeedAndBlur =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  let oldValue =
    FlyCameraEngineService.unsafeGetFlyCameraControllerMoveSpeed(
      cameraController,
    )
    |> StateLogicService.getEngineStateToGetData;

  changeMoveSpeed(cameraController, value);

  blurFlyCameraMoveSpeed(
    ~uiState,
    ~dispatchFunc,
    ~cameraController,
    ~value=oldValue,
    (),
  );
};

let changeRotateSpeed = (cameraController, value) =>
  MainEditorFlyCameraController.Method.changeRotateSpeed(
    cameraController,
    value,
  );

let blurFlyCameraRotateSpeed =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorFlyCameraController.Method.blurFlyCameraRotateSpeed(
    (uiState, dispatchFunc),
    cameraController,
    value,
  );

let changeRotateSpeedAndBlur =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  let oldValue =
    FlyCameraEngineService.unsafeGetFlyCameraControllerRotateSpeed(
      cameraController,
    )
    |> StateLogicService.getEngineStateToGetData;

  changeRotateSpeed(cameraController, value);
  blurFlyCameraRotateSpeed(
    ~uiState,
    ~dispatchFunc,
    ~cameraController,
    ~value=oldValue,
    (),
  );
};

let changeWheelSpeed = (cameraController, value) =>
  MainEditorFlyCameraController.Method.changeWheelSpeed(
    cameraController,
    value,
  );

let blurFlyCameraWheelSpeed =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorFlyCameraController.Method.blurFlyCameraWheelSpeed(
    (uiState, dispatchFunc),
    cameraController,
    value,
  );

let changeWheelSpeedAndBlur =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  let oldValue =
    FlyCameraEngineService.unsafeGetFlyCameraControllerWheelSpeed(
      cameraController,
    )
    |> StateLogicService.getEngineStateToGetData;

  changeWheelSpeed(cameraController, value);
  blurFlyCameraWheelSpeed(
    ~uiState,
    ~dispatchFunc,
    ~cameraController,
    ~value=oldValue,
    (),
  );
};