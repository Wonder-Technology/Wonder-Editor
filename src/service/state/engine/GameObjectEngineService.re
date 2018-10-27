open Wonderjs;

let create = GameObjectAPI.createGameObject;

let initGameObject = GameObjectAPI.initGameObject;

let isGameObjectAlive = GameObjectAPI.isGameObjectAlive;

let disposeGameObject = GameObjectAPI.disposeGameObject;

let cloneGameObject = GameObjectAPI.cloneGameObject;

let disposeGameObjectKeepOrder = GameObjectAPI.disposeGameObjectKeepOrder;

let disposeGameObjectKeepOrderRemoveGeometry = GameObjectAPI.disposeGameObjectKeepOrderRemoveGeometry;

let disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial = GameObjectAPI.disposeGameObjectKeepOrderRemoveGeometryRemoveMaterial;

/* let hasGameObjectBoxGeometryComponent = GameObjectAPI.hasGameObjectBoxGeometryComponent; */
/*
 let hasGameObjectLightMaterialComponent = GameObjectAPI.hasGameObjectLightMaterialComponent; */

/* let hasGameObjectDirectionLightComponent = GameObjectAPI.hasGameObjectDirectionLightComponent;

   let hasGameObjectPointLightComponent = GameObjectAPI.hasGameObjectPointLightComponent; */

let getGameObjectName = GameObjectAPI.getGameObjectName;

let unsafeGetGameObjectName = GameObjectAPI.unsafeGetGameObjectName;

let setGameObjectName = (name, gameObject, engineState) =>
  GameObjectAPI.setGameObjectName(gameObject, name, engineState);

let getAllChildrenTransform = (rootGameObject, engineState) =>
  GameObjectAPI.getAllChildrenTransform(rootGameObject, engineState);

let getAllGameObjects = (rootGameObject, engineState) =>
  GameObjectAPI.getAllGameObjects(rootGameObject, engineState);

let _getAllComponents =
    (allGameObjects, (hasComponentFunc, unsafeGetComponentFunc), engineState) =>
  allGameObjects
  |> Js.Array.filter(gameObject => hasComponentFunc(gameObject, engineState))
  |> Js.Array.map(gameObject =>
       unsafeGetComponentFunc(gameObject, engineState)
     );

let getAllBasicMaterials = (allGameObjects, engineState) =>
  _getAllComponents(
    allGameObjects,
    (
      GameObjectComponentEngineService.hasBasicMaterialComponent,
      GameObjectComponentEngineService.unsafeGetBasicMaterialComponent,
    ),
    engineState,
  );

let getAllLightMaterials = (allGameObjects, engineState) =>
  _getAllComponents(
    allGameObjects,
    (
      GameObjectComponentEngineService.hasLightMaterialComponent,
      GameObjectComponentEngineService.unsafeGetLightMaterialComponent,
    ),
    engineState,
  );

let getAllArcballCameraControllers = (allGameObjects, engineState) =>
  _getAllComponents(
    allGameObjects,
    (
      GameObjectComponentEngineService.hasArcballCameraControllerComponent,
      GameObjectComponentEngineService.unsafeGetArcballCameraControllerComponent,
    ),
    engineState,
  );

let disposeGameObjectArrKeepOrder = (gameObjectArr, engineState) =>
  gameObjectArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, gameObject) =>
         engineState |> isGameObjectAlive(gameObject) ?
           disposeGameObjectKeepOrder(gameObject, engineState) : engineState,
       engineState,
     );

let initAllGameObjects = (gameObject, engineState) =>
  getAllGameObjects(gameObject, engineState)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineState, gameObject) =>
         initGameObject(gameObject, engineState),
       engineState,
     );

let _getGameObjectActiveBasicCameraViews = (gameObject, engineState) =>
  engineState
  |> getAllGameObjects(gameObject)
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
     )
  |> Js.Array.filter(basicCameraView =>
       BasicCameraViewEngineService.isActiveBasicCameraView(
         basicCameraView,
         engineState,
       )
     )
  |> WonderLog.Contract.ensureCheck(
       activedBasicCameraViews =>
         WonderLog.(
           Contract.(
             Operators.(
               test(
                 Log.buildAssertMessage(
                   ~expect={j|only has 0 or 1 active basicCameraView|j},
                   ~actual={j|not|j},
                 ),
                 () =>
                 activedBasicCameraViews |> Js.Array.length <= 1
               )
             )
           )
         ),
       StateEditorService.getStateIsDebug(),
     );

let getGameObjectActiveBasicCameraView = (gameObject, engineState) => {
  let activeBasicCameraViews =
    _getGameObjectActiveBasicCameraViews(gameObject, engineState);

  activeBasicCameraViews |> Js.Array.length === 0 ?
    None : Array.unsafe_get(activeBasicCameraViews, 0) |. Some;
};