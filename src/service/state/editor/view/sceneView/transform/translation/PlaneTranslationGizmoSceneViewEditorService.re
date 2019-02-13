open EditorType;

open ShapeType;

let buildXZPlane = (editorState, engineState) =>
  PlaneTransformGizmoSceneViewEditorService.buildPlane(
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
      editorState,
    ),
    engineState,
  );

let buildYZPlane = (editorState, engineState) =>
  PlaneTransformGizmoSceneViewEditorService.buildPlane(
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationZAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
      editorState,
    ),
    engineState,
  );

let buildXYPlane = (editorState, engineState) =>
  PlaneTransformGizmoSceneViewEditorService.buildPlane(
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationYAxisGizmo(
      editorState,
    )
    |> HierarchyGameObjectEngineService.getChildren(_, engineState)
    |> ArrayService.unsafeGetFirst,
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationWholeGizmo(
      editorState,
    ),
    engineState,
  );