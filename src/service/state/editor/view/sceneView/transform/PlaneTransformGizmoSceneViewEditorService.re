open EditorType;

open ShapeType;

let buildPlane = (normal, wholeGameObject, engineState) =>
  PlaneShapeUtils.setFromNormalAndCoplanarPoint(
    normal,
    TransformEngineService.getPosition(
      GameObjectComponentEngineService.unsafeGetTransformComponent(
        wholeGameObject,
        engineState,
      ),
      engineState,
    ),
  );