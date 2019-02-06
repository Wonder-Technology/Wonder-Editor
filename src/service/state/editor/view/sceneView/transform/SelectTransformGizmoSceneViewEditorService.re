let markNotSelectAnyTransformGizmo = editorState =>
  editorState
  |> SelectTranslationGizmoSceneViewEditorService.markNotSelectAnyTranslationGizmo
  |> SelectRotationGizmoSceneViewEditorService.markNotSelectAnyRotationGizmo;