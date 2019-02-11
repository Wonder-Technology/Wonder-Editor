let findMostOrthogonalPlaneForXAxis = (ray, (editorState, engineState)) =>
  FindPlaneForCheckIntersectUtils.findMostOrthogonalPlaneBetweenCurrentSceneTreeNodeAndCameraVecAndPlane(
    (
      AxisScaleGizmoSceneViewEditorService.getYAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneScaleGizmoSceneViewEditorService.buildXZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisScaleGizmoSceneViewEditorService.getZAxisNormalizedVec(
        editorState,
        engineState,
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
      AxisScaleGizmoSceneViewEditorService.getXAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneScaleGizmoSceneViewEditorService.buildYZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisScaleGizmoSceneViewEditorService.getZAxisNormalizedVec(
        editorState,
        engineState,
      ),
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
      AxisScaleGizmoSceneViewEditorService.getXAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneScaleGizmoSceneViewEditorService.buildYZPlane(
        editorState,
        engineState,
      ),
    ),
    (
      AxisScaleGizmoSceneViewEditorService.getYAxisNormalizedVec(
        editorState,
        engineState,
      ),
      PlaneScaleGizmoSceneViewEditorService.buildXZPlane(
        editorState,
        engineState,
      ),
    ),
    (editorState, engineState),
  );