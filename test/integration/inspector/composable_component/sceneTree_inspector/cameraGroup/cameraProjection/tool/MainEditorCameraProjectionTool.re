let changeNear = (cameraProjection, value) =>
  MainEditorCameraProjection.Method.changeNear(cameraProjection, value);

let blurNear =
    (
      ~cameraProjection,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorCameraProjection.Method.blurNearEvent(
    (uiState, dispatchFunc),
    cameraProjection,
    value,
  );

let changeNearAndBlur =
    (
      ~cameraProjection,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  MainEditorCameraProjection.Method.changeNear(cameraProjection, value);
  blurNear(~uiState, ~dispatchFunc, ~cameraProjection, ~value, ());
};

let changeFar = (cameraProjection, value) =>
  MainEditorCameraProjection.Method.changeFar(cameraProjection, value);

let blurFar =
    (
      ~cameraProjection,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorCameraProjection.Method.blurFarEvent(
    (uiState, dispatchFunc),
    cameraProjection,
    value,
  );

let changeFarAndBlur =
    (
      ~cameraProjection,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  MainEditorCameraProjection.Method.changeFar(cameraProjection, value);
  blurFar(~uiState, ~dispatchFunc, ~cameraProjection, ~value, ());
};

let changeFovy = (cameraProjection, value) =>
  MainEditorCameraProjection.Method.changeFovy(cameraProjection, value);

let blurFovy =
    (
      ~cameraProjection,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorCameraProjection.Method.blurFovyEvent(
    (uiState, dispatchFunc),
    cameraProjection,
    value,
  );

let changeFovyAndBlur =
    (
      ~cameraProjection,
      ~value,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  MainEditorCameraProjection.Method.changeFovy(cameraProjection, value);
  blurFovy(~uiState, ~dispatchFunc, ~cameraProjection, ~value, ());
};