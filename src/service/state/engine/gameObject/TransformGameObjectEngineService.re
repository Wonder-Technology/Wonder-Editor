let getPosition = (gameObject, engineState) =>
  TransformEngineService.getPosition(
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

let setLocalScale = (gameObject, scale, engineState) =>
  TransformEngineService.setLocalScale(
    scale,
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  );