open Wonderjs;

let createDefaultSceneGameObjects =
    (editorState, engineState, createCameraFunc) => {
  let (editorState, engineState, box1) =
    PrimitiveEngineService.createBox(editorState, engineState);
  let (editorState, engineState, box2) =
    PrimitiveEngineService.createBox(editorState, engineState);
  let (editorState, engineState, directionLight) =
    PrimitiveEngineService.createDirectionLight(editorState, engineState);
  let (editorState, engineState, camera) =
    createCameraFunc(editorState, engineState);

  (editorState, engineState, camera, box1, box2, directionLight);
};

let getAmbientLightColor = SceneAPI.getAmbientLightColor;

let setAmbientLightColor = SceneAPI.setAmbientLightColor;

let getSceneGameObject = SceneAPI.getSceneGameObject;

let addSceneChild = SceneAPI.addSceneChild;

let addSceneChildren = SceneAPI.addSceneChildren;