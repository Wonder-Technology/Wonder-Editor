let createDefaultSceneGameObjects = (state) => {
  let (state, box) = MainEditorPrimitiveOper.createBox(state);
  let (state, camera) = MainEditorCameraOper.createCamera(state);
  (state, camera, box)
};