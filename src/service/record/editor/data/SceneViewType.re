type rect = (int, int, int, int);

type gameObject = Wonderjs.GameObjectPrimitiveType.gameObject;

type transformGameObjectData = {
  translationWholeGameObject: gameObject,
  translationXAxisGameObject: gameObject,
  translationYAxisGameObject: gameObject,
  translationZAxisGameObject: gameObject,
  isTranslationXAxisGameObjectSelected: bool,
  isTranslationYAxisGameObjectSelected: bool,
  isTranslationZAxisGameObjectSelected: bool,
  intersectPointWithPlaneOffsetForXAxis: option(float),
  intersectPointWithPlaneOffsetForYAxis: option(float),
  intersectPointWithPlaneOffsetForZAxis: option(float),
};

type sceneViewRecord = {
  viewRect: option(rect),
  gridPlane: option(gameObject),
  editCamera: option(gameObject),
  transformGameObjectData: option(transformGameObjectData),
};