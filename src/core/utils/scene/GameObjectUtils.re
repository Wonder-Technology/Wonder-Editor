let setParentKeepOrder = (parent, child, engineState) =>
  engineState
  |> TransformEngineService.setParentKeepOrder(
       GameObjectComponentEngineService.getTransformComponent(parent, engineState),
       GameObjectComponentEngineService.getTransformComponent(child, engineState)
     );

let getParent = (child, engineState) =>
  TransformEngineService.getParent(
    GameObjectComponentEngineService.getTransformComponent(child, engineState),
    engineState
  );

let addChild = (parent, child, engineState) =>
  TransformEngineService.setParent(
    GameObjectComponentEngineService.getTransformComponent(parent, engineState),
    GameObjectComponentEngineService.getTransformComponent(child, engineState),
    engineState
  );

let getChildren = (gameObject, engineState) =>
  TransformEngineService.getChildren(
    GameObjectComponentEngineService.getTransformComponent(gameObject, engineState),
    engineState
  )
  |> Js.Array.map(
       (transform) => TransformEngineService.getGameObjectByTransform(transform, engineState)
     );

let hasChildren = (gameObject, engineState) =>
  getChildren(gameObject, engineState) |> Js.Array.length > 0;

let disposeGameObjectChildren = (gameObject, engineEngineState) =>
  engineEngineState
  |> getChildren(gameObject)
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. engineEngineState, gameObject) =>
         engineEngineState |> GameObjectEngineService.disposeGameObject(gameObject),
       engineEngineState
     );