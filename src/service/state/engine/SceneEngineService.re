open Wonderjs;

let createDefaultSceneGameObjects = (state, createCameraFunc) => {
  let (state, box1) = PrimitiveEngineService.createBox(state);
  let (state, box2) = PrimitiveEngineService.createBox(state);
  let (state, directionLight) =
    PrimitiveEngineService.createDirectionLight(state);
  let (state, camera) = createCameraFunc(state);
  (state, camera, box1, box2, directionLight);
};

let setCurrentCameraGameObject = SceneAPI.setCurrentCameraGameObject;

let getCurrentCameraGameObject = SceneAPI.getCurrentCameraGameObject;

let getAmbientLightColor = SceneAPI.getAmbientLightColor;

let setAmbientLightColor = SceneAPI.setAmbientLightColor;

let getSceneGameObject = SceneAPI.getSceneGameObject;

let addSceneChild = SceneAPI.addSceneChild;

let addSceneChildren = SceneAPI.addSceneChildren;