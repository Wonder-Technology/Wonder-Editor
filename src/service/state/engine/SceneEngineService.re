open Wonderjs;
let getAmbientLightColor = SceneAPI.getAmbientLightColor;

let setAmbientLightColor = SceneAPI.setAmbientLightColor;

let getSceneGameObject = SceneAPI.getSceneGameObject;

let addSceneChild = SceneAPI.addSceneChild;

let addSceneChildren = SceneAPI.addSceneChildren;

let setSceneGameObject = SceneAPI.setSceneGameObject;

let isSceneGameObject = (gameObject, engineState) =>
  gameObject === getSceneGameObject(engineState);

let disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial = engineState => {
  let scene = engineState |> getSceneGameObject;

  engineState
  |> HierarchyGameObjectEngineService.getAllGameObjects(scene)
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

/* let getSceneAllBasicCameraViews = engineState =>
   engineState
   |> HierarchyGameObjectEngineService.getAllGameObjects(
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
      ); */

let getSceneActiveBasicCameraView = engineState =>
  GameObjectEngineService.getGameObjectActiveBasicCameraView(
    getSceneGameObject(engineState),
    engineState,
  );

/* let getSceneAllBasicMaterials = engineState =>
   GameObjectEngineService.getAllBasicMaterials(
     HierarchyGameObjectEngineService.getAllGameObjects(
       getSceneGameObject(engineState),
       engineState,
     ),
     engineState,
   ); */

let getSceneAllLightMaterials = engineState =>
  GameObjectEngineService.getAllLightMaterials(
    HierarchyGameObjectEngineService.getAllGameObjects(
      getSceneGameObject(engineState),
      engineState,
    ),
    engineState,
  );

let clearShaderCacheAndReInitAllLightMaterials = engineState =>
  LightMaterialEngineService.reInitLightMaterialsAndClearShaderCache(
    LightMaterialEngineService.getAllLightMaterials(engineState),
    engineState,
  );

let isNeedReInitAllLightMaterials = (gameObjects, engineState) =>
  gameObjects
  |> Js.Array.filter(gameObject =>
       GameObjectComponentEngineService.hasLightComponent(
         gameObject,
         engineState,
       )
     )
  |> Js.Array.length > 0;

let getDefaultName = () => "Scene";