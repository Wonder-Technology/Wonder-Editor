open Wonderjs;

let createDefaultSceneGameObjectsForEngineState = (cubeGeometry, engineState) => {
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
    CameraEngineService.createCameraForEngineState(engineState);

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

let disposeSceneAllChildrenKeepOrder = engineState => {
  let scene = engineState |> getSceneGameObject;

  engineState
  |> GameObjectEngineService.getAllGameObjects(scene)
  |> Js.Array.sliceFrom(1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, gameObject) =>
         engineState
         |> GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometry(
              gameObject,
            ),
       engineState,
     );
};

let getSceneActiveBasicCameraView = (scene, engineState) =>
  GameObjectEngineService.getGameObjectActiveBasicCameraView(
    scene,
    engineState,
  );