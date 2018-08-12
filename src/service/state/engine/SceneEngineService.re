open Wonderjs;

let createDefaultSceneGameObjectsForEditEngineState =
    (engineState) => {
  let (engineState, box1) =
    PrimitiveEngineService.createBoxForEditEngineState(engineState);
  let (engineState, box2) =
    PrimitiveEngineService.createBoxForEditEngineState(engineState);
  let (engineState, directionLight) =
    PrimitiveEngineService.createDirectionLightForEditEngineState(
      engineState,
    );
  let (engineState, camera) =
    CameraEngineService.createCameraForEditEngineState(engineState);

  (engineState, camera, box1, box2, directionLight);
};

let createDefaultSceneGameObjectsForRunEngineState =
    (editorState, engineState) => {
  let (editorState, engineState, box1) =
    PrimitiveEngineService.createBoxForRunEngineState(
      editorState,
      engineState,
    );
  let (editorState, engineState, box2) =
    PrimitiveEngineService.createBoxForRunEngineState(
      editorState,
      engineState,
    );
  let (editorState, engineState, directionLight) =
    PrimitiveEngineService.createDirectionLightForRunEngineState(
      editorState,
      engineState,
    );
  let (editorState, engineState, camera) =
    CameraEngineService.createCameraForRunEngineState(
      editorState,
      engineState,
    );

  (editorState, engineState, camera, box1, box2, directionLight);
};

let getAmbientLightColor = SceneAPI.getAmbientLightColor;

let setAmbientLightColor = SceneAPI.setAmbientLightColor;

let getSceneGameObject = SceneAPI.getSceneGameObject;

let addSceneChild = SceneAPI.addSceneChild;

let addSceneChildren = SceneAPI.addSceneChildren;