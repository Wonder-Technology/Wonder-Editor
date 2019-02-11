open EditorType;

open ShapeType;

let buildPlane =
    (axisAEndGameObject, axisBEndGameObject, wholeGameObject, engineState) =>
  PlaneShapeUtils.setFromCoplanarPoints(
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        axisAEndGameObject,
        engineState,
      ),
      engineState,
    ),
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        axisBEndGameObject,
        engineState,
      ),
      engineState,
    ),
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        wholeGameObject,
        engineState,
      ),
      engineState,
    ),
  );