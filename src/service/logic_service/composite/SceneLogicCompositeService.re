let createDefaultSceneGameObjects = (state) => {
  let (state, box1) = PrimitiveLogicCompositeService.createBox(state);
  let (state, box2) = PrimitiveLogicCompositeService.createBox(state);
  let (state, camera) = CameraLogicCompositeService.createCamera(state);
  (state, camera, box1,box2)
};