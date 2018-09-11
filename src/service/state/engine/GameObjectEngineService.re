open Wonderjs;

let create = GameObjectAPI.createGameObject;

let initGameObject = GameObjectAPI.initGameObject;

let isGameObjectAlive = GameObjectAPI.isGameObjectAlive;

let disposeGameObject = GameObjectAPI.disposeGameObject;

let cloneGameObject = GameObjectAPI.cloneGameObject;

let disposeGameObjectKeepOrder = GameObjectAPI.disposeGameObjectKeepOrder;

let disposeGameObjectKeepOrderRemoveGeometry = GameObjectAPI.disposeGameObjectKeepOrderRemoveGeometry;

/* let hasGameObjectBoxGeometryComponent = GameObjectAPI.hasGameObjectBoxGeometryComponent; */
/*
 let hasGameObjectLightMaterialComponent = GameObjectAPI.hasGameObjectLightMaterialComponent; */

/* let hasGameObjectDirectionLightComponent = GameObjectAPI.hasGameObjectDirectionLightComponent;

   let hasGameObjectPointLightComponent = GameObjectAPI.hasGameObjectPointLightComponent; */

let getGameObjectName = GameObjectAPI.getGameObjectName;

let unsafeGetGameObjectName = GameObjectAPI.unsafeGetGameObjectName;

let setGameObjectName = (name, gameObject, engineState) =>
  GameObjectAPI.setGameObjectName(gameObject, name, engineState);

let getAllChildrenTransform = (rootGameObject, state) =>
  GameObjectAPI.getAllChildrenTransform(rootGameObject, state);

let getAllGameObjects = (rootGameObject, state) =>
  GameObjectAPI.getAllGameObjects(rootGameObject, state);

let disposeGameObjectArr = (gameObjectArr, engineState) =>
  gameObjectArr
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, gameObject) =>
         state |> isGameObjectAlive(gameObject) ?
           disposeGameObjectKeepOrder(gameObject, state) : state,
       engineState,
     );

let initAllGameObjects = (gameObject, state) =>
  getAllGameObjects(gameObject, state)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, gameObject) => initGameObject(gameObject, state),
       state,
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
       GameObjectComponentEngineService.getBasicCameraViewComponent(
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