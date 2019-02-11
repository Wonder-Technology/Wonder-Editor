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

  /* let axisGameObjectStartPoint =
     AxisScaleGizmoSceneViewEditorService.getAxisGizmoPos(
       editorState,
       engineState,
     ); */

  Wonderjs.Vector3Service.transformMat4Tuple(
    /* PointService.projectPointToLine(point, axisGameObjectStartPoint, axisVec), */
    point,
    TransformGameObjectEngineService.getLocalToWorldMatrixTypeArray(
      OperateScaleGizmoSceneViewEditorService.unsafeGetScaleWholeGizmo(
        editorState,
      ),
      engineState,
    )
    |> Wonderjs.Matrix4Service.invert(
         _,
         Wonderjs.Matrix4Service.createIdentityMatrix4(),
       ),
  )
  |> onlyRemainFunc;
};

let getIntersectedPointWithAxisInLocalCoordinateSystemForXAxis =
    (ray, (editorState, engineState)) =>
  _getIntersectedPointWithAxisInLocalCoordinateSystemForAxis(
    ray,
    AxisScaleGizmoSceneViewEditorService.getXAxisNormalizedVec(
      editorState,
      engineState,
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
    AxisScaleGizmoSceneViewEditorService.getYAxisNormalizedVec(
      editorState,
      engineState,
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
    AxisScaleGizmoSceneViewEditorService.getZAxisNormalizedVec(
      editorState,
      engineState,
    ),
    (
      FindPlaneForCheckIntersectScaleUtils.findMostOrthogonalPlaneForZAxis,
      _onlyRemainZ,
    ),
    (editorState, engineState),
  );