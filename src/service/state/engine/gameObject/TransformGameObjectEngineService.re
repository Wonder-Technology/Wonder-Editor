let getPosition = (gameObject, engineState) =>
  TransformEngineService.getPosition(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  );

let getLocalPosition = (gameObject, engineState) =>
  TransformEngineService.getLocalPosition(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  );

let setLocalPosition = (gameObject, pos, engineState) =>
  TransformEngineService.setLocalPosition(
    pos,
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  );

let getLocalRotation = (gameObject, engineState) =>
  TransformEngineService.getLocalRotation(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  );

let setLocalRotation = (gameObject, rotation, engineState) =>
  TransformEngineService.setLocalRotation(
    rotation,
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  );

let getLocalScale = (gameObject, engineState) =>
  TransformEngineService.getLocalScale(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  );

let setLocalScale = (gameObject, scale, engineState) =>
  TransformEngineService.setLocalScale(
    scale,
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  );

let getLocalToWorldMatrixTypeArray = (gameObject, engineState) =>
  TransformEngineService.getLocalToWorldMatrixTypeArray(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  );