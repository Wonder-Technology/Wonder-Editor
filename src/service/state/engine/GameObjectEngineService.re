open Wonderjs;

let create = GameObjectAPI.createGameObject;

let initGameObject = GameObjectAPI.initGameObject;

let disposeGameObject = GameObjectAPI.disposeGameObject;

let disposeGameObjectBasicMaterialComponent = GameObjectAPI.disposeGameObjectBasicMaterialComponent;

let disposeGameObjectLightMaterialComponent = GameObjectAPI.disposeGameObjectLightMaterialComponent;

let disposeGameObjectKeepOrder = GameObjectAPI.disposeGameObjectKeepOrder;

/* let hasGameObjectBoxGeometryComponent = GameObjectAPI.hasGameObjectBoxGeometryComponent; */
/*
 let hasGameObjectLightMaterialComponent = GameObjectAPI.hasGameObjectLightMaterialComponent; */

/* let hasGameObjectDirectionLightComponent = GameObjectAPI.hasGameObjectDirectionLightComponent;

   let hasGameObjectPointLightComponent = GameObjectAPI.hasGameObjectPointLightComponent; */

let unsafeGetGameObjectName = GameObjectAPI.unsafeGetGameObjectName;

let setGameObjectName = (name, gameObject, engineState) =>
  GameObjectAPI.setGameObjectName(gameObject, name, engineState);

let unsafeGetGameObjectChildren = (gameObject, engineState) =>
  TransformAPI.unsafeGetTransformChildren(
    GameObjectAPI.unsafeGetGameObjectTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  )
  |> Js.Array.map(transform =>
       TransformAPI.unsafeGetTransformGameObject(transform, engineState)
     );

let getAllLightMaterialsExcludeTargetAndItsChildren =
    (gameObject, targetGameObject, engineState) => {
  let rec _iterate = (targetGameObject, gameObjectArr, resultArr) =>
    gameObjectArr
    |> Js.Array.filter(gameObject => gameObject !== targetGameObject)
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. resultArr, gameObject) =>
           _iterate(
             targetGameObject,
             unsafeGetGameObjectChildren(gameObject, engineState),
             GameObjectAPI.hasGameObjectLightMaterialComponent(
               gameObject,
               engineState,
             ) ?
               resultArr
               |> ArrayService.push(
                    GameObjectAPI.unsafeGetGameObjectLightMaterialComponent(
                      gameObject,
                      engineState,
                    ),
                  ) :
               resultArr,
           ),
         resultArr,
       );

  _iterate(targetGameObject, [|gameObject|], [||]);
};