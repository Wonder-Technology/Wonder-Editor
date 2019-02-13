open EditorType;

open ShapeType;

let buildXZPlane = (editorState, engineState) =>
  PlaneTransformGizmoSceneViewEditorService.buildPlane(
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleXAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleZAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleWholeGizmo(
      editorState,
    ),
    engineState,
  );

let buildYZPlane = (editorState, engineState) =>
  PlaneTransformGizmoSceneViewEditorService.buildPlane(
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleYAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleZAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleWholeGizmo(
      editorState,
    ),
    engineState,
  );

let buildXYPlane = (editorState, engineState) =>
  PlaneTransformGizmoSceneViewEditorService.buildPlane(
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleXAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleYAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateScaleGizmoSceneViewEditorService.unsafeGetScaleWholeGizmo(
      editorState,
    ),
    engineState,
  );