type rect = (int, int, int, int);

type gizmo =
  | Translation
  | Rotation;

type gameObject = Wonderjs.GameObjectPrimitiveType.gameObject;

type translationGizmoData = {
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

type transformGizmoData = {
  currentGizmoType: gizmo,
  translationGizmoData,
};

type sceneViewRecord = {
  viewRect: option(rect),
  gridPlane: option(gameObject),
  editCamera: option(gameObject),
  transformGizmoData: option(transformGizmoData),
};