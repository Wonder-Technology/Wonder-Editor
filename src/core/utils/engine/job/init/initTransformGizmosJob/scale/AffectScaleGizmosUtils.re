let _scaleCurrentSceneTreeNode = (newScale, editorState, engineState) => {
  let engineState =
    engineState
    |> TransformEngineService.setLocalScale(
         newScale,
         GameObjectComponentEngineService.unsafeGetTransformComponent(
           SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
           engineState,
         ),
       );

  (editorState, engineState);
};

let _getDirection = theAxisSegOfIntersectedPointWithAxisInLocalCoordinateSystem =>
  theAxisSegOfIntersectedPointWithAxisInLocalCoordinateSystem > 0. ?
    1. : (-1.);

let _getReplacedZeroFactor = () => 0.001;

let _isFactorNearlyZero = scaleFactor =>
  scaleFactor |> Js.Math.abs_float <= 0.001;

let _avoidZero = scaleFactor =>
  _isFactorNearlyZero(scaleFactor) ? _getReplacedZeroFactor() : scaleFactor;

let _computeCurrentSceneTreeNodeNewScaleForXAxis =
    (ray, (editorState, engineState)) => {
  let (intersectedPointWithAxisInLocalCoordinateSystemX, _, _) =
    AxisScaleGizmoUtils.getIntersectedPointWithAxisInLocalCoordinateSystemForXAxis(
      ray,
      (editorState, engineState),
    );

  let (dragStartPointInLocalCoordinateSystemX, _, _) =
    AxisScaleGizmoSceneViewEditorService.unsafeDragStartPointInLocalCoordinateSystem(
      editorState,
    );

  let direction =
    intersectedPointWithAxisInLocalCoordinateSystemX |> _getDirection;

  let (startLocalScaleX, startLocalScaleY, startLocalScaleZ) =
    OperateScaleGizmoSceneViewEditorService.unsafeGetCurrentSceneTreeNodeStartLocalScale(
      editorState,
    );

  (
    startLocalScaleX
    *. direction
    *. Js.Math.abs_float(
         intersectedPointWithAxisInLocalCoordinateSystemX
         /. dragStartPointInLocalCoordinateSystemX,
       )
    |> _avoidZero,
    startLocalScaleY,
    startLocalScaleZ,
  );
};

let _computeCurrentSceneTreeNodeNewScaleForYAxis =
    (ray, (editorState, engineState)) => {
  let (_, intersectedPointWithAxisInLocalCoordinateSystemY, _) =
    AxisScaleGizmoUtils.getIntersectedPointWithAxisInLocalCoordinateSystemForYAxis(
      ray,
      (editorState, engineState),
    );

  let (_, dragStartPointInLocalCoordinateSystemY, _) =
    AxisScaleGizmoSceneViewEditorService.unsafeDragStartPointInLocalCoordinateSystem(
      editorState,
    );

  let direction =
    intersectedPointWithAxisInLocalCoordinateSystemY |> _getDirection;

  let (startLocalScaleX, startLocalScaleY, startLocalScaleZ) =
    OperateScaleGizmoSceneViewEditorService.unsafeGetCurrentSceneTreeNodeStartLocalScale(
      editorState,
    );

  (
    startLocalScaleX,
    startLocalScaleY
    *. direction
    *. Js.Math.abs_float(
         intersectedPointWithAxisInLocalCoordinateSystemY
         /. dragStartPointInLocalCoordinateSystemY,
       )
    |> _avoidZero,
    startLocalScaleZ,
  );
};

let _computeCurrentSceneTreeNodeNewScaleForZAxis =
    (ray, (editorState, engineState)) => {
  let (_, _, intersectedPointWithAxisInLocalCoordinateSystemZ) =
    AxisScaleGizmoUtils.getIntersectedPointWithAxisInLocalCoordinateSystemForZAxis(
      ray,
      (editorState, engineState),
    );

  let (_, _, dragStartPointInLocalCoordinateSystemZ) =
    AxisScaleGizmoSceneViewEditorService.unsafeDragStartPointInLocalCoordinateSystem(
      editorState,
    );

  let direction =
    intersectedPointWithAxisInLocalCoordinateSystemZ |> _getDirection;

  let (startLocalScaleX, startLocalScaleY, startLocalScaleZ) =
    OperateScaleGizmoSceneViewEditorService.unsafeGetCurrentSceneTreeNodeStartLocalScale(
      editorState,
    );

  (
    startLocalScaleX,
    startLocalScaleY,
    startLocalScaleZ
    *. direction
    *. Js.Math.abs_float(
         intersectedPointWithAxisInLocalCoordinateSystemZ
         /. dragStartPointInLocalCoordinateSystemZ,
       )
    |> _avoidZero,
  );
};

let _affectAxisGizmo = (event, editorState, engineState) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let ray =
    RayUtils.createPerspectiveCameraRayFromEvent(
      event,
      cameraGameObject,
      (editorState, engineState),
    );

  SelectScaleGizmoSceneViewEditorService.isScaleXAxisGizmoSelected(
    editorState,
  ) ?
    _scaleCurrentSceneTreeNode(
      _computeCurrentSceneTreeNodeNewScaleForXAxis(
        ray,
        (editorState, engineState),
      ),
      editorState,
      engineState,
    ) :
    SelectScaleGizmoSceneViewEditorService.isScaleYAxisGizmoSelected(
      editorState,
    ) ?
      _scaleCurrentSceneTreeNode(
        _computeCurrentSceneTreeNodeNewScaleForYAxis(
          ray,
          (editorState, engineState),
        ),
        editorState,
        engineState,
      ) :
      SelectScaleGizmoSceneViewEditorService.isScaleZAxisGizmoSelected(
        editorState,
      ) ?
        _scaleCurrentSceneTreeNode(
          _computeCurrentSceneTreeNodeNewScaleForZAxis(
            ray,
            (editorState, engineState),
          ),
          editorState,
          engineState,
        ) :
        (editorState, engineState);
};

let _avoidVectorFactorZero = ((x, y, z) as scale) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          test(
            Log.buildAssertMessage(
              ~expect=
                {j|scaleX,scaleY,scaleZ should be nearly zero together|j},
              ~actual={j|not|j},
            ),
            () =>
            _isFactorNearlyZero(x)
            || _isFactorNearlyZero(y)
            || _isFactorNearlyZero(z) ?
              {
                _isFactorNearlyZero(x) |> assertTrue;
                _isFactorNearlyZero(y) |> assertTrue;
                _isFactorNearlyZero(z) |> assertTrue;
              } :
              assertPass()
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  _isFactorNearlyZero(x) && _isFactorNearlyZero(y) && _isFactorNearlyZero(z) ?
    (
      _getReplacedZeroFactor(),
      _getReplacedZeroFactor(),
      _getReplacedZeroFactor(),
    ) :
    scale;
};

let _computeCurrentSceneTreeNodeNewScaleForCenterBox =
    (event: EventType.customEvent, (editorState, engineState)) => {
  let (locationInViewX, locationInViewY) =
    CenterBoxUtils.getDragStartMouseLocationInViewForCenterBox(event);

  let (dragStartMouseLocationX, dragStartMouseLocationY) =
    CenterBoxScaleGizmoSceneViewEditorService.unsafeGetDragStartMouseLocation(
      editorState,
    );

  let startLocalScale =
    OperateScaleGizmoSceneViewEditorService.unsafeGetCurrentSceneTreeNodeStartLocalScale(
      editorState,
    );

  let factor = 40.0;

  startLocalScale
  |> Vector3Service.multiplyScalar(
       _,
       1.
       +. NumberType.convertIntToFloat(
            locationInViewX - dragStartMouseLocationX,
          )
       /. factor
       +. NumberType.convertIntToFloat(
            dragStartMouseLocationY - locationInViewY,
          )
       /. factor,
     )
  |> _avoidVectorFactorZero;
};

let _affectCenterBoxGizmo =
    (event, affectAxisGizmoFunc, editorState, engineState) =>
  SelectScaleGizmoSceneViewEditorService.isScaleCenterBoxGizmoSelected(
    editorState,
  ) ?
    _scaleCurrentSceneTreeNode(
      _computeCurrentSceneTreeNodeNewScaleForCenterBox(
        event,
        (editorState, engineState),
      ),
      editorState,
      engineState,
    ) :
    affectAxisGizmoFunc(event, editorState, engineState);

let affectScaleGizmo = (event, (editorState, engineState)) =>
  _affectCenterBoxGizmo(event, _affectAxisGizmo, editorState, engineState);