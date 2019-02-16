let _unsafeGetIntersectPointWithPlane =
    (plane, ray, (editorState, engineState)) =>
  switch (RayIntersectUtils.checkIntersectPlane(plane, ray)) {
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

let _onlyRemainX = ((x, y, z)) => (x, 0., 0.);

let _onlyRemainY = ((x, y, z)) => (0., y, 0.);

let _onlyRemainZ = ((x, y, z)) => (0., 0., z);

let _getIntersectedPointWithAxisInLocalCoordinateSystemForAxis =
    (
      ray,
      axisVec,
      (findMostOrthogonalPlaneForAxisFunc, onlyRemainFunc),
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

  Wonderjs.Vector3Service.transformMat4Tuple(
    point,
    OperateScaleGizmoSceneViewEditorService.unsafeGetDragStartScaleWholeGizmoInvertLocalToWorldMatrixTypeArray(
      editorState,
    ),
  )
  |> onlyRemainFunc;
};

let getIntersectedPointWithAxisInLocalCoordinateSystemForXAxis =
    (ray, (editorState, engineState)) =>
  _getIntersectedPointWithAxisInLocalCoordinateSystemForAxis(
    ray,
    OperateScaleGizmoSceneViewEditorService.unsafeGetDragStartXAxisNormalizedVec(
      editorState,
    ),
    (
      FindPlaneForCheckIntersectScaleUtils.findMostOrthogonalPlaneForXAxis,
      _onlyRemainX,
    ),
    (editorState, engineState),
  );

let getIntersectedPointWithAxisInLocalCoordinateSystemForYAxis =
    (ray, (editorState, engineState)) =>
  _getIntersectedPointWithAxisInLocalCoordinateSystemForAxis(
    ray,
    OperateScaleGizmoSceneViewEditorService.unsafeGetDragStartYAxisNormalizedVec(
      editorState,
    ),
    (
      FindPlaneForCheckIntersectScaleUtils.findMostOrthogonalPlaneForYAxis,
      _onlyRemainY,
    ),
    (editorState, engineState),
  );

let getIntersectedPointWithAxisInLocalCoordinateSystemForZAxis =
    (ray, (editorState, engineState)) =>
  _getIntersectedPointWithAxisInLocalCoordinateSystemForAxis(
    ray,
    OperateScaleGizmoSceneViewEditorService.unsafeGetDragStartZAxisNormalizedVec(
      editorState,
    ),
    (
      FindPlaneForCheckIntersectScaleUtils.findMostOrthogonalPlaneForZAxis,
      _onlyRemainZ,
    ),
    (editorState, engineState),
  );