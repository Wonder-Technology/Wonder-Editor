let createCameraControllerPerspectiveCamera = (state) => {
  open MainEditorCameraControllerAdaptor;
  let (state, cameraController) = create(state);
  let state =
    state
    |> setPerspectiveCameraNear(cameraController, 0.1)
    |> setPerspectiveCameraFar(cameraController, 1000.)
    |> setPerspectiveCameraFovy(cameraController, 60.)
    |> setPerspectiveCameraAspect(cameraController, 1.);
  let state = state |> setPerspectiveCamera(cameraController);
  (state, cameraController)
};

let createCamera = (state) => {
  open MainEditorGameObjectAdaptor;
  open MainEditorTransformAdaptor;
  let (state, cameraController) = createCameraControllerPerspectiveCamera(state);
  let (state, gameObject) = state |> create;
  let state = state |> addCameraControllerComponent(gameObject, cameraController);
  let transform = getTransformComponent(gameObject, state);
  let state = state |> setLocalPosition(transform, (0., 0., 40.));
  (state, gameObject)
};