let changeNear = (cameraProjection, value) =>
  MainEditorCameraProjection.Method.changeNear(cameraProjection, value);

let blurNear =
    (
      ~cameraProjection,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorCameraProjection.Method.blurNearEvent(
    (store, dispatchFunc),
    cameraProjection,
    value,
  );

let changeNearAndBlur =
    (
      ~cameraProjection,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  MainEditorCameraProjection.Method.changeNear(cameraProjection, value);
  blurNear(~store, ~dispatchFunc, ~cameraProjection, ~value, ());
};

let changeFar = (cameraProjection, value) =>
  MainEditorCameraProjection.Method.changeFar(cameraProjection, value);

let blurFar =
    (
      ~cameraProjection,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorCameraProjection.Method.blurFarEvent(
    (store, dispatchFunc),
    cameraProjection,
    value,
  );

let changeFarAndBlur =
    (
      ~cameraProjection,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  MainEditorCameraProjection.Method.changeFar(cameraProjection, value);
  blurFar(~store, ~dispatchFunc, ~cameraProjection, ~value, ());
};

let changeFovy = (cameraProjection, value) =>
  MainEditorCameraProjection.Method.changeFovy(cameraProjection, value);

let blurFovy =
    (
      ~cameraProjection,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorCameraProjection.Method.blurFovyEvent(
    (store, dispatchFunc),
    cameraProjection,
    value,
  );

let changeFovyAndBlur =
    (
      ~cameraProjection,
      ~value,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) => {
  MainEditorCameraProjection.Method.changeFovy(cameraProjection, value);
  blurFovy(~store, ~dispatchFunc, ~cameraProjection, ~value, ());
};