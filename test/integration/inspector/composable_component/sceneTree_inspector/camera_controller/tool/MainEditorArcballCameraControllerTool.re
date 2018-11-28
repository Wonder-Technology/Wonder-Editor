let changeDistance = (cameraController, value) =>
  MainEditorArcballCameraController.Method.changeDistance(
    cameraController,
    value,
  );

let blurArcballCameraDistance =
    (
      ~cameraController,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorArcballCameraController.Method.blurArcballCameraDistance(
    (store, dispatchFunc),
    cameraController,
    value,
  );

let changeDistanceAndBlur =
    (
      ~cameraController,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  changeDistance(cameraController, value);
  blurArcballCameraDistance(
    ~store,
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
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorArcballCameraController.Method.blurArcballCameraMinDistance(
    (store, dispatchFunc),
    cameraController,
    value,
  );

let changeMinDistanceAndBlur =
    (
      ~cameraController,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  changeMinDistance(cameraController, value);
  blurArcballCameraMinDistance(
    ~store,
    ~dispatchFunc,
    ~cameraController,
    ~value,
    (),
  );
};