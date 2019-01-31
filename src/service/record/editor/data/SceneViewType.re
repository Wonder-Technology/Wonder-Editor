type rect = (int, int, int, int);

type gameObject = Wonderjs.GameObjectPrimitiveType.gameObject;

type transformGizmoData = {
  translationWholeGizmo: gameObject,
  translationXAxisGizmo: gameObject,
  translationYAxisGizmo: gameObject,
  translationZAxisGizmo: gameObject,
  translationXYPlaneGizmo: gameObject,
  translationXZPlaneGizmo: gameObject,
  translationYZPlaneGizmo: gameObject,
  isTranslationXAxisGizmoSelected: bool,
  isTranslationYAxisGizmoSelected: bool,
  isTranslationZAxisGizmoSelected: bool,
  isTranslationXYPlaneGizmoSelected: bool,
  isTranslationXZPlaneGizmoSelected: bool,
  isTranslationYZPlaneGizmoSelected: bool,
  currentSceneTreeNodeStartPoint: option((float, float, float)),
  axisGameObjectStartPoint: option((float, float, float)),
  pickStartPoint: option((float, float, float)),
};

type sceneViewRecord = {
  viewRect: option(rect),
  gridPlane: option(gameObject),
  editCamera: option(gameObject),
  transformGizmoData: option(transformGizmoData),
};