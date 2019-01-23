type rect = (int, int, int, int);

type gameObject = Wonderjs.GameObjectPrimitiveType.gameObject;

type transformGameObjectData = {
  translationWholeGameObject: gameObject,
  translationXAxisGameObject: gameObject,
  translationYAxisGameObject: gameObject,
  translationZAxisGameObject: gameObject,
};

type sceneViewRecord = {
  viewRect: option(rect),
  gridPlane: option(gameObject),
  editCamera: option(gameObject),
  transformGameObjectData: option(transformGameObjectData),
};