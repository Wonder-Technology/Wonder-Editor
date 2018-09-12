open Wonderjs;

let createDefaultSceneGameObjects = (cubeGeometry, editorState, engineState) => {
  let (editorState, engineState, box1) =
    PrimitiveEngineService.createBox(cubeGeometry, editorState, engineState);
  let (editorState, engineState, box2) =
    PrimitiveEngineService.createBox(cubeGeometry, editorState, engineState);
  let (editorState, engineState, directionLight) =
    PrimitiveEngineService.createDirectionLight(editorState, engineState);
  let (editorState, engineState, camera) =
    CameraEngineService.createCamera(editorState, engineState);

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