let markNotSelectAnyTransformGizmo = editorState =>
  editorState
  |> SelectTranslationGizmoSceneViewEditorService.markNotSelectAnyTranslationGizmo
  |> SelectRotationGizmoSceneViewEditorService.markNotSelectAnyRotationGizmo;

let isSelectAnyTransformGizmo = editorState =>
  SelectTranslationGizmoSceneViewEditorService.isSelectAnyTranslationGizmo(
    editorState,
  )
  || SelectRotationGizmoSceneViewEditorService.isSelectAnyRotationGizmo(
       editorState,
     );