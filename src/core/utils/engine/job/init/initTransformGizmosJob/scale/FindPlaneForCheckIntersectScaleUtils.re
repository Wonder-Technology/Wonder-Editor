let findMostOrthogonalPlaneForXAxis = (ray, (editorState, engineState)) =>
  FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      OperateScaleGizmoSceneViewEditorService.unsafeGetDragStartYAxisNormalizedVec(
        editorState,
      ),
      /* AxisScaleGizmoSceneViewEditorService.getYAxisNormalizedVec(
           editorState,
           engineState,
         ), */
      PlaneScaleGizmoSceneViewEditorService.buildXZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      /* AxisScaleGizmoSceneViewEditorService.getZAxisNormalizedVec(
           editorState,
           engineState,
         ), */
      OperateScaleGizmoSceneViewEditorService.unsafeGetDragStartZAxisNormalizedVec(
        editorState,
      ),
      PlaneScaleGizmoSceneViewEditorService.buildXYPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );

let findMostOrthogonalPlaneForYAxis = (ray, (editorState, engineState)) =>
  FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      OperateScaleGizmoSceneViewEditorService.unsafeGetDragStartXAxisNormalizedVec(
        editorState,
      ),
      /* AxisScaleGizmoSceneViewEditorService.getXAxisNormalizedVec(
           editorState,
           engineState,
         ), */
      PlaneScaleGizmoSceneViewEditorService.buildYZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      OperateScaleGizmoSceneViewEditorService.unsafeGetDragStartZAxisNormalizedVec(
        editorState,
      ),
      /* AxisScaleGizmoSceneViewEditorService.getZAxisNormalizedVec(
           editorState,
           engineState,
         ), */
      PlaneScaleGizmoSceneViewEditorService.buildXYPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );

let findMostOrthogonalPlaneForZAxis = (ray, (editorState, engineState)) =>
  FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      OperateScaleGizmoSceneViewEditorService.unsafeGetDragStartXAxisNormalizedVec(
        editorState,
      ),
      /* AxisScaleGizmoSceneViewEditorService.getXAxisNormalizedVec(
           editorState,
           engineState,
         ), */
      PlaneScaleGizmoSceneViewEditorService.buildYZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      OperateScaleGizmoSceneViewEditorService.unsafeGetDragStartYAxisNormalizedVec(
        editorState,
      ),
      /* AxisScaleGizmoSceneViewEditorService.getYAxisNormalizedVec(
           editorState,
           engineState,
         ), */
      PlaneScaleGizmoSceneViewEditorService.buildXZPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );