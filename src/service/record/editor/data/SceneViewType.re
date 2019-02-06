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
  dragStartPoint: option((float, float, float)),
};

type rotationGizmoData = {
  rotationWholeGizmo: gameObject,
  rotationXZCircle: gameObject,
  rotationXYCircle: gameObject,
  rotationYZCircle: gameObject,
  isXZCircleGizmoSelected: bool,
  isXYCircleGizmoSelected: bool,
  isYZCircleGizmoSelected: bool,
  dragStartPoint: option((float, float, float)),
  lastTotalAngle: option(float),
};

type transformGizmoData = {
  currentGizmoType: gizmo,
  translationGizmoData,
  rotationGizmoData,
};

type sceneViewRecord = {
  viewRect: option(rect),
  gridPlane: option(gameObject),
  editCamera: option(gameObject),
  transformGizmoData: option(transformGizmoData),
};