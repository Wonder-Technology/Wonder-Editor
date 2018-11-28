type rect = (int, int, int, int);

type gameObject = Wonderjs.GameObjectType.gameObject;

type sceneViewRecord = {
  viewRect: option(rect),
  gridPlane: option(gameObject),
  editCamera: option(gameObject),
};