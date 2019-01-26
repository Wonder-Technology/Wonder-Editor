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
  axisGameObjectStartPoint: option((float, float, float)),
  pickStartPoint: option((float, float, float)),
};

type sceneViewRecord = {
  viewRect: option(rect),
  gridPlane: option(gameObject),
  editCamera: option(gameObject),
  transformGameObjectData: option(transformGameObjectData),
};