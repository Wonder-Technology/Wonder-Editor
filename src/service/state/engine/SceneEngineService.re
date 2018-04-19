open Wonderjs;

let createDefaultSceneGameObjects = (state, createCameraFunc) => {
  let (state, box1) = PrimitiveEngineService.createBox(state);
  let (state, box2) = PrimitiveEngineService.createBox(state);
  let (state, camera) = createCameraFunc(state);
  (state, camera, box1, box2)
};

let setCurrentCameraGameObject = SceneAPI.setCurrentCameraGameObject;