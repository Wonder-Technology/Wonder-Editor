let getLocalEulerAngles = (gameObject, engineState) =>
  TransformEngineService.getLocalEulerAngles(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  )
  |> Vector3Service.truncate(5);

let setLocalEulerAngles = (gameObject, localEulerAngles, engineState) =>
  TransformEngineService.setLocalEulerAngles(
    localEulerAngles,
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  );

let getEulerAngles = (gameObject, engineState) =>
  TransformEngineService.getEulerAngles(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  )
  |> Vector3Service.truncate(5);

let getLocalScale = (gameObject, engineState) =>
  TransformEngineService.getLocalScale(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  )
  |> Vector3Service.truncate(5);

let setLocalScale = (gameObject, localScale, engineState) =>
  TransformEngineService.setLocalScale(
    localScale,
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  );

let setPosition = (gameObject, pos, engineState) =>
  TransformEngineService.setPosition(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    pos,
    engineState,
  );

let setLocalRotation = (gameObject, localRotation, engineState) =>
  TransformEngineService.setLocalRotation(
    localRotation,
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      gameObject,
      engineState,
    ),
    engineState,
  );