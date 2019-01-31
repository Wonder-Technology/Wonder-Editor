let _isSelectTranslationAxisGizmo =
    (translationAxisGizmo, ray, engineState, editorState) => {
  let expandFactor = 0.3;

  HierarchyGameObjectEngineService.getAllChildren(
    translationAxisGizmo,
    engineState,
  )
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. isSelect, gameObject) =>
         isSelect ?
           isSelect :
           {
             let halfExtendsLength =
               AABBShapeUtils.setFromGameObject(gameObject, engineState)
               |> AABBShapeUtils.getHalfExtends
               |> Vector3Service.length;

             RayUtils.isIntersectAABB(
               AABBShapeUtils.setFromGameObject(gameObject, engineState)
               |> AABBShapeUtils.expandByScalar(
                    expandFactor *. halfExtendsLength,
                  ),
               ray,
             );
           },
       false,
     );
};

let _isSelectTranslationPlaneGizmo =
    (translationPlaneGizmo, ray, engineState, editorState) =>
  RayUtils.isIntersectAABB(
    AABBShapeUtils.setFromGameObject(translationPlaneGizmo, engineState),
    ray,
  );

let _unsafeGetIntersectPointWithPlane =
    (plane, ray, (editorState, engineState)) =>
  switch (RayUtils.checkIntersectPlane(plane, ray)) {
  | None =>
    WonderLog.Log.fatal(
      LogUtils.buildFatalMessage(
        ~description={j|should intersect with plane|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  | Some(point) => point
  };

let _getMoveStartDataForAxis =
    (
      ray,
      axisVec,
      findMostOrthogonalPlaneForAxisFunc,
      (editorState, engineState),
    ) => {
  let plane =
    findMostOrthogonalPlaneForAxisFunc(ray, (editorState, engineState));

  let point =
    _unsafeGetIntersectPointWithPlane(
      plane,
      ray,
      (editorState, engineState),
    );

  let axisGameObjectStartPoint =
    AxisTransformGizmoSceneViewEditorService.getAxisGizmoPos(
      editorState,
      engineState,
    );

  (
    axisGameObjectStartPoint,
    PointService.projectPointToLine(point, axisGameObjectStartPoint, axisVec),
  );
};

let _getMoveStartDataForXAxis = (ray, (editorState, engineState)) =>
  _getMoveStartDataForAxis(
    ray,
    AxisTransformGizmoSceneViewEditorService.getXAxisNormalizedVec(
      editorState,
      engineState,
    ),
    FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneForXAxis,
    (editorState, engineState),
  );

let _getMoveStartDataForYAxis = (ray, (editorState, engineState)) =>
  _getMoveStartDataForAxis(
    ray,
    AxisTransformGizmoSceneViewEditorService.getYAxisNormalizedVec(
      editorState,
      engineState,
    ),
    FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneForYAxis,
    (editorState, engineState),
  );

let _getMoveStartDataForZAxis = (ray, (editorState, engineState)) =>
  _getMoveStartDataForAxis(
    ray,
    AxisTransformGizmoSceneViewEditorService.getZAxisNormalizedVec(
      editorState,
      engineState,
    ),
    FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneForZAxis,
    (editorState, engineState),
  );

let _getMoveStartDataForXYPlane = (ray, (editorState, engineState)) =>
  _unsafeGetIntersectPointWithPlane(
    PlaneTransformGizmoSceneViewEditorService.buildXYPlane(
      editorState,
      engineState,
    ),
    ray,
    (editorState, engineState),
  );

let _getMoveStartDataForXZPlane = (ray, (editorState, engineState)) =>
  _unsafeGetIntersectPointWithPlane(
    PlaneTransformGizmoSceneViewEditorService.buildXZPlane(
      editorState,
      engineState,
    ),
    ray,
    (editorState, engineState),
  );

let _getMoveStartDataForYZPlane = (ray, (editorState, engineState)) =>
  _unsafeGetIntersectPointWithPlane(
    PlaneTransformGizmoSceneViewEditorService.buildYZPlane(
      editorState,
      engineState,
    ),
    ray,
    (editorState, engineState),
  );

let _selectAxisGizmo =
    (
      ray,
      (onlySelectTranslationAxisGizmoFunc, getMoveStartDataFunc),
      (editorState, engineState),
    ) => {
  let editorState = editorState |> onlySelectTranslationAxisGizmoFunc;

  let (axisGameObjectStartPoint, pickStartPoint) =
    getMoveStartDataFunc(ray, (editorState, engineState));

  editorState
  |> MoveTransformGizmoSceneViewEditorService.setPickStartPoint(
       pickStartPoint,
     )
  |> MoveTransformGizmoSceneViewEditorService.setAxisGizmoStartPoint(
       axisGameObjectStartPoint,
     );
};

let _selectPlaneGizmo =
    (
      ray,
      (onlySelectTranslationPlaneGizmoFunc, getMoveStartDataFunc),
      (editorState, engineState),
    ) => {
  let editorState = editorState |> onlySelectTranslationPlaneGizmoFunc;

  let pickStartPoint = getMoveStartDataFunc(ray, (editorState, engineState));

  editorState
  |> MoveTransformGizmoSceneViewEditorService.setPickStartPoint(
       pickStartPoint,
     );
};

let _handleSelectAxisGizmo = (ray, editorState, engineState) =>
  _isSelectTranslationAxisGizmo(
    TransformGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
      editorState,
    ),
    ray,
    engineState,
    editorState,
  ) ?
    _selectAxisGizmo(
      ray,
      (
        SelectTransformGizmoSceneViewEditorService.onlySelectTranslationXAxisGizmo,
        _getMoveStartDataForXAxis,
      ),
      (editorState, engineState),
    ) :
    _isSelectTranslationAxisGizmo(
      TransformGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
        editorState,
      ),
      ray,
      engineState,
      editorState,
    ) ?
      _selectAxisGizmo(
        ray,
        (
          SelectTransformGizmoSceneViewEditorService.onlySelectTranslationYAxisGizmo,
          _getMoveStartDataForYAxis,
        ),
        (editorState, engineState),
      ) :
      _isSelectTranslationAxisGizmo(
        TransformGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
          editorState,
        ),
        ray,
        engineState,
        editorState,
      ) ?
        _selectAxisGizmo(
          ray,
          (
            SelectTransformGizmoSceneViewEditorService.onlySelectTranslationZAxisGizmo,
            _getMoveStartDataForZAxis,
          ),
          (editorState, engineState),
        ) :
        editorState
        |> SelectTransformGizmoSceneViewEditorService.markNotSelectAnyTranslationGizmo;

let _handleSelectPlaneGizmo =
    (ray, handleSelectAxisGizmoFunc, editorState, engineState) =>
  _isSelectTranslationPlaneGizmo(
    TransformGizmoSceneViewEditorService.unsafeGetTranslationXYPlaneGizmo(
      editorState,
    ),
    ray,
    engineState,
    editorState,
  ) ?
    _selectPlaneGizmo(
      ray,
      (
        SelectTransformGizmoSceneViewEditorService.onlySelectTranslationXYPlaneGizmo,
        _getMoveStartDataForXYPlane,
      ),
      (editorState, engineState),
    ) :
    _isSelectTranslationPlaneGizmo(
      TransformGizmoSceneViewEditorService.unsafeGetTranslationXZPlaneGizmo(
        editorState,
      ),
      ray,
      engineState,
      editorState,
    ) ?
      _selectPlaneGizmo(
        ray,
        (
          SelectTransformGizmoSceneViewEditorService.onlySelectTranslationXZPlaneGizmo,
          _getMoveStartDataForXZPlane,
        ),
        (editorState, engineState),
      ) :
      _isSelectTranslationPlaneGizmo(
        TransformGizmoSceneViewEditorService.unsafeGetTranslationYZPlaneGizmo(
          editorState,
        ),
        ray,
        engineState,
        editorState,
      ) ?
        _selectPlaneGizmo(
          ray,
          (
            SelectTransformGizmoSceneViewEditorService.onlySelectTranslationYZPlaneGizmo,
            _getMoveStartDataForYZPlane,
          ),
          (editorState, engineState),
        ) :
        handleSelectAxisGizmoFunc(ray, editorState, engineState);

let selectTransformGizmo = (event, engineState, editorState) => {
  let cameraGameObject =
    SceneViewEditorService.unsafeGetEditCamera(editorState);

  let ray =
    RayUtils.createPerspectiveCameraRayFromEvent(
      event,
      cameraGameObject,
      (editorState, engineState),
    );

  _handleSelectPlaneGizmo(
    ray,
    _handleSelectAxisGizmo,
    editorState,
    engineState,
  );
};