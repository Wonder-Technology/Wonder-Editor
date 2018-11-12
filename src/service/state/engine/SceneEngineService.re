open Wonderjs;

let createDefaultSceneGameObjects = (componentData, editorState, engineState) => {
  let (editorState, engineState, box1) =
    PrimitiveEngineService.createCube(componentData, editorState, engineState);
  let (editorState, engineState, box2) =
    PrimitiveEngineService.createCube(componentData, editorState, engineState);
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

let disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial = engineState => {
  let scene = engineState |> getSceneGameObject;

  engineState
  |> GameObjectEngineService.getAllGameObjects(scene)
  |> Js.Array.sliceFrom(1)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, gameObject) =>
         engineState
         |> GameObjectEngineService.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial(
              gameObject,
            ),
       engineState,
     );
};

let getSceneAllBasicCameraViews = engineState =>
  engineState
  |> GameObjectEngineService.getAllGameObjects(
       getSceneGameObject(engineState),
     )
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasBasicCameraViewComponent(
         gameObject,
         engineState,
       )
     )
  |> Js.Array.map(gameObject =>
       GameObjectComponentEngineService.unsafeGetBasicCameraViewComponent(
         gameObject,
         engineState,
       )
     );

let getSceneActiveBasicCameraView = engineState =>
  GameObjectEngineService.getGameObjectActiveBasicCameraView(
    getSceneGameObject(engineState),
    engineState,
  );

let getSceneAllBasicMaterials = engineState =>
  GameObjectEngineService.getAllBasicMaterials(
    GameObjectEngineService.getAllGameObjects(
      getSceneGameObject(engineState),
      engineState,
    ),
    engineState,
  );

let getSceneAllLightMaterials = engineState =>
  GameObjectEngineService.getAllLightMaterials(
    GameObjectEngineService.getAllGameObjects(
      getSceneGameObject(engineState),
      engineState,
    ),
    engineState,
  );

let clearShaderCacheAndReInitSceneAllLightMaterials = engineState =>
  LightMaterialEngineService.reInitAllLightMaterialsAndClearShaderCache(
    getSceneAllLightMaterials(engineState),
    engineState,
  );

let doesNeedReInitSceneAllLightMaterials = (gameObjects, engineState) =>
  gameObjects
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasLightComponent(
         gameObject,
         engineState,
       )
     )
  |> Js.Array.length > 0;

let unsafeGetSceneGameObjectsFromGameObjectMaterialComponent =
    (gameObject, engineState) => {
  let sceneAllGameObjects =
    engineState
    |> GameObjectEngineService.getAllGameObjects(
         getSceneGameObject(engineState),
       );

  AllMaterialEngineService.unsafeGetGameObjectsFromGameObjectMaterialComponentAndCopy(
    gameObject,
    engineState,
  )
  |> Js.Array.filter(gameObject =>
       sceneAllGameObjects |> Js.Array.includes(gameObject)
     );
};