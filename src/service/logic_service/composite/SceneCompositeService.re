let createDefaultSceneGameObjects = (state) => {
  let (state, box1) = PrimitiveCompositeService.createBox(state);
  let (state, box2) = PrimitiveCompositeService.createBox(state);
  let (state, camera) = MainEditorCameraOper.createCamera(state);
  (state, camera, box1,box2)
};