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

let getChildren = (gameObject, state) =>
  TransformEngineService.getChildren(
    GameObjectComponentEngineService.getTransformComponent(gameObject, state),
    state
  )
  |> Js.Array.map((transform) => TransformEngineService.getGameObjectByTransform(transform, state));

let hasChildren = (gameObject, state) => getChildren(gameObject, state) |> Js.Array.length > 0;

let disposeGameObjectChildren = (gameObject, engineState) =>
  engineState
  |> getChildren(gameObject)
  |> Js.Array.reduce(
       (engineState, gameObject) => engineState |> disposeGameObject(gameObject),
       engineState
     );

let _isDragedGameObjectBeTargetGameObjectParent = (targetGameObject, dragedGameObject, engineState) => {
  let rec _judgeAllParents = (targetTransform, dragedTransform, engineState) =>
    switch (TransformEngineService.getParent(targetTransform, engineState) |> Js.Nullable.to_opt) {
    | None => false
    | Some(transformParent) =>
      transformParent === dragedTransform ?
        true : _judgeAllParents(transformParent, dragedTransform, engineState)
    };
  _judgeAllParents(
    GameObjectComponentEngineService.getTransformComponent(targetGameObject, engineState),
    GameObjectComponentEngineService.getTransformComponent(dragedGameObject, engineState),
    engineState
  )
};

let isGameObjectRelationError = (targetGameObject, dragedGameObject, (_, engineState)) =>
  targetGameObject === dragedGameObject ?
    true :
    _isDragedGameObjectBeTargetGameObjectParent(targetGameObject, dragedGameObject, engineState);