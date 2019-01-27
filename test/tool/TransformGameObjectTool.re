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