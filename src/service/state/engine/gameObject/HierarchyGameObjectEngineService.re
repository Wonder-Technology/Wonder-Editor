open Wonderjs;

let getAllChildrenTransform = (rootGameObject, engineState) =>
  GameObjectAPI.getAllChildrenTransform(rootGameObject, engineState);

let getAllGameObjects = (rootGameObject, engineState) =>
  GameObjectAPI.getAllGameObjects(rootGameObject, engineState);

let changeGameObjectChildOrder =
    (sourceGameObject, targetGameObject, transformType, engineState) => {
  let sourceTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      sourceGameObject,
      engineState,
    );
  let targetTransform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      targetGameObject,
      engineState,
    );
  let targetParentTransform =
    TransformEngineService.getParent(targetTransform, engineState)
    |> OptionService.unsafeGet;

  TransformEngineService.changeChildOrder(
    sourceTransform,
    targetTransform,
    targetParentTransform,
    transformType,
    engineState,
  );
};

let setParentKeepOrder = (parent, child, engineState) =>
  engineState
  |> TransformEngineService.setParentKeepOrder(
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         parent,
         engineState,
       ),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         child,
         engineState,
       ),
     );

let getParentTransform = (child, engineState) =>
  TransformEngineService.getParent(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      child,
      engineState,
    ),
    engineState,
  );

let getParentGameObject = (child, engineState) =>
  getParentTransform(child, engineState)
  |> Js.Option.map((. parentTransform) =>
       TransformEngineService.getGameObjectByTransform(
         parentTransform,
         engineState,
       )
     );

let addChild = (parent, child, engineState) =>
  TransformEngineService.setParent(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      parent,
      engineState,
    ),
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      child,
      engineState,
    ),
    engineState,
  );

let getChildren = (gameObject, engineState) =>
  TransformEngineService.getChildren(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  )
  |> Js.Array.map(transform =>
       TransformEngineService.getGameObjectByTransform(transform, engineState)
     );

let hasChildren = (gameObject, engineState) =>
  getChildren(gameObject, engineState) |> Js.Array.length > 0;