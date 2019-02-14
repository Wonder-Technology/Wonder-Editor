let markNotSelectAnyTransformGizmo = editorState =>
  editorState
  |> SelectTranslationGizmoSceneViewEditorService.markNotSelectAnyTranslationGizmo
  |> SelectRotationGizmoSceneViewEditorService.markNotSelectAnyRotationGizmo
  |> SelectScaleGizmoSceneViewEditorService.markNotSelectAnyScaleGizmo;

let isSelectAnyTransformGizmo = editorState =>
  SelectTranslationGizmoSceneViewEditorService.isSelectAnyTranslationGizmo(
    editorState,
  )
  || SelectRotationGizmoSceneViewEditorService.isSelectAnyRotationGizmo(
       editorState,
     )
  || SelectScaleGizmoSceneViewEditorService.isSelectAnyScaleGizmo(editorState);