open Wonderjs;

let createDefaultSceneGameObjectsForEditEngineState =
    (cubeGeometry, engineState) => {
  let (engineState, box1) =
    PrimitiveEngineService.createBoxForEditEngineState(
      cubeGeometry,
      engineState,
    );
  let (engineState, box2) =
    PrimitiveEngineService.createBoxForEditEngineState(
      cubeGeometry,
      engineState,
    );
  let (engineState, directionLight) =
    PrimitiveEngineService.createDirectionLightForEditEngineState(
      engineState,
    );
  let (engineState, camera) =
    CameraEngineService.createCameraForEditEngineState(engineState);

  (engineState, camera, box1, box2, directionLight);
};

let createDefaultSceneGameObjectsForRunEngineState =
    (cubeGeometry, editorState, engineState) => {
  let (editorState, engineState, box1) =
    PrimitiveEngineService.createBoxForRunEngineState(
      cubeGeometry,
      editorState,
      engineState,
    );
  let (editorState, engineState, box2) =
    PrimitiveEngineService.createBoxForRunEngineState(
      cubeGeometry,
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

let setSceneGameObject = SceneAPI.setSceneGameObject;

let disposeSceneAndChildren = engineState => {
  let rec _iterateGameObjectArray = (gameObjectArr, engineState) =>
    gameObjectArr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. engineState, gameObject) => {
           let children =
             engineState |> GameObjectUtils.getChildren(gameObject);

           _iterateGameObjectArray(
             children,
             engineState
             |> GameObjectEngineService.disposeGameObject(gameObject),
           );
         },
         engineState,
       );

  engineState
  |> _iterateGameObjectArray([|engineState |> getSceneGameObject|]);
};