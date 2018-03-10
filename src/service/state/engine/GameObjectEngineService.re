open Wonderjs;

let create = GameObject.createGameObject;

let initGameObject = GameObject.initGameObject;

let disposeGameObject = GameObject.disposeGameObject;

let addChild = (parent, child, state) =>
  TransformEngineService.setParent(
    GameObjectComponentEngineService.getTransformComponent(parent, state),
    GameObjectComponentEngineService.getTransformComponent(child, state),
    state
  );

let getChildren = (gameObject, state) =>{
  TransformEngineService.getChildren(
    GameObjectComponentEngineService.getTransformComponent(gameObject, state),
    state
  )
  |> Js.Array.map((transform) => TransformEngineService.getGameObjectByTransform(transform, state))};

let hasChildren = (gameObject, state) => getChildren(gameObject, state) |> Js.Array.length > 0;

let disposeGameObjectChildren = (gameObject, engineState) =>
  engineState
  |> getChildren(gameObject)
  |> Js.Array.reduce(
       (engineState, gameObject) =>
         engineState |> disposeGameObject(gameObject),
       engineState
     );