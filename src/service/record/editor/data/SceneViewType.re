type rect = (int, int, int, int);

type gizmo =
  | Translation
  | Rotation
  | Scale;

type translationGizmo =
  | XAxis
  | YAxis
  | ZAxis
  | XYPlane
  | XZPlane
  | YZPlane;

type rotationGizmo =
  | XYCircle
  | XZCircle
  | YZCircle;

type scaleGizmo =
  | XAxis
  | YAxis
  | ZAxis
  | CenterBox;

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
  currentSceneTreeNodeStartLocalPosition: option((float, float, float)),
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
  currentSceneTreeNodeStartLocalEulerAngles: option((float, float, float)),
};

type scaleGizmoData = {
  scaleWholeGizmo: gameObject,
  scaleXAxisGizmo: gameObject,
  scaleYAxisGizmo: gameObject,
  scaleZAxisGizmo: gameObject,
  scaleCenterBoxGizmo: gameObject,
  isScaleXAxisGizmoSelected: bool,
  isScaleYAxisGizmoSelected: bool,
  isScaleZAxisGizmoSelected: bool,
  isScaleCenterBoxGizmoSelected: bool,
  dragStartMouseLocation: option((int, int)),
  dragStartPointInLocalCoordinateSystem: option((float, float, float)),
  currentSceneTreeNodeStartLocalScale: option((float, float, float)),
};

type coordinateSystem =
  | World
  | Local;

type transformGizmoData = {
  currentGizmoType: gizmo,
  coordinateSystem,
  translationGizmoData,
  rotationGizmoData,
  scaleGizmoData,
};

type sceneViewRecord = {
  viewRect: option(rect),
  gridPlane: option(gameObject),
  editCamera: option(gameObject),
  transformGizmoData: option(transformGizmoData),
};