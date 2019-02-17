let changeDistance = (cameraController, value) =>
  MainEditorArcballCameraController.Method.changeDistance(
    cameraController,
    value,
  );

let blurArcballCameraDistance =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorArcballCameraController.Method.blurArcballCameraDistance(
    (uiState, dispatchFunc),
    cameraController,
    value,
  );

let changeDistanceAndBlur =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  changeDistance(cameraController, value);
  blurArcballCameraDistance(
    ~uiState,
    ~dispatchFunc,
    ~cameraController,
    ~value,
    (),
  );
};

let dragDropArcballCameraDistance =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorArcballCameraController.Method.dragDropArcballCameraDistance(
    (uiState, dispatchFunc),
    cameraController,
    value,
  );

let changeDistanceAndDragDrop =
    (
      ~cameraController,
      ~changeValue,
      ~dragDropValue,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  changeDistance(cameraController, changeValue);
  dragDropArcballCameraDistance(
    ~uiState,
    ~dispatchFunc,
    ~cameraController,
    ~value=dragDropValue,
    (),
  );
};

let changeMinDistance = (cameraController, value) =>
  MainEditorArcballCameraController.Method.changeMinDistance(
    cameraController,
    value,
  );

let blurArcballCameraMinDistance =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorArcballCameraController.Method.blurArcballCameraMinDistance(
    (uiState, dispatchFunc),
    cameraController,
    value,
  );

let changeMinDistanceAndBlur =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  changeMinDistance(cameraController, value);
  blurArcballCameraMinDistance(
    ~uiState,
    ~dispatchFunc,
    ~cameraController,
    ~value,
    (),
  );
};

let changePhi = (cameraController, value) =>
  MainEditorArcballCameraController.Method.changePhi(cameraController, value);

let blurArcballCameraPhi =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorArcballCameraController.Method.blurArcballCameraPhi(
    (uiState, dispatchFunc),
    cameraController,
    value,
  );

let changePhiAndBlur =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  changePhi(cameraController, value);
  blurArcballCameraPhi(
    ~uiState,
    ~dispatchFunc,
    ~cameraController,
    ~value,
    (),
  );
};

let changeTheta = (cameraController, value) =>
  MainEditorArcballCameraController.Method.changeTheta(
    cameraController,
    value,
  );

let blurArcballCameraTheta =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorArcballCameraController.Method.blurArcballCameraTheta(
    (uiState, dispatchFunc),
    cameraController,
    value,
  );

let changeThetaAndBlur =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  changeTheta(cameraController, value);
  blurArcballCameraTheta(
    ~uiState,
    ~dispatchFunc,
    ~cameraController,
    ~value,
    (),
  );
};

let changeTargetX = (cameraController, value) =>
  MainEditorArcballCameraController.Method.changeTargetX(
    cameraController,
    value,
  );

let blurArcballCameraTarget =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorArcballCameraController.Method.blurArcballCameraTarget(
    (uiState, dispatchFunc),
    cameraController,
    value,
  );

let changeTargetXAndBlur =
    (
      ~cameraController,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  let oldTarget =
    ArcballCameraEngineService.unsafeGetArcballCameraControllerTarget(
      cameraController,
    )
    |> StateLogicService.getEngineStateToGetData;

  changeTargetX(cameraController, value);

  blurArcballCameraTarget(
    ~uiState,
    ~dispatchFunc,
    ~cameraController,
    ~value=oldTarget,
    (),
  );
};