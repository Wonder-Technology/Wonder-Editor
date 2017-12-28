let createDefaultSceneGameObjects = (state) => {
  let (state, box1) = MainEditorPrimitiveOper.createBox(state);
  let (state, box2) = MainEditorPrimitiveOper.createBox(state);
  let (state, camera) = MainEditorCameraOper.createCamera(state);
  (state, camera, box1,box2)
};