open EditorType;

open ShapeType;

let buildXYPlane = (editorState, engineState) =>
  PlaneTransformGizmoSceneViewEditorService.buildPlane(
    OperateScaleGizmoSceneViewEditorService.unsafeGetDragStartZAxisNormalizedVec(
      editorState,
    ),
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleWholeGizmo(
      editorState,
    ),
    engineState,
  );

let buildXZPlane = (editorState, engineState) =>
  PlaneTransformGizmoSceneViewEditorService.buildPlane(
    OperateScaleGizmoSceneViewEditorService.unsafeGetDragStartYAxisNormalizedVec(
      editorState,
    ),
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleWholeGizmo(
      editorState,
    ),
    engineState,
  );

let buildYZPlane = (editorState, engineState) =>
  PlaneTransformGizmoSceneViewEditorService.buildPlane(
    OperateScaleGizmoSceneViewEditorService.unsafeGetDragStartXAxisNormalizedVec(
      editorState,
    ),
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleWholeGizmo(
      editorState,
    ),
    engineState,
  );