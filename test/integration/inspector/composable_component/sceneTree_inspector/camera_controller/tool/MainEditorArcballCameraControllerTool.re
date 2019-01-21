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